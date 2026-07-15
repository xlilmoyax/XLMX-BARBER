/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Screen, RegisteredUser } from './types';
import Header from './components/Header';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import DomicilioView from './components/DomicilioView';
import Experience360View from './components/Experience360View';
import SpaView from './components/SpaView';
import LimpiezaFacialView from './components/LimpiezaFacialView';
import MembershipsView from './components/MembershipsView';
import RegistroView from './components/RegistroView';
import AdminLoginView from './components/AdminLoginView';
import AdminDashboardView from './components/AdminDashboardView';
import LegalView from './components/LegalView';
import { supabase, mapRowToUser } from './lib/supabaseClient';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('xlmx_admin_logged') === 'true';
  });
  const [loggedInClient, setLoggedInClient] = useState<RegisteredUser | null>(() => {
    const savedClient = localStorage.getItem('xlmx_logged_client');
    return savedClient ? JSON.parse(savedClient) : null;
  });

  // Fetch initial users from Supabase and subscribe to Realtime channel
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          setUsers(data.map(mapRowToUser));
        }
      } catch (err) {
        console.error("Error al cargar usuarios de Supabase:", err);
      }
    };

    fetchUsers();

    // Subscribe to real-time changes on the 'users' table
    const channel = supabase
      .channel('users-realtime-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // listen to INSERT, UPDATE, and DELETE events
          schema: 'public',
          table: 'users',
        },
        (payload) => {
          console.log('Cambio detectado en Supabase Realtime:', payload);
          
          if (payload.eventType === 'INSERT') {
            const newUser = mapRowToUser(payload.new);
            setUsers((prev) => {
              // Avoid adding duplicates if already present
              if (prev.some((u) => u.id === newUser.id)) return prev;
              return [newUser, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedUser = mapRowToUser(payload.new);
            setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
            
            // If the logged-in client profile is updated, sync their session
            setLoggedInClient((current) => {
              if (current && current.id === updatedUser.id) {
                return updatedUser;
              }
              return current;
            });
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old.id;
            setUsers((prev) => prev.filter((u) => u.id !== deletedId));
            
            // Log out user if they get deleted from Supabase
            setLoggedInClient((current) => {
              if (current && current.id === deletedId) return null;
              return current;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sync client profile state with LocalStorage
  useEffect(() => {
    if (loggedInClient) {
      localStorage.setItem('xlmx_logged_client', JSON.stringify(loggedInClient));
    } else {
      localStorage.removeItem('xlmx_logged_client');
    }
  }, [loggedInClient]);

  // Navigation controller
  const handleNavigate = (screen: Screen) => {
    if (screen === 'dashboard-admin' && !isAdminLoggedIn) {
      setCurrentScreen('login-admin');
    } else {
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keep state updated locally for fast feedback
  const handleAddUser = (newUser: RegisteredUser) => {
    setUsers((prev) => {
      if (prev.some((u) => u.id === newUser.id)) return prev;
      return [newUser, ...prev];
    });
  };

  // Delete user from Supabase and update state
  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      setUsers((prev) => prev.filter((u) => u.id !== userId));
      if (loggedInClient && loggedInClient.id === userId) {
        setLoggedInClient(null);
      }
    } catch (err: any) {
      console.error("Error al eliminar usuario en Supabase:", err);
      alert("Error al eliminar de la base de datos: " + err.message);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('xlmx_admin_logged', 'true');
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('xlmx_admin_logged');
  };

  const handleLogoutClient = () => {
    setLoggedInClient(null);
  };

  const currentMembership = loggedInClient?.membership?.toLowerCase() || '';
  
  const themeClass = 
    currentMembership === 'gold' ? 'theme-gold' :
    currentMembership === 'plata' ? 'theme-plata' :
    currentMembership === 'bronce' ? 'theme-bronce' : '';

  return (
    <div className={`min-h-screen bg-zinc-950 flex flex-col selection:bg-amber-400 selection:text-zinc-950 ${themeClass}`}>
      
      {/* Dynamic Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleLogoutAdmin}
        loggedInClient={loggedInClient}
        onLogoutClient={handleLogoutClient}
      />

      {/* Main Content Router with elegant fade transitions */}
      <main className="flex-grow">
        
        {currentScreen === 'home' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {currentScreen === 'sobre-nosotros' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentScreen === 'servicio-domicilio' && (
          <DomicilioView onNavigate={handleNavigate} />
        )}

        {currentScreen === 'experiencia-360' && (
          <Experience360View onNavigate={handleNavigate} />
        )}

        {currentScreen === 'spa-capilar' && (
          <SpaView onNavigate={handleNavigate} />
        )}

        {currentScreen === 'limpieza-facial' && (
          <LimpiezaFacialView onNavigate={handleNavigate} />
        )}

        {currentScreen === 'membresias' && (
          <MembershipsView onNavigate={handleNavigate} />
        )}

        {currentScreen === 'registro' && (
          <RegistroView 
            onNavigate={handleNavigate} 
            onAddUser={handleAddUser} 
            setLoggedInClient={setLoggedInClient}
          />
        )}

        {currentScreen === 'login-admin' && (
          <AdminLoginView 
            onNavigate={handleNavigate} 
            onLoginSuccess={handleLoginSuccess}
            users={users}
            onAddUser={handleAddUser}
            loggedInClient={loggedInClient}
            setLoggedInClient={setLoggedInClient}
          />
        )}

        {currentScreen === 'dashboard-admin' && (
          <AdminDashboardView 
            users={users}
            onAddUser={handleAddUser}
            onDeleteUser={handleDeleteUser}
            onLogout={handleLogoutAdmin} 
            onNavigate={handleNavigate} 
          />
        )} 

        {currentScreen === 'legal' && (
          <LegalView onNavigate={handleNavigate} />
        )}

      </main>

    </div> 
  );
}

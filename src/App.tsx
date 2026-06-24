/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Screen, RegisteredUser } from './types';
import { INITIAL_USERS } from './data';
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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
const [users, setUsers] = useState<RegisteredUser[]>(() => {
    const savedUsers = localStorage.getItem('xlmx_users');
    return savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
const [loggedInClient, setLoggedInClient] = useState<RegisteredUser | null>(() => {
    const savedClient = localStorage.getItem('xlmx_logged_client');
    return savedClient ? JSON.parse(savedClient) : null;
  });
useEffect(() => {
    localStorage.setItem('xlmx_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (loggedInClient) {
      localStorage.setItem('xlmx_logged_client', JSON.stringify(loggedInClient));
    } else {
      localStorage.removeItem('xlmx_logged_client');
    }
  }, [loggedInClient]);
  // Navigation controller
  const handleNavigate = (screen: Screen) => {
    // If user tries to access administrator dashboard directly but is not authenticated
    if (screen === 'dashboard-admin' && !isAdminLoggedIn) {
      setCurrentScreen('login-admin');
    } else {
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // User management hooks
  const handleAddUser = (newUser: RegisteredUser) => {
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (loggedInClient && loggedInClient.id === userId) {
      setLoggedInClient(null);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleLogoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const handleLogoutClient = () => {
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

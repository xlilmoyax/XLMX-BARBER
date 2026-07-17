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
type AdminDashboardTypedProps = {
  users: RegisteredUser[];
  onLogout: () => void;
  onNavigate: (screen: Screen) => void;
  onDeleteUser: (userId: string) => void;
  onAddUser: (user: RegisteredUser) => void;
  onUpdateUser: (user: RegisteredUser) => Promise<void> | void;
  onSyncDatabase: () => void;
  isSyncing: boolean;
};
const AdminDashboardTyped = AdminDashboardView as unknown as React.ComponentType<AdminDashboardTypedProps>;
import LegalView from './components/LegalView';
import emailjs from '@emailjs/browser';
import { supabase, mapRowToUser } from './lib/supabaseClient';

emailjs.init('Oql46z_LFLkAI8_DE');

const SCREEN_HASHES: Screen[] = [
  'home',
  'sobre-nosotros',
  'servicio-domicilio',
  'experiencia-360',
  'spa-capilar',
  'limpieza-facial',
  'membresias',
  'registro',
  'login-admin',
  'dashboard-admin',
  'legal',
];

const getScreenFromHash = (hash: string): Screen => {
  const normalized = hash.replace('#', '');
  return SCREEN_HASHES.includes(normalized as Screen) ? (normalized as Screen) : 'home';
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => getScreenFromHash(window.location.hash));
const [users, setUsers] = useState<RegisteredUser[]>(() => {
    const savedUsers = localStorage.getItem('xlmx_users');
    return savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
  });
const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
  return localStorage.getItem('xlmx_admin_logged') === 'true';
});
const [loggedInClient, setLoggedInClient] = useState<RegisteredUser | null>(() => {
    const savedClient = localStorage.getItem('xlmx_logged_client');
    return savedClient ? JSON.parse(savedClient) : null;
  });
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
useEffect(() => {
    localStorage.setItem('xlmx_users', JSON.stringify(users));
  }, [users]);
useEffect(() => {
  const loadUsers = async () => {
    console.log("Cargando usuarios desde Supabase...");
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error("Error de conexión al cargar usuarios:", error.message);
      return;
    }
    if (data) {
      setUsers(data.map(mapRowToUser));
      console.log("Usuarios cargados desde Supabase:", data.length);
    }
  };

  loadUsers();
}, []);
  useEffect(() => {
    if (loggedInClient) {
      localStorage.setItem('xlmx_logged_client', JSON.stringify(loggedInClient));
    } else {
      localStorage.removeItem('xlmx_logged_client');
    }
  }, [loggedInClient]);

  useEffect(() => {
    if (!loggedInClient) return;

    const verifyCurrentUser = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', loggedInClient.id)
        .maybeSingle();

      if (error) {
        console.error('Error al verificar usuario actual:', error);
        return;
      }

      if (!data) {
        setLoggedInClient(null);
        setCurrentScreen('registro');
        setEmailStatus('Tu usuario ha sido eliminado. Vuelve a registrarte para continuar.');
        setTimeout(() => setEmailStatus(null), 5000);
      }
    };

    verifyCurrentUser();
  }, [loggedInClient]);

  // Realtime sync with Supabase users table.
  useEffect(() => {
    const channel = supabase
      .channel('users-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        (payload) => {
          if (payload.eventType === 'INSERT' && payload.new) {
            const addedUser = mapRowToUser(payload.new);
            setUsers((prev) => {
              if (prev.some((user) => user.id === addedUser.id)) {
                return prev.map((user) => (user.id === addedUser.id ? addedUser : user));
              }
              return [addedUser, ...prev];
            });
          }

          if (payload.eventType === 'UPDATE' && payload.new) {
            const updatedUser = mapRowToUser(payload.new);
            setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
            if (loggedInClient?.id === updatedUser.id) {
              setLoggedInClient(updatedUser);
            }
          }

          if (payload.eventType === 'DELETE' && payload.old) {
            const deletedId = payload.old.id;
            setUsers((prev) => prev.filter((user) => user.id !== deletedId));
            if (loggedInClient?.id === deletedId) {
              setLoggedInClient(null);
              setCurrentScreen('registro');
              setEmailStatus('Tu usuario ha sido eliminado. Vuelve a registrarte para continuar.');
              setTimeout(() => setEmailStatus(null), 5000);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loggedInClient]);

  // Sync screen state with browser hash history.
  useEffect(() => {
    const onHashChange = () => {
      const screen = getScreenFromHash(window.location.hash);
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const desiredHash = `#${currentScreen}`;
    if (window.location.hash !== desiredHash) {
      history.replaceState(null, '', desiredHash);
    }
  }, [currentScreen]);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation controller
  const handleNavigate = (screen: Screen) => {
    if (screen === 'dashboard-admin' && !isAdminLoggedIn) {
      navigateTo('login-admin');
    } else {
      navigateTo(screen);
    }
  };

  // User management hooks
const handleAddUser = async (newUser: RegisteredUser) => {
  setUsers((prev) => [newUser, ...prev]);

  const { error } = await supabase
    .from('users')
    .insert([
      {
        id: newUser.id, // <--- ¡Asegúrate de incluir esto!
        fullname: newUser.fullname,
        email: newUser.email,
        phone: newUser.phone,
        age: newUser.age,
        is_socio: newUser.isSocio,
        membership: newUser.membership,
        created_at: newUser.createdAt,
      },
    ]);

  if (error) {
    console.error('Error al guardar en Supabase:', error.message);
    alert('Hubo un error al guardar tus datos, intenta de nuevo.');
    return;
  }

  console.log('Usuario guardado con éxito en la nube');
  alert('¡Registro exitoso!');

  const emailTemplateParams = {
    user_id: newUser.id,
    user_name: newUser.fullname,
    user_email: newUser.email,
    user_phone: newUser.phone,
    user_membership: newUser.membership,
    is_socio: newUser.isSocio ? 'Sí' : 'No',
    registration_date: new Date().toLocaleString(),
    welcome_message: 'Gracias por registrarte en XLMX Barber, te damos la bienvenida al club premium.',
  };

  emailjs
    .send('service_ta0f47t', 'template_16q07to', emailTemplateParams)
    .then(() => {
      console.log('Email de registro enviado correctamente.');
      setEmailStatus('Notificación de registro enviada correctamente.');
      setTimeout(() => setEmailStatus(null), 5000);
    })
    .catch((emailError) => {
      console.error('Error al enviar notificación por email:', emailError);
      setEmailStatus('No se pudo enviar la notificación por email.');
      setTimeout(() => setEmailStatus(null), 5000);
    });

  const adminEmailTemplateParams = {
    user_id: newUser.id,
    user_name: newUser.fullname,
    user_email: newUser.email,
    user_phone: newUser.phone,
    user_membership: newUser.membership,
    is_socio: newUser.isSocio ? 'Sí' : 'No',
    registration_date: new Date().toLocaleString(),
    admin_notice: 'Nuevo cliente registrado en el sistema.',
    admin_email: 'matymoya4@gmail.com',
  };

  emailjs
    .send('service_ta0f47t', 'template_9c1f548', adminEmailTemplateParams)
    .then(() => {
      console.log('Email administrativo enviado correctamente.');
    })
    .catch((adminEmailError) => {
      console.error('Error al enviar notificación administrativa por email:', adminEmailError);
    });
};

  const handleDeleteUser = async (userId: string) => {
  // Borrar en Supabase
  const { error } = await supabase.from('users').delete().eq('id', userId);
  
  if (error) {
    console.error('Error al borrar en Supabase:', error);
    alert('No se pudo eliminar el usuario de la base de datos.');
    return;
  }

  setUsers((prev) => prev.filter((u) => u.id !== userId));

  if (loggedInClient?.id === userId) {
    setLoggedInClient(null);
    setCurrentScreen('registro');
    setEmailStatus('Tu usuario ha sido eliminado. Vuelve a registrarte para continuar.');
    setTimeout(() => setEmailStatus(null), 5000);
  }
};

  const handleUpdateUser = async (updatedUser: RegisteredUser) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        phone: updatedUser.phone,
        age: updatedUser.age,
        is_socio: updatedUser.isSocio,
        membership: updatedUser.membership,
      })
      .eq('id', updatedUser.id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error al actualizar en Supabase:', error);
      alert('No se pudo actualizar el usuario en la base de datos.');
      return;
    }

    const updated = data ? mapRowToUser(data) : updatedUser;
    setUsers((prev) => prev.map(u => u.id === updated.id ? updated : u));

    if (loggedInClient?.id === updated.id) {
      setLoggedInClient(updated);
    }
  } catch (err) {
    console.error('Excepción al actualizar usuario:', err);
    alert('Error inesperado al actualizar usuario.');
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
    localStorage.removeItem('xlmx_logged_client');
  };
  const currentMembership = loggedInClient?.membership?.toLowerCase() || '';
  const [isSyncing, setIsSyncing] = useState(false);

  const themeClass = 
    currentMembership === 'gold' ? 'theme-gold' :
    currentMembership === 'plata' ? 'theme-plata' :
    currentMembership === 'bronce' ? 'theme-bronce' : '';

  const handleSyncDatabase = async () => {
  setIsSyncing(true);
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;

    const usersFromDb = (data ?? []).map(mapRowToUser);
    setUsers(usersFromDb);
    alert("¡Base de datos sincronizada con éxito!");
  } catch (err) {
    console.error("Error al sincronizar:", err);
    alert("Error al conectar con la base de datos.");
  } finally {
    setIsSyncing(false);
  }
};

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

      {emailStatus && (
        <div className="max-w-4xl mx-auto mt-4 px-4 py-3 rounded border border-amber-200/20 bg-amber-400/10 text-amber-100 text-sm text-center">
          {emailStatus}
        </div>
      )}

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
  <AdminDashboardTyped
    users={users}
    onLogout={handleLogoutAdmin}
    onNavigate={handleNavigate}
    onDeleteUser={handleDeleteUser}
    onAddUser={handleAddUser}
    onUpdateUser={handleUpdateUser}
    onSyncDatabase={handleSyncDatabase}
    isSyncing={isSyncing}
  />
)}

      </main>

    </div> 
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Screen, RegisteredUser } from '../types';

interface AdminLoginProps {
  onNavigate: (screen: Screen) => void;
  onLoginSuccess: () => void; // <--- Esto elimina el error de App.tsx
  users: RegisteredUser[];
  onAddUser: (user: RegisteredUser) => void;
  loggedInClient: RegisteredUser | null;
  setLoggedInClient: (client: RegisteredUser | null) => void;
}

export default function AdminLoginView({ 
  onNavigate, onLoginSuccess, users, onAddUser, loggedInClient, setLoggedInClient 
}: AdminLoginProps) {
  
  // Aquí va tu lógica de login (ej: un botón que llama a onLoginSuccess cuando las credenciales son correctas)
  
  return (
    <div className="p-8 text-white">
      {/* Tu formulario de login aquí */}
      <h2 className="text-2xl mb-4">Acceso Administrativo</h2>
      {/* Al hacer login exitoso, llama a onLoginSuccess() */}
    </div>
  );
}
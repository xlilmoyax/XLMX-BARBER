/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Screen, RegisteredUser } from '../types';
import { 
  Users, LogOut, Search, Trash2 
} from 'lucide-react';

interface Props {
  onLogout: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function AdminDashboardView({ onLogout, onNavigate }: Props) {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) console.error("Error al cargar:", error);
    else setUsers(data as RegisteredUser[] || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (!error) fetchUsers();
    else alert("Error: " + error.message);
  };

  const filteredUsers = users.filter(u => 
    u.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8 bg-zinc-950 min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold">Barbería XLMX Córdoba</h1>
          <p className="text-zinc-500 text-sm">Panel Administrativo</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded text-zinc-300 hover:text-red-400">
          <LogOut className="w-4 h-4" /> SALIR
        </button>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
        <input 
          type="text" 
          placeholder="Buscar cliente..." 
          className="w-full bg-zinc-900 border border-zinc-800 rounded pl-10 p-2 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabla - AQUÍ ESTABA EL ERROR DE SINTAXIS */}
      <div className="bg-zinc-900 rounded border border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-950 text-zinc-400 uppercase text-xs">
            <tr>
              <th className="p-4">Nombre</th>
              <th className="p-4">Contacto</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                <td className="p-4">{user.fullname}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
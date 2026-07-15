/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Screen, RegisteredUser } from '../types';
import { 
  Users, UserCheck, ShieldAlert, Trash2, Search, PlusCircle, 
  Download, LogOut, Check, Sparkles, RefreshCw, Pencil, Layers, Calendar
} from 'lucide-react';

interface Props {
  onLogout: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function AdminDashboardView({ onLogout, onNavigate }: Props) {
  // 1. ESTADOS LOCALES
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // 2. FUNCIÓN PARA BUSCAR DATOS (definida dentro del componente)
  const fetchUsers = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error("Error al cargar:", error);
    } else {
      setUsers(data as RegisteredUser[] || []);
    }
  };

  // 3. CARGA INICIAL
  useEffect(() => {
    fetchUsers();
  }, []);

  // 4. MANEJADORES DE ACCIONES (Lógica de Supabase)
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (!error) {
      fetchUsers(); // Actualiza la lista tras borrar
    } else {
      alert("Error al borrar: " + error.message);
    }
  };

  // A partir de aquí, continúa con tu JSX original (el return...)
return (
  <div className="p-8 bg-black min-h-screen text-white">
    {/* HEADER DEL PANEL */}
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Barbería XLMX Córdoba</h1>
        <p className="text-red-500 font-semibold mt-2">ACCESO AUTORIZADO · PANEL ADMINISTRATIVO</p>
      </div>
      <button onClick={onLogout} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
        SALIR DEL PANEL
      </button>
    </div>

    {/* TARJETAS DE RESUMEN (Stats) */}
    <div className="grid grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-900 p-4 rounded border border-gray-700">
        <p className="text-gray-400">CLIENTES REGISTRADOS</p>
        <h2 className="text-4xl font-bold">{users.length}</h2>
      </div>
      {/* Puedes agregar más tarjetas aquí siguiendo el mismo patrón */}
    </div>

    {/* BUSCADOR */}
    <div className="flex gap-4 mb-6">
      <input 
        className="flex-1 bg-gray-900 border border-gray-700 p-3 rounded text-white"
        placeholder="Buscar cliente por nombre o correo electrónico..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="bg-yellow-500 text-black px-6 py-2 font-bold rounded">AGREGAR CLIENTE</button>
    </div>

    {/* TABLA DE USUARIOS */}
    <div className="bg-gray-900 p-6 rounded border border-gray-700">
      <h3 className="text-xl mb-4">LISTADO DE COBERTURAS REGISTRADAS</h3>
      {users.length > 0 ? (
        <div className="space-y-4">
          {users.filter(u => u.fullname?.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
            <div key={user.id} className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div>
                <p className="font-bold">{user.fullname}</p>
                <p className="text-sm text-gray-400">{user.email} · {user.phone}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-400 hover:text-blue-300">Editar</button>
                <button 
                  onClick={() => handleDelete(user.id)} 
                  className="text-red-500 hover:text-red-400"
                >
                  Borrar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-gray-500">No hay clientes registrados.</p>
      )}
    </div>
  </div>
);
}
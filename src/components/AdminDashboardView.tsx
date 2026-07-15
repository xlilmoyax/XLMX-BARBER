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
  <div>
    {/* ... resto de tu código ... */}
    
    {/* REEMPLAZA TU BLOQUE DE FILTRO POR ESTE: */}
    {users && users.length > 0 ? (
      users
        .filter(user => user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(user => (
          <div key={user.id}>
             {/* Aquí va tu tarjeta de usuario */}
             <button onClick={() => handleDelete(user.id)}>Borrar</button>
          </div>
        ))
    ) : (
      <p>Cargando usuarios o no hay datos disponibles...</p>
    )}
  </div>
);
};
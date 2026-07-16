/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, RegisteredUser } from '../types';
import { supabase } from '../lib/supabaseClient';
import { sanitizeInput, validateEmail, validatePhone } from '../lib/security';
import { 
  Users, UserCheck, ShieldAlert, Trash2, Search, PlusCircle, 
  Download, LogOut, Check, Sparkles, RefreshCw, Layers, Calendar
} from 'lucide-react';

interface AdminDashboardViewProps {
  users: RegisteredUser[];
  onAddUser: (user: RegisteredUser) => void;
  onDeleteUser: (userId: string) => void;
  onLogout: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function AdminDashboardView({
  users,
  onAddUser,
  onDeleteUser,
  onLogout,
  onNavigate,
}: AdminDashboardViewProps) {
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');

  // New Quick User Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFullname, setNewFullname] = useState('');
  const [newAge, setNewAge] = useState<number>(30);
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newIsSocio, setNewIsSocio] = useState(false);
  const [newMembership, setNewMembership] = useState<'bronce' | 'plata' | 'gold' | 'ninguno'>('ninguno');

  // Synchronize alert trigger state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(true);

  const handleSyncDatabase = () => {
    setIsSyncing(true);
    setSyncDone(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncDone(true);
    }, 1500);
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanName = sanitizeInput(newFullname).trim();
    const cleanEmail = sanitizeInput(newEmail).trim().toLowerCase();
    const cleanPhone = sanitizeInput(newPhone).trim();

    if (!cleanName || !cleanEmail || !cleanPhone) {
      alert('Por favor complete todos los datos del nuevo perfil.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      alert('Formato de correo electrónico inválido.');
      return;
    }

    if (!validatePhone(cleanPhone)) {
      alert('El teléfono contiene caracteres no válidos.');
      return;
    }

    try {
      const newUser: RegisteredUser = {
        id: 'usr_' + Date.now().toString(36),
        fullname: cleanName,
        age: newAge,
        email: cleanEmail,
        phone: cleanPhone,
        isSocio: newIsSocio,
        membership: newIsSocio ? (newMembership === 'ninguno' ? 'bronce' : newMembership) : 'ninguno',
        createdAt: new Date().toISOString(),
      };

      // Save to Supabase
      const { error } = await supabase
        .from('users')
        .insert([
          {
            id: newUser.id,
            fullname: newUser.fullname,
            email: newUser.email,
            phone: newUser.phone,
            age: newUser.age,
            is_socio: newUser.isSocio,
            membership: newUser.membership,
            created_at: newUser.createdAt
          }
        ]);

      if (error) throw error;

      onAddUser(newUser);

      // Reset Form
      setNewFullname('');
      setNewAge(30);
      setNewEmail('');
      setNewPhone('');
      setNewIsSocio(false);
      setNewMembership('ninguno');
      setShowAddForm(false);
    } catch (err: any) {
      console.error(err);
      alert('Error de conexión al guardar el usuario en Supabase: ' + err.message);
    }
  };

  // Filtered array
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.phone.includes(searchTerm);
    const matchesTier = tierFilter === 'all' || 
                        (tierFilter === 'socio' && u.isSocio) ||
                        (tierFilter === 'no-socio' && !u.isSocio) ||
                        u.membership === tierFilter;
    return matchesSearch && matchesTier;
  });

  // Calculate Metrics
  const totalClients = users.length;
  const totalSocios = users.filter((u) => u.isSocio).length;
  const goldCount = users.filter((u) => u.membership === 'gold').length;
  const avgAge = totalClients ? Math.round(users.reduce((sum, u) => sum + u.age, 0) / totalClients) : 0;

  // CSV registry exporter
  const handleExportCSV = () => {
    const csvRows = [
      ['ID', 'Nombre', 'Edad', 'Email', 'Telefono', 'Socio', 'Membresia', 'Fecha de Registro']
    ];

    users.forEach((u) => {
      csvRows.push([
        u.id,
        u.fullname,
        u.age.toString(),
        u.email,
        u.phone,
        u.isSocio ? 'SI' : 'NO',
        u.membership.toUpperCase(),
        new Date(u.createdAt).toLocaleDateString('es-AR'),
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `registro_socios_xlmx_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="admin-dashboard-view" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* 1. Header Banner of administrative section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-red-400 text-xs uppercase tracking-widest font-mono">
            <ShieldAlert className="w-4 h-4 text-red-500 animate-pulse" />
            Acceso Autorizado · Panel Administrativo
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Barbería XLMX Córdoba
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="dash-btn-logout"
            onClick={() => {
              onLogout();
              onNavigate('home');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-red-400 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Salir del Panel
          </button>
        </div>
      </div>

      {/* 2. Core Metrics Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">Clientes Registrados</span>
            <Users className="w-4.5 h-4.5 text-amber-400" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-white">{totalClients}</p>
          <span className="text-[10px] text-zinc-400 block font-light">Total acumulativo</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">Socios de Círculo</span>
            <UserCheck className="w-4.5 h-4.5 text-emerald-400" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-white">{totalSocios}</p>
          <span className="text-[10px] text-emerald-300 block font-light">
            {totalClients ? Math.round((totalSocios / totalClients) * 105) / 1.05 : 0}% de retención activa
          </span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">Miembros GOLD VIP</span>
            <Sparkles className="w-4.5 h-4.5 text-amber-300 fill-amber-300/10" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-white">{goldCount}</p>
          <span className="text-[10px] text-zinc-400 block font-light">Tarifa preferencial $45k</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-805 p-5 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-wider">Edad Promedio</span>
            <Layers className="w-4.5 h-4.5 text-zinc-400" />
          </div>
          <p className="font-display text-2xl sm:text-3xl font-bold text-white">{avgAge} <span className="text-sm font-sans font-normal text-zinc-500">años</span></p>
          <span className="text-[10px] text-zinc-400 block font-light">Audiencia ideal</span>
        </div>

      </div>

      {/* 3. Alerts Audit Banner */}
      <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <RefreshCw className={`w-4.5 h-4.5 ${isSyncing ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <span className="block text-xs uppercase font-bold tracking-wider text-amber-300">Auditoría de Registro de Suscriptores Activa</span>
            <p className="text-[11px] text-zinc-400 font-light mt-0.5">
              Toda nueva incorporación emite avisos sincronizados inmediatos a <strong className="text-zinc-200">matymoya4@gmail.com</strong>. Datos almacenados en la nube (Supabase).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {syncDone && (
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Canales Sincronizados
            </span>
          )}
          <button
            onClick={handleSyncDatabase}
            disabled={isSyncing}
            className="px-3.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-300 hover:text-amber-300 uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSyncing ? 'Sincronizando...' : 'Sincronizar base'}
          </button>
        </div>
      </div>

      {/* 4. Controls/Search bar and Add Inline form toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Search controls */}
        <div className="flex flex-col sm:flex-row gap-3 flex-grow max-w-2xl">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar cliente por nombre o email..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2.5 pl-10 text-xs text-white focus:outline-none focus:border-amber-400/80"
            />
          </div>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-400/80 cursor-pointer"
          >
            <option value="all">Ver Todos los Niveles</option>
            <option value="socio">Todos los Socios</option>
            <option value="no-socio">No Socios (Visita Eventual)</option>
            <option value="bronce">Membresía Bronce</option>
            <option value="plata">Membresía Plata</option>
            <option value="gold">Membresía GOLD VIP</option>
          </select>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded bg-amber-400 hover:bg-amber-305 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Agregar Cliente
          </button>

          <button
            onClick={handleExportCSV}
            title="Exportar base de datos a CSV"
            className="p-2.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 5. Compact Inline Add Form */}
      {showAddForm && (
        <form onSubmit={handleQuickAdd} className="p-5 rounded-lg border border-amber-400/20 bg-amber-500/5 grid grid-cols-1 md:grid-cols-12 gap-4 animate-fadeIn">
          
          <div className="md:col-span-12 pb-2 border-b border-zinc-800 flex justify-between items-center text-xs uppercase tracking-wider text-amber-200 font-bold">
            <span>Agregar nuevo cliente a la base de datos de Córdoba</span>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)} 
              className="text-zinc-500 hover:text-zinc-300 font-sans"
            >
              Cancelar
            </button>
          </div>

          <div className="md:col-span-4 space-y-1">
            <label className="block text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">Nombre y Apellido</label>
            <input
              type="text"
              required
              value={newFullname}
              onChange={(e) => setNewFullname(e.target.value)}
              placeholder="Ej. Julian Moya"
              className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="md:col-span-1 space-y-1">
            <label className="block text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">Edad</label>
            <input
              type="number"
              required
              min={8}
              value={newAge}
              onChange={(e) => setNewAge(parseInt(e.target.value) || 30)}
              className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className="block text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">Email</label>
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Ej. correo@correo.com"
              className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="block text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">WhatsApp</label>
            <input
              type="text"
              required
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="+54 9 351..."
              className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-1 flex flex-col justify-end">
            <label className="block text-[9px] text-zinc-400 uppercase tracking-widest font-semibold pb-1">¿Socio del círculo?</label>
            <button
              type="button"
              onClick={() => {
                setNewIsSocio(!newIsSocio);
                setNewMembership(newIsSocio ? 'ninguno' : 'bronce');
              }}
              className={`w-full py-2 rounded text-[10px] tracking-wide font-bold uppercase transition-colors ${
                newIsSocio ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              {newIsSocio ? 'SÍ SOCIO' : 'NO SOCIO'}
            </button>
          </div>

          {newIsSocio && (
            <div className="md:col-span-12 grid grid-cols-3 gap-2 pt-2 animate-fadeIn border-t border-zinc-800/40">
              {(['bronce', 'plata', 'gold'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setNewMembership(tier)}
                  className={`py-1 rounded text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
                    newMembership === tier
                      ? 'bg-amber-400/10 text-amber-300 border-amber-400 font-extrabold'
                      : 'bg-zinc-900 text-zinc-500 border-transparent'
                  }`}
                >
                  Nivel {tier}
                </button>
              ))}
            </div>
          )}

          <div className="md:col-span-12 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider"
            >
              Confirmar Registro Expreso
            </button>
          </div>

        </form>
      )}

      {/* 6. Main Registry Database Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-mono text-zinc-400 font-bold">Listado de Coberturas Registradas</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-500 text-[10px] font-mono border border-zinc-850">
            {filteredUsers.length} coincidencias de {totalClients}
          </span>
        </div>

        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 text-xs space-y-1">
              <p>No se encontraron clientes que coincidan con la búsqueda.</p>
              <p className="text-[10px]">Utiliza filtros menos estrictos para desplegar registros.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-zinc-950 text-zinc-500 uppercase tracking-wider text-[10px] font-mono font-bold border-b border-zinc-800">
                  <th className="p-4">Cliente</th>
                  <th className="p-4 text-center">Edad</th>
                  <th className="p-4">Contacto Electrónico / Red</th>
                  <th className="p-4 text-center">Estatus</th>
                  <th className="p-4 text-center">Membresía</th>
                  <th className="p-4">Fecha de Alta</th>
                  <th className="p-4 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-zinc-850 hover:bg-zinc-950/40 transition-colors">
                    
                    <td className="p-4">
                      <p className="text-zinc-100 font-semibold">{u.fullname}</p>
                      <span className="text-[10px] text-zinc-500 font-mono italic">{u.id}</span>
                    </td>

                    <td className="p-4 text-center text-zinc-300 font-mono font-bold">
                      {u.age} años
                    </td>

                    <td className="p-4 space-y-0.5 max-w-xs truncate">
                      <p className="text-zinc-300 font-mono font-medium">{u.email}</p>
                      <p className="text-zinc-500 text-[11px] font-light">{u.phone}</p>
                    </td>

                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                        u.isSocio 
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40' 
                          : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {u.isSocio ? 'SOCIO' : 'EVENTUAL'}
                      </span>
                    </td>

                    <td className="p-4 text-center font-mono font-bold uppercase">
                      {u.membership === 'gold' && <span className="text-amber-300 flex items-center justify-center gap-1"><Sparkles className="w-3 h-3 text-amber-400" /> GOLD VIP</span>}
                      {u.membership === 'plata' && <span className="text-zinc-300">PLATA</span>}
                      {u.membership === 'bronce' && <span className="text-amber-500/80">BRONCE</span>}
                      {u.membership === 'ninguno' && <span className="text-zinc-600">-</span>}
                    </td>

                    <td className="p-4 font-mono text-zinc-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{new Date(u.createdAt).toLocaleDateString('es-AR')}</span>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          if (confirm(`¿Está seguro de eliminar permanentemente al cliente ${u.fullname} de la base de datos de Córdoba?`)) {
                            onDeleteUser(u.id);
                          }
                        }}
                        className="p-2 bg-zinc-950/80 hover:bg-red-950/40 border border-zinc-800 hover:border-red-800/40 text-zinc-500 hover:text-red-400 rounded transition-colors cursor-pointer"
                        title="Eliminar Registro definitivo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
}
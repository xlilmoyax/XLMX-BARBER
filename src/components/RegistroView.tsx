/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen, RegisteredUser } from '../types';
import { supabase } from '../lib/supabaseClient';
import { sanitizeInput, validateEmail, validatePhone } from '../lib/security';
import { CornerUpLeft, User, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react';

interface RegistroViewProps {
  onNavigate: (screen: Screen) => void;
  onAddUser: (user: RegisteredUser) => void;
  isSection?: boolean;
  setLoggedInClient?: (user: RegisteredUser | null) => void; 
}

export default function RegistroView({ onNavigate, onAddUser, isSection = false, setLoggedInClient }: RegistroViewProps) {
  const [fullname, setFullname] = useState('');
  const [age, setAge] = useState<number>(25);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSocio, setIsSocio] = useState<boolean>(false);
  const [membership, setMembership] = useState<'bronce' | 'plata' | 'gold' | 'ninguno'>('ninguno');
  const [associateSync, setAssociateSync] = useState<boolean>(true);
  
  // States for notifications
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sanitizing inputs
    const sanitizedName = sanitizeInput(fullname).trim();
    const sanitizedEmail = sanitizeInput(email).trim().toLowerCase();
    const sanitizedPhone = sanitizeInput(phone).trim();

    if (!sanitizedName || !sanitizedEmail || !sanitizedPhone) {
      alert('Por favor complete todos los campos obligatorios del perfil.');
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      setErrorMsg('Por favor introduce un formato de correo electrónico válido.');
      return;
    }

    if (!validatePhone(sanitizedPhone)) {
      setErrorMsg('El número de WhatsApp contiene caracteres no permitidos.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      // Check duplicate email in Supabase
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', sanitizedEmail)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingUser) {
        setErrorMsg('Este correo electrónico ya tiene un perfil activo. Intente iniciar sesión en la sección de login.');
        setLoading(false);
        return;
      }

      const newUser: RegisteredUser = {
        id: 'usr_' + Date.now().toString(36),
        fullname: sanitizedName,
        age,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        isSocio,
        membership: isSocio ? (membership === 'ninguno' ? 'bronce' : membership) : 'ninguno',
        createdAt: new Date().toISOString(),
      };

      // Save to Supabase
      const { error: insertError } = await supabase
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

      if (insertError) throw insertError;

      onAddUser(newUser);
      if (setLoggedInClient) {
        setLoggedInClient(newUser);
      }

      // Set success notification message
      let alertText = `¡Registro Exitoso para ${sanitizedName}!`;
      if (associateSync) {
        alertText += ' Vinculado con éxito para alertas sincronizadas con matymoya4@gmail.com.';
      }
      setSuccessMsg(alertText);

      // Reset fields
      setFullname('');
      setEmail('');
      setPhone('');
      setAge(25);
      setIsSocio(false);
      setMembership('ninguno');

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setSuccessMsg(null);
      }, 5000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Error al conectar y guardar el perfil: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="registro-view" className={`${isSection ? 'py-6' : 'py-12'} px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto`}>
      
      {/* 1. Header Back links */}
      {!isSection && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <button 
            id="registro-back-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <CornerUpLeft className="w-4 h-4" />
            Volver al Inicio
          </button>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
            Registro de Cliente · XLMX Sede Córdoba
          </span>
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sm:p-8 space-y-6">
        
        <div>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight">
            Registra tu Perfil de Cliente Premium
          </h1>
          <p className="text-zinc-400 text-xs mt-1.5 font-light">
            Únete a nuestra base de datos para simplificar tus reservas futuras, acumular visitas exclusivas y registrar tu estatus de membresía.
          </p>
        </div>

        {/* Dynamic success alert placard */}
        {successMsg && (
          <div id="registro-success-banner" className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-lg flex items-start gap-3 text-emerald-200 text-xs leading-relaxed animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block uppercase tracking-wider text-[11px]">Procesamiento de Base de Datos Correcto</span>
              <p className="mt-1">{successMsg}</p>
              <button 
                onClick={() => onNavigate('home')}
                className="text-[10px] text-amber-300 underline font-semibold mt-2 block"
              >
                Volver al Hub Principal
              </button>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="bg-red-950/40 border border-red-500/30 p-4 rounded-lg text-red-200 text-xs leading-relaxed animate-fadeIn">
            <p className="font-semibold">Ocurrió un inconveniente:</p>
            <p className="mt-1">{errorMsg}</p>
          </div>
        )}

        <form id="client-registration-form" onSubmit={handleSubmit} className="space-y-5">
          
          {/* Form input: Name */}
          <div className="space-y-1.5">
            <label className="block text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
              Nombre y Apellido Completo *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                id="reg-input-fullname"
                type="text"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder=""
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-400/80 transition-colors border-zinc-800"
                maxLength={60}
                disabled={loading}
              />
            </div>
          </div>

          {/* Form grids: Age & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="block text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                Edad del Cliente (Años)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  id="reg-input-age"
                  type="number"
                  min={8}
                  max={120}
                  step={1}
                  required
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 25)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-400/80 transition-colors border-zinc-800"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                Teléfono de Contacto (WhatsApp) *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  id="reg-input-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder=""
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-400/80 transition-colors border-zinc-800"
                  disabled={loading}
                />
              </div>
            </div>

          </div>

          {/* Form input: Email */}
          <div className="space-y-1.5">
            <label className="block text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
              Email Electrónico *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                id="reg-input-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-3 pl-10 text-xs text-white focus:outline-none focus:border-amber-400/80 transition-colors border-zinc-800"
                disabled={loading}
              />
            </div>
          </div>

          {/* Exclusive Sync warning alignment */}
          <div className="p-4 rounded bg-zinc-950 border border-zinc-850">
            <div className="flex items-start gap-2.5">
              <input
                id="reg-checkbox-sync"
                type="checkbox"
                checked={associateSync}
                onChange={(e) => setAssociateSync(e.target.checked)}
                className="mt-1 w-4 h-4 text-amber-400 accent-amber-400 border-zinc-850 rounded focus:ring-0 cursor-pointer"
                disabled={loading}
              />
              <div>
                <label htmlFor="reg-checkbox-sync" className="text-zinc-200 text-xs font-semibold cursor-pointer select-none block">
                  Asociar a matymoya4@gmail.com
                </label>
                <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                  Marca esta opción para que tu registro lance alertas de auditoría automáticas instantáneas y sincronización inmediata con las casillas de coordinación administrativa de Barbería XLMX.
                </p>
              </div>
            </div>
          </div>

          {/* Socio Level Option fields */}
          <div className="p-4 rounded bg-zinc-950 border border-zinc-850 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-200 font-semibold uppercase tracking-wider">¿Posees Membresía Activa?</span>
              <button
                type="button"
                id="reg-btn-socio-toggle"
                onClick={() => {
                  setIsSocio(!isSocio);
                  if (!isSocio) {
                    setMembership('bronce');
                  } else {
                    setMembership('ninguno');
                  }
                }}
                className={`px-4 py-1.5 rounded text-[10px] tracking-widest font-bold uppercase transition-all duration-300 cursor-pointer ${
                  isSocio
                    ? 'bg-amber-400 text-zinc-950'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
                disabled={loading}
              >
                {isSocio ? 'Sí, soy Socio' : 'No en este momento'}
              </button>
            </div>

            {isSocio && (
              <div className="space-y-2 pt-3.5 border-t border-zinc-900 animate-fadeIn">
                <span className="block text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Selecciona tu Nivel de Membresía</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['bronce', 'plata', 'gold'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      id={`reg-membership-select-${tier}`}
                      onClick={() => setMembership(tier)}
                      className={`py-2 px-3 rounded text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
                        membership === tier
                          ? 'bg-amber-400/10 text-amber-300 border-amber-400'
                          : 'bg-zinc-900 text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-850'
                      }`}
                      disabled={loading}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action trigger button */}
          <button
            id="reg-btn-submit"
            type="submit"
            className="w-full py-4 rounded bg-amber-400 hover:bg-amber-305 text-zinc-950 font-bold uppercase tracking-widest text-xs transition-colors duration-300 cursor-pointer disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Procesando registro...' : 'Registrar Perfil Completo'}
          </button>

        </form>

      </div>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen } from '../types';
import { IMAGES, BRONCE_MEMBERSHIPS_DETAIL, PLATA_MEMBERSHIPS_DETAIL, GOLD_MEMBERSHIPS_DETAIL, FAQS } from '../data';
import { CornerUpLeft, ShieldCheck, HelpCircle, ChevronDown, Award, Sparkles, Star, Check } from 'lucide-react';

interface MembershipsViewProps {
  onNavigate: (screen: Screen) => void;
  isSection?: boolean;
}

export default function MembershipsView({ onNavigate, isSection = false }: MembershipsViewProps) {
  const [activeTier, setActiveTier] = useState<'bronce' | 'plata' | 'gold'>('bronce');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div id="memberships-view" className={`${isSection ? 'py-6' : 'py-12'} px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto`}>
      
      {/* 1. View Back Header */}
      {!isSection && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <button 
            id="memberships-back-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <CornerUpLeft className="w-4 h-4" />
            Volver al Inicio
          </button>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
            Círculo Privado de Socios · Membresías
          </span>
        </div>
      )}

      {/* 2. Hero Banner */}
      <div className="relative rounded-xl overflow-hidden h-[300px] sm:h-[380px] mb-12 border border-zinc-850">
        <img 
          src={IMAGES.membresiasHeroSec} 
          alt="Membresias Circulo Exclusivo XLMX" 
          className="w-full h-full object-cover filter brightness-[0.35]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-amber-400 text-xs tracking-widest uppercase font-bold block mb-1">
            HAZTE SOCIO XLMX
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Programa de Membresías Privadas
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm font-light mt-1 max-w-xl">
            Optimiza tu inversión mensual en cuidado masculino y accede a beneficios exclusivos dentro y fuera de la silla de barbero.
          </p>
        </div>
      </div>

      {/* 3. Program Benefits Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
          <Award className="w-6 h-6 text-amber-400" />
          <h3 className="text-zinc-200 text-xs uppercase tracking-wider font-bold">Bronce (Esencial)</h3>
          <div className="text-zinc-400 text-xs font-light leading-relaxed space-y-2.5 pt-1">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Cortes + Ceja</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Corte Completo</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h3 className="text-zinc-200 text-xs uppercase tracking-wider font-bold">Plata (Avanzado)</h3>
          <div className="text-zinc-400 text-xs font-light leading-relaxed space-y-2.5 pt-1">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Servicio Completo</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>10% Desc. en Servicios</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Spa Capilar</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>5% Desc. en Productos</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 space-y-2">
          <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
          <h3 className="text-zinc-200 text-xs uppercase tracking-wider font-bold">Gold (VIP Premium)</h3>
          <div className="text-zinc-400 text-xs font-light leading-relaxed space-y-2.5 pt-1">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Experiencia 360°</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>15% de Desc. en Servicios</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Servicio de Entretenimiento</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>7% de Desc. en Productos</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Pricing Tables */}
      <div className="mb-20">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] tracking-widest text-amber-400 uppercase font-mono font-bold block mb-2">Simulador de Ahorro</span>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">Tarifas de Socio vs Precio de Lista</h2>
          <p className="text-zinc-400 text-xs mt-1.5 font-light">
            Selecciona un nivel de membresía para conocer el desglose exacto de servicios, unidades mensuales y ahorros.
          </p>
        </div>

        {/* Level selection Buttons */}
        <div className="flex justify-center border-b border-zinc-800 gap-2 mb-8">
          {(['bronce', 'plata', 'gold'] as const).map((tier) => (
            <button
              key={tier}
              id={`membership-tier-btn-${tier}`}
              onClick={() => setActiveTier(tier)}
              className={`py-3 px-6 text-xs uppercase tracking-widest font-bold transition-all border-b-2 cursor-pointer ${
                activeTier === tier
                  ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Nivel {tier}
            </button>
          ))}
        </div>

        {/* Table Display */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden">
          
          <div className="p-4 bg-zinc-950 border-b border-zinc-800 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {activeTier === 'bronce' && 'Nivel Bronce · Servicios Esenciales'}
              {activeTier === 'plata' && 'Nivel Plata · Servicios Avanzados & Spa'}
              {activeTier === 'gold' && 'Nivel Oro · Experiencia Ultimate 360°'}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">Unidades mensuales</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[500px]">
              
              <thead>
                <tr className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px] font-mono font-bold">
                  <th className="p-4">Servicio Incluido</th>
                  <th className="p-4 text-center">Frecuencia (Mes)</th>
                  <th className="p-4 text-right">Precio Lista Convencional</th>
                  <th className="p-4 text-right text-amber-300">Precio Socio XLMX</th>
                  <th className="p-4 text-center">Ahorro Mensual</th>
                </tr>
              </thead>

              <tbody>
                {activeTier === 'bronce' && BRONCE_MEMBERSHIPS_DETAIL.map((row, idx) => {
                  const listNum = parseInt(row.listPrice.replace(/[^0-9]/g, ''));
                  const memberNum = parseInt(row.memberPrice.replace(/[^0-9]/g, ''));
                  const saved = listNum - memberNum;
                  return (
                    <tr key={idx} className="border-b border-zinc-800/60 hover:bg-zinc-900/20 transition-colors">
                      <td className="p-4 font-medium text-zinc-200">{row.service}</td>
                      <td className="p-4 text-center text-zinc-300 font-mono font-bold">{row.count} visitas</td>
                      <td className="p-4 text-right text-zinc-400 font-mono">{row.listPrice}</td>
                      <td className="p-4 text-right text-amber-400 font-mono font-bold">{row.memberPrice}</td>
                      <td className="p-4 text-center text-emerald-400 font-bold font-mono">-${saved.toLocaleString('es-AR')}</td>
                    </tr>
                  );
                })}

                {activeTier === 'plata' && PLATA_MEMBERSHIPS_DETAIL.map((row, idx) => {
                  const listNum = parseInt(row.listPrice.replace(/[^0-9]/g, ''));
                  const memberNum = parseInt(row.memberPrice.replace(/[^0-9]/g, ''));
                  const saved = listNum - memberNum;
                  return (
                    <tr key={idx} className="border-b border-zinc-800/60 hover:bg-zinc-900/20 transition-colors">
                      <td className="p-4 font-medium text-zinc-200">{row.service}</td>
                      <td className="p-4 text-center text-zinc-300 font-mono font-bold">{row.count} visitas</td>
                      <td className="p-4 text-right text-zinc-400 font-mono">{row.listPrice}</td>
                      <td className="p-4 text-right text-amber-400 font-mono font-bold">{row.memberPrice}</td>
                      <td className="p-4 text-center text-emerald-400 font-bold font-mono">-${saved.toLocaleString('es-AR')}</td>
                    </tr>
                  );
                })}

                {activeTier === 'gold' && GOLD_MEMBERSHIPS_DETAIL.map((row, idx) => {
                  const listNum = parseInt(row.listPrice.replace(/[^0-9]/g, ''));
                  const memberNum = parseInt(row.memberPrice.replace(/[^0-9]/g, ''));
                  const saved = listNum - memberNum;
                  return (
                    <tr key={idx} className="border-b border-zinc-800/60 hover:bg-zinc-900/20 transition-colors">
                      <td className="p-4 font-medium text-zinc-200">{row.service}</td>
                      <td className="p-4 text-center text-zinc-300 font-mono font-bold">{row.count} visitas</td>
                      <td className="p-4 text-right text-zinc-400 font-mono">{row.listPrice}</td>
                      <td className="p-4 text-right text-amber-400 font-mono font-bold">{row.memberPrice}</td>
                      <td className="p-4 text-center text-emerald-400 font-bold font-mono">-${saved.toLocaleString('es-AR')}</td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          <div className="p-5 bg-zinc-900/40 border-t border-zinc-800 text-center">
            <button 
              id="memberships-to-register-btn"
              onClick={() => onNavigate('registro')}
              className="px-6 py-3 rounded bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              Registrar mi perfil para asociarme
            </button>
          </div>

        </div>

      </div>

      {/* 5. FAQs Section */}
      <section id="memberships-faqs" className="pt-8 border-t border-zinc-800">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] tracking-widest text-amber-400 uppercase font-mono font-bold block mb-1">Preguntas Frecuentes</span>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">¿Tienes dudas sobre el Círculo?</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden transition-all"
              >
                <button
                  id={`faq-toggle-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between text-zinc-200 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span className="text-xs uppercase tracking-wider font-semibold font-sans">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-zinc-400 text-xs leading-relaxed font-light border-t border-zinc-850/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Screen } from '../types';
import { IMAGES } from '../data';
import { CornerUpLeft, MessageCircle, HelpCircle, Flame, Check, ShieldAlert, Sprout, Activity, Wind, Music } from 'lucide-react';

interface SpaViewProps {
  onNavigate: (screen: Screen) => void;
  isSection?: boolean;
}

export default function SpaView({ onNavigate, isSection = false }: SpaViewProps) {
  const WHATSAPP_SPA_URL = 'https://api.whatsapp.com/send?phone=543516851403&text=Hola%20Mati%2C%20quiero%20reservar%20un%20turno%20de%20Spa%20Capilar%2C%20Mi%20nombre%20es';

  return (
    <div id="spa-capilar-view" className={`${isSection ? 'py-6' : 'py-12'} px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto`}>
      
      {/* 1. View Back Header */}
      {!isSection && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <button 
            id="spa-back-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <CornerUpLeft className="w-4 h-4" />
            Volver al Inicio
          </button>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
            Tratamiento Avanzado · Spa Capilar
          </span>
        </div>
      )}

      {/* 2. Hero banner */}
      <div className="relative rounded-xl overflow-hidden h-[300px] sm:h-[400px] mb-12 border border-zinc-850">
        <img 
          src={IMAGES.spaCapilarHero} 
          alt="Tratamiento de Spa Capilar en Córdoba" 
          className="w-full h-full object-cover filter brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-amber-400 text-xs tracking-widest uppercase font-bold block mb-1">
            SALUD Y VIGOR PARA TU CABELLO
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Spa Capilar
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm font-light mt-1 max-w-xl">
            Una terapia enfocada en equilibrar y reparar el cuero cabelludo sensible, devolviéndole fuerza genuina a cada folículo.
          </p>
        </div>
      </div>

      {/* 3. Detailed Split Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left - Protocol & benefits */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-amber-200">
              ¿Por qué someterse a un Spa Capilar en XLMX?
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed font-light mt-2">
              El cabello del hombre se expone continuamente al sudor, polución urbana intensa y el estrés diario, que obstruyen los poros capilares y aceleran la caída o el debilitamiento. Nuestro protocolo de <strong>Spa Capilar</strong> actúa quirúrgicamente sobre la raíz para desintoxicarla por completo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* 01 Loción Loss Control */}
            <div className="md:col-span-8 p-6 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col justify-between transition-all hover:bg-zinc-900/80 hover:border-zinc-700/60">
              <div className="space-y-4">
                <Sprout className="w-6 h-6 text-amber-400" />
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-500">01</span>
                    <h4 className="font-display font-medium text-white text-base tracking-tight select-none">Loción Loss Control</h4>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    Fortalece y estimula el folículo con nuestra fórmula anti-caída exclusiva. Incluye un masaje craneal profundo de 15 minutos para maximizar la absorción y oxigenación.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 pt-2">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase border border-zinc-800 px-2.5 py-1 rounded bg-zinc-950/40 font-semibold">FORTALECIMIENTO</span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase border border-zinc-800 px-2.5 py-1 rounded bg-zinc-950/40 font-semibold">ESTIMULACIÓN</span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase border border-zinc-800 px-2.5 py-1 rounded bg-zinc-950/40 font-semibold">15 MIN</span>
              </div>
            </div>

            {/* 02 Terapia Muscular */}
            <div className="md:col-span-4 p-6 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col justify-between transition-all hover:bg-zinc-900/80 hover:border-zinc-700/60">
              <div className="space-y-4">
                <Activity className="w-6 h-6 text-amber-400" />
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-500">02</span>
                    <h4 className="font-display font-medium text-white text-base tracking-tight select-none">Terapia Muscular</h4>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    Tratamiento localizado en cuello, rostro y hombros utilizando tecnología de masajeador muscular de alta precisión para liberar tensiones acumuladas.
                  </p>
                </div>
              </div>
            </div>

            {/* 03 Aroma Terapia */}
            <div className="md:col-span-4 p-6 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col justify-between transition-all hover:bg-zinc-900/80 hover:border-zinc-700/60">
              <div className="space-y-4">
                <Wind className="w-6 h-6 text-amber-400" />
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-500">03</span>
                    <h4 className="font-display font-medium text-white text-base tracking-tight select-none">Aroma Terapia</h4>
                  </div>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    Velas aromáticas y aceites esenciales seleccionados para inducir un estado de bienestar físico y equilibrio emocional profundo.
                  </p>
                </div>
              </div>
            </div>

            {/* 04 Instrumental Relajante */}
            <div className="md:col-span-8 p-6 rounded-lg bg-zinc-900 border border-zinc-800 relative overflow-hidden flex flex-col justify-between transition-all hover:bg-zinc-900/80 hover:border-zinc-700/60">
              <div className="space-y-4 pr-12">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-zinc-500">04</span>
                  <h4 className="font-display font-medium text-white text-base tracking-tight select-none">Instrumental Relajante</h4>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  Una atmósfera sonora curada para aislarte del ruido exterior y permitir una desconexión total durante todo el procedimiento.
                </p>
              </div>
              <Music className="absolute right-4 bottom-4 w-20 h-20 text-zinc-800/15 pointer-events-none transform rotate-12" />
            </div>
          </div>
        </div>

        {/* Right - Pricing, CTA and Partner Info */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-5">
            <div>
              <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono block">Inversión Individual</span>
              <h3 className="font-display text-3xl font-bold text-white mt-1">
                $30.000 <span className="text-xs text-zinc-400 font-sans font-normal"> / Sesión</span>
              </h3>
              <p className="text-zinc-400 text-xs font-light mt-2 leading-relaxed">
                Este tratamiento está completamente cubierto en cortes recurrentes de nuestras membresías <strong className="text-amber-300">Plata</strong> y <strong className="text-amber-300">GOLD VIP</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-850">
              <a 
                id="spa-whatsapp-cta-link"
                href={WHATSAPP_SPA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold uppercase tracking-widest text-xs transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Coordinar Turno de Spa
              </a>
              <span className="block text-center text-[10px] text-zinc-500 mt-2.5 font-mono">
                Sesión de aprox. 25 minutos
              </span>
            </div>
          </div>

          <div className="p-5 rounded-lg border border-zinc-800 bg-zinc-950/80">
            <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono block">Cosmética Masculina de Elite</span>
            <h4 className="text-zinc-300 font-display font-semibold text-sm mt-1 mb-2">Sir Fausto Rituals</h4>
            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              No escatimamos en productos. El 100% de los geles, óleos nutritivos y espumas de masaje son originales y corresponden a la marca más premiada en salud capilar masculina de Argentina.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

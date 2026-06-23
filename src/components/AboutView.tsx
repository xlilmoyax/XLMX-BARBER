/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Screen } from '../types';
import { IMAGES } from '../data';
import { Scissors, CornerUpLeft, MessageCircle, Heart, Star, Sparkles, Building } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (screen: Screen) => void;
  isSection?: boolean;
}

export default function AboutView({ onNavigate, isSection = false }: AboutViewProps) {
  // WhatsApp redirect for booking at XLMX
  const WHATSAPP_BOOKING_URL = 'https://api.whatsapp.com/send?phone=543516851403&text=Hola%20Mati%2C%20quiero%20reservar%20un%20turno%2C%20Mi%20nombre%20es';

  return (
    <div id="about-tradicion-view" className={`${isSection ? 'py-6' : 'py-12'} px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto`}>
      
      {/* 1. View Back Navigation header */}
      {!isSection && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <button 
            id="about-back-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <CornerUpLeft className="w-4 h-4" />
            Volver al Inicio
          </button>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
            Nuestra Tradición · XLMX
          </span>
        </div>
      )}

      {/* 2. Main Hero Story banner */}
      <div className="relative rounded-xl overflow-hidden h-[320px] sm:h-[400px] mb-12 border border-zinc-850 group">
        <img 
          src={IMAGES.sobreNosotrosHero} 
          alt="XLMX Barber Salon" 
          className="w-full h-full object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-700" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-amber-400 text-xs tracking-widest uppercase font-bold block mb-1">
            MÁS QUE UN CORTE DE CABELLO
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Tradición y Excelencia en Barbería Tradicional
          </h1>
        </div>
      </div>

      {/* 3. Detailed Text & Philosophy split container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        
        {/* Left column (Core text) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-display text-2xl font-bold text-amber-200">
            Forjando un Espacio Sagrado para el Cuidado Masculino
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed font-light">
            En <strong>Barbería XLMX</strong>, concebimos cada atención no solo como un corte fortuito, sino como un eslabón clave en la optimización estética y cuidado personal de tu imagen. Nos esforzamos diariamente para que encuentres más que una barbería: una auténtica comunidad exclusiva donde la cortesía clásica converge armónicamente con las vanguardias contemporáneas.
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed font-light">
            Nuestra sede única de Villa Allende Parque en la Ciudad de Córdoba está estructurada especialmente para propiciar frescura, distensión y satisfacción total. Nos enorgullecemos de resguardar técnicas finas del oficio barbero clásico: desde afeitados tradicionales a navaja abierta con toallas calientes y masajes faciales, hasta modelados meticulosos amoldados a tus rasgos específicos.
          </p>
          
          <div className="p-5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-3.5">
            <h3 className="font-display text-zinc-200 text-base font-semibold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="text-amber-400 w-4.5 h-4.5" />
              Nuestros Aliados Cosméticos Exclusivos
            </h3>
            <ul className="space-y-2 text-zinc-400 text-xs leading-relaxed font-light">
              <li>
                <strong className="text-zinc-200">SIR FAUSTO:</strong> Cosmética Masculina de Alto Nivel enfocada en el fortalecimiento y estimulación profunda del folículo, la hebra capilar y la barba.
              </li>
              <li>
                <strong className="text-zinc-200">IDRAET:</strong> Formulaciones dermoestéticas profesionales y dermatocosméticas de vanguardia para sanar, exfoliar y humectar en profundidad la piel del rostro masculino.
              </li>
            </ul>
          </div>
        </div>

        {/* Right column (Values card and details) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-6">
            <h3 className="font-display text-lg text-white font-bold tracking-tight pb-3 border-b border-zinc-850">
              Nuestros Compromisos
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="p-2 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0 h-9 w-9 flex items-center justify-center">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <h4 className="text-zinc-200 text-xs font-semibold uppercase tracking-wider">Artesanía de Firma</h4>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed mt-1">
                    Cada trazo y delineado es examinado con precisión. Sin prisas, priorizando el acabado y el dinamismo natural de tu look.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0 h-9 w-9 flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-zinc-200 text-xs font-semibold uppercase tracking-wider">Lounge Comunitario</h4>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed mt-1">
                    Cafetería de autor, bar de tragos, juegos PlayStation 3 y áreas de descanso pensadas para prolongar tu experiencia más allá de la silla barbera.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0 h-9 w-9 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-zinc-200 text-xs font-semibold uppercase tracking-wider">Higiene & Bioseguridad</h4>
                  <p className="text-zinc-400 text-xs font-light leading-relaxed mt-1">
                    Protocolo higiénico riguroso con esterilización constante de navajas, peines y herramientas de trabajo antes de cada servicio.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-850">
              <a 
                href={WHATSAPP_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold uppercase tracking-wider text-xs transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Consultar Turnos Disponibles
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

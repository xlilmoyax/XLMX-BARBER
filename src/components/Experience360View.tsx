/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Screen } from '../types';
import { IMAGES } from '../data';
import { CornerUpLeft, Compass, MessageSquare, Sparkles, CupSoda, ShoppingBag, Music, Scissors, Clock, Leaf, Gamepad2 } from 'lucide-react';

interface Experience360ViewProps {
  onNavigate: (screen: Screen) => void;
  isSection?: boolean;
}

export default function Experience360View({ onNavigate, isSection = false }: Experience360ViewProps) {
  const WHATSAPP_360_URL = 'https://api.whatsapp.com/send?phone=543516851403&text=Hola%20Mati%2C%20quiero%20reservar%20un%20turno%20de%20la%20Experiencia%20360%2C%20Mi%20nombre%20es';

  const ritualPhases = [
    {
      title: 'Corte de Autor & Estilismo',
      desc: 'Un estudio morfológico profundo seguido de una ejecución técnica impecable. Incluye un servicio especializado y asesoramiento de imagen para mantener el estilo.',
      duration: 'DURACIÓN: 60 MIN',
      type: 'cuts',
    },
    {
      title: 'Spa Capilar',
      desc: 'Tratamiento revitalizante con aceites esenciales y masaje craneal para desintoxicar el cuero cabelludo.',
      type: 'spa',
    },
    {
      title: 'Facial Profundo',
      desc: 'Exfoliación y mascarilla hidratante. Un renacer para su piel.',
      type: 'facial',
    },
    {
      title: 'Atención VIP',
      desc: 'Servicios de entretenimiento mediante Plataformas vía streaming o PlayStation.',
      type: 'vip',
    },
  ];

  return (
    <div id="experience-360-view" className={`${isSection ? 'py-6' : 'py-12'} px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto`}>
      
      {/* 1. Navigation Header */}
      {!isSection && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <button 
            id="experience360-back-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <CornerUpLeft className="w-4 h-4" />
            Volver al Inicio
          </button>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
            RITUAL SIGNATURE · EXPERIENCIA 360°
          </span>
        </div>
      )}

      {/* 2. Experience Hero Design */}
      <div className="relative rounded-xl overflow-hidden h-[300px] sm:h-[420px] mb-12 border border-zinc-850">
        <img 
          src={IMAGES.experiencia360Hero} 
          alt="Experiencia 360" 
          className="w-full h-full object-cover filter brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-amber-400 text-xs tracking-widest uppercase font-bold block mb-1">
            NUESTRO RITUAL EMBLEMÁTICO
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Experiencia 360°
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm font-light mt-1 max-w-xl">
            La máxima expresión de Barbería XLMX: un verdadero templo de relajación y optimización fisonómica para hombres exigentes.
          </p>
        </div>
      </div>

      {/* 3. Deep Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left column - Phases breakdown */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-amber-200">
              Un Recorrido Cronológico de Cuidado y Placer
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed font-light mt-3">
              La <strong>Experiencia 360°</strong> no es un simple corte rápido de turnos industrializados; es un servicio extendido de aproximadamente una hora concebido meticulosamente para resincronizar tu estado físico y proyectar tu mejor versión.
            </p>
          </div>

          {/* Chronological list */}
          <div className="space-y-6">
            {ritualPhases.map((phase, idx) => {
              // Custom icon selection based on phase type
              let IconComponent = Sparkles;
              if (phase.type === 'cuts') IconComponent = Scissors;
              if (phase.type === 'spa') IconComponent = Leaf;
              if (phase.type === 'facial') IconComponent = Sparkles;
              if (phase.type === 'vip') IconComponent = Gamepad2;

              return (
                <div key={idx} className="p-5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-400/20 transition-all duration-300">
                  <h3 className="font-display text-zinc-100 text-sm font-semibold tracking-wider flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-amber-400 shrink-0" />
                    {phase.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light mt-2 pl-6">
                    {phase.desc}
                  </p>
                  {phase.duration && (
                    <div className="flex items-center gap-1.5 mt-3 pl-6 text-[10px] text-amber-400 font-mono tracking-wider font-semibold uppercase">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{phase.duration}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column - Pricing, booking & details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-6">
            <div>
              <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono block mb-1">Precio Exclusivo</span>
              <h3 className="font-display text-4xl font-bold text-white">
                $40.000 <span className="text-xs text-zinc-400 font-sans font-light">Boutique</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">
                Reservado con anticipación debido a la duración de la sesión. Disponible de forma preferencial para clientes registrados y socios VIP.
              </p>
            </div>

            {/* Micro details */}
            <div className="space-y-4 pt-4 border-t border-zinc-850">
              <div className="flex items-center gap-3">
                <CupSoda className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="block text-xs text-zinc-200 font-semibold uppercase tracking-wider">Degustación Premium</span>
                  <span className="block text-[10px] text-zinc-400">Cafetería express, infusiones selectas o trago de cortesía.</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="block text-xs text-zinc-200 font-semibold uppercase tracking-wider">Lounge con PS3</span>
                  <span className="block text-[10px] text-zinc-400">Pantallas individuales con juegos interactivos o streaming activo.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-850">
              <a 
                id="experience360-whatsapp-link"
                href={WHATSAPP_360_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold uppercase tracking-widest text-xs transition-colors duration-300 shadow-md shadow-amber-400/10"
              >
                <MessageSquare className="w-4 h-4 fill-zinc-950" />
                Reservar Experiencia 360°
              </a>
              <span className="block text-center text-[10px] text-zinc-500 mt-2.5 font-mono">
                Se aconseja agendar en días previos
              </span>
            </div>
          </div>

          {/* Visual detail card */}
          <div className="rounded-lg overflow-hidden border border-zinc-800 h-64 relative">
            <img 
              src={IMAGES.experiencia360Detail} 
              alt="Detalle activo de navaja y afeitado en Barbería XLMX" 
              className="w-full h-full object-cover filter brightness-[0.5]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[9px] tracking-widest text-amber-400 uppercase font-bold block">Técnica Certificada</span>
              <h4 className="text-white font-display font-bold text-sm">Navaja Clásica & Óleos Termoactivos</h4>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

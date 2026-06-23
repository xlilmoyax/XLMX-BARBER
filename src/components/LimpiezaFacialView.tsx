/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Screen } from '../types';
import { IMAGES } from '../data';
import { CornerUpLeft, MessageSquare, Clipboard, Sparkles, CheckSquare } from 'lucide-react';

interface LimpiezaFacialViewProps {
  onNavigate: (screen: Screen) => void;
  isSection?: boolean;
}

export default function LimpiezaFacialView({ onNavigate, isSection = false }: LimpiezaFacialViewProps) {
  const WHATSAPP_FACIAL_URL = 'https://api.whatsapp.com/send?phone=543516851403&text=Hola%20Mati%2C%20quiero%20reservar%20un%20turno%20de%20Limpieza%20Facial%20Especializada%2C%20Mi%20nombre%20es';
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: 'Paso 01: Agua Micelar Purificante',
      time: '05 Min',
      image: IMAGES.micellarWater,
      bullet: 'Higiene Profunda Idraet',
      desc: 'Remoción instantánea de partículas microscópicas de polución, polvo y restos de sebo acumulados en los poros superficiales del cutis, equilibrando el tono térmico natural de la piel.',
    },
    {
      title: 'Paso 02: Gel Exfoliante Renovador',
      time: '08 Min',
      image: IMAGES.exfoliatingGel,
      bullet: 'Remoción de Células Muertas',
      desc: 'Masaje circular dermo-activo que elimina micro-escamas muertas, combate puntos negros recalcitrantes y estimula la regeneración epidérmica celular de las capas expuestas al sol cordobés.',
    },
    {
      title: 'Paso 03: Mascarilla de Arcilla Purificante',
      time: '12 Min',
      image: IMAGES.maskFace,
      bullet: 'Adsorción Profunda & Detox',
      desc: 'Aplicación de mascarilla de arcilla mineral dermo-activa. Atrapa toxinas residuales en los folículos pilosos, reequilibrando el pH de la piel, encogiendo poros dilatados e hidratando intensamente.',
    },
  ];

  return (
    <div id="limpieza-facial-view" className={`${isSection ? 'py-6' : 'py-12'} px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto`}>
      
      {/* 1. Back Navigation Header */}
      {!isSection && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <button 
            id="facial-back-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <CornerUpLeft className="w-4 h-4" />
            Volver al Inicio
          </button>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
            Protocolo Dermoestético · Limpieza Facial
          </span>
        </div>
      )}

      {/* 2. Facial View Hero Banner */}
      <div className="relative rounded-xl overflow-hidden h-[300px] sm:h-[400px] mb-12 border border-zinc-850">
        <img 
          src={IMAGES.limpiezaFacialHero} 
          alt="Limpieza facial especializada Córdoba" 
          className="w-full h-full object-cover filter brightness-[0.3]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-amber-400 text-xs tracking-widest uppercase font-bold block mb-1">
            PURIFICACIÓN Y REJUVENECIMIENTO CUTÁNEО
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Limpieza Facial Especializada IDRAET
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm font-light mt-1 max-w-xl">
            Protocolo dermoestético intensivo en 3 pasos diseñado específicamente para resguardar y tonificar la dermis masculina.
          </p>
        </div>
      </div>

      {/* 3. Three Steps Interactive Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left Interactive Side */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-amber-200">
              Protocolo Científico de Renovación Celular
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm font-light mt-2 leading-relaxed">
              La piel del rostro del hombre posee mayor densidad y glándulas sebáceas más activas, requiriendo un tratamiento dermocosmético focalizado para mantener una apariencia limpia y saludable. Consulta los tres pasos de nuestro ritual:
            </p>
          </div>

          {/* Steps Horizontal Tabs */}
          <div className="flex border-b border-zinc-800 gap-1.5 overflow-x-auto pb-1.5">
            {steps.map((step, idx) => (
              <button
                key={idx}
                id={`facial-step-tab-${idx}`}
                onClick={() => setActiveStep(idx)}
                className={`py-2.5 px-4 rounded text-xs uppercase tracking-wide font-semibold text-nowrap cursor-pointer transition-colors ${
                  activeStep === idx
                    ? 'bg-amber-400 text-zinc-950'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Paso 0{idx + 1}
              </button>
            ))}
          </div>

          {/* Active Step Panel */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 rounded-lg bg-zinc-900/60 border border-zinc-800/80 items-center">
            
            <div className="md:col-span-5 h-56 rounded overflow-hidden border border-zinc-800 relative bg-zinc-950">
              <img 
                src={steps[activeStep].image} 
                alt={steps[activeStep].title} 
                className="w-full h-full object-cover filter brightness-[0.8] hover:scale-105 duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-zinc-950/80 text-amber-300 text-[10px] font-mono">
                {steps[activeStep].time}
              </span>
            </div>

            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] tracking-widest text-amber-400 uppercase font-mono font-bold block">
                {steps[activeStep].bullet}
              </span>
              <h3 className="font-display text-lg font-bold text-white">
                {steps[activeStep].title}
              </h3>
              <p className="text-zinc-300 text-xs leading-relaxed font-light">
                {steps[activeStep].desc}
              </p>
              
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Resultados inmediatos desde la primera aplicación.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-4">
            <div>
              <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono block">Tarifa Tratamiento</span>
              <h3 className="font-display text-3xl font-bold text-white mt-1">
                $20.000 <span className="text-xs text-zinc-400 font-sans font-light"> / Completo</span>
              </h3>
              <p className="text-zinc-400 text-xs font-light mt-1.5 leading-relaxed">
                Utilizamos exclusivamente la línea profesional dermoestética certificada <strong className="text-zinc-200">IDRAET</strong>, idónea para pieles sensibles y propensas a la irritación post-afeitado.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-850">
              <a 
                id="facial-whatsapp-cta-link"
                href={WHATSAPP_FACIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold uppercase tracking-widest text-xs transition-colors duration-300"
              >
                <MessageSquare className="w-4 h-4 fill-zinc-950" />
                Agendar Limpieza Facial
              </a>
              <span className="block text-center text-[10px] text-zinc-500 mt-2.5 font-mono">
                Piel limpia, revitalizada y luminosa
              </span>
            </div>
          </div>

          {/* Dermoestetic results placeholder */}
          <div className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 relative h-48">
            <img 
              src={IMAGES.faceResults} 
              alt="Resultados Idraet en Barbería XLMX" 
              className="w-full h-full object-cover filter brightness-[0.6]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-[9px] tracking-widest text-amber-400 uppercase font-mono font-bold block">Eficacia dermoestética</span>
              <p className="text-white font-display text-xs font-semibold">Tono homogéneo y frescura celular profunda</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

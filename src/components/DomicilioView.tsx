/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Screen } from '../types';
import { IMAGES } from '../data';
import { MessageSquare, CornerUpLeft, MapPin, Truck, Shield, CalendarDays } from 'lucide-react';

interface DomicilioViewProps {
  onNavigate: (screen: Screen) => void;
  isSection?: boolean;
}

export default function DomicilioView({ onNavigate, isSection = false }: DomicilioViewProps) {
  // Exact Whatsapp booking URL for home services
  const WHATSAPP_DOMICILIO_URL = 'https://api.whatsapp.com/send?phone=543516851403&text=Hola%20Mati%2C%20quiero%20reservar%20un%20turno%20a%20domicilio%2C%20Mi%20nombre%20es';

  return (
    <div id="domicilio-view" className={`${isSection ? 'py-6' : 'py-12'} px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto`}>
      
      {/* 1. View Back Header */}
      {!isSection && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
          <button 
            id="domicilio-back-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <CornerUpLeft className="w-4 h-4" />
            Volver al Inicio
          </button>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
            Servicios Premium a Domicilio · XLMX
          </span>
        </div>
      )}

      {/* 2. Main Hero Panel */}
      <div className="relative rounded-xl overflow-hidden h-[300px] sm:h-[400px] mb-12 border border-zinc-855">
        <img 
          src={IMAGES.servicioDomicilioHero} 
          alt="Servicio a Domicilio XLMX" 
          className="w-full h-full object-cover filter brightness-[0.35]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="text-amber-400 text-xs tracking-widest uppercase font-bold block mb-1">
            ESTILO DIRECTO EN TU ESPACIO
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Servicio a Domicilio de Autor
          </h1>
          <p className="text-zinc-300 text-xs sm:text-sm font-light mt-1 max-w-xl">
            Llevamos el rigor, profesionalismo y confort boutique de Barbería XLMX directo a tu intimidad en Córdoba.
          </p>
        </div>
      </div>

      {/* 3. Detail grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left Column - Core Info */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-amber-200">
              La Comodidad del Cuidado Profesional Sin Traslados
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              Entendemos que el activo más valioso es tu tiempo. Con nuestro esquema de <strong>Servicio S.C. (A Domicilio)</strong>, obtienes el mismo nivel absoluto de optimización de imagen, con asesoría fisonómica detallada, corte de autor de alta definición, arreglo de barba y delineado de cejas, sin lidiar con el tráfico de Córdoba o esperas de turnos presenciales comunes.
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed font-light">
              Desplegamos una estación de barbero totalmente descontaminada y esterilizada, utilizando herramientas de primera línea y capas de un solo uso para garantizar una higiene intachable en tu hogar u oficina.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center text-center">
              <Truck className="w-5 h-5 text-amber-400 mb-2" />
              <span className="text-xs text-zinc-100 font-semibold uppercase tracking-wider block">Logística Ágil</span>
              <span className="text-[10px] text-zinc-500 mt-1">Con equipaje profesional compacto</span>
            </div>
            
            <div className="p-4 rounded bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center text-center">
              <MapPin className="w-5 h-5 text-amber-400 mb-2" />
              <span className="text-xs text-zinc-100 font-semibold uppercase tracking-wider block">Gran Cobertura</span>
              <span className="text-[10px] text-zinc-500 mt-1">Córdoba Capital y zonas aledañas</span>
            </div>

            <div className="p-4 rounded bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center text-center">
              <Shield className="w-5 h-5 text-amber-400 mb-2" />
              <span className="text-xs text-zinc-100 font-semibold uppercase tracking-wider block">Bioseguridad</span>
              <span className="text-[10px] text-zinc-500 mt-1">Herramientas 100% esterilizadas</span>
            </div>
          </div>

          {/* Atmospheric Slideshow Gallery (3 Photos) */}
          <div className="space-y-3">
            <span className="block text-xs uppercase tracking-widest text-zinc-500 font-mono font-bold">Atmósfera de Trabajo a Domicilio:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="h-44 rounded-lg overflow-hidden border border-zinc-800">
                <img src={IMAGES.domicilioAtmos1} alt="Equipamiento" className="w-full h-full object-cover filter brightness-[0.7] hover:scale-105 duration-300" referrerPolicy="no-referrer" />
              </div>
              <div className="h-44 rounded-lg overflow-hidden border border-zinc-800">
                <img src={IMAGES.domicilioAtmos2} alt="Atencion" className="w-full h-full object-cover filter brightness-[0.7] hover:scale-105 duration-300" referrerPolicy="no-referrer" />
              </div>
              <div className="h-44 rounded-lg overflow-hidden border border-zinc-800">
                <img src={IMAGES.domicilioAtmos3} alt="Detalle corte" className="w-full h-full object-cover filter brightness-[0.7] hover:scale-105 duration-300" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Actions & Pricing */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-6 space-y-6">
            <div>
              <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono block mb-1">Tarifa Sugerida</span>
              <h3 className="font-display text-4xl font-bold text-white">
                $26.000 <span className="text-sm text-zinc-400 font-sans font-light">Completo (S.C.)</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">
                Tarifa base plana aplicable en el radio urbano convencional de Córdoba Capital y Villa Allende Parque. Coberturas extendidas sujetas a leves ajustes por desplazamiento coordinado en WhatsApp.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-850 space-y-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="block text-xs text-zinc-200 font-semibold uppercase tracking-wider">Disponibilidad Flexible</span>
                  <span className="block text-[11px] text-zinc-400">Coordinación de acuerdo a tu agenda por la mañana o inicios de tarde.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-850">
              <a 
                id="domicilio-whatsapp-cta-link"
                href={WHATSAPP_DOMICILIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold uppercase tracking-widest text-xs transition-colors duration-300 shadow-md shadow-amber-400/10"
              >
                <MessageSquare className="w-4 h-4 fill-zinc-950" />
                Coordinar Turno Domicilio
              </a>
              <span className="block text-center text-[10px] text-zinc-500 mt-3 font-mono">
                Número verificado: +54 9 351 685-1403
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-amber-400/10 bg-amber-500/5 p-5 text-center">
            <span className="text-xs text-amber-300 font-bold block mb-1 uppercase tracking-wider">¿Eres Cliente Frecuente o Socio?</span>
            <p className="text-zinc-400 text-xs font-light leading-relaxed">
              Muchos de nuestros socios de la membresía <strong className="text-amber-200">Gold VIP</strong> u otros niveles optan por transferir sus atenciones de membresía mensual a domicilios con ventajas selectas. Consúltanos directamente.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

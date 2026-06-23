/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Screen } from '../types';
import { 
  CornerUpLeft, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  VolumeX, 
  Check, 
  CreditCard,
  UserCheck, 
  HelpCircle,
  FileText
} from 'lucide-react';

interface LegalViewProps {
  onNavigate: (screen: Screen) => void;
  isSection?: boolean;
}

export default function LegalView({ onNavigate, isSection = false }: LegalViewProps) {
  const WHATSAPP_SUPPORT_URL = 'https://api.whatsapp.com/send?phone=543516851403&text=Hola%20Mati%2C%20tengo%20una%20consulta%20con%20respecto%20a%20las%20pol%C3%ADticas%20y%20t%C3%A9rminos%20legales';

  return (
    <div id="legal-view" className={`${isSection ? 'py-6' : 'py-12'} px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-zinc-300`}>
      
      {/* 1. View Back Navigation header */}
      {!isSection && (
        <div id="legal-nav-header-bar" className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-850">
          <button 
            id="legal-back-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            <CornerUpLeft id="legal-back-icon" className="w-4 h-4" />
            Volver al Inicio
          </button>
          <span id="legal-brand" className="text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
            Documentación Legal · XLMX
          </span>
        </div>
      )}

      {/* 2. Main Premium Header Card */}
      <div id="legal-header-card" className="p-8 rounded-xl bg-zinc-900 border border-zinc-800 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <FileText className="w-48 h-48 text-zinc-400" />
        </div>
        <span id="legal-header-badge" className="text-[10px] tracking-widest text-amber-500 uppercase font-mono font-bold block mb-1">
          Documentación Oficial
        </span>
        <h1 id="legal-main-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
          Política de Privacidad y Términos de Servicio
        </h1>
        <p id="legal-intro-desc" className="font-sans text-sm text-[#d1c5b4] leading-relaxed max-w-2xl font-light">
          Bienvenido a nuestro sistema de reservas. Al agendar un turno, aceptas los siguientes términos y condiciones que regulan la prestación de nuestros servicios de barbería y estilismo.
        </p>
      </div>

      <div id="legal-sections-container" className="space-y-12">
        
        {/* Section 1 */}
        <section id="legal-section-1" className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 id="legal-section-1-title" className="font-display text-base sm:text-lg font-semibold text-zinc-100 tracking-wide uppercase">
              1. Políticas de Reserva y Horarios
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            Las reservas en Barbería XLMX están sujetas a disponibilidad y deben ser programadas con una anticipación mínima de 48 horas para garantizar el estándar de servicio que nos caracteriza.
          </p>
          <div id="legal-sch-bullets" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div id="legal-sch-bullet-1" className="p-4 rounded-lg bg-zinc-950/40 border border-zinc-850/80 flex items-start gap-3">
              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Contamos con franjas horarias distribuidas en turnos de mañana y tarde para adaptarnos a su agenda profesional.
              </p>
            </div>
            <div id="legal-sch-bullet-2" className="p-4 rounded-lg bg-zinc-950/40 border border-zinc-850/80 flex items-start gap-3">
              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Recibirá un recordatorio automatizado 24 horas antes de su cita confirmada a través de los medios de contacto proporcionados.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="legal-section-2" className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 id="legal-section-2-title" className="font-display text-base sm:text-lg font-semibold text-zinc-100 tracking-wide uppercase">
              2. Ubicación y Normas de Convivencia
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            Nuestro estudio es un espacio privado diseñado exclusivamente para la relajación y el cuidado personal del caballero. Para mantener esta atmósfera, solicitamos adherirse a las siguientes normas:
          </p>
          
          <div id="legal-grid-norms" className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div id="legal-card-space" className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
              <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">Naturaleza del Espacio</span>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Estudio Privado</span>
            </div>
            <div id="legal-card-admission" className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
              <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">Política de Admisión</span>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Reservada</span>
            </div>
            <div id="legal-card-sound" className="p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-center hover:border-zinc-700 transition-colors">
              <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">Ambiente Sonoro</span>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block flex items-center justify-center gap-1.5">
                <VolumeX className="w-3.5 h-3.5" />
                Silencio Requerido
              </span>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="legal-section-3" className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2">
            <CreditCard className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 id="legal-section-3-title" className="font-display text-base sm:text-lg font-semibold text-zinc-100 tracking-wide uppercase">
              3. Políticas de Pago y Membresías
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            La transparencia en nuestras transacciones es fundamental. El monto total del servicio se abona al concluir la sesión mediante los métodos de pago autorizados.
          </p>
          <div id="legal-billing-cards" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div id="legal-billing-member-box" className="p-5 rounded-lg bg-zinc-950/60 border border-zinc-850 leading-relaxed">
              <h4 id="legal-billing-member-heading" className="text-amber-400 text-xs font-semibold tracking-wider font-mono uppercase mb-2">
                Membresías Pagas
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                El pago de una membresía asegura un cupo o beneficio mensual, pero no garantiza la devolución del dinero si el cliente falta a un turno programado.
              </p>
            </div>
            <div id="legal-billing-absence-box" className="p-5 rounded-lg bg-zinc-950/60 border border-zinc-850 leading-relaxed">
              <h4 id="legal-billing-absence-heading" className="text-amber-400 text-xs font-semibold tracking-wider font-mono uppercase mb-2">
                Inasistencias
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                En caso de no poder asistir, el dinero no será reembolsado; en su lugar, se reprogramará la fecha para acomodar al cliente en otro día disponible, sujeto a la agenda del barbero.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="legal-section-4" className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 id="legal-section-4-title" className="font-display text-base sm:text-lg font-semibold text-zinc-100 tracking-wide uppercase">
              4. Uso de Productos Profesionales
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            Para garantizar resultados de alta calidad, en el estudio trabajamos con líneas profesionales de primera marca. Al aceptar estos términos, el cliente presta su consentimiento para la aplicación de productos de las firmas <strong className="text-zinc-200 font-semibold">Idraet</strong> y <strong className="text-zinc-200 font-semibold">Sir Fausto</strong>.
          </p>
          <div id="legal-allergy-alert" className="p-4 rounded-lg bg-red-950/10 border border-red-900/30 text-amber-400 text-xs flex gap-3 leading-relaxed items-start">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="font-light">
              <strong className="font-semibold uppercase tracking-wider block mb-0.5 font-mono text-[10px]">Importante:</strong>
              Es responsabilidad del cliente informar previamente al barbero sobre cualquier alergia, sensibilidad cutánea o condición médica preexistente.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="legal-section-5" className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2">
            <UserCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 id="legal-section-5-title" className="font-display text-base sm:text-lg font-semibold text-zinc-100 tracking-wide uppercase">
              5. Servicios Externos y Domicilio
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            La modalidad de atención a domicilio es un beneficio exclusivo para clientes frecuentes (aquellos con un historial continuo de turnos en el estudio).
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            Este servicio está sujeto a disponibilidad geográfica, horarios específicos y recargos adicionales que se coordinarán de forma privada.
          </p>
        </section>

        {/* Section 6 */}
        <section id="legal-section-6" className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-zinc-800 pb-2">
            <FileText className="w-5 h-5 text-amber-400 shrink-0" />
            <h2 id="legal-section-6-title" className="font-display text-base sm:text-lg font-semibold text-zinc-100 tracking-wide uppercase">
              6. Privacidad y Protección de Datos
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
            En cumplimiento de las normativas de protección de datos personales, te informamos cómo cuidamos tu información:
          </p>
          
          <div id="legal-priv-points" className="space-y-3 pt-2">
            <div id="legal-priv-bullet-1" className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                <strong className="text-zinc-200 font-medium">Datos Recolectados:</strong> El formulario de registro solicita datos básicos (Nombre, Teléfono, Correo Electrónico) con el único fin de gestionar tus turnos, enviar recordatorios y procesar tus pagos o membresías.
              </p>
            </div>
            <div id="legal-priv-bullet-2" className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                <strong className="text-zinc-200 font-medium">Confidencialidad:</strong> Tus datos personales son tratados de forma estrictamente confidencial. No se comparten, venden ni ceden a terceros bajo ningún concepto.
              </p>
            </div>
            <div id="legal-priv-bullet-3" className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                <strong className="text-zinc-200 font-medium">Tus Derechos:</strong> Como usuario y titular de los datos, tienes derecho a solicitar la modificación, actualización o eliminación definitiva de tus datos de nuestro sistema de registro cuando lo desees, comunicándote directamente con nosotros.
              </p>
            </div>
          </div>

          <div id="legal-data-arco-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div id="legal-records-box" className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
              <span id="legal-records-heading" className="block text-[10px] uppercase tracking-widest text-[#e9c176] font-mono mb-2">
                Registros Almacenados
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-400 font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  Nombre Completo
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  Teléfono
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-amber-500" />
                  Historial de Servicios
                </li>
              </ul>
            </div>
            <div id="legal-arco-box" className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
              <span id="legal-arco-heading" className="block text-[10px] uppercase tracking-widest text-[#e9c176] font-mono mb-2">
                Derechos ARCO
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Usted tiene derecho a acceder, rectificar o cancelar el uso de sus datos personales enviando una solicitud formal a nuestra administración.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 3. Support & Dynamic Contact Block */}
      <div id="legal-contact-block" className="mt-16 pt-8 border-t border-zinc-800 text-center space-y-4">
        <h3 id="legal-support-heading" className="font-display text-base font-semibold text-white tracking-wide uppercase">
          Consultas Adicionales
        </h3>
        <p id="legal-support-desc" className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed font-light">
          Si requiere aclaraciones adicionales sobre nuestras políticas legales, nuestro equipo de soporte está a su entera disposición.
        </p>
        <div className="pt-2">
          <a
            id="legal-contact-btn"
            href={WHATSAPP_SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider rounded transition-colors"
          >
            Contactar Soporte
          </a>
        </div>
      </div>

    </div>
  );
}

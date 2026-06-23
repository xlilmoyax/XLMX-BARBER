/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen =
  | 'home'
  | 'sobre-nosotros'
  | 'servicio-domicilio'
  | 'experiencia-360'
  | 'spa-capilar'
  | 'limpieza-facial'
  | 'membresias'
  | 'registro'
  | 'login-admin'
  | 'dashboard-admin'
  | 'legal';

export interface RegisteredUser {
  id: string;
  fullname: string;
  age: number;
  email: string;
  phone: string;
  isSocio: boolean; // Yes/No
  membership: 'bronce' | 'plata' | 'gold' | 'ninguno';
  createdAt: string;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RegisteredUser } from './types';
import sobreNosotrosHeroImg from './assets/images/regenerated_image_1781878990398.png';
import experiencia360HeroImg from './assets/images/regenerated_image_1781874165399.webp';
import regeneratedSpaImg from './assets/images/regenerated_image_1781971134303.png';
import userFacialMaskImg from './assets/images/regenerated_image_1781878935328.png';
import userCurlyHairImg from './assets/images/regenerated_image_1782233615953.jpg';
import newHeroBackgroundImg from './assets/images/regenerated_image_1782236257726.png';

// Let's keep the initial registered clients list completely empty on startup
export const INITIAL_USERS: RegisteredUser[] = [];

export const IMAGES = {
  // Screen 1: Tradición y excelencia Hero (Scissors and comb)
  sobreNosotrosHero: sobreNosotrosHeroImg,
  // XLMX black emblem logo
  logoBlack: 'https://lh3.googleusercontent.com/aida/AP1WRLtZkjxb4ocdj962Un0apK5rSe1Lgc4OPk9Cd2veMxmIBGcXGsn23qfYfzw_AIF0gbCYEYKWHYk87CKFO0CXJO2DZq4c7quhf7Y12tOg3X3N_nprHxMam6FM1VxK99EZCw_caTx3OA6OEy3gnLI1BrnMJaGlspv9CfOTJqmBQj9gOLxiTY8IODJ4eNpVo-FyVeqq6Ph9galLApCoKCoDh1p_TKaXpnbbvy9WAdvwroJaXGqrGCxKnbl14fA',
  
  // Screen 2: Servicios a domicilio Hero
  servicioDomicilioHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDORKti0A8BAOXhG4niBfHhEZ2CcWdMAze9Xz7HB9UxAdljuvA8sNMajn1MUWMjSeMYjISWr4qe7QJT3gZDgKtLuWXgKqX-tE095k6_d3orFsCKwLWR2-CfAB9KTrprbGm1XvZvyHYEqQJMeIXP-yYp64RXe_lfIuwZEC-HRKCcgjH-qKqREFps4Y-aE1pEqJcoc2nfOtfcwLell502hTeH2hv9uBwKrm1N0D3kWmn7Z5kit8wJpD_yjXX7k2OsVJIsMitmR-Yt6U0Q',
  // Domicilio atmospheric images
  domicilioAtmos1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDix0vcCFK4Z4DU84qDleZnuHCh7vqZMPxwBZQ7QxzpOQPCc61qjlfgYVXcPtamxTNO7hfY91UQxz2eSx_D3NAGkOFMBi-hl0t2ffJaEYPDFNd0oqaE59nu2bgX1kcnZIEk3ydicNlS_MTcCpqDXIJcDAWdgV-qyHrDc05aVauLzw3jP7IHL069ok8ejSdI2mb9XyUfwJhU-Ie9N5TRBr_MzkiQxfPrgZ59gNqYj3TXLAVv3Kb1FMNXrA_G1aeCH9KtvJhEj5cnELVp',
  domicilioAtmos2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9Fo1zXhzxlyGjYCeMEbW0Htf6_sz28pNKP5-IfpaoaTF99AiMuPzHlnXLDKbB8vVjGlyALBf8mq0E6kDDkY3TSazT2x0MjszCxUTMijv6hItit6LqehmexVyZkgAzTicHek4FN4Wm_3DnkqF6m5UEVMnBKLlzwAkUdkifGztH0h_-MBtDzdqSGZnnTeQmlxenbiIsV6xK4HWeeopaqW1VLLX-YmbOGLcY9szs5MD4R7W1cx8NRNrDcjvmYXlWyRVSnNByppzTaO6n',
  domicilioAtmos3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-kH5_vV96efoPn96XJrSvWdrTm8jdhpgFwauU63WXHFmZb0bJJ5PNRS4x7XFkl8ntYJniTW0fFbfXRAF0QtaDSJaXVeptJK7Uh_mmtzIdFrQdlmdLtJWkA_yBm0M7Iuy58fYuNTov5z-XJHijcaR_KWlHNHW2KktPxy0xJDhJ71DLcBlHZ27jIUSDDsN7P1RuVfnGh50bAH6yhuo-HkCvufhwZnvlw6UYMYL4yXJsCfZnuvt-ZUzRp6RyzpubXo85Dqvl3OOG9hZO',

  // Screen 3: Experiencia 360 Hero (Active barber session)
  experiencia360Hero: experiencia360HeroImg,
  // Experiencia 360 Detail Image
  experiencia360Detail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBluusbjPGP2bwqghfaCi2o88PlnULTC_e03_3EtO00LQ1cdWZ6ruNSC8UUX_1TyCf1Fm8YirnYMzJjhFkJjWvKEm_1M5N31hJhQWPI3EuxmdmBGJGgcbcHsC47fbREXLZpRQweJAWaW8g43Hkya4l-CrN6zXpkYRGEBkvh2EyNoT_7FGVxe5ZNXYGA28lc-T15IehSJ6zP7pPbKZ5YNo2noLweQzKOeL0RHWi7CNZka9fENFXIZhIhxqEHtPR6CqeCgJeGNoh-sIfS',

  // Screen 4: Spa Capilar Hero
  spaCapilarHero: regeneratedSpaImg,

  // Screen 5: Limpieza Facial Hero
  limpiezaFacialHero: userFacialMaskImg,
  // Process steps micro-photography
  micellarWater: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Plhjas910_6u1uLspIx3-WYVU0hzCpBBDkMYTZtnWQJwEz_GSS3C838L_wl5BSceLhml1Kq_CqAuw-zXhhmRKQZJXV8qpoVOJxvnnOhGQhS-L_BWeMofqjYn6iLXjJeSKVM1NYWrZ-z4wmQMOEZ1GWbECKEEbQlTsSJiAKJOWeRCXaJW1tC6qPML2ZY6Ss5ovKPlW4M-G_LfMXmEEsXASpATekSwvuHg94j0Wwr8PRQ0JDPgXF_M8BcFQluNiM5V37fFDWmJ-mNCBnw',
  exfoliatingGel: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDr4NJYfVUT9CBjCQLM2aN9yxCjHpXhgcntaScpF9oQGksmkMrZD2S8uLEcz5J7PS2wvVsZvy86c3XghxpqWm0lX4NgHIYhu-5sNNWCT_ETibU9EQ0f6HvVsq7PuxLUKMRkBsVL4AWlQ1ydm_0l-0qQcP_0UhKS3aRI2hNcybfPFLXLUDOM_rztcxrLO4-zlrPrkdi5xlJYSYNZyPHkkAzxox5sqb1KYIbxrzAPL-Vo3B-3OW2nFOVXgJgg6xYuyUrZQs-Szflg3eYsNtE',
  maskFace: userFacialMaskImg,
  faceResults: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_SQXF7-AbDGCud1HkYBbJvHHNgTQLPPOBs5T0Rbprb2VxUWwK0jtGY5a69WYz0UjrQWcovmB7gSvOyeM0xcH3YV46IKmr2w0TtSocV8tVthz79cIeezhYZW_vkMBEwj6uevKaxO92-IqCWsD1QQFGbD7BkOFaPoTlUa1oCpK7R5keR_SIHVJ19kz4q86S-IJc-NVzkI0zr75vhnENSH6HzJIbCvnMXe3t4HLOB0JSlzBIdTYnH-76Xy3Y8wDcuKuauKzFtfrkivp64M4',

  // Screen 6: Membresías Hero
  membresiasHeroSec: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOoeGKih1DvzHWJuD-EHhATaVCU9lDGQ1gH2S7pMZKymENoQ1qlJaW4MAI4U-yj5btOjT4Yibrsd_2yfJixenvW0bELfP9smWwGLnSCY04TuehNTKFnJAHq-iUMAzsKwkZPPc2Me-1Lu9i70iE4Aglu9Pu_BNRSkPgOTccCssLTxkj_z755zfRGqlU9oMgoeLBeC9PGmq1g1OVElzdHoixhCc5AhfIXKa4PB7CA_F0Ztzs5WybmxuD9bbZzIbdNq7kTqmd38ogwBfo',

  // Screen 8: Land Hero (Main barber focused image)
  mainHeroBackground: newHeroBackgroundImg,
  // Main Hub Content Photos
  salonToolsGreyScale: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EcmPDs2RMHShziPOPk-EYey3Ers9SYbLvXTGxuFDPLN7gPIcG33GvCzPmr0hzykxdnX--LRh-keyMd3oqbx1LPmfkuNNSxZky_ecQ7jVJ4ZMjTdvUrLL14HOX0KaB2z-c2NpR9F5CF7ctIzrN9VIJu_SCMnPMk-msT80R8sD9g0L4TQJWY6GTc10DDsZAFg8vBfjiUxvsaXHJITPpyFKNObm_wpc-cJkXahG196zP-FPI75T2Ks6N5u0FuyVyyRLs-yLc1Ao2B0H',
  serviceBentoCurls: userCurlyHairImg,
  serviceBentoFacial: userFacialMaskImg,
  serviceBentoSpa: regeneratedSpaImg,
  serviceBento360: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmK1bqLWqaKI2DwPw6unl_N8N4CygmeNQIp7gXBZvTljz0WQV_Dc-NkGEaJxiE3E3PHUV8uh7LEpyF2PJVnTGMA4QAFCBlRdHVyvY9Lg4mcVCVk2MU0JfdZpdyu9Bbf2VTYOZzz7ZbgxGSoPgrSYRIF4NBnJ3YwJX8su5a_yNdrGXN-90R5qi_4A42CoZ1DK9qCnK7TSS_8ABZcbDHCW8aEVlDMdXIpEwRitkpz4jbm0WUMkKgtRXRaBJrdDM-EF_C2pUdZbVbmwYS',
  serviceBentoDomicilio: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDueeOmwRyRTKyOnOSMxt2IvWHtr3snMGWc-OgwUl2bs2EbDmyPbi5n1UevEE9hvTHmc3XooWTFZLlbIiIzEEeYY2-o9iHlKZxQfVnrqiVVwSJz7ZAYx1yxDnLzKEFssVsZHiJzAJ_v6sN3OqL7x_UTLF8X6re_gjZ3TzdA8rNLqCATF0hP6FwL9kyycLZ7OxO3gtLhOh5dYkBtbzXnV66MuyZxodgBlB80pJfHzLVkeEUT8SKcwejfpRvPr5Dygi0kQgIFpzt7EBHn',
  latestNewsPostImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNIj8oEPhH8uKIatLDig46N6cC8jr3Sny5LVs56VbTM98BfdHXBQTDxOVCtFYY-9j_W0s2V6Cf_ykKVqHCTu7HVsaBSo6CGO5GEMPqrjbPqyyM9J8i5JTJVDpQSVSRRTAgh5t3TGSmWsnUtrxdp7q9yVdlXgmxHiVY-p3f75LRSUDjJMIgIHb7WnSsGPMoCVM6YEiIcKgTBpu7AgaglgN44Rf71_QqkOTqqNW45ST3Pw5i5tpSp6AA2s0xV4jEIupgkmmmYllVAnBe',
};

// Lists and configurations for screens
export const BRONCE_MEMBERSHIPS_DETAIL = [
  { service: 'Corte + Ceja', count: 3, listPrice: '$42,000', memberPrice: '$37,000' },
  { service: 'Corte + Ceja', count: 4, listPrice: '$56,000', memberPrice: '$50,000' },
  { service: 'Corte Completo', count: 2, listPrice: '$36,000', memberPrice: '$30,000' },
  { service: 'Corte Completo', count: 3, listPrice: '$54,000', memberPrice: '$50,000' },
  { service: 'Corte Completo', count: 4, listPrice: '$72,000', memberPrice: '$65,000' },
];

export const PLATA_MEMBERSHIPS_DETAIL = [
  { service: 'Cut Full + Spa', count: 2, listPrice: '$50,000', memberPrice: '$45,000' },
  { service: 'Cut Full + Spa', count: 3, listPrice: '$75,000', memberPrice: '$70,000' },
  { service: 'Cut Full + Spa', count: 4, listPrice: '$100,000', memberPrice: '$90,000' },
];

export const GOLD_MEMBERSHIPS_DETAIL = [
  { service: 'Experiencia 360', count: 2, listPrice: '$80,000', memberPrice: '$70,000' },
  { service: 'Experiencia 360', count: 3, listPrice: '$120,000', memberPrice: '$110,000' },
  { service: 'Experiencia 360', count: 4, listPrice: '$160,000', memberPrice: '$140,000' },
];

export const FAQS = [
  {
    q: '¿Cómo funcionan los cobros?',
    a: 'Los cobros son automatizados mensualmente a través de efectivo, transferencia, tarjeta de crédito o débito registrada.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí, no hay contratos forzosos. Puedes cancelar tu membresía en el portal de cliente con 30 días de anticipación.',
  },
  {
    q: '¿Los beneficios son transferibles?',
    a: 'Las membresías son personales e intransferibles para garantizar la exclusividad y calidad del servicio.',
  },
  {
    q: '¿Qué incluye el VIP Lounge?',
    a: 'Acceso ilimitado a todos los servicios, entretenimiento vía PlayStation y/o plataformas de streaming, descuentos en productos y servicios dependiendo la unidad de cortes mensuales.',
  },
];

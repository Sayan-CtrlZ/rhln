export type Language = 'en' | 'es';

export type Rule = {
  id: string;
  title: [string, string];
  summary: [string, string];
  citation: string;
  code: string;
  status: 'applies' | 'unknown' | 'superseded' | 'not_yet_effective' | 'pending';
  icon: 'increase' | 'shield' | 'wallet' | 'screening' | 'algorithm';
  source: string;
  quotedSpan?: string;
  explanation?: string;
  conflictFlag?: boolean;
  conflictNote?: string | null;
  retrievedAt?: string;
  effectiveDate?: string | null;
  category?: string;
};

// Initial default rules (illustrative & fallback)
export const rules: Rule[] = [
  {
    id: 'rent',
    title: ['Rent increases', 'Aumentos de alquiler'],
    summary: [
      'Annual rent increases may be limited by local rent control. Statewide limits may also apply, depending on exemptions.',
      'El control local puede limitar los aumentos anuales. También pueden aplicar límites estatales, según las exenciones.',
    ],
    citation: 'SF Admin. Code § 37.3',
    code: 'San Francisco Administrative Code § 37.3',
    status: 'applies',
    icon: 'increase',
    source: 'https://www.sf.gov/reports/rent-board-laws-and-regulations',
    quotedSpan: 'The Rent Board sets the allowable annual rent increase based on 60% of the Consumer Price Index (CPI) for the San Francisco-Oakland-San Jose region.',
    explanation: 'Applies to buildings with certificate of occupancy on or before June 13, 1979.',
  },
  {
    id: 'cause',
    title: ['Just cause', 'Causa justa'],
    summary: [
      'A landlord generally needs a recognized just cause to end a covered tenancy. Notice and relocation requirements may apply.',
      'Generalmente se requiere una causa justa reconocida para terminar un arrendamiento protegido. Puede requerirse aviso y ayuda de reubicación.',
    ],
    citation: 'SF Admin. Code § 37.9',
    code: 'San Francisco Administrative Code § 37.9',
    status: 'applies',
    icon: 'shield',
    source: 'https://www.sf.gov/reports/rent-board-laws-and-regulations',
    quotedSpan: 'A landlord shall not endeavor to recover possession of a rental unit unless at least one of the enumerated just causes is established.',
    explanation: 'Tenancy in a covered multi-family residential building.',
  },
  {
    id: 'deposit',
    title: ['Security deposit', 'Depósito de garantía'],
    summary: [
      'California limits security deposits and sets rules for deductions and returns. Exceptions depend on the landlord and property.',
      'California limita los depósitos y establece reglas para deducciones y devoluciones. Las excepciones dependen del propietario y la vivienda.',
    ],
    citation: 'CA Civil Code § 1950.5',
    code: 'California Civil Code § 1950.5',
    status: 'applies',
    icon: 'wallet',
    source: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1950.5.&lawCode=CIV',
    quotedSpan: 'Starting July 1, 2024, a landlord may not demand or receive security, however denominated, in an amount or value in excess of an amount equal to one month’s rent.',
    explanation: 'Statewide California deposit cap under AB 12 (effective 2024-07-01).',
  },
  {
    id: 'screening',
    title: ['Screening fee', 'Tarifa de evaluación'],
    summary: [
      'Application screening fees are subject to state limits and disclosure requirements. Unused amounts may need to be returned.',
      'Las tarifas de evaluación están sujetas a límites y requisitos estatales. Puede ser necesario devolver los importes no utilizados.',
    ],
    citation: 'CA Civil Code § 1950.6',
    code: 'California Civil Code § 1950.6',
    status: 'applies',
    icon: 'screening',
    source: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1950.6.&lawCode=CIV',
    quotedSpan: 'The application screening fee shall not exceed the landlord’s actual out-of-pocket costs of gathering information, capped at the statutory CPI-adjusted amount.',
    explanation: 'Statewide limit on upfront screening fees.',
  },
  {
    id: 'algorithm',
    title: ['Algorithmic pricing', 'Precios algorítmicos'],
    summary: [
      'Local restrictions may cover rent-setting software. More information about the pricing tool is needed to determine coverage.',
      'Las restricciones locales pueden cubrir programas de fijación de alquileres. Se necesita más información para determinar la cobertura.',
    ],
    citation: 'SF Admin. Code § 37.10C',
    code: 'San Francisco Administrative Code § 37.10C (Oct 2024)',
    status: 'unknown',
    icon: 'algorithm',
    source: 'https://www.sf.gov/',
    quotedSpan: 'It shall be unlawful to use, contract for the use of, or provide any algorithmic device that uses nonpublic competitor data to recommend or set rents.',
    explanation: 'Coverage depends on whether the property manager uses nonpublic competitor data algorithmic tools.',
    conflictFlag: false,
  },
];

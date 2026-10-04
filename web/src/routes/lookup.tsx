import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import {
  Search,
  MapPin,
  CalendarDays,
  Building2,
  CheckCircle2,
  HelpCircle,
  Clock3,
  ChevronRight,
  FileText,
  AlertTriangle,
  Loader2,
  TrendingUp,
  ShieldCheck,
  Wallet,
  SlidersHorizontal,
  Info,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
  BookOpen,
  Sparkles,
  Bot,
  UserCheck,
  Building,
  Scale,
  ArrowRight,
  Cpu,
  BadgeCheck,
  Check,
  Users,
  Gavel,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLang } from './__root';
import {
  API_BASE,
  SERVER_ROOT,
  lookupAddress,
  fetchSampleProperties,
  fetchRuleSource,
  explainRuleWithAI,
  type BackendLookupResponse,
  type BackendRuleEvaluation,
  type SamplePropertyItem,
  type RuleSourceHighlight,
  type RuleAIExplanation,
} from '@/lib/api';
import { AICopilotDrawer } from '@/components/AICopilotDrawer';

export const Route = createFileRoute('/lookup')({
  component: LookupPage,
});

/* ------------------------------------------------------------------------- */
/* TRD Section 9.6: Official 5 Status Tokens & Badges                        */
/* ------------------------------------------------------------------------- */

type RuleStatus = 'applies' | 'unknown' | 'superseded' | 'not_yet_effective' | 'pending';

interface StatusConfig {
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  cardBorderLeft: string;
  iconBg: string;
  icon: any;
  en: string;
  es: string;
}

const STATUS_MAP: Record<RuleStatus, StatusConfig> = {
  applies: {
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    badgeBorder: 'border-emerald-500/30',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    cardBorderLeft: 'border-l-emerald-500',
    iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    icon: CheckCircle2,
    en: 'Applies to Property',
    es: 'Aplica a la Vivienda',
  },
  unknown: {
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
    badgeBorder: 'border-amber-500/30',
    badgeText: 'text-amber-700 dark:text-amber-300',
    cardBorderLeft: 'border-l-amber-500',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    icon: HelpCircle,
    en: 'More Facts Needed',
    es: 'Faltan Datos del Inmueble',
  },
  superseded: {
    badgeBg: 'bg-slate-500/10 dark:bg-slate-500/20',
    badgeBorder: 'border-slate-500/30',
    badgeText: 'text-slate-700 dark:text-slate-300',
    cardBorderLeft: 'border-l-slate-400',
    iconBg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
    icon: Layers,
    en: 'Overridden by Local Rule',
    es: 'Reemplazada por Norma Local',
  },
  not_yet_effective: {
    badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
    badgeBorder: 'border-blue-500/30',
    badgeText: 'text-blue-700 dark:text-blue-300',
    cardBorderLeft: 'border-l-blue-500',
    iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    icon: Clock3,
    en: 'Upcoming / Future Law',
    es: 'Aún no está vigente',
  },
  pending: {
    badgeBg: 'bg-purple-500/10 dark:bg-purple-500/20',
    badgeBorder: 'border-purple-500/30',
    badgeText: 'text-purple-700 dark:text-purple-300',
    cardBorderLeft: 'border-l-purple-500',
    iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    icon: FileText,
    en: 'Proposed (Pending Bill)',
    es: 'Propuesta (No es ley)',
  },
};

function StatusBadge({ status, es }: { status: string; es: boolean }) {
  const normStatus = (status in STATUS_MAP ? status : 'unknown') as RuleStatus;
  const cfg = STATUS_MAP[normStatus];
  const Icon = cfg.icon;
  const label = es ? cfg.es : cfg.en;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${cfg.badgeBg} ${cfg.badgeBorder} ${cfg.badgeText}`}
      aria-label={label}
    >
      <Icon className="size-3.5 shrink-0" />
      <span>{label}</span>
    </span>
  );
}

/* ------------------------------------------------------------------------- */
/* 6 Official Housing Law Categories (TRD Section 4.2 & Section 9.3)         */
/* ------------------------------------------------------------------------- */

const OFFICIAL_CATEGORIES = [
  {
    key: 'rent_increase_limits',
    shortEn: 'Rent Caps',
    shortEs: 'Límites de Renta',
    en: 'Rent Increase Limits',
    es: 'Límites de Aumento de Alquiler',
    icon: TrendingUp,
    descriptionEn: 'Statutory ceilings on allowable rent increases and annual adjustment formulas.',
    descriptionEs: 'Topes de incremento anual y fórmulas según el IPC.',
  },
  {
    key: 'just_cause_eviction',
    shortEn: 'Eviction Rules',
    shortEs: 'Desalojos',
    en: 'Just Cause Eviction Protections',
    es: 'Causa Justa de Desalojo',
    icon: ShieldCheck,
    descriptionEn: 'Protections requiring enumerated just causes, formal notice, and relocation assistance.',
    descriptionEs: 'Protecciones contra desalojos injustificados y compensaciones.',
  },
  {
    key: 'security_deposits',
    shortEn: 'Security Deposits',
    shortEs: 'Fianzas',
    en: 'Security Deposit Limits',
    es: 'Depósitos de Garantía',
    icon: Wallet,
    descriptionEn: 'Statutory limits on deposit amounts (AB 12), return deadlines, and deductions.',
    descriptionEs: 'Límites máximos de fianza, plazos de devolución y deducciones permitidas.',
  },
  {
    key: 'application_screening_fees',
    shortEn: 'Screening Fees',
    shortEs: 'Tarifas',
    en: 'Application Screening Fees',
    es: 'Tarifas de Evaluación de Solicitud',
    icon: FileText,
    descriptionEn: 'Caps on tenant background checks, credit screening, and application processing.',
    descriptionEs: 'Límites en cobros por verificación de antecedentes a inquilinos.',
  },
  {
    key: 'screening_restrictions',
    shortEn: 'Screening Limits',
    shortEs: 'Restricciones',
    en: 'Tenant Screening Restrictions',
    es: 'Restricciones de Evaluación',
    icon: SlidersHorizontal,
    descriptionEn: 'Restrictions on criminal history lookbacks, eviction records, and credit barriers.',
    descriptionEs: 'Prohibiciones sobre antecedentes penales y registros de desahucio.',
  },
  {
    key: 'algorithmic_rent_setting',
    shortEn: 'Algorithmic Bans',
    shortEs: 'Leyes de Algoritmos',
    en: 'Algorithmic Rent-Setting Bans',
    es: 'Fijación Algorítmica de Alquileres',
    icon: SlidersHorizontal,
    descriptionEn: 'Bans and antitrust rules restricting shared price-fixing algorithms (AB 325).',
    descriptionEs: 'Prohibición de algoritmos de precios compartidos y colusión de rentas.',
  },
];

/* ------------------------------------------------------------------------- */
/* Main Lookup Page Component                                                */
/* ------------------------------------------------------------------------- */

export function LookupPage() {
  const { t, language } = useLang();
  const es = language === 'es';

  // Form State
  const [address, setAddress] = useState('');
  const [date, setDate] = useState<Date>(new Date(2026, 9, 1));
  const [yearBuilt, setYearBuilt] = useState<string>('');
  const [units, setUnits] = useState<string>('');
  const [calendarOpen, setCalendarOpen] = useState(false);

  // User Persona & Experience Tailoring
  const [userRole, setUserRole] = useState<'renter' | 'owner' | 'advocate'>('renter');
  const [showPropertyContext, setShowPropertyContext] = useState<boolean>(false);
  const [tenancyDuration, setTenancyDuration] = useState<'less_than_12' | '12_or_more'>('12_or_more');
  const [viewMode, setViewMode] = useState<'plain' | 'legal'>('plain');

  // Execution State
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'applies' | 'unknown' | 'superseded'>('all');

  // Real Data State
  const [evaluatedRules, setEvaluatedRules] = useState<BackendRuleEvaluation[]>([]);
  const [jurisdictionStack, setJurisdictionStack] = useState<Array<{ name: string; level: string }>>([]);
  const [sampleProperties, setSampleProperties] = useState<SamplePropertyItem[]>([]);
  const [expandedTraceRuleId, setExpandedTraceRuleId] = useState<string | null>(null);

  // AI Rule Explanations State
  const [aiExplanations, setAiExplanations] = useState<Record<string, RuleAIExplanation>>({});
  const [aiExplainingRuleId, setAiExplainingRuleId] = useState<string | null>(null);
  const [copilotOpen, setCopilotOpen] = useState(false);

  // Source Drawer State (TRD 9.5)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeRuleId, setActiveRuleId] = useState<string | null>(null);
  const [sourceData, setSourceData] = useState<RuleSourceHighlight | null>(null);
  const [sourceLoading, setSourceLoading] = useState(false);
  const [sourceError, setSourceError] = useState<string | null>(null);

  // Load sample properties and parse URL params on mount
  useEffect(() => {
    fetchSampleProperties(100).then((items) => {
      if (items && items.length > 0) {
        setSampleProperties(items);
      }
    });

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlAddress = urlParams.get('address');
      const urlAsOf = urlParams.get('asOf');
      const urlUnits = urlParams.get('units');
      const urlYear = urlParams.get('year_built');
      const sourceParam = urlParams.get('source');

      if (urlAddress) {
        setAddress(urlAddress);
        if (urlUnits) setUnits(urlUnits);
        if (urlYear) setYearBuilt(urlYear);
        if (urlAsOf) {
          try {
            const parsed = new Date(urlAsOf);
            if (!isNaN(parsed.getTime())) setDate(parsed);
          } catch {
            // ignore
          }
        }
        performLookup({
          addressStr: urlAddress,
          asOfDate: urlAsOf || '2026-10-01',
          yBuilt: urlYear || undefined,
          uCount: urlUnits || undefined,
        });
      }

      if (sourceParam) {
        openSourceDrawer(sourceParam);
      }
    }
  }, []);

  const handlePropertySelect = (val: string) => {
    setAddress(val);
    const trimmed = val.trim().toLowerCase();
    const found = sampleProperties.find(
      (p) =>
        `${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}`.toLowerCase() === trimmed ||
        p.street_address.toLowerCase() === trimmed ||
        p.address_id.toLowerCase() === trimmed
    );
    if (found) {
      if (found.year_built) setYearBuilt(String(found.year_built));
      if (found.units) setUnits(String(found.units));
    }
  };

  const handleQuickSample = (sampleAddr: string, defaultYear?: string, defaultUnits?: string) => {
    setAddress(sampleAddr);
    if (defaultYear) setYearBuilt(defaultYear);
    if (defaultUnits) setUnits(defaultUnits);
    performLookup({
      addressStr: sampleAddr,
      asOfDate: format(date, 'yyyy-MM-dd'),
      yBuilt: defaultYear || yearBuilt,
      uCount: defaultUnits || units,
    });
  };

  const performLookup = async (params: {
    addressStr: string;
    asOfDate: string;
    yBuilt?: string;
    uCount?: string;
  }) => {
    const raw = params.addressStr.trim();
    if (!raw) return;
    setLoading(true);
    setSearched(true);
    try {
      let street = raw;
      let city = 'Berkeley';
      let state = 'CA';
      let zip = '94704';
      let propertyId: string | undefined = undefined;

      // 1. Direct match against loaded benchmark properties
      const trimmed = raw.toLowerCase();
      const found = sampleProperties.find(
        (p) =>
          `${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}`.toLowerCase() === trimmed ||
          p.street_address.toLowerCase() === trimmed ||
          p.address_id.toLowerCase() === trimmed
      );

      if (found) {
        street = found.street_address;
        city = found.postal_city;
        state = found.state;
        zip = found.zip;
        propertyId = found.address_id;
        if (!params.yBuilt && found.year_built) setYearBuilt(String(found.year_built));
        if (!params.uCount && found.units) setUnits(String(found.units));
      } else {
        // 2. Intelligent string parsing
        const parts = raw.split(',').map((p) => p.trim());
        street = parts[0] || raw;
        if (parts.length >= 2) city = parts[1];
        if (parts.length >= 3) {
          const stateZip = parts[2].trim().split(/\s+/);
          if (stateZip[0]) state = stateZip[0].toUpperCase();
          if (stateZip[1]) zip = stateZip[1];
        }

        const cLow = city.toLowerCase();
        if (['newark', 'jersey city', 'hoboken'].includes(cLow)) {
          state = 'NJ';
        } else if (['boston', 'cambridge', 'somerville', 'allston', 'brighton', 'dorchester', 'roxbury'].includes(cLow)) {
          state = 'MA';
        } else if (['berkeley', 'san francisco', 'los angeles', 'san diego', 'santa ana', 'oakland'].includes(cLow)) {
          state = 'CA';
        }

        const rawLow = raw.toLowerCase();
        if (rawLow.includes('newark') || rawLow.includes('jersey city') || rawLow.includes('hoboken') || rawLow.includes(' nj')) {
          state = 'NJ';
          if (!city || city === 'Berkeley') city = rawLow.includes('hoboken') ? 'Hoboken' : rawLow.includes('jersey city') ? 'Jersey City' : 'Newark';
        } else if (rawLow.includes('boston') || rawLow.includes('cambridge') || rawLow.includes('somerville') || rawLow.includes(' ma')) {
          state = 'MA';
          if (!city || city === 'Berkeley') city = rawLow.includes('cambridge') ? 'Cambridge' : rawLow.includes('somerville') ? 'Somerville' : 'Boston';
        }
      }

      const res: BackendLookupResponse = await lookupAddress({
        street,
        city,
        state,
        zip,
        property_id: propertyId,
        year_built: params.yBuilt ? parseInt(params.yBuilt, 10) : undefined,
        units: params.uCount ? parseInt(params.uCount, 10) : undefined,
        as_of: params.asOfDate,
      });

      if (res && res.results) {
        setEvaluatedRules(res.results);
        if (res.stack && res.stack.length > 0) {
          setJurisdictionStack(res.stack.map((s) => ({ name: s.name, level: s.level })));
        }
      }
    } catch (err) {
      console.warn('Backend lookup query error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    if (!address.trim()) return;
    performLookup({
      addressStr: address,
      asOfDate: format(date, 'yyyy-MM-dd'),
      yBuilt: yearBuilt,
      uCount: units,
    });
  };

  const openSourceDrawer = async (ruleId: string) => {
    setActiveRuleId(ruleId);
    setDrawerOpen(true);
    setSourceLoading(true);
    setSourceError(null);
    try {
      const src = await fetchRuleSource(ruleId);
      setSourceData(src);
      setTimeout(() => {
        document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    } catch (err: any) {
      setSourceError(err.message || 'Failed to fetch source document citation slice');
    } finally {
      setSourceLoading(false);
    }
  };

  const handleExplainWithAI = async (ruleId: string) => {
    if (aiExplanations[ruleId]) {
      const updated = { ...aiExplanations };
      delete updated[ruleId];
      setAiExplanations(updated);
      return;
    }

    setAiExplainingRuleId(ruleId);
    try {
      const expl = await explainRuleWithAI(ruleId, language);
      setAiExplanations((prev) => ({ ...prev, [ruleId]: expl }));
    } catch (err) {
      console.warn('AI explanation failed:', err);
    } finally {
      setAiExplainingRuleId(null);
    }
  };

  // Filter calculations
  const appliesCount = evaluatedRules.filter((r) => r.result === 'applies').length;
  const unknownCount = evaluatedRules.filter((r) => r.result === 'unknown').length;
  const supersededCount = evaluatedRules.filter((r) => r.result === 'superseded').length;
  const upcomingCount = evaluatedRules.filter(
    (r) => r.result === 'not_yet_effective' || r.result === 'pending'
  ).length;

  const filteredRules = evaluatedRules.filter((rule) => {
    if (statusFilter !== 'all' && rule.result !== statusFilter) return false;
    if (activeCategoryFilter !== 'all' && (rule.category || 'rent_increase_limits') !== activeCategoryFilter) {
      return false;
    }
    return true;
  });

  // Split categories into active (has rules) vs standard (covered by state law)
  const categoriesWithRules = OFFICIAL_CATEGORIES.filter((cat) =>
    evaluatedRules.some((r) => (r.category || 'rent_increase_limits') === cat.key)
  );
  const categoriesStandard = OFFICIAL_CATEGORIES.filter(
    (cat) => !evaluatedRules.some((r) => (r.category || 'rent_increase_limits') === cat.key)
  );

  // Derive Executive Summary Pillars
  const rentRule = evaluatedRules.find(
    (r) => (r.category || '').includes('rent') && r.result === 'applies'
  );
  const evictionRule = evaluatedRules.find(
    (r) => (r.category || '').includes('eviction') && r.result === 'applies'
  );
  const depositRule = evaluatedRules.find(
    (r) => (r.category || '').includes('deposit') && r.result === 'applies'
  );
  const algoRule = evaluatedRules.find(
    (r) =>
      (r.category || '').includes('algo') &&
      (r.result === 'applies' || r.result === 'not_yet_effective' || r.result === 'pending')
  );

  // Resolve active state context for genuine legal baselines
  const currentState =
    jurisdictionStack.find((j) => j.level === 'state')?.state ||
    (address.includes('NJ') || address.toLowerCase().includes('newark') || address.toLowerCase().includes('jersey city') || address.toLowerCase().includes('hoboken')
      ? 'NJ'
      : address.includes('MA') || address.toLowerCase().includes('boston') || address.toLowerCase().includes('cambridge') || address.toLowerCase().includes('somerville')
      ? 'MA'
      : 'CA');

  const rentPillar = rentRule
    ? {
        badge: t('Local Cap Applies', 'Aplica Tope Local'),
        title: rentRule.key_value || '5.0% + CPI Max',
        desc: rentRule.requirement || rentRule.explanation,
        citation: rentRule.citation || 'Local Municipal Code',
      }
    : currentState === 'CA'
    ? {
        badge: t('State Baseline (AB 1482)', 'Límite Estatal'),
        title: t('5% + CPI (Max 10%)', '5% + IPC (Máx 10%)'),
        desc: t('California Tenant Protection Act (AB 1482) caps annual rent increases at 5% plus local CPI for non-exempt rental units older than 15 years.', 'La ley estatal AB 1482 limita incrementos anuales al 5% más IPC local.'),
        citation: 'Cal. Civ. Code § 1947.12',
      }
    : currentState === 'NJ'
    ? {
        badge: t('Local Control Only', 'Control Municipal'),
        title: t('Municipal Board Only', 'Solo Junta Municipal'),
        desc: t('New Jersey maintains no statewide statutory percentage rent cap; rent leveling is established through municipal ordinances.', 'Nueva Jersey no tiene tope porcentual estatal; se regula mediante juntas locales.'),
        citation: 'N.J.S.A. 2A:18-61.1',
      }
    : {
        badge: t('Market Rate', 'Tasa de Mercado'),
        title: t('No Statewide Cap', 'Sin Tope Estatal'),
        desc: t('Massachusetts statutes do not establish a statewide rent control ceiling; rental amounts are determined by lease terms.', 'Massachusetts no establece un tope estatal de control de alquiler.'),
        citation: 'Mass. Gen. Laws ch. 186',
      };

  const evictionPillar = evictionRule
    ? {
        badge: t('Protected', 'Protegido'),
        title: t('Just Cause Required', 'Causa Justa Exigida'),
        desc: evictionRule.requirement || evictionRule.explanation,
        citation: evictionRule.citation || 'Local Eviction Ordinance',
      }
    : currentState === 'CA'
    ? {
        badge: t('State Protected', 'Protegido por Estado'),
        title: t('Just Cause Required (AB 1482)', 'Causa Justa Exigida (AB 1482)'),
        desc: t('Tenants occupying residential property for 12+ months cannot be evicted without statutory at-fault or no-fault just cause.', 'Inquilinos con más de 12 meses requieren causa justa para ser desalojados.'),
        citation: 'Cal. Civ. Code § 1946.2',
      }
    : currentState === 'NJ'
    ? {
        badge: t('Protected', 'Protegido'),
        title: t('Anti-Eviction Act', 'Ley Anti-Desalojo'),
        desc: t('New Jersey Anti-Eviction Act requires landlords to prove one of 18 statutory grounds for eviction in Superior Court.', 'Exige demostrar una de las 18 causales legales para desalojo ante tribunal.'),
        citation: 'N.J.S.A. 2A:18-61.1',
      }
    : {
        badge: t('Due Process', 'Debido Proceso'),
        title: t('Summary Process Required', 'Proceso Sumario'),
        desc: t('Evictions require legal written notice to quit followed by judicial summary process proceedings in Housing Court.', 'Requiere notificación legal previa y proceso sumario ante tribunal de vivienda.'),
        citation: 'M.G.L. c. 239, § 1',
      };

  const depositPillar = depositRule
    ? {
        badge: depositRule.key_value || '1 Month Rent',
        title: depositRule.key_value || '1 Month Max',
        desc: depositRule.requirement || depositRule.explanation,
        citation: depositRule.citation || 'Local Security Deposit Code',
      }
    : currentState === 'CA'
    ? {
        badge: t('1 Month Max', 'Máx 1 Mes'),
        title: t('1 Month Rent (AB 12)', '1 Mes de Renta (AB 12)'),
        desc: t('California AB 12 caps security deposits at one month rent for furnished and unfurnished units, with small landlord exception.', 'Limita depósitos de garantía a un mes de alquiler con excepción para pequeños propietarios.'),
        citation: 'Cal. Civ. Code § 1950.5',
      }
    : currentState === 'NJ'
    ? {
        badge: t('1.5 Months Max', 'Máx 1.5 Meses'),
        title: t('1.5 Months Rent Max', 'Máx 1.5 Meses de Renta'),
        desc: t('New Jersey limits security deposits to 1.5 months rent, required to be deposited in an interest-bearing escrow account.', 'Limita depósitos a 1.5 meses de alquiler depositados en cuenta con intereses.'),
        citation: 'N.J.S.A. 46:8-21.2',
      }
    : {
        badge: t('1 Month Max', 'Máx 1 Mes'),
        title: t('1 Month Rent Max', 'Máx 1 Mes de Renta'),
        desc: t('Massachusetts caps security deposits strictly at one month rent, held in a separate interest-bearing bank account.', 'Tope estricto de un mes de alquiler en cuenta bancaria separada con intereses.'),
        citation: 'M.G.L. c. 186, § 15B',
      };

  const pricingPillar = algoRule
    ? {
        badge: algoRule.result === 'applies' ? t('Prohibited', 'Prohibido') : algoRule.result === 'not_yet_effective' ? t('Upcoming Law', 'Próxima Ley') : t('Pending Bill', 'Proyecto de Ley'),
        title: algoRule.key_value || (algoRule.result === 'applies' ? 'Banned (AB 325)' : 'Pending Review'),
        desc: algoRule.requirement || algoRule.explanation,
        citation: algoRule.citation || 'Algorithmic Pricing Law',
      }
    : currentState === 'CA'
    ? {
        badge: t('Prohibited', 'Prohibido'),
        title: t('Prohibited (AB 325)', 'Prohibido (AB 325)'),
        desc: t('California AB 325 / SB 763 prohibits common price-setting algorithms that coordinate rental rates among landlords.', 'Prohíbe algoritmos compartidos de fijación y coordinación de precios.'),
        citation: 'Cal. Civ. Code § 16700 (AB 325)',
      }
    : currentState === 'NJ'
    ? {
        badge: t('Municipal Bans', 'Prohibición Local'),
        title: t('Local Bans (Hoboken/JC)', 'Prohibido (Hoboken/JC)'),
        desc: t('Municipal bans in Hoboken (ch. 158) and Jersey City (ch. 260) prohibit revenue management pricing coordination.', 'Ordenanzas en Hoboken y Jersey City prohíben el uso de software de precios compartidos.'),
        citation: 'Hoboken ch. 158 / Jersey City ch. 260',
      }
    : {
        badge: t('Pending Review', 'En Trámite'),
        title: t('Pending Bills (S.2983)', 'Proyectos S.2983'),
        desc: t('Massachusetts algorithmic pricing bills S.2983 and H.5222 remain pending before legislative committees.', 'Proyectos de ley contra fijación algorítmica de alquileres en trámite legislativo.'),
        citation: 'Mass. General Court S.2983',
      };

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="border-b border-border/70 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold text-primary mb-2">
            <Scale className="size-3.5" />
            <span>{t('Address-Level Housing Law Engine', 'Motor de Leyes de Vivienda')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-foreground">
            {t('Address Lookup & Coverage Navigator', 'Consulta de Dirección y Cobertura')}
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            {t(
              'Enter any residential apartment address to discover which municipal, county, and state rental rules apply today.',
              'Ingrese una dirección residencial para ver qué normas municipales y estatales aplican hoy.'
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCopilotOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-all shadow-xs self-start md:self-center"
        >
          <Sparkles className="size-4 text-purple-500 animate-pulse" />
          <span>{t('Ask AI Legal Assistant', 'Asistente Legal de IA')}</span>
        </button>
      </div>

      {/* 1. Persona / Role Context Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border border-border/80 bg-card">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/60 border border-border/60 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setUserRole('renter');
              setViewMode('plain');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              userRole === 'renter'
                ? 'bg-primary text-primary-foreground shadow-2xs font-bold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users className="size-3.5" />
            <span>{t('Tenant / Renter', 'Inquilino')}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setUserRole('owner');
              setShowPropertyContext(true);
              setViewMode('plain');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              userRole === 'owner'
                ? 'bg-primary text-primary-foreground shadow-2xs font-bold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Building2 className="size-3.5" />
            <span>{t('Housing Provider / Owner', 'Propietario')}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setUserRole('advocate');
              setShowPropertyContext(true);
              setViewMode('legal');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              userRole === 'advocate'
                ? 'bg-primary text-primary-foreground shadow-2xs font-bold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Gavel className="size-3.5" />
            <span>{t('Legal Aid Advocate / Attorney', 'Abogado / Defensor')}</span>
          </button>
        </div>

        <span className="text-xs text-muted-foreground">
          {userRole === 'renter'
            ? t('Discover your rent cap, eviction defense rights, and security deposit maximum.', 'Conozca topes de aumento de alquiler, defensas contra desalojo y depósito máximo.')
            : userRole === 'owner'
            ? t('Verify Costa-Hawkins exemptions, 15-year building age windows, and compliance notices.', 'Verifique exenciones Costa-Hawkins, ventana de 15 años y notificaciones de ley.')
            : t('Inspect statutory predicates, Kleene 3-valued truth values, and verbatim corpus citations.', 'Inspeccione predicados legales, lógica ternaria de Kleene y citas textuales.')}
        </span>
      </div>

      {/* 2. Primary Address Search Bar Console */}
      <form onSubmit={handleSearchSubmit} className="mt-3 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <MapPin className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="property-address"
              required
              list="sample-addresses-list"
              value={address}
              onChange={(event) => handlePropertySelect(event.target.value)}
              placeholder={
                userRole === 'renter'
                  ? t('Enter your apartment address (e.g. 2150 Shattuck Ave, Berkeley, CA 94704)...', 'Ingrese su dirección (ej. 2150 Shattuck Ave, Berkeley, CA 94704)...')
                  : t('Enter residential property address (e.g. 2150 Shattuck Ave, Berkeley, CA 94704)...', 'Ingrese dirección del inmueble (ej. 2150 Shattuck Ave, Berkeley, CA 94704)...')
              }
              className="h-12 w-full rounded-xl pl-10 pr-10 text-sm font-normal border border-input bg-secondary/30 focus:bg-card focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            />
            {address && (
              <button
                type="button"
                onClick={() => setAddress('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              >
                <X className="size-3.5" />
              </button>
            )}
            <datalist id="sample-addresses-list">
              {sampleProperties.map((p) => (
                <option
                  key={p.address_id}
                  value={`${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}`}
                >
                  {p.use_description || p.postal_city} (Built: {p.year_built || '?'})
                </option>
              ))}
            </datalist>
          </div>

          <Button
            type="submit"
            disabled={loading || !address.trim()}
            className="h-12 px-6 rounded-xl shadow-xs font-bold gap-2 text-sm shrink-0"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
            <span>{t('Evaluate Apartment', 'Evaluar Vivienda')}</span>
          </Button>
        </div>

        {/* Quick Sample Selector Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
            <Sparkles className="size-3 text-primary" />
            <span>{t('Sample Addresses:', 'Direcciones de Ejemplo:')}</span>
          </span>
          <button
            type="button"
            onClick={() => handleQuickSample('2150 Shattuck Ave, Berkeley, CA 94704', '1972', '18')}
            className="px-2.5 py-1 rounded-lg text-xs bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-all border border-border/60"
          >
            2150 Shattuck Ave (Berkeley Multifamily)
          </button>
          <button
            type="button"
            onClick={() => handleQuickSample('1918 Oregon St, Berkeley, CA 94703', '1925', '2')}
            className="px-2.5 py-1 rounded-lg text-xs bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-all border border-border/60"
          >
            1918 Oregon St (Berkeley Duplex)
          </button>
          <button
            type="button"
            onClick={() => handleQuickSample('744 Broad St, Newark, NJ 07102', '1930', '100')}
            className="px-2.5 py-1 rounded-lg text-xs bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-all border border-border/60"
          >
            744 Broad St (Newark, NJ Statewide)
          </button>
          <button
            type="button"
            onClick={() => handleQuickSample('100 Tremont St, Boston, MA 02108', '1910', '50')}
            className="px-2.5 py-1 rounded-lg text-xs bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-all border border-border/60"
          >
            100 Tremont St (Boston, MA Market)
          </button>
        </div>

        {/* 3. Collapsible Property Context & Exemption Settings Toggle */}
        <div className="pt-2 border-t border-border/60">
          <button
            type="button"
            onClick={() => setShowPropertyContext(!showPropertyContext)}
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-all py-1"
          >
            <SlidersHorizontal className="size-3.5 text-primary" />
            <span>
              {showPropertyContext
                ? t('Hide Property Facts & Exemption Settings', 'Ocultar Datos del Inmueble y Exenciones')
                : t('Customize Property Facts & Exemption Settings (Optional)', 'Personalizar Datos del Inmueble y Exenciones (Opcional)')}
            </span>
            {showPropertyContext ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>

          {showPropertyContext && (
            <div className="mt-3 p-4 rounded-xl border border-border/80 bg-secondary/20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in duration-200">
              {/* Year Built */}
              <div>
                <label htmlFor="year-built" className="block text-[11px] font-bold uppercase tracking-wider text-foreground">
                  {t('Building Year Built', 'Año de Construcción')}
                </label>
                <div className="mt-1.5 flex h-10 items-center gap-2 rounded-lg border border-input bg-card px-3 text-xs">
                  <Building2 className="size-3.5 text-muted-foreground shrink-0" />
                  <input
                    id="year-built"
                    value={yearBuilt}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs outline-none"
                    placeholder="e.g. 1972"
                  />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {t('Units built < 15 years ago are exempt from AB 1482 caps.', 'Construcciones de < 15 años están exentas del tope AB 1482.')}
                </p>
              </div>

              {/* Units Count */}
              <div>
                <label htmlFor="units-count" className="block text-[11px] font-bold uppercase tracking-wider text-foreground">
                  {t('Total Units', 'Número de Unidades')}
                </label>
                <div className="mt-1.5 flex h-10 items-center rounded-lg border border-input bg-card px-3 text-xs">
                  <input
                    id="units-count"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs outline-none"
                    placeholder="e.g. 18"
                  />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {t('Single-family homes have distinct Costa-Hawkins rules.', 'Viviendas unifamiliares tienen reglas Costa-Hawkins.')}
                </p>
              </div>

              {/* Tenancy Duration */}
              <div>
                <label htmlFor="tenancy-duration" className="block text-[11px] font-bold uppercase tracking-wider text-foreground">
                  {t('Tenancy Duration', 'Antigüedad del Contrato')}
                </label>
                <select
                  id="tenancy-duration"
                  value={tenancyDuration}
                  onChange={(e) => setTenancyDuration(e.target.value as any)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-input bg-card px-2.5 text-xs outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="12_or_more">{t('12+ Continuous Months', '12+ Meses Continuos')}</option>
                  <option value="less_than_12">{t('Less than 12 Months', 'Menos de 12 Meses')}</option>
                </select>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {t('Just Cause requires 12 months continuous occupancy.', 'Causa Justa requiere 12 meses de ocupación.')}
                </p>
              </div>

              {/* As-Of Date */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground">
                  {t('Query Date (As-Of)', 'Fecha de Consulta')}
                </label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-1.5 h-10 w-full justify-between rounded-lg px-2.5 font-normal bg-card border-input text-foreground text-xs"
                    >
                      <span className="font-mono text-xs">
                        {format(date, 'yyyy-MM-dd')}
                      </span>
                      <CalendarDays className="size-3.5 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto rounded-xl border border-border p-0 shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      defaultMonth={date}
                      onSelect={(value) => {
                        if (value) {
                          setDate(value);
                          setCalendarOpen(false);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {t('Test historical dates or pending legislative shifts.', 'Pruebe fechas pasadas o leyes en trámite.')}
                </p>
              </div>
            </div>
          )}
        </div>
      </form>

      {/* LOADING STATE */}
      {loading && (
        <div className="mt-12 rounded-3xl border border-border/80 bg-card/60 p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="size-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <Scale className="size-6 text-primary absolute" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {t('Evaluating Housing Laws & Precedence...', 'Evaluando Leyes y Precedencia...')}
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              {t(
                `Resolving legal jurisdiction stack, coverage criteria, and statutory citations for ${address || 'address'}...`,
                `Resolviendo jurisdicciones y reglas legales aplicables para ${address || 'dirección'}...`
              )}
            </p>
          </div>
        </div>
      )}

      {/* UNSEARCHED INITIAL STATE: Clean, uncluttered enterprise guide */}
      {!searched && !loading && (
        <div className="mt-8 rounded-3xl border border-border/80 bg-card/60 p-8 sm:p-10 text-center shadow-xs space-y-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Scale className="size-7" />
          </div>
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              {t('Address-Level Regulatory Compliance Engine', 'Motor de Cumplimiento Normativo por Dirección')}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                'Enter any residential apartment address in the form above and select an as-of date. Our deterministic engine maps the address to its state, county, and municipal jurisdiction stack, resolves building age and unit thresholds, and evaluates applicable rent increase caps, eviction protections, and security deposit regulations.',
                'Ingrese una dirección en el formulario y seleccione la fecha de consulta. El motor evaluará el alcance de leyes municipales, del condado y del estado con citas textuales verificadas.'
              )}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto pt-4 border-t border-border/60 text-left">
            <div className="rounded-xl border border-border/80 bg-secondary/30 p-4 space-y-1">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" />
                {t('Multi-Tier Hierarchy', 'Jerarquía Multi-Nivel')}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('Disambiguates postal mailing names from legal incorporated municipal boundaries.', 'Distingue ciudades postales de límites municipales legales.')}
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-secondary/30 p-4 space-y-1">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <CalendarDays className="size-3.5 text-primary" />
                {t('Temporal Validity', 'Validez Temporal')}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('Calculates effective dates and handles pending or future statutory shifts with time-travel query dates.', 'Calcula fechas de vigencia y cambios legislativos según la fecha de consulta.')}
              </p>
            </div>

            <div className="rounded-xl border border-border/80 bg-secondary/30 p-4 space-y-1">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-500" />
                {t('Kleene 3-Valued Logic', 'Lógica de Kleene')}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('Returns unknown for missing building assessor facts rather than guessing compliance.', 'Devuelve "desconocido" si faltan datos del inmueble en lugar de adivinar.')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* EVALUATED RESULTS: Shown when user has searched and not loading */}
      {searched && !loading && (
        <div className="mt-8 space-y-6">
          {/* Jurisdiction Stack & Filter Bar */}
          <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* StackBreadcrumb */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold sm:text-sm">
                <MapPin className="size-4 text-primary shrink-0" />
                <span className="text-muted-foreground">{t('Jurisdiction Stack:', 'Jurisdicciones:')}</span>
                {jurisdictionStack.map((j, idx) => (
                  <span key={j.name} className="flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        idx === jurisdictionStack.length - 1
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'bg-secondary text-foreground'
                      }`}
                    >
                      {j.name} ({j.level})
                    </span>
                    {idx < jurisdictionStack.length - 1 && (
                      <ChevronRight className="size-3.5 text-muted-foreground" />
                    )}
                  </span>
                ))}
              </div>

              {/* Status Filter Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStatusFilter(statusFilter === 'applies' ? 'all' : 'applies')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                    statusFilter === 'applies'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20'
                  }`}
                >
                  <CheckCircle2 className="size-3.5" />
                  {appliesCount} {t('Applies', 'Aplican')}
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter(statusFilter === 'unknown' ? 'all' : 'unknown')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                    statusFilter === 'unknown'
                      ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                      : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 hover:bg-amber-500/20'
                  }`}
                >
                  <HelpCircle className="size-3.5" />
                  {unknownCount} {t('Unknown', 'Sin determinar')}
                </button>

                {supersededCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setStatusFilter(statusFilter === 'superseded' ? 'all' : 'superseded')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                      statusFilter === 'superseded'
                        ? 'bg-slate-700 text-white border-slate-800 shadow-xs'
                        : 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20 hover:bg-slate-500/20'
                    }`}
                  >
                    <Layers className="size-3.5" />
                    {supersededCount} {t('Superseded', 'Sustituidas')}
                  </button>
                )}

                {upcomingCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                    <Clock3 className="size-3.5" />
                    {upcomingCount} {t('Upcoming', 'Futuras')}
                  </span>
                )}
              </div>
            </div>

            {/* Horizontal Category Filter Tabs & Audience View Mode Switcher */}
            <div className="pt-2 border-t border-border/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-1">
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                    activeCategoryFilter === 'all'
                      ? 'bg-primary text-primary-foreground shadow-2xs'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t('All Categories', 'Todas')} ({evaluatedRules.length})
                </button>
                {OFFICIAL_CATEGORIES.map((cat) => {
                  const count = evaluatedRules.filter(
                    (r) => (r.category || 'rent_increase_limits') === cat.key
                  ).length;
                  if (count === 0) return null;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setActiveCategoryFilter(cat.key)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
                        activeCategoryFilter === cat.key
                          ? 'bg-primary text-primary-foreground shadow-2xs'
                          : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="size-3.5" />
                      <span>{es ? cat.shortEs : cat.shortEn}</span>
                      <span className="rounded-full bg-background/50 px-1.5 py-0.2 text-[10px]">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* View Mode Toggle: Plain Language vs Legal Audit */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-secondary/80 border border-border shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('plain')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    viewMode === 'plain'
                      ? 'bg-primary text-primary-foreground shadow-2xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileText className="size-3" />
                  <span>{t('Plain Language', 'Resumen Claro')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('legal')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    viewMode === 'legal'
                      ? 'bg-primary text-primary-foreground shadow-2xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Scale className="size-3" />
                  <span>{t('Legal Audit Mode', 'Auditoría Legal')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Executive Summary Takeaways Scorecard */}
          {!loading && searched && (
            <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 via-card to-card p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground">
                      {t('Executive Summary for this Address', 'Resumen Rápido para esta Vivienda')}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {t(
                        'Core rules and tenant protections derived from local ordinances & state codes.',
                        'Principales reglas y protecciones vigentes derivadas de ordenanzas locales y leyes estatales.'
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    <span>{appliesCount} {t('Rules Apply', 'Reglas Aplican')}</span>
                  </span>
                </div>
              </div>

              {/* 4 Scorecard Pillars */}
              <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                {/* 1. Rent Cap Pillar */}
                <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 text-xs font-semibold text-muted-foreground mb-1">
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="size-3.5 text-primary" />
                        {t('Rent Increase Cap', 'Tope de Alquiler')}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {rentPillar.badge}
                      </span>
                    </div>
                    <div className="text-base font-extrabold text-foreground">
                      {rentPillar.title}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {rentPillar.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/40 text-[11px] text-primary font-medium">
                    {rentPillar.citation}
                  </div>
                </div>

                {/* 2. Eviction Pillar */}
                <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 text-xs font-semibold text-muted-foreground mb-1">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                        {t('Eviction Protection', 'Protección Desalojo')}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {evictionPillar.badge}
                      </span>
                    </div>
                    <div className="text-base font-extrabold text-foreground">
                      {evictionPillar.title}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {evictionPillar.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/40 text-[11px] text-primary font-medium">
                    {evictionPillar.citation}
                  </div>
                </div>

                {/* 3. Deposit Cap Pillar */}
                <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 text-xs font-semibold text-muted-foreground mb-1">
                      <span className="flex items-center gap-1.5">
                        <Wallet className="size-3.5 text-blue-600 dark:text-blue-400" />
                        {t('Security Deposit', 'Fianza / Depósito')}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {depositPillar.badge}
                      </span>
                    </div>
                    <div className="text-base font-extrabold text-foreground">
                      {depositPillar.title}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {depositPillar.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/40 text-[11px] text-primary font-medium">
                    {depositPillar.citation}
                  </div>
                </div>

                {/* 4. Algorithmic Ban Pillar */}
                <div className="rounded-xl border border-border/80 bg-card p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 text-xs font-semibold text-muted-foreground mb-1">
                      <span className="flex items-center gap-1.5">
                        <SlidersHorizontal className="size-3.5 text-purple-600 dark:text-purple-400" />
                        {t('Price-Fixing Software', 'Software de Precios')}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        {pricingPillar.badge}
                      </span>
                    </div>
                    <div className="text-base font-extrabold text-foreground">
                      {pricingPillar.title}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {pricingPillar.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/40 text-[11px] text-primary font-medium">
                    {pricingPillar.citation}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rules List by Category */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-xs animate-pulse space-y-4">
                  <div className="h-6 w-1/3 bg-secondary rounded" />
                  <div className="h-4 w-2/3 bg-secondary/60 rounded" />
                  <div className="h-20 bg-secondary/40 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Active Categories with Rules */}
              {categoriesWithRules.map((category) => {
                const Icon = category.icon;
                const rulesInCat = filteredRules.filter(
                  (r) => (r.category || 'rent_increase_limits') === category.key
                );

                if (rulesInCat.length === 0 && activeCategoryFilter !== 'all') {
                  return null;
                }

                return (
                  <div key={category.key} className="space-y-4">
                    {/* Category Title Header */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-foreground">
                          {es ? category.es : category.en}
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          {es ? category.descriptionEs : category.descriptionEn}
                        </p>
                      </div>
                    </div>

                    {/* Rule Cards inside Category */}
                    <div className="grid gap-4">
                      {rulesInCat.map((rule) => {
                        const normStatus = (rule.result in STATUS_MAP ? rule.result : 'unknown') as RuleStatus;
                        const statusConfig = STATUS_MAP[normStatus];
                        const isTraceExpanded = expandedTraceRuleId === rule.team_rule_id;
                        const aiExplanation = aiExplanations[rule.team_rule_id];
                        const isExplainingThis = aiExplainingRuleId === rule.team_rule_id;

                        return (
                          <div
                            key={rule.team_rule_id}
                            className={`rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs hover:shadow-md transition-all border-l-4 ${statusConfig.cardBorderLeft}`}
                          >
                            {/* Card Top: Title, Citation, Status Badge */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-border/60">
                              <div className="space-y-1">
                                <h3 className="text-base sm:text-lg font-bold text-foreground font-display leading-snug">
                                  {rule.title || rule.team_rule_id}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                  <span className="font-semibold text-foreground/90">{rule.citation}</span>
                                  <span>·</span>
                                  <span className="font-mono text-[11px] text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded">
                                    {rule.team_rule_id}
                                  </span>
                                </div>
                              </div>
                              <StatusBadge status={rule.result} es={es} />
                            </div>

                            {/* Headline Key Parameter Pill (if defined) */}
                            {rule.key_value && (
                              <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-3.5 py-2 text-xs sm:text-sm font-semibold text-primary">
                                <Scale className="size-4 shrink-0 text-primary" />
                                <span><strong>{t('Key Limit:', 'Tope Clave:')}</strong> {rule.key_value}</span>
                              </div>
                            )}

                            {/* Plain-Language Requirement */}
                            <div className="mt-3 rounded-xl bg-secondary/30 p-4 text-sm sm:text-base leading-relaxed text-foreground font-normal">
                              <p>{rule.requirement || rule.explanation}</p>
                            </div>

                            {/* Statutory Exemptions Note */}
                            {rule.exemptions && (
                              <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-secondary/60 border border-border/80 px-3.5 py-2.5 text-xs text-muted-foreground">
                                <Info className="size-3.5 shrink-0 text-muted-foreground mt-0.5" />
                                <div>
                                  <span className="font-semibold text-foreground">{t('Exemptions & Exclusions:', 'Exenciones Legales:')} </span>
                                  <span>{rule.exemptions}</span>
                                </div>
                              </div>
                            )}

                            {/* Preemption / Conflict Callout */}
                            {rule.conflict_flag && (
                              <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 text-xs text-foreground">
                                <AlertTriangle className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                                <div>
                                  <span className="font-bold text-amber-800 dark:text-amber-200 block text-xs">
                                    {t('Layered Preemption / Stricter Municipal Rule', 'Preempción Jurisdiccional')}
                                  </span>
                                  <span className="text-muted-foreground mt-0.5 block leading-normal">
                                    {t(
                                      'Stricter municipal ordinance overrides baseline state law under California home rule authority.',
                                      'La ordenanza municipal más estricta prevalece sobre la norma estatal general.'
                                    )}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Missing Facts Callout */}
                            {rule.result === 'unknown' && (
                              <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs">
                                <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                                  <HelpCircle className="size-3.5" />
                                  {t('Building Facts Needed for Verdict', 'Faltan datos del inmueble')}
                                </span>
                                <p className="text-muted-foreground leading-normal">
                                  {t(
                                    'Assessor records do not confirm exact unit count or building completion date. Input units or year built in the search box above to determine applicability.',
                                    'Especifique las unidades o el año de construcción en el formulario superior para resolver la regla.'
                                  )}
                                </p>
                              </div>
                            )}

                            {/* AI Tenant/Landlord Breakdown */}
                            {aiExplanation && (
                              <div className="mt-4 rounded-2xl border border-purple-500/30 bg-purple-500/5 p-4 sm:p-5 space-y-3">
                                <div className="flex items-center justify-between border-b border-purple-500/20 pb-2">
                                  <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 text-xs sm:text-sm">
                                    <Sparkles className="size-4 text-purple-500" />
                                    {t('Anthropic Claude Plain-Language Breakdown', 'Análisis en Lenguaje Sencillo (Claude)')}
                                  </span>
                                  <span className="text-[11px] text-muted-foreground font-mono">
                                    {aiExplanation.citation}
                                  </span>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                  <div className="rounded-xl bg-card border border-border p-3.5 space-y-1 shadow-2xs">
                                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-foreground">
                                      <UserCheck className="size-4 text-emerald-500" />
                                      <span>{t('For Tenants (Rights & Relief)', 'Para Inquilinos')}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                      {aiExplanation.tenant_impact}
                                    </p>
                                  </div>

                                  <div className="rounded-xl bg-card border border-border p-3.5 space-y-1 shadow-2xs">
                                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-foreground">
                                      <Building2 className="size-4 text-blue-500" />
                                      <span>{t('For Landlords (Duties & Ceilings)', 'Para Propietarios')}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                      {aiExplanation.landlord_compliance}
                                    </p>
                                  </div>
                                </div>

                                <div className="pt-2 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2 border-t border-purple-500/10">
                                  <span>
                                    <strong>{t('Legal Effect:', 'Efecto Legal:')}</strong> {aiExplanation.key_takeaway}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setCopilotOpen(true)}
                                    className="text-purple-600 dark:text-purple-400 hover:underline font-bold text-xs"
                                  >
                                    {t('Ask Claude more →', 'Preguntar a Claude →')}
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Action Bar: Citation Pill, AI Explainer, Coverage Trace */}
                            <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => openSourceDrawer(rule.team_rule_id)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/80 px-3 py-1.5 font-medium text-xs text-foreground hover:bg-secondary hover:border-primary/50 transition-all shadow-2xs"
                                >
                                  <BookOpen className="size-3.5 text-primary" />
                                  <span>{rule.citation || 'Statutory Code'}</span>
                                  <ExternalLink className="size-3 text-muted-foreground ml-0.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleExplainWithAI(rule.team_rule_id)}
                                  disabled={isExplainingThis}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 font-bold text-xs text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-all"
                                >
                                  {isExplainingThis ? (
                                    <Loader2 className="size-3 animate-spin" />
                                  ) : (
                                    <Sparkles className="size-3 text-purple-500" />
                                  )}
                                  <span>
                                    {aiExplanation
                                      ? t('Hide AI Guide', 'Ocultar Guía IA')
                                      : t('Explain with AI', 'Explicar con IA')}
                                  </span>
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedTraceRuleId(isTraceExpanded ? null : rule.team_rule_id)
                                }
                                className="inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-foreground transition-colors text-xs"
                              >
                                <span>{t('Coverage Trace & Audit', 'Traza y Auditoría')}</span>
                                {isTraceExpanded ? (
                                  <ChevronUp className="size-3.5" />
                                ) : (
                                  <ChevronDown className="size-3.5" />
                                )}
                              </button>
                            </div>

                            {/* Expandable Coverage Trace Breakdown */}
                            {isTraceExpanded && (
                              <div className="mt-3 rounded-xl border border-border bg-secondary/30 p-4 text-xs space-y-3 font-mono">
                                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                                  <span className="font-bold text-foreground block text-[11px] uppercase tracking-wider">
                                    {t('Coverage Decision Logic (3-Valued Logic)', 'Lógica de Cobertura')}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground">ID: {rule.team_rule_id}</span>
                                </div>
                                <div className="text-xs font-sans text-muted-foreground bg-background/50 p-2.5 rounded-lg border border-border/40">
                                  <strong>{t('Engine Note:', 'Nota del Motor:')}</strong> {rule.explanation}
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground border-b border-border/50 pb-1.5">
                                  <span>Units: {units || 'unknown'} &ge; 2 (multi-family):</span>
                                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                    {units && parseInt(units, 10) >= 2 ? 'TRUE' : 'UNKNOWN'}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground border-b border-border/50 pb-1.5">
                                  <span>Built: {yearBuilt || 'unknown'} &gt; 15 years old (rolling window):</span>
                                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                    {yearBuilt && 2026 - parseInt(yearBuilt, 10) >= 15 ? 'TRUE' : 'UNKNOWN'}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-muted-foreground">
                                  <span>Jurisdiction stack match ({jurisdictionStack.map((s) => s.name).join(' > ')}):</span>
                                  <span className="font-bold text-emerald-600 dark:text-emerald-400">MATCH</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Zero Municipal Rules State */}
              {evaluatedRules.length === 0 && (
                <div className="rounded-2xl border border-border/80 bg-card p-6 text-center space-y-3">
                  <div className="mx-auto size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Scale className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {t('Standard Statewide Baseline Applies', 'Rige el Marco Legal Estatal')}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
                    {t(
                      `No local municipal rent stabilization or extra-statutory eviction restrictions are registered for this municipality in the current local ordinance corpus. Tenancies at this address are governed directly by ${
                        currentState === 'NJ'
                          ? 'New Jersey statewide tenancy statutes (N.J.S.A. 2A:18-61 Anti-Eviction Act & Security Deposit Law)'
                          : currentState === 'MA'
                          ? 'Massachusetts General Laws (M.G.L. c. 186 Landlord-Tenant & c. 239 Summary Process)'
                          : 'California statewide tenancy baseline (Civil Code §§ 1946.2 Just Cause & 1947.12 Rent Cap - AB 1482)'
                      }.`,
                      `No se registran ordenanzas locales adicionales en el corpus legal para este municipio. Aplica directamente el marco regulatorio del estado.`
                    )}
                  </p>
                </div>
              )}

              {/* Compact Summary for Other Checked Categories */}
              {categoriesStandard.length > 0 && activeCategoryFilter === 'all' && (
                <div className="rounded-2xl border border-border/70 bg-secondary/20 p-5 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <BadgeCheck className="size-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-foreground">
                        {t('Other Housing Categories Checked', 'Otras Categorías Verificadas')}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {t(
                          `No special municipal restrictions found for ${categoriesStandard
                            .map((c) => (es ? c.shortEs : c.shortEn))
                            .join(', ')}. Standard statewide statutes apply with no local caps.`,
                          `No se encontraron restricciones municipales adicionales para ${categoriesStandard
                            .map((c) => (es ? c.shortEs : c.shortEn))
                            .join(', ')}. Rigen las leyes estatales estándar.`
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TRD 9.5 Source Drawer: Verbatim Highlighting Component */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-card border-l border-border h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t('Source Law Verbatim Viewer', 'Visor de Cita Legal Verbatim')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Body */}
              <div className="mt-6">
                {sourceLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground space-y-3">
                    <Loader2 className="size-6 animate-spin text-primary" />
                    <span className="text-xs">{t('Retrieving statute slice...', 'Obteniendo texto legal...')}</span>
                  </div>
                ) : sourceError ? (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-600 dark:text-red-400">
                    {sourceError}
                  </div>
                ) : sourceData ? (
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-mono text-primary font-bold">
                        {sourceData.rule_id}
                      </span>
                      <h3 className="text-base font-bold mt-0.5">{sourceData.citation}</h3>
                      {sourceData.doc_id && (
                        <span className="text-xs text-muted-foreground block mt-0.5">
                          Corpus Document: <span className="font-mono font-medium">{sourceData.doc_id}</span>
                        </span>
                      )}
                    </div>

                    {/* Exact TRD 9.5 SourceText Highlighting */}
                    <div className="rounded-xl border border-border bg-secondary/30 p-4 text-xs leading-relaxed max-h-[460px] overflow-y-auto">
                      <p className="whitespace-pre-wrap font-serif text-sm">
                        <span className="text-muted-foreground">{sourceData.text_before}</span>
                        <mark
                          id="quote"
                          className="bg-amber-200 dark:bg-amber-900/60 dark:text-amber-100 px-1 py-0.5 rounded font-semibold border-b-2 border-amber-500 shadow-2xs"
                        >
                          {sourceData.quote}
                        </mark>
                        <span className="text-muted-foreground">{sourceData.text_after}</span>
                      </p>
                    </div>

                    <div className="text-[11px] text-muted-foreground space-y-1">
                      <p className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3.5" />
                        {t('Verified exact substring match (&ge; 20 chars)', 'Cita textual verificada')}
                      </p>
                      <p>
                        {t(
                          'The quote above is an exact character-for-character substring of the stored government housing statute.',
                          'El texto resaltado es una subcadena exacta del código legal oficial.'
                        )}
                      </p>
                    </div>

                    {sourceData.source_url && (
                      <div className="pt-2">
                        <a
                          href={sourceData.source_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
                        >
                          <span>{t('View Official Government Source Document', 'Ver Fuente Oficial del Gobierno')}</span>
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-border pt-4 mt-6 flex justify-between items-center text-xs">
              <span className="text-muted-foreground font-mono">TRD 9.5 Quote Viewer</span>
              <Button variant="outline" size="sm" onClick={() => setDrawerOpen(false)}>
                {t('Close', 'Cerrar')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Page-level AI Copilot Drawer */}
      <AICopilotDrawer
        open={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        addressContext={address}
        activeRules={evaluatedRules}
      />
    </div>
  );
}

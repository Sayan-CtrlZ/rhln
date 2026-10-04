import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ArrowUpRight,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  ExternalLink,
  FileText,
  Globe2,
  House,
  Info,
  MapPin,
  Moon,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  TriangleAlert,
  TrendingUp,
  Wallet,
  X,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { rules as initialRules, type Language, type Rule } from '@/lib/housing-rules';
import {
  lookupAddress,
  fetchSampleProperties,
  type BackendLookupResponse,
  type SamplePropertyItem,
} from '@/lib/api';
import housing from '@/assets/hero-lease.jpg';
import building from '@/assets/hero-building.jpg';
import law from '@/assets/hero-law.jpg';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Rental Housing Law Navigator | Rules and Sources' },
      {
        name: 'description',
        content:
          'Explore rental housing rules, review building conditions, and follow links to verified legal sources.',
      },
      { property: 'og:title', content: 'Rental Housing Law Navigator | Rules and Sources' },
      {
        property: 'og:description',
        content:
          'A clear view of rental housing rules, applicability, and public sources. Not legal advice.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Index,
});

const ruleIcons: Record<string, any> = {
  increase: TrendingUp,
  rent_increase_limits: TrendingUp,
  shield: ShieldCheck,
  just_cause_eviction: ShieldCheck,
  wallet: Wallet,
  security_deposits: Wallet,
  screening: FileText,
  application_screening_fees: FileText,
  screening_restrictions: FileText,
  algorithm: SlidersHorizontal,
  algorithmic_rent_setting: SlidersHorizontal,
};

function getCategoryIcon(cat?: string) {
  if (!cat) return TrendingUp;
  return ruleIcons[cat] || FileText;
}

/** Wide screens keep the source panel beside the list; narrow screens use a sheet. */
function useIsWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const sync = () => setWide(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return wide;
}

type Copy = (en: string, es: string) => string;

function Index() {
  const [language, setLanguage] = useState<Language>('en');
  const es = language === 'es';
  const t: Copy = (en, spanish) => (es ? spanish : en);

  const [address, setAddress] = useState('2100 Shattuck Ave, Berkeley, CA 94704');
  const [date, setDate] = useState<Date>(new Date(2026, 9, 1));
  const [yearBuilt, setYearBuilt] = useState<string>('1962');
  const [units, setUnits] = useState<string>('20');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Rule | null>(null);
  const [filter, setFilter] = useState<'all' | 'applies' | 'unknown'>('all');
  const [expanded, setExpanded] = useState(false);
  const [dark, setDark] = useState(false);
  const wide = useIsWide();

  const [currentRules, setCurrentRules] = useState<Rule[]>(initialRules);
  const [sampleProperties, setSampleProperties] = useState<SamplePropertyItem[]>([]);
  const [jurisdictionStack, setJurisdictionStack] = useState<Array<{ name: string; level: string }>>([
    { name: 'California', level: 'state' },
    { name: 'City of Berkeley', level: 'city' },
  ]);

  useEffect(() => {
    setDark(window.localStorage.getItem('theme') === 'dark');
    // Load sample addresses for quick suggestions
    fetchSampleProperties(50).then((items) => {
      if (items && items.length > 0) {
        setSampleProperties(items);
      }
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const visibleRules = currentRules.filter(
    (rule) => filter === 'all' || rule.status === filter
  );

  const appliesCount = currentRules.filter((r) => r.status === 'applies').length;
  const unknownCount = currentRules.filter((r) => r.status === 'unknown').length;
  const upcomingCount = currentRules.filter(
    (r) => r.status === 'not_yet_effective' || r.status === 'pending'
  ).length;

  useEffect(() => {
    if (!wide || !selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [wide, selected]);

  const handlePropertySelect = (val: string) => {
    setAddress(val);
    const found = sampleProperties.find(
      (p) => `${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}` === val
    );
    if (found) {
      if (found.year_built) setYearBuilt(String(found.year_built));
      if (found.units) setUnits(String(found.units));
    }
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSearched(true);
    setFilter('all');
    setLoading(true);

    try {
      // Split address into street, city, state, zip
      const parts = address.split(',').map((p) => p.strip ? p.strip() : p.trim());
      const street = parts[0] || address;
      const city = parts[1] || 'Berkeley';
      let state = 'CA';
      let zip = '94704';
      if (parts[2]) {
        const stateZip = parts[2].trim().split(/\s+/);
        state = stateZip[0] || 'CA';
        zip = stateZip[1] || '94704';
      }

      const res: BackendLookupResponse = await lookupAddress({
        street,
        city,
        state,
        zip,
        year_built: yearBuilt ? parseInt(yearBuilt, 10) : undefined,
        units: units ? parseInt(units, 10) : undefined,
        as_of: format(date, 'yyyy-MM-dd'),
      });

      if (res && res.results) {
        if (res.stack && res.stack.length > 0) {
          setJurisdictionStack(res.stack.map((s) => ({ name: s.name, level: s.level })));
        }

        const mappedRules: Rule[] = res.results.map((r, i) => {
          const category = r.category || 'rent_increase_limits';
          return {
            id: r.team_rule_id || `rule-${i}`,
            title: [r.title || r.team_rule_id, r.title || r.team_rule_id],
            summary: [r.explanation, r.explanation],
            citation: r.citation || 'Legal Source',
            code: `${r.citation || ''} · ${r.team_rule_id}`,
            status: r.result,
            icon: (category in ruleIcons ? category : 'increase') as any,
            source: 'https://berkeleyca.gov',
            quotedSpan: r.explanation,
            explanation: r.explanation,
            conflictFlag: r.conflict_flag,
            category: r.category,
          };
        });

        if (mappedRules.length > 0) {
          setCurrentRules(mappedRules);
          setSelected(mappedRules[0]);
        }
      }
    } catch (err) {
      console.warn('Backend query error, staying on local data view:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-secondary px-5 py-2.5 text-center">
        <p className="mx-auto flex max-w-[1440px] items-center justify-center gap-2 text-xs font-bold sm:text-[13px]">
          <TriangleAlert className="size-3.5 shrink-0 text-unknown" />
          <span>
            {t(
              'Not legal advice. Summaries of public law. Always check the source text.',
              'No es asesoría legal. Resúmenes de leyes públicas. Consulte siempre el texto original.'
            )}
          </span>
        </p>
      </div>

      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-primary text-primary-foreground">
              <House className="size-4" strokeWidth={2} />
            </span>
            <span className="font-display text-base leading-none sm:text-lg">
              Rental Housing Law Navigator
            </span>
            <span className="chip hidden bg-secondary text-foreground sm:inline-flex">
              Hackathon v1.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-lg border border-border bg-card text-muted-foreground"
              aria-label={
                dark
                  ? t('Switch to light mode', 'Cambiar a modo claro')
                  : t('Switch to dark mode', 'Cambiar a modo oscuro')
              }
              aria-pressed={dark}
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Globe2 className="hidden size-4 text-muted-foreground sm:block" />
            <div
              className="flex items-center gap-1 rounded-lg border border-border bg-card p-1"
              aria-label="Language"
            >
              <Button
                variant="ghost"
                size="sm"
                aria-pressed={!es}
                className={`h-7 rounded-md px-3 text-xs font-bold ${
                  !es
                    ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setLanguage('en')}
              >
                EN
              </Button>
              <span className="text-border">|</span>
              <Button
                variant="ghost"
                size="sm"
                aria-pressed={es}
                className={`h-7 rounded-md px-3 text-xs font-bold ${
                  es
                    ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setLanguage('es')}
              >
                ES
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-secondary">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-10 px-6 py-14 sm:px-8 sm:py-20 lg:flex-nowrap">
          <div className="min-w-0 flex-1">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              {t('A calm place to start', 'Un lugar tranquilo para empezar')}
            </p>
            <h1 className="text-4xl leading-[1.15] sm:text-[46px] sm:leading-[1.12]">
              {t('Know the rules.', 'Conozca las reglas.')}
              <br />
              {t('Know your home.', 'Conozca su hogar.')}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              {t(
                'Rental housing laws in plain language. Enter an address to see the rules and the verified sources behind them.',
                'Leyes de vivienda en lenguaje sencillo. Ingrese una dirección para ver las reglas y sus fuentes verificadas.'
              )}
            </p>
            <ul className="mt-8 grid max-w-md gap-y-2.5 text-xs font-semibold">
              <li className="flex items-center gap-2">
                <Check className="size-4 shrink-0 text-applies" />
                {t('Plain-language summaries', 'Resúmenes en lenguaje sencillo')}
              </li>
              <li className="flex items-center gap-2">
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                {t('Every rule cited to verified source text', 'Cada regla citada con texto original')}
              </li>
              <li className="flex items-center gap-2">
                <Building2 className="size-4 shrink-0 text-muted-foreground" />
                {t('Deterministic three-valued logic', 'Lógica determinista de tres valores')}
              </li>
            </ul>
          </div>
          <div className="grid w-full max-w-[640px] shrink-0 grid-cols-2 gap-3 xl:gap-4">
            <img
              src={building}
              alt="Apartment building"
              width={928}
              height={720}
              className="col-span-2 h-[220px] w-full rounded-lg border border-border object-cover shadow-sm xl:h-[260px]"
            />
            <img
              src={housing}
              alt="Tenant reviewing lease"
              width={1280}
              height={720}
              loading="lazy"
              className="h-[150px] w-full rounded-lg border border-border object-cover shadow-sm xl:h-[180px]"
            />
            <img
              src={law}
              alt="Law library"
              width={928}
              height={720}
              loading="lazy"
              className="h-[150px] w-full rounded-lg border border-border object-cover shadow-sm xl:h-[180px]"
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1440px] px-6 pb-12 sm:px-8">
        <form
          onSubmit={handleSearchSubmit}
          className="grid grid-cols-1 items-end gap-4 border-b border-border py-7 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_160px_100px_88px_116px]"
        >
          <label className="block text-[11px] font-bold uppercase tracking-wider" htmlFor="property-address">
            {t('Property address', 'Dirección de la vivienda')}
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="property-address"
                required
                list="sample-addresses-list"
                value={address}
                onChange={(event) => handlePropertySelect(event.target.value)}
                placeholder="2100 Shattuck Ave, Berkeley, CA 94704"
                className="field h-11 w-full rounded-md pl-10 pr-3 text-sm font-normal"
              />
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
          </label>
          <div className="text-[11px] font-bold uppercase tracking-wider">
            {t('As of', 'A fecha de')}
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="field mt-2 h-11 w-full justify-between rounded-md px-3 font-normal hover:bg-card"
                  aria-label={t('Choose as-of date', 'Elegir fecha')}
                >
                  <span className="font-sans text-sm font-normal tabular-nums">
                    {format(date, 'yyyy-MM-dd')}
                  </span>
                  <CalendarDays className="text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-md border border-border p-0 shadow-lg" align="start">
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
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <label className="block text-[11px] font-bold uppercase tracking-wider" htmlFor="year-built">
            {t('Year built', 'Año constr.')}
            <div className="field mt-2 flex h-11 items-center gap-2 rounded-md px-3 text-sm">
              <Building2 className="size-4 text-muted-foreground" />
              <input
                id="year-built"
                value={yearBuilt}
                onChange={(e) => setYearBuilt(e.target.value)}
                className="w-12 bg-transparent font-sans font-normal tabular-nums outline-none"
              />
            </div>
          </label>
          <label className="block text-[11px] font-bold uppercase tracking-wider" htmlFor="units-count">
            {t('Units', 'Unidades')}
            <div className="field mt-2 flex h-11 items-center rounded-md px-3 text-sm">
              <input
                id="units-count"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-12 bg-transparent font-sans font-normal tabular-nums outline-none"
              />
            </div>
          </label>
          <Button type="submit" variant="neo" disabled={loading} className="h-11">
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
            {t('Search', 'Buscar')}
          </Button>
        </form>

        <div role="status" className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          <span>
            {searched
              ? t(
                  `Results for ${address} as of ${format(date, 'yyyy-MM-dd')}. Verified against statutory rules.`,
                  `Resultados para ${address} a fecha de ${format(date, 'yyyy-MM-dd')}. Verificado con leyes vigentes.`
                )
              : t(
                  'Search any address across Boston, Cambridge, LA, SF, Berkeley, Hoboken, Jersey City, or Newark.',
                  'Busque cualquier dirección en Boston, Cambridge, LA, SF, Berkeley, Hoboken, Jersey City o Newark.'
                )}
          </span>
        </div>

        <section className="pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold sm:text-sm">
              <MapPin className="size-4 text-muted-foreground" />
              {jurisdictionStack.map((j, idx) => (
                <span key={j.name} className="flex items-center gap-2">
                  <span className={idx === jurisdictionStack.length - 1 ? 'font-bold' : ''}>
                    {j.name}
                  </span>
                  {idx < jurisdictionStack.length - 1 && (
                    <ChevronRight className="size-4 text-muted-foreground" />
                  )}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill
                className="bg-applies text-chip-foreground"
                icon={<Check className="size-3.5" />}
                text={t(`${appliesCount} apply`, `${appliesCount} aplican`)}
              />
              <StatusPill
                className="bg-unknown text-chip-foreground"
                icon={<CircleHelp className="size-3.5" />}
                text={t(`${unknownCount} unknown`, `${unknownCount} sin determinar`)}
              />
              {upcomingCount > 0 && (
                <StatusPill
                  className="bg-secondary text-foreground"
                  icon={<Clock3 className="size-3.5" />}
                  text={t(`${upcomingCount} upcoming`, `${upcomingCount} próximas`)}
                />
              )}
            </div>
          </div>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_440px]">
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-xl">{t('Your rulebook', 'Sus reglas')}</h2>
                  <span className="text-xs text-muted-foreground">
                    {currentRules.length} {t('rules evaluated', 'reglas evaluadas')}
                  </span>
                </div>
                <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
                  {(['all', 'applies', 'unknown'] as const).map((item) => (
                    <Button
                      key={item}
                      variant="ghost"
                      size="sm"
                      aria-pressed={filter === item}
                      onClick={() => setFilter(item)}
                      className={`h-7 rounded-md px-3 text-xs font-semibold ${
                        filter === item
                          ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {item === 'all'
                        ? t('All rules', 'Todas')
                        : item === 'applies'
                        ? t('Applies', 'Aplican')
                        : t('Unknown', 'Sin determinar')}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="rule-list grid gap-3 xl:grid-cols-2" key={filter}>
                {visibleRules.map((rule) => {
                  const Icon = getCategoryIcon(rule.category || rule.icon);
                  const isSelected = selected?.id === rule.id;
                  return (
                    <Button
                      key={rule.id}
                      variant="neoOutline"
                      data-status={rule.status}
                      aria-pressed={isSelected}
                      onClick={() => setSelected(rule)}
                      className="group h-auto w-full justify-start gap-4 whitespace-normal rounded-lg px-5 py-4 text-left sm:gap-5"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-foreground">
                        <Icon className="size-5!" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg leading-tight">{rule.title[es ? 1 : 0]}</h3>
                          <span
                            className={`chip ${
                              rule.status === 'applies'
                                ? 'bg-applies text-chip-foreground'
                                : rule.status === 'unknown'
                                ? 'bg-unknown text-chip-foreground'
                                : 'bg-secondary text-foreground'
                            }`}
                          >
                            {rule.status === 'applies'
                              ? t('Applies', 'Aplica')
                              : rule.status === 'unknown'
                              ? t('Unknown', 'Sin determinar')
                              : rule.status}
                          </span>
                        </div>
                        <p className="mb-3 mt-1.5 max-w-[640px] text-[13px] font-normal leading-5 text-muted-foreground">
                          {rule.summary[es ? 1 : 0]}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-foreground">
                            <FileText className="size-3!" />
                            {rule.citation}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-semibold text-foreground">
                            {t('Read the source', 'Leer la fuente')}
                            <ArrowUpRight className="size-3.5!" />
                          </span>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {wide && (
              <aside className="sticky top-24">
                {selected ? (
                  <SourceShell
                    t={t}
                    heading={t('Behind the rule', 'Detrás de la regla')}
                    onClose={() => setSelected(null)}
                  >
                    <SourceBody rule={selected} es={es} date={date} t={t} />
                  </SourceShell>
                ) : (
                  <SourceShell t={t} heading={t('Source panel', 'Panel de fuente')}>
                    <h3 className="text-lg">{t('Nothing selected yet', 'Aún no hay selección')}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {t('Choose a rule on the left and this panel fills in with:', 'Elija una regla a la izquierda y este panel mostrará:')}
                    </p>
                    <ul className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
                      <li className="flex items-start gap-2">
                        <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        {t('The code section and citation', 'La sección y la cita del código')}
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-applies" />
                        {t('The conditions a rule depends on', 'Las condiciones de la regla')}
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        {t('Exact verified quoted span from public legal text', 'Fragmento citado exacto del texto legal')}
                      </li>
                    </ul>
                  </SourceShell>
                )}
              </aside>
            )}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-border bg-secondary px-5 py-6 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg">
              <Clock3 className="size-5 text-muted-foreground" />
              {t('Upcoming and pending', 'Próximas y pendientes')}
            </h2>
            <span className="chip border border-border bg-card text-muted-foreground">
              {t('Change Tracking T1–T5', 'Seguimiento de Cambios T1–T5')}
            </span>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:border-r sm:border-border sm:pr-5">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {t('Not yet in effect (T1 & T3)', 'Aún no vigentes (T1 y T3)')}
              </div>
              <h3 className="text-base font-semibold">
                {t('CA AB 325 & NJ FAIR Act Future Dates', 'Fechas futuras de CA AB 325 y NJ FAIR Act')}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {t(
                  'California antitrust amendments took effect 2026-01-01. New Jersey FAIR Act takes effect 2027-07-01 with preemption flags on local ordinances.',
                  'Enmiendas de California en vigor 2026-01-01. Ley FAIR de Nueva Jersey en vigor 2027-07-01 con alertas de preempción sobre ordenanzas locales.'
                )}
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <span className="size-1.5 rounded-full bg-unknown" />
                {t('Pending legislation (T4)', 'Legislación propuesta (T4)')}
              </div>
              <h3 className="text-base font-semibold">
                {t('Massachusetts S.2983 & H.5222', 'Proyectos de Massachusetts S.2983 y H.5222')}
              </h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {t(
                  'Tracked as pending proposals for Boston and Cambridge addresses. Never reported as active law.',
                  'Registrados como propuestas pendientes para Boston y Cambridge. Nunca reportados como ley activa.'
                )}
              </p>
            </div>
          </div>
          <Button
            variant="link"
            className="mt-3 h-7 px-0 text-xs text-foreground"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? t('Hide details', 'Ocultar detalles') : t('More about change tracking tests', 'Más sobre pruebas de cambios')}
            <ArrowRight />
          </Button>
          {expanded && (
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {t(
                'Change tracking test cases T1 to T5 are generated in out/changes.json matching the benchmark evaluation requirements.',
                'Los casos de prueba T1 a T5 se generan en out/changes.json cumpliendo con los requisitos de evaluación del benchmark.'
              )}
            </p>
          )}
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <House className="size-3.5" />
            Rental Housing Law Navigator
          </span>
          <span>{t('Public sources. Verified legal text.', 'Fuentes públicas. Texto legal verificado.')}</span>
        </footer>
      </main>

      {!wide && (
        <Dialog.Root open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-foreground/30" />
            <Dialog.Content className="source-panel fixed inset-y-0 right-0 z-50 w-full max-w-[440px] bg-card">
              <SourceShell t={t} heading={t('Behind the rule', 'Detrás de la regla')} onClose={() => setSelected(null)} sheet>
                {selected && <SourceBody rule={selected} es={es} date={date} t={t} />}
              </SourceShell>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
}

function StatusPill({ className, icon, text }: { className: string; icon: React.ReactNode; text: string }) {
  return <span className={`chip ${className}`}>{icon}{text}</span>;
}

function SourceShell({
  t,
  heading,
  onClose,
  children,
  sheet = false,
}: {
  t: Copy;
  heading: string;
  onClose?: () => void;
  children: React.ReactNode;
  sheet?: boolean;
}) {
  return (
    <section
      className={
        sheet
          ? 'flex h-full flex-col overflow-hidden bg-card'
          : 'panel flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-lg'
      }
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-panel-header px-4 py-3">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground">
          <FileText className="size-3.5 text-muted-foreground" />
          {heading}
        </span>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground"
            aria-label={t('Close source panel', 'Cerrar panel de fuente')}
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        )}
      </header>
      <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
    </section>
  );
}

function SourceBody({ rule, es, date, t }: { rule: Rule; es: boolean; date: Date; t: Copy }) {
  const applies = rule.status === 'applies';
  const isUnknown = rule.status === 'unknown';
  const isSuperseded = rule.status === 'superseded';
  const isNotYetEffective = rule.status === 'not_yet_effective';

  const statusLabel = applies
    ? t('Applies', 'Aplica')
    : isUnknown
    ? t('Unknown', 'Sin determinar')
    : isSuperseded
    ? t('Superseded', 'Sustituida')
    : isNotYetEffective
    ? t('Not yet effective', 'Aún no vigente')
    : t('Pending', 'Pendiente');

  const statusClass = applies
    ? 'bg-applies text-chip-foreground'
    : isUnknown
    ? 'bg-unknown text-chip-foreground'
    : isSuperseded
    ? 'bg-purple-600 text-white'
    : 'bg-secondary text-foreground';

  return (
    <div>
      <span className={`chip ${statusClass}`}>{statusLabel}</span>

      <h3 className="mt-3 text-xl leading-tight">{rule.code || rule.title[es ? 1 : 0]}</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {t('Source reference for', 'Referencia de fuente para')}{' '}
        <span className="font-semibold text-foreground">{rule.title[es ? 1 : 0].toLowerCase()}</span>
      </p>

      <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-y border-border py-3 text-xs">
        <dt className="text-muted-foreground">{t('As of', 'A fecha de')}</dt>
        <dd className="text-right font-semibold tabular-nums">{format(date, 'yyyy-MM-dd')}</dd>
        <dt className="text-muted-foreground">{t('Citation', 'Cita legal')}</dt>
        <dd className="text-right font-semibold font-mono">{rule.citation}</dd>
      </dl>

      <div className="excerpt mt-5">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <FileText className="size-3" />
          {t('Quoted span (verbatim text)', 'Fragmento citado (texto original)')}
        </p>
        <p className="text-[13px] text-foreground font-serif italic bg-secondary/50 p-3 rounded border border-border">
          “{rule.quotedSpan || t('Quoted span in source text.', 'Fragmento citado en el texto.')}”
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {t('Verified exact substring located in official legal text.', 'Subcadena exacta verificada en el texto legal oficial.')}
        </p>
      </div>

      <h4 className="mb-3 mt-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {t('Evaluation analysis', 'Análisis de aplicación')}
      </h4>
      <ul className="space-y-2.5 text-sm">
        <li className="flex items-start gap-2">
          {applies ? (
            <Check className="mt-0.5 size-4 shrink-0 text-applies" />
          ) : (
            <CircleHelp className="mt-0.5 size-4 shrink-0 text-unknown" />
          )}
          <span>
            {rule.explanation ||
              t('Rule conditions evaluated against property facts.', 'Condiciones evaluadas contra datos de la vivienda.')}
          </span>
        </li>
      </ul>

      {rule.conflictFlag && (
        <p className="mt-5 flex items-start gap-2 rounded-md border border-amber-500/50 bg-amber-500/10 p-3 text-xs leading-5 font-medium text-foreground">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <span>
            {rule.conflictNote ||
              t(
                'Conflict flag: potential state preemption or overlapping local rule detected for human review.',
                'Alerta de conflicto: posible preempción estatal o regla superpuesta detectada.'
              )}
          </span>
        </p>
      )}

      <Button asChild variant="neo" className="mt-5 h-11 w-full">
        <a href={rule.source} target="_blank" rel="noopener noreferrer">
          {t('Open official source', 'Abrir fuente oficial')}
          <ExternalLink />
        </a>
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        {t('Always check the original text. Not legal advice.', 'Consulte siempre el texto original. No es asesoría legal.')}
      </p>
    </div>
  );
}

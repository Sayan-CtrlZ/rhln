import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import {
  History,
  Download,
  ArrowRight,
  TriangleAlert,
  CheckCircle2,
  CalendarClock,
  MapPinned,
  FileClock,
  Ban,
  Scale,
  Search,
  ExternalLink,
  Info,
  Building2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { useLang } from './__root';
import {
  fetchChangeCases,
  fetchChangeCaseDetail,
  fetchSampleProperties,
  EXPORT_URLS,
  type ChangeCaseItem,
  type ChangeCaseDetail,
  type SamplePropertyItem,
} from '@/lib/api';

/* ------------------------------------------------------------------------- */
/* Scenario metadata (describes what kind of legal change each case models)  */
/* ------------------------------------------------------------------------- */

type ScenarioKind = 'effective' | 'boundary' | 'conflict' | 'pending' | 'struck';

interface ScenarioMeta {
  kind: ScenarioKind;
  label: [string, string];
  before: string;
  after: string;
  question: [string, string];
}

const SCENARIO_META: Record<string, ScenarioMeta> = {
  T1: {
    kind: 'effective',
    label: ['Law Takes Effect', 'Entrada en Vigor'],
    before: 'not_yet_effective',
    after: 'applies',
    question: [
      'Does the engine flip status exactly on the effective date?',
      '¿Cambia el estado exactamente en la fecha de vigencia?',
    ],
  },
  T2: {
    kind: 'boundary',
    label: ['Municipal Boundary', 'Límite Municipal'],
    before: 'applies',
    after: 'applies',
    question: [
      'Are city ordinances applied only inside city limits (not by postal code or county)?',
      '¿Se aplican las ordenanzas solo dentro de los límites de la ciudad?',
    ],
  },
  T3: {
    kind: 'conflict',
    label: ['Preemption Conflict', 'Conflicto de Preferencia'],
    before: 'not_yet_effective',
    after: 'applies',
    question: [
      'Does a future state law get flagged for review where it may preempt local law?',
      '¿Se marca para revisión una ley estatal futura que puede anular la local?',
    ],
  },
  T4: {
    kind: 'pending',
    label: ['Pending Bill', 'Proyecto Pendiente'],
    before: 'pending',
    after: 'pending',
    question: [
      'Are unenacted bills reported as pending, never as binding law?',
      '¿Se reportan los proyectos no aprobados como pendientes y no como ley?',
    ],
  },
  T5: {
    kind: 'struck',
    label: ['Struck Down', 'Anulada'],
    before: '',
    after: '',
    question: [
      'Does a law struck by a court produce zero affected addresses?',
      '¿Una ley anulada por un tribunal produce cero direcciones afectadas?',
    ],
  },
  T6: {
    kind: 'effective',
    label: ['Live Cambridge Ordinance (Hour 16)', 'Ordenanza de Cambridge (Hora 16)'],
    before: 'not_yet_effective',
    after: 'applies',
    question: [
      'Can the system extract an unseen ordinance unaided and evaluate future effective dates across all Cambridge addresses?',
      '¿Puede el sistema extraer una ordenanza no vista de forma autónoma y evaluar fechas futuras en Cambridge?',
    ],
  },
};

const KIND_STYLE: Record<ScenarioKind, { icon: typeof History; chip: string; bar: string; accent: string }> = {
  effective: {
    icon: CalendarClock,
    chip: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25',
    bar: 'bg-emerald-500',
    accent: 'border-l-emerald-500',
  },
  boundary: {
    icon: MapPinned,
    chip: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25',
    bar: 'bg-sky-500',
    accent: 'border-l-sky-500',
  },
  conflict: {
    icon: Scale,
    chip: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25',
    bar: 'bg-amber-500',
    accent: 'border-l-amber-500',
  },
  pending: {
    icon: FileClock,
    chip: 'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/25',
    bar: 'bg-violet-500',
    accent: 'border-l-violet-500',
  },
  struck: {
    icon: Ban,
    chip: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25',
    bar: 'bg-rose-500',
    accent: 'border-l-rose-500',
  },
};

const TOTAL_ADDRESSES = 500;
const PAGE_SIZE = 20;

const STATE_NAMES: Record<string, string> = {
  CA: 'California',
  NJ: 'New Jersey',
  MA: 'Massachusetts',
};

function stateName(code?: string) {
  if (!code) return '';
  return STATE_NAMES[code.toUpperCase()] || code;
}

/* ------------------------------------------------------------------------- */
/* Status pill                                                               */
/* ------------------------------------------------------------------------- */

const STATUS_STYLE: Record<string, { cls: string; label: [string, string] }> = {
  applies: {
    cls: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    label: ['Applies', 'Aplica'],
  },
  not_yet_effective: {
    cls: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    label: ['Not Yet Effective', 'Aún No Vigente'],
  },
  pending: {
    cls: 'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20',
    label: ['Pending Bill', 'Pendiente'],
  },
  unknown: {
    cls: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
    label: ['Unknown', 'Desconocido'],
  },
  superseded: {
    cls: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
    label: ['Superseded', 'Reemplazada'],
  },
};

function StatusPill({ status }: { status: string }) {
  const { t } = useLang();
  const s = STATUS_STYLE[status];
  if (!s) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary text-foreground font-mono text-[11px]">
        {status}
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold border text-[11px] whitespace-nowrap ${s.cls}`}>
      {status === 'applies' && <CheckCircle2 className="size-3" />}
      {t(s.label[0], s.label[1])}
    </span>
  );
}

/* ------------------------------------------------------------------------- */
/* Page                                                                      */
/* ------------------------------------------------------------------------- */

export const Route = createFileRoute('/changes')({
  component: ChangesPage,
});

function ChangesPage() {
  const { t } = useLang();

  const [changeCases, setChangeCases] = useState<ChangeCaseItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, ChangeCaseDetail>>({});
  const [properties, setProperties] = useState<Record<string, SamplePropertyItem>>({});
  const [loadingCases, setLoadingCases] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [query, setQuery] = useState('');
  const [onlyConflicts, setOnlyConflicts] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchChangeCases().then((cases) => {
      setChangeCases(cases);
      if (cases[0]) setSelectedId(cases[0].case_id);
      setLoadingCases(false);
    });
    fetchSampleProperties(TOTAL_ADDRESSES).then((items) => {
      const map: Record<string, SamplePropertyItem> = {};
      items.forEach((p) => (map[p.address_id] = p));
      setProperties(map);
    });
  }, []);

  useEffect(() => {
    if (!selectedId || details[selectedId]) return;
    setLoadingDetail(true);
    fetchChangeCaseDetail(selectedId).then((d) => {
      if (d) setDetails((prev) => ({ ...prev, [selectedId]: d }));
      setLoadingDetail(false);
    });
  }, [selectedId, details]);

  useEffect(() => {
    setQuery('');
    setOnlyConflicts(false);
    setPage(0);
  }, [selectedId]);

  const selectedCase = changeCases.find((c) => c.case_id === selectedId) || null;
  const detail = selectedId ? details[selectedId] : undefined;
  const meta = selectedId ? SCENARIO_META[selectedId] : undefined;
  const style = meta ? KIND_STYLE[meta.kind] : KIND_STYLE.effective;

  const conflictSet = useMemo(
    () => new Set(detail?.conflict_flag_address_ids || []),
    [detail]
  );

  const affectedRows = useMemo(() => {
    const ids = detail?.affected_address_ids || [];
    return ids.map((id) => ({ id, prop: properties[id], conflict: conflictSet.has(id) }));
  }, [detail, properties, conflictSet]);

  const cityBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    affectedRows.forEach((r) => {
      const city = r.prop?.postal_city || t('Unknown', 'Desconocida');
      counts[city] = (counts[city] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [affectedRows, t]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return affectedRows.filter((r) => {
      if (onlyConflicts && !r.conflict) return false;
      if (!q) return true;
      return (
        r.id.toLowerCase().includes(q) ||
        r.prop?.street_address.toLowerCase().includes(q) ||
        r.prop?.postal_city.toLowerCase().includes(q) ||
        r.prop?.zip.includes(q)
      );
    });
  }, [affectedRows, query, onlyConflicts]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const pagedRows = filteredRows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const totalConflicts = changeCases.reduce((acc, c) => acc + (c.conflict_count || 0), 0);
  const totalImpacts = changeCases.reduce((acc, c) => acc + c.affected_address_count, 0);
  const hasDateShift = !!(selectedCase?.as_of_before && selectedCase?.as_of_after);

  const lookupHref = (p?: SamplePropertyItem) => {
    if (!p) return '/lookup';
    const params = new URLSearchParams({
      address: `${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}`,
      asOf: selectedCase?.as_of_after || '2026-10-01',
    });
    if (p.units) params.set('units', String(p.units));
    if (p.year_built) params.set('year_built', String(p.year_built));
    return `/lookup?${params.toString()}`;
  };

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">
            {t('Statutory Change Scenarios (Test Cases 1 to 6)', 'Escenarios de Cambio Legal (Casos de Prueba 1 a 6)')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">
            {t(
              'Six benchmark scenarios that stress-test how the rules engine handles legal change over time — new laws taking effect, city boundaries, preemption conflicts, pending bills, court strikes, and unseen live ordinances — evaluated across all 500 sample addresses.',
              'Seis escenarios que ponen a prueba cómo el motor gestiona cambios legales en el tiempo, evaluados en las 500 direcciones de muestra.'
            )}
          </p>
        </div>

        <a
          href={EXPORT_URLS.changesJson}
          download="changes.json"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-xs hover:bg-primary/90 transition-colors"
        >
          <Download className="size-4" />
          {t('Download changes.json', 'Descargar changes.json')}
        </a>
      </div>

      {/* Summary strip - Generous Height */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('Scenarios', 'Escenarios'), value: changeCases.length || 6, sub: t('Benchmark test cases 1 to 6', 'Casos de prueba 1 a 6') },
          { label: t('Address Impacts', 'Impactos'), value: totalImpacts, sub: t('summed across scenarios', 'suma de escenarios') },
          { label: t('Conflicts Flagged', 'Conflictos'), value: totalConflicts, sub: t('routed to human review', 'para revisión humana') },
          { label: t('Sample Addresses', 'Direcciones'), value: TOTAL_ADDRESSES, sub: 'California · New Jersey · Massachusetts' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[110px]">
            <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-3xl font-black font-mono text-foreground">{loadingCases ? '—' : s.value}</p>
            <p className="text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Scenario selector - Enlarge card height & padding */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {loadingCases &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-h-[220px] rounded-2xl border border-border bg-secondary/30 animate-pulse" />
          ))}
        {changeCases.map((c) => {
          const isSelected = selectedId === c.case_id;
          const m = SCENARIO_META[c.case_id];
          const k = KIND_STYLE[m?.kind || 'effective'];
          const Icon = k.icon;
          const pct = Math.round((c.affected_address_count / TOTAL_ADDRESSES) * 100);
          return (
            <button
              key={c.case_id}
              onClick={() => setSelectedId(c.case_id)}
              className={`group rounded-2xl border border-l-4 ${k.accent} p-5 sm:p-6 text-left transition-all flex flex-col min-h-[220px] justify-between ${
                isSelected
                  ? 'border-primary/60 bg-primary/5 ring-2 ring-primary/20 shadow-md scale-[1.02]'
                  : 'border-border bg-card hover:bg-secondary/40 hover:-translate-y-1 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-secondary text-foreground">
                    {c.case_id.replace(/^T/, 'Test ')}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground">{stateName(c.target_jurisdiction)}</span>
                </div>
                {m && (
                  <span className={`self-start inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${k.chip}`}>
                    <Icon className="size-3" />
                    {t(m.label[0], m.label[1])}
                  </span>
                )}
                <h3 className="mt-3 font-bold text-sm leading-snug line-clamp-2 text-foreground" title={c.title}>
                  {c.title}
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-border/40">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{t('Affected', 'Afectadas')}</span>
                  <span className="font-mono font-bold text-foreground">
                    {c.affected_address_count}
                    <span className="text-muted-foreground font-normal"> / {TOTAL_ADDRESSES}</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${k.bar} transition-all`} style={{ width: `${pct}%` }} />
                </div>
                {!!c.conflict_count && (
                  <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                    <TriangleAlert className="size-3.5" />
                    {c.conflict_count} {t('conflicts flagged', 'conflictos')}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {!loadingCases && changeCases.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {t('Change scenarios are unavailable. Is the API running on port 8000?', 'Escenarios no disponibles. ¿Está la API en ejecución?')}
        </div>
      )}

      {/* Scenario detail */}
      {selectedCase && meta && (
        <div className="mt-6 rounded-lg border border-border bg-card shadow-xs overflow-hidden">
          {/* Title row */}
          <div className="p-6 border-b border-border flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-sm px-2.5 py-0.5 rounded bg-primary text-primary-foreground">
                  {selectedCase.case_id.replace(/^T/, 'Test ')}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${style.chip}`}>
                  <style.icon className="size-3" />
                  {t(meta.label[0], meta.label[1])}
                </span>
              </div>
              <h2 className="mt-2 text-xl font-bold leading-tight">{selectedCase.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{selectedCase.description}</p>
              <p className="mt-3 inline-flex items-start gap-1.5 text-xs text-foreground/80">
                <Info className="size-3.5 mt-0.5 shrink-0 text-primary" />
                <span>
                  <span className="font-semibold">{t('What this tests: ', 'Qué se evalúa: ')}</span>
                  {t(meta.question[0], meta.question[1])}
                </span>
              </p>
            </div>

            {/* Timeline */}
            {hasDateShift ? (
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="rounded-md border border-border bg-secondary/40 px-3 py-2 text-center">
                  <span className="text-[10px] block text-muted-foreground uppercase">{t('Before', 'Antes')}</span>
                  <span className="font-bold text-foreground">{selectedCase.as_of_before}</span>
                  <div className="mt-1"><StatusPill status={meta.before} /></div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
                <div className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-center">
                  <span className="text-[10px] block text-primary uppercase">{t('After', 'Después')}</span>
                  <span className="font-bold text-primary">{selectedCase.as_of_after}</span>
                  <div className="mt-1"><StatusPill status={meta.after} /></div>
                </div>
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-border bg-secondary/30 px-4 py-3 text-xs max-w-[260px]">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <CalendarClock className="size-3.5 text-muted-foreground" />
                  {t('As of October 1, 2026', 'Al 1 de octubre de 2026')}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {t('Default query date · no date shift in this test', 'Fecha de consulta predeterminada · sin cambio de fecha')}
                </p>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  {meta.kind === 'boundary' &&
                    t('Compares addresses inside versus outside city limits on the same date.', 'Compara direcciones dentro y fuera de la ciudad en la misma fecha.')}
                  {meta.kind === 'pending' &&
                    t('Bills are not law yet — affected set shows impact if enacted.', 'Los proyectos aún no son ley; el conjunto muestra el impacto si se aprueban.')}
                  {meta.kind === 'struck' &&
                    t('Negative control — a struck measure must affect no one.', 'Control negativo: una medida anulada no debe afectar a nadie.')}
                </p>
              </div>
            )}
          </div>

          {/* Engine notes */}
          <div className={`mx-6 mt-6 rounded-md border border-border border-l-4 ${style.accent} bg-secondary/30 px-4 py-3`}>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {t('Engine finding', 'Resultado del motor')}
            </p>
            <p className="mt-1 text-sm text-foreground leading-relaxed">
              {loadingDetail && !detail ? (
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="size-3.5 animate-spin" /> {t('Evaluating scenario…', 'Evaluando escenario…')}
                </span>
              ) : (
                detail?.notes || t('No notes returned.', 'Sin notas.')
              )}
            </p>
          </div>

          {/* Stats + city breakdown */}
          <div className="p-6 grid gap-4 lg:grid-cols-3">
            <div className="grid grid-cols-2 gap-3 lg:col-span-1 content-start">
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <span className="text-[11px] text-muted-foreground">{t('Jurisdiction', 'Jurisdicción')}</span>
                <p className="text-base font-bold text-foreground">{stateName(selectedCase.target_jurisdiction)}</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <span className="text-[11px] text-muted-foreground">{t('Affected', 'Afectadas')}</span>
                <p className="text-lg font-bold font-mono text-foreground">
                  {selectedCase.affected_address_count}
                  <span className="text-xs text-muted-foreground font-normal"> / {TOTAL_ADDRESSES}</span>
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-3">
                <span className="text-[11px] text-muted-foreground">{t('Share of sample', 'Porcentaje')}</span>
                <p className="text-lg font-bold font-mono text-foreground">
                  {Math.round((selectedCase.affected_address_count / TOTAL_ADDRESSES) * 100)}%
                </p>
              </div>
              <div className={`rounded-lg border p-3 ${selectedCase.conflict_count ? 'border-amber-500/30 bg-amber-500/5' : 'border-border bg-secondary/30'}`}>
                <span className="text-[11px] text-muted-foreground">{t('Conflicts', 'Conflictos')}</span>
                <p className={`text-lg font-bold font-mono ${selectedCase.conflict_count ? 'text-amber-700 dark:text-amber-300' : 'text-foreground'}`}>
                  {selectedCase.conflict_count || 0}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 rounded-lg border border-border p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Building2 className="size-3.5" />
                {t('Affected addresses by city', 'Direcciones afectadas por ciudad')}
              </p>
              {cityBreakdown.length === 0 ? (
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  {meta.kind === 'struck' ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      {t('Correct: no addresses affected by a struck measure.', 'Correcto: ninguna dirección afectada por una medida anulada.')}
                    </>
                  ) : loadingDetail ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    t('No affected addresses.', 'Sin direcciones afectadas.')
                  )}
                </div>
              ) : (
                <div className="mt-3 space-y-2">
                  {cityBreakdown.map(([city, n]) => {
                    const max = cityBreakdown[0]?.[1] || 1;
                    return (
                      <div key={city} className="flex items-center gap-3 text-xs">
                        <span className="w-32 shrink-0 truncate font-medium text-foreground" title={city}>{city}</span>
                        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                          <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${(n / max) * 100}%` }} />
                        </div>
                        <span className="w-10 text-right font-mono font-bold text-foreground">{n}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Address table */}
          {affectedRows.length > 0 && (
            <div className="px-6 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {t('Affected Addresses', 'Direcciones Afectadas')}
                  <span className="ml-2 font-mono normal-case text-foreground">({filteredRows.length})</span>
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {conflictSet.size > 0 && (
                    <label className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={onlyConflicts}
                        onChange={(e) => {
                          setOnlyConflicts(e.target.checked);
                          setPage(0);
                        }}
                        className="accent-amber-600"
                      />
                      {t('Conflicts only', 'Solo conflictos')}
                    </label>
                  )}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <input
                      id="changes-address-search"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(0);
                      }}
                      placeholder={t('Search address number, street, city, postal code…', 'Buscar número, calle, ciudad, código postal…')}
                      className="h-8 w-64 rounded-md border border-input bg-background pl-8 pr-3 text-xs outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border/80">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-secondary/60 text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="px-4 py-2.5">{t('Address Number', 'Número de Dirección')}</th>
                      <th className="px-4 py-2.5">{t('Address', 'Dirección')}</th>
                      <th className="px-4 py-2.5">{t('Units', 'Unidades')}</th>
                      <th className="px-4 py-2.5">{t('Year Built', 'Año de Construcción')}</th>
                      <th className="px-4 py-2.5">{t('Status Change', 'Cambio de Estado')}</th>
                      <th className="px-4 py-2.5">{t('Review', 'Revisión')}</th>
                      <th className="px-4 py-2.5 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 bg-card">
                    {pagedRows.map((r) => (
                      <tr key={r.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-2.5 font-mono font-bold text-primary">{r.id}</td>
                        <td className="px-4 py-2.5">
                          {r.prop ? (
                            <>
                              <span className="font-medium text-foreground">{r.prop.street_address}</span>
                              <span className="block text-[11px] text-muted-foreground">
                                {r.prop.postal_city}, {stateName(r.prop.state)} {r.prop.zip}
                              </span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">{r.prop?.units ?? '—'}</td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">{r.prop?.year_built ?? '—'}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-1.5">
                            {meta.before !== meta.after && (
                              <>
                                <StatusPill status={meta.before} />
                                <ArrowRight className="size-3 text-muted-foreground" />
                              </>
                            )}
                            <StatusPill status={meta.after} />
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          {r.conflict ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                              <TriangleAlert className="size-3" />
                              {t('Preemption', 'Preferencia')}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <a
                            href={lookupHref(r.prop)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                          >
                            {t('Look up', 'Consultar')}
                            <ExternalLink className="size-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                    {pagedRows.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                          {t('No addresses match your filter.', 'Ninguna dirección coincide.')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {pageCount > 1 && (
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {t('Showing', 'Mostrando')} {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filteredRows.length)}{' '}
                    {t('of', 'de')} {filteredRows.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="inline-flex items-center justify-center size-7 rounded-md border border-border hover:bg-secondary disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    <span className="px-2 font-mono">
                      {page + 1} / {pageCount}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                      disabled={page >= pageCount - 1}
                      className="inline-flex items-center justify-center size-7 rounded-md border border-border hover:bg-secondary disabled:opacity-40"
                      aria-label="Next page"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

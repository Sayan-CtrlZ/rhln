import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Library,
  Search,
  FileText,
  Loader2,
  X,
  ExternalLink,
  MapPin,
  BadgeCheck,
  Link2,
  Tag,
  ChevronDown,
  Hash,
  BookOpen,
  ShieldCheck,
  Scale,
  Home,
  AlertCircle,
  CircleDollarSign,
  Briefcase,
  ArrowUpRight,
  Copy,
  CheckCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from './__root';
import {
  fetchDocuments,
  fetchDocumentText,
  type DocumentItem,
} from '@/lib/api';

export const Route = createFileRoute('/documents')({
  component: DocumentsPage,
});

/* ------------------------------------------------------------------ */
/* Category meta                                                        */
/* ------------------------------------------------------------------ */
const CATEGORY_META: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  algorithmic_pricing: {
    label: 'Algorithmic Pricing',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    icon: <Briefcase className="size-3" />,
  },
  rent_stabilization: {
    label: 'Rent Stabilization',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    icon: <CircleDollarSign className="size-3" />,
  },
  eviction_protection: {
    label: 'Eviction Protection',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    icon: <ShieldCheck className="size-3" />,
  },
  screening_fair_chance: {
    label: 'Fair Chance / Screening',
    color: 'text-sky-500',
    bg: 'bg-sky-500/10',
    icon: <Scale className="size-3" />,
  },
  security_deposit: {
    label: 'Security Deposit',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    icon: <Home className="size-3" />,
  },
  tenant_rights: {
    label: 'Tenant Rights',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    icon: <AlertCircle className="size-3" />,
  },
  general_housing_code: {
    label: 'Housing Code',
    color: 'text-slate-400',
    bg: 'bg-slate-400/10',
    icon: <BookOpen className="size-3" />,
  },
};

function CategoryBadge({ category }: { category: string }) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.general_housing_code;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta.bg} ${meta.color}`}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}

function JurisdictionLevelBadge({ level }: { level: string }) {
  const map: Record<string, { label: string; color: string }> = {
    state: { label: 'State Law', color: 'text-blue-500 bg-blue-500/10' },
    county: { label: 'County', color: 'text-orange-500 bg-orange-500/10' },
    city: { label: 'Municipal', color: 'text-primary bg-primary/10' },
  };
  const m = map[level] ?? { label: level, color: 'text-muted-foreground bg-secondary' };
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${m.color}`}
    >
      {m.label}
    </span>
  );
}

const ALL_JURISDICTIONS = [
  'all',
  'Berkeley, CA',
  'San Francisco, CA',
  'Los Angeles, CA',
  'San Diego, CA',
  'Santa Ana, CA',
  'CA',
  'Boston, MA',
  'Cambridge, MA',
  'MA',
  'Newark, NJ',
  'Jersey City, NJ',
  'Hoboken, NJ',
  'NJ',
] as const;

const ALL_CATEGORIES = [
  'all',
  'algorithmic_pricing',
  'rent_stabilization',
  'eviction_protection',
  'screening_fair_chance',
  'security_deposit',
  'tenant_rights',
  'general_housing_code',
] as const;

function DocumentsPage() {
  const { t } = useLang();

  const [corpusDocs, setCorpusDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [docSearch, setDocSearch] = useState('');
  const [jurFilter, setJurFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [captureFilter, setCaptureFilter] = useState<'all' | 'text' | 'link-only'>('all');

  /* Reader dialog state */
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);
  const [readerLoading, setReaderLoading] = useState(false);
  const [readerText, setReaderText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDocuments({ limit: 100 })
      .then((docs) => {
        if (docs && docs.length > 0) setCorpusDocs(docs);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return corpusDocs.filter((d) => {
      if (jurFilter !== 'all' && d.jurisdiction !== jurFilter) return false;
      if (categoryFilter !== 'all' && d.category !== categoryFilter) return false;
      if (captureFilter === 'text' && !d.has_text) return false;
      if (captureFilter === 'link-only' && d.has_text) return false;
      if (!docSearch) return true;
      const q = docSearch.toLowerCase();
      return (
        d.doc_id.toLowerCase().includes(q) ||
        d.document_title.toLowerCase().includes(q) ||
        d.jurisdiction_name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      );
    });
  }, [corpusDocs, jurFilter, categoryFilter, captureFilter, docSearch]);

  /* Category breakdown for stats bar */
  const statCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const d of corpusDocs) {
      counts[d.category] = (counts[d.category] ?? 0) + 1;
    }
    return counts;
  }, [corpusDocs]);

  const openDocumentReader = async (doc: DocumentItem) => {
    setActiveDoc(doc);
    if (!doc.has_text) {
      setReaderText('');
      return;
    }
    setReaderLoading(true);
    try {
      const data = await fetchDocumentText(doc.doc_id);
      setReaderText(data.text || data.text_slice || '');
    } catch {
      setReaderText('');
    } finally {
      setReaderLoading(false);
    }
  };

  const copyText = () => {
    if (!readerText) return;
    navigator.clipboard.writeText(readerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="border-b border-border pb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display leading-tight">
              {t('Housing Law Corpus Library', 'Biblioteca Legal del Corpus')}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl">
              {t(
                'Every rule verdict is verifiably grounded in this corpus. Search, filter, and read the complete source texts across state statutes, municipal ordinances, and rent board regulations.',
                'Todos los veredictos están fundamentados en este corpus. Busque, filtre y lea los textos legales oficiales completos.'
              )}
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_META)
              .filter(([k]) => statCounts[k])
              .map(([k, m]) => (
                <button
                  key={k}
                  onClick={() => setCategoryFilter(categoryFilter === k ? 'all' : k)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                    categoryFilter === k
                      ? `${m.bg} ${m.color} border-current`
                      : 'border-border bg-card text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {m.icon}
                  <span>{statCounts[k]}</span>
                  <span>{m.label}</span>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* ── Filters ────────────────────────────────────────────────────── */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={docSearch}
            onChange={(e) => setDocSearch(e.target.value)}
            placeholder={t('Search by title, ID, or jurisdiction…', 'Buscar documentos…')}
            className="w-full rounded-lg border border-input bg-card pl-10 pr-9 py-2 text-sm shadow-xs focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {docSearch && (
            <button
              onClick={() => setDocSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Jurisdiction filter */}
        <select
          value={jurFilter}
          onChange={(e) => setJurFilter(e.target.value)}
          className="rounded-lg border border-input bg-card px-3 py-2 text-sm font-medium shadow-xs focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="all">{t('All Jurisdictions', 'Todas las jurisdicciones')}</option>
          <optgroup label="California">
            {['Berkeley, CA', 'San Francisco, CA', 'Los Angeles, CA', 'San Diego, CA', 'Santa Ana, CA', 'CA'].map(
              (j) => <option key={j} value={j}>{j}</option>
            )}
          </optgroup>
          <optgroup label="New Jersey">
            {['Newark, NJ', 'Jersey City, NJ', 'Hoboken, NJ', 'NJ'].map(
              (j) => <option key={j} value={j}>{j}</option>
            )}
          </optgroup>
          <optgroup label="Massachusetts">
            {['Boston, MA', 'Cambridge, MA', 'MA'].map(
              (j) => <option key={j} value={j}>{j}</option>
            )}
          </optgroup>
        </select>

        {/* Capture filter */}
        <div className="flex items-center gap-1 rounded-lg border border-input bg-card p-1 shadow-xs">
          {(['all', 'text', 'link-only'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setCaptureFilter(v)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                captureFilter === v
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {v === 'all' ? 'All' : v === 'text' ? '✓ Full Text' : '🔗 Link Only'}
            </button>
          ))}
        </div>

        {/* Result count */}
        <span className="ml-auto text-xs font-mono text-muted-foreground">
          {filtered.length} / {corpusDocs.length} {t('documents', 'documentos')}
        </span>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="text-sm">{t('Loading corpus…', 'Cargando corpus…')}</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <Search className="size-10 opacity-30" />
          <p className="text-sm">{t('No documents match your filters.', 'Ningún documento coincide.')}</p>
          <Button variant="outline" size="sm" onClick={() => { setDocSearch(''); setJurFilter('all'); setCategoryFilter('all'); setCaptureFilter('all'); }}>
            {t('Clear filters', 'Limpiar filtros')}
          </Button>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <DocumentCard
              key={d.doc_id}
              doc={d}
              onRead={() => openDocumentReader(d)}
              t={t}
            />
          ))}
        </div>
      )}

      {/* ── Statute Reader Dialog ───────────────────────────────────────── */}
      <Dialog.Root
        open={activeDoc !== null}
        onOpenChange={(open) => {
          if (!open) { setActiveDoc(null); setReaderText(''); }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[95vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl flex flex-col">
            {/* Dialog header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-secondary/30 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0 flex items-center justify-center size-9 rounded-lg bg-primary/10">
                  <FileText className="size-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {activeDoc?.doc_id}
                    </span>
                    {activeDoc?.category && <CategoryBadge category={activeDoc.category} />}
                    {activeDoc?.jurisdiction_level && (
                      <JurisdictionLevelBadge level={activeDoc.jurisdiction_level} />
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-foreground mt-0.5 leading-snug line-clamp-1">
                    {activeDoc?.document_title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {activeDoc?.jurisdiction_name}, {activeDoc?.state} · {activeDoc?.source_type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {activeDoc?.has_text && readerText && (
                  <Button variant="outline" size="sm" onClick={copyText} className="h-8 text-xs gap-1.5">
                    {copied ? <CheckCheck className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                    {copied ? t('Copied!', '¡Copiado!') : t('Copy Text', 'Copiar')}
                  </Button>
                )}
                {activeDoc?.url && (
                  <a
                    href={activeDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                      <ExternalLink className="size-3.5" />
                      {t('Source', 'Fuente')}
                    </Button>
                  </a>
                )}
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <X className="size-4" />
                  </Button>
                </Dialog.Close>
              </div>
            </div>

            {/* Dialog body */}
            <div className="flex-1 overflow-y-auto p-6 bg-background/50">
              {readerLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
                  <Loader2 className="size-8 animate-spin text-primary" />
                  <span className="text-sm">{t('Loading official statute text…', 'Cargando texto oficial…')}</span>
                </div>
              ) : !activeDoc?.has_text ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
                  <Link2 className="size-10 opacity-40" />
                  <div className="text-center">
                    <p className="font-semibold text-foreground">{t('Link-Only Document', 'Documento Solo por Enlace')}</p>
                    <p className="text-sm mt-1">
                      {t('This document is catalogued by URL reference only. No local text capture was included in the corpus.', 'Este documento está catalogado solo por URL.')}
                    </p>
                  </div>
                  {activeDoc?.url && (
                    <a
                      href={activeDoc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
                    >
                      {t('Visit official source', 'Visitar fuente oficial')}
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                </div>
              ) : !readerText ? (
                <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
                  {t('No statute text available.', 'No hay texto disponible.')}
                </div>
              ) : (
                <pre className="font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap select-text">
                  {readerText}
                </pre>
              )}
            </div>

            {/* Dialog footer */}
            <div className="border-t border-border px-6 py-3 bg-secondary/20 flex items-center justify-between text-xs text-muted-foreground gap-3">
              <span>
                {activeDoc?.has_text
                  ? `${t('Verbatim corpus text', 'Texto íntegro del corpus')} · ${activeDoc?.character_count?.toLocaleString()} {t('characters', 'caracteres')}`
                  : t('Link-only — not captured in local corpus', 'Solo enlace — no capturado localmente')}
              </span>
              <div className="flex items-center gap-2">
                <Link to="/lookup">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    {t('Lookup Address', 'Buscar Dirección')}
                  </Button>
                </Link>
                <Link to="/rules">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    {t('Rules Registry', 'Registro de Reglas')}
                  </Button>
                </Link>
                <Dialog.Close asChild>
                  <Button variant="default" size="sm" className="h-7 text-xs">
                    {t('Close', 'Cerrar')}
                  </Button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Document Card Component                                             */
/* ------------------------------------------------------------------ */
function DocumentCard({
  doc,
  onRead,
  t,
}: {
  doc: DocumentItem;
  onRead: () => void;
  t: (en: string, es?: string) => string;
}) {
  return (
    <div className="group rounded-xl border border-border bg-card shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col overflow-hidden">
      {/* Card header strip */}
      <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary text-foreground border border-border">
            {doc.doc_id}
          </span>
          <JurisdictionLevelBadge level={doc.jurisdiction_level} />
          {doc.has_text ? (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <BadgeCheck className="size-2.5" />
              Full Text
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
              <Link2 className="size-2.5" />
              Link Only
            </span>
          )}
        </div>

        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
          title={t('Open source URL', 'Abrir URL fuente')}
        >
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* Title & meta */}
      <div className="px-4 flex-1">
        <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {doc.document_title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <MapPin className="size-3 flex-shrink-0" />
          <span className="truncate">
            {doc.jurisdiction_name}
            {doc.state ? `, ${doc.state}` : ''}
          </span>
        </div>

        <div className="mt-2">
          <CategoryBadge category={doc.category} />
        </div>

        {doc.character_count > 0 && (
          <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
            <Hash className="size-3" />
            <span>{doc.character_count.toLocaleString()} {t('characters', 'caracteres')}</span>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="mt-4 px-4 pb-4 pt-3 border-t border-border flex items-center justify-between gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={onRead}
          className="h-8 text-xs font-semibold gap-1.5 flex-1"
          disabled={!doc.has_text && doc.capture === 'link-only'}
        >
          <FileText className="size-3.5" />
          {doc.has_text ? t('Read Full Statute', 'Leer Ley Completa') : t('View Details', 'Ver Detalles')}
        </Button>

        {doc.source_type && (
          <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[90px]" title={doc.source_type}>
            {doc.source_type.replace('secondary (law firm / news / mirror)', 'secondary').replace('official city-linked policy', 'city-linked')}
          </span>
        )}
      </div>
    </div>
  );
}

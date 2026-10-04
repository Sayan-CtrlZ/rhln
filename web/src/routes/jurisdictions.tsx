import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, useMemo } from 'react';
import {
  Landmark,
  MapPin,
  ChevronRight,
  RefreshCw,
  Loader2,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Scale,
  CircleDollarSign,
  AlertTriangle,
  Gavel,
  Globe,
  ArrowUpRight,
  Search,
  Filter,
  BookOpen,
  Hash,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from './__root';
import {
  fetchJurisdictions,
  resolveAddress,
  type BackendJurisdictionNode,
} from '@/lib/api';

export const Route = createFileRoute('/jurisdictions')({
  component: JurisdictionsPage,
});

/* ─────────────────────────────────────────────────────────────────────── */
/* Static enrichment: regulatory profile per jurisdiction                  */
/* ─────────────────────────────────────────────────────────────────────── */
interface RegProfile {
  programs: string[];
  highlight: string;
  keyLaw?: string;
  docCount: number;
  sampleAddress: string;
  flag: 'high' | 'medium' | 'low';
}

const PROFILES: Record<string, RegProfile> = {
  ca: {
    programs: ['AB 1482 Rent Cap', 'Just Cause (Statewide)', 'Algorithmic Pricing Ban (AB 325)'],
    highlight: 'Statewide 5% + CPI rent cap; AB 325 bans algorithm-coordinated pricing.',
    keyLaw: 'Cal. Civ. Code § 1947.12',
    docCount: 28,
    sampleAddress: '2150 Shattuck Ave, Berkeley CA',
    flag: 'high',
  },
  'ca-berkeley': {
    programs: ['RSO (Measure BB)', 'Just Cause Eviction', 'Security Deposit Rules', 'Fair Chance Screening', 'AGA Annual Increase'],
    highlight: 'One of the strictest rent ordinances in the US — covers pre-1980 units; strict eviction protections.',
    keyLaw: 'Berkeley Municipal Code § 13.76',
    docCount: 14,
    sampleAddress: '2150 Shattuck Ave, Berkeley CA 94704',
    flag: 'high',
  },
  'ca-sf': {
    programs: ['SF Rent Ordinance', 'Just Cause Eviction', 'Costa-Hawkins Exemptions', 'Relocation Assistance'],
    highlight: 'Covers units built before June 13 1979; owner move-in and Ellis Act evictions regulated.',
    keyLaw: 'SF Admin. Code § 37',
    docCount: 8,
    sampleAddress: '500 Castro St, San Francisco CA 94114',
    flag: 'high',
  },
  'ca-la': {
    programs: ['LA RSO', 'Just Cause (AB 1482 + Local)', 'SCEP Inspections', 'REAP Program'],
    highlight: 'Los Angeles RSO covers pre-1978 buildings; SCEP ensures habitability compliance.',
    keyLaw: 'LA Municipal Code § 151',
    docCount: 6,
    sampleAddress: '1234 Wilshire Blvd, Los Angeles CA 90017',
    flag: 'high',
  },
  'ca-sd': {
    programs: ['AB 1482 Statewide Cap', 'Just Cause (Statewide)', 'No Local RSO'],
    highlight: 'San Diego relies on statewide AB 1482 — no independent local rent ordinance.',
    keyLaw: 'Cal. Civ. Code § 1947.12',
    docCount: 2,
    sampleAddress: '500 W Broadway, San Diego CA 92101',
    flag: 'low',
  },
  'ca-santa-ana': {
    programs: ['AB 1482 Statewide Cap', 'Fair Chance Screening', 'Local Eviction Rules'],
    highlight: 'Santa Ana adopted tenant protections in 2023 expanding on statewide baseline.',
    keyLaw: 'Santa Ana Municipal Code',
    docCount: 3,
    sampleAddress: '200 N Broadway, Santa Ana CA 92701',
    flag: 'medium',
  },
  nj: {
    programs: ['NJ Anti-Eviction Act', 'Truth in Renting', 'FAIR Act (P.L. 2026 c.43)', 'Security Deposit Limits'],
    highlight: 'NJ FAIR Act (2026) bans algorithmic rent-fixing; statewide just cause for all residential rentals.',
    keyLaw: 'N.J.S.A. 2A:18-61.1',
    docCount: 18,
    sampleAddress: '744 Broad St, Newark NJ 07102',
    flag: 'high',
  },
  'nj-newark': {
    programs: ['Newark Rent Control Ord.', 'Just Cause (Statewide)', 'FAIR Act Coverage', 'Certificate of Occupancy Req.'],
    highlight: 'Newark RSO covers buildings with 4+ units; NJ FAIR Act adds algorithmic ban layer.',
    keyLaw: 'Newark Rev. Ord. § 4:31',
    docCount: 7,
    sampleAddress: '744 Broad St, Newark NJ 07102',
    flag: 'high',
  },
  'nj-jersey-city': {
    programs: ['JC Rent Control Ord.', 'NJ Anti-Eviction Act', 'FAIR Act Coverage'],
    highlight: 'Jersey City rent control applies to buildings with 4+ units built before 1987.',
    keyLaw: 'Jersey City Ord. § 260',
    docCount: 5,
    sampleAddress: '1 Journal Square, Jersey City NJ 07306',
    flag: 'medium',
  },
  'nj-hoboken': {
    programs: ['Hoboken Rent Control Ord.', 'Ch. 158 Coverage', 'NJ Anti-Eviction Act'],
    highlight: 'Hoboken Ord. Ch. 158 prohibits algorithmic pricing tools; strict local control.',
    keyLaw: 'Hoboken Ord. Ch. 158',
    docCount: 4,
    sampleAddress: '100 Sinatra Dr, Hoboken NJ 07030',
    flag: 'high',
  },
  ma: {
    programs: ['Chapter 186 Landlord-Tenant', 'Discrimination Prohibitions', 'Security Deposit Rules', 'Pending S.2983 / H.5222'],
    highlight: 'MA has no statewide rent control — pending bills S.2983 and H.5222 target algorithmic pricing.',
    keyLaw: 'M.G.L. c. 186',
    docCount: 15,
    sampleAddress: '100 Tremont St, Boston MA 02108',
    flag: 'medium',
  },
  'ma-boston': {
    programs: ['Boston HSNA (Notice Act)', 'Fair Chance Housing', 'ADA/Section 8 Acceptance', 'No Local Rent Control'],
    highlight: 'Boston HSNA requires 30-day written notice of lease non-renewal; Fair Chance ordinance limits screening.',
    keyLaw: 'Boston Code § 9-20',
    docCount: 8,
    sampleAddress: '100 Tremont St, Boston MA 02108',
    flag: 'medium',
  },
  'ma-cambridge': {
    programs: ['Cambridge Fair Housing Rules', 'Section 8 Acceptance Required', 'No Local Rent Control'],
    highlight: "Cambridge has not restored rent control since the 1994 statewide ban, but has strong fair housing rules.",
    keyLaw: 'Cambridge Code of Ordinances',
    docCount: 3,
    sampleAddress: '1 Harvard Square, Cambridge MA 02138',
    flag: 'low',
  },
};

const FLAG_META = {
  high: { label: 'Highly Regulated', color: 'text-rose-500', bg: 'bg-rose-500/10', dot: 'bg-rose-500' },
  medium: { label: 'Moderately Regulated', color: 'text-amber-500', bg: 'bg-amber-500/10', dot: 'bg-amber-500' },
  low: { label: 'Minimal Local Rules', color: 'text-slate-400', bg: 'bg-slate-400/10', dot: 'bg-slate-400' },
};

const STATE_META: Record<string, { label: string; color: string; border: string; bg: string }> = {
  CA: { label: 'California', color: 'text-blue-500', border: 'border-blue-500/30', bg: 'bg-blue-500/5' },
  NJ: { label: 'New Jersey', color: 'text-emerald-500', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5' },
  MA: { label: 'Massachusetts', color: 'text-violet-500', border: 'border-violet-500/30', bg: 'bg-violet-500/5' },
};

const SAMPLE_ADDRESSES = [
  { label: 'Berkeley Multifamily', street: '2150 Shattuck Ave', city: 'Berkeley', state: 'CA', zip: '94704' },
  { label: 'Newark Statewide', street: '744 Broad St', city: 'Newark', state: 'NJ', zip: '07102' },
  { label: 'Boston Market Rate', street: '100 Tremont St', city: 'Boston', state: 'MA', zip: '02108' },
  { label: 'San Francisco RSO', street: '500 Castro St', city: 'San Francisco', state: 'CA', zip: '94114' },
];

/* ─────────────────────────────────────────────────────────────────────── */
/* Page Component                                                          */
/* ─────────────────────────────────────────────────────────────────────── */
function JurisdictionsPage() {
  const { t } = useLang();

  const [jurisdictionsList, setJurisdictionsList] = useState<BackendJurisdictionNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [jurFilterState, setJurFilterState] = useState<string>('all');
  const [jurSearch, setJurSearch] = useState('');

  /* Resolver */
  const [sandboxStreet, setSandboxStreet] = useState('2150 Shattuck Ave');
  const [sandboxCity, setSandboxCity] = useState('Berkeley');
  const [sandboxState, setSandboxState] = useState('CA');
  const [sandboxZip, setSandboxZip] = useState('94704');
  const [sandboxResolving, setSandboxResolving] = useState(false);
  const [sandboxResult, setSandboxResult] = useState<any>(null);
  const [sandboxError, setSandboxError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchJurisdictions()
      .then((jurs) => { if (jurs && jurs.length > 0) setJurisdictionsList(jurs); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return jurisdictionsList.filter((j) => {
      if (jurFilterState !== 'all' && j.state !== jurFilterState) return false;
      if (jurSearch) {
        const q = jurSearch.toLowerCase();
        return j.name.toLowerCase().includes(q) || j.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [jurisdictionsList, jurFilterState, jurSearch]);

  /* Group by state */
  const grouped = useMemo(() => {
    const g: Record<string, BackendJurisdictionNode[]> = {};
    for (const j of filtered) {
      if (!g[j.state]) g[j.state] = [];
      g[j.state].push(j);
    }
    return g;
  }, [filtered]);

  const applyChip = (chip: typeof SAMPLE_ADDRESSES[0]) => {
    setSandboxStreet(chip.street);
    setSandboxCity(chip.city);
    setSandboxState(chip.state);
    setSandboxZip(chip.zip);
    setSandboxResult(null);
    setSandboxError('');
  };

  const handleResolveSandbox = async (e: React.FormEvent) => {
    e.preventDefault();
    setSandboxResolving(true);
    setSandboxError('');
    try {
      const res = await resolveAddress({ street: sandboxStreet, city: sandboxCity, state: sandboxState, zip: sandboxZip });
      setSandboxResult(res);
    } catch {
      setSandboxError('Resolution failed. Check address and try again.');
    } finally {
      setSandboxResolving(false);
    }
  };

  const stateKeys = ['CA', 'NJ', 'MA'].filter((s) => jurFilterState === 'all' || s === jurFilterState);

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="border-b border-border pb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">
            {t('Jurisdictions & Regulatory Coverage', 'Jurisdicciones y Cobertura Regulatoria')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl">
            {t(
              'Every supported jurisdiction with its regulatory programs, key statutes, and coverage intensity. Use the address resolver below to compute the full legal hierarchy for any rental property.',
              'Cada jurisdicción soportada con sus programas regulatorios, estatutos clave e intensidad de cobertura.'
            )}
          </p>
        </div>

        {/* State pills */}
        <div className="flex gap-2">
          {(['all', 'CA', 'NJ', 'MA'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setJurFilterState(s)}
              className={`rounded-xl border px-5 py-2 text-xs sm:text-sm font-bold transition-all ${
                jurFilterState === s
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {s === 'all' ? 'All States' : s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Address Resolver ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 bg-primary/5 border-b border-border">
          <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10">
            <MapPin className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-foreground">
              {t('Live Jurisdiction Stack Resolver', 'Resolutor de Pila Jurisdiccional en Vivo')}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t('Enter any US rental address to compute its full legal hierarchy (state → county → city).', 'Ingrese cualquier dirección para calcular su jerarquía legal completa.')}
            </p>
          </div>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground bg-secondary border border-border rounded px-2 py-1">
            POST /api/v1/resolve
          </span>
        </div>

        <div className="p-6 space-y-4">
          {/* Sample chips */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground font-semibold mr-1 self-center">Quick addresses:</span>
            {SAMPLE_ADDRESSES.map((chip) => (
              <button
                key={chip.label}
                onClick={() => applyChip(chip)}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-foreground transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleResolveSandbox}
            className="grid grid-cols-1 sm:grid-cols-[1fr_180px_80px_110px_auto] gap-3 items-end"
          >
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted-foreground">Street Address</span>
              <input
                value={sandboxStreet}
                onChange={(e) => setSandboxStreet(e.target.value)}
                placeholder="742 Evergreen Terr"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted-foreground">City</span>
              <input
                value={sandboxCity}
                onChange={(e) => setSandboxCity(e.target.value)}
                placeholder="Boston"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted-foreground">State</span>
              <input
                value={sandboxState}
                onChange={(e) => setSandboxState(e.target.value.toUpperCase().slice(0, 2))}
                placeholder="CA"
                maxLength={2}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono uppercase focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted-foreground">ZIP Code</span>
              <input
                value={sandboxZip}
                onChange={(e) => setSandboxZip(e.target.value)}
                placeholder="02124"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </label>
            <Button type="submit" disabled={sandboxResolving} className="h-10 px-5 text-sm font-semibold gap-2 self-end">
              {sandboxResolving ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
              Resolve Stack
            </Button>
          </form>

          {/* Result */}
          {sandboxError && (
            <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-600">
              <AlertTriangle className="size-4 flex-shrink-0" />
              {sandboxError}
            </div>
          )}

          {sandboxResult && !sandboxError && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 overflow-hidden">
              {/* Geocode row */}
              <div className="px-5 py-3 border-b border-emerald-500/20 flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono items-center">
                <span><span className="text-muted-foreground">Legal City: </span><strong className="text-foreground">{sandboxResult.geocode?.legal_city}</strong></span>
                <span><span className="text-muted-foreground">County: </span><strong className="text-foreground">{sandboxResult.geocode?.county}</strong></span>
                <span><span className="text-muted-foreground">State: </span><strong className="text-foreground">{sandboxResult.geocode?.state}</strong></span>
                <span className="ml-auto flex items-center gap-1.5 text-emerald-600 font-bold">
                  <CheckCircle2 className="size-4" />
                  CENSUS MATCH · OK
                </span>
              </div>
              {/* Stack row */}
              <div className="px-5 py-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Resolved Jurisdiction Stack</p>
                <div className="flex flex-wrap items-center gap-2">
                  {sandboxResult.stack?.map((node: any, idx: number) => (
                    <span key={node.id ?? idx} className="flex items-center gap-2">
                      <span className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-xs">
                        <span className="text-xs font-bold text-foreground">{node.name}</span>
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                          node.level === 'state' ? 'bg-blue-500/10 text-blue-500' :
                          node.level === 'county' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-primary/10 text-primary'
                        }`}>{node.level}</span>
                      </span>
                      {idx < sandboxResult.stack.length - 1 && (
                        <ChevronRight className="size-4 text-muted-foreground" />
                      )}
                    </span>
                  ))}
                </div>
                {/* CTA */}
                <div className="mt-4 flex items-center gap-3">
                  <Link to="/lookup">
                    <Button size="sm" className="h-8 text-xs gap-1.5">
                      <Search className="size-3.5" />
                      Evaluate Rules for This Address
                    </Button>
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    → Runs all applicable laws against this resolved stack
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Filter bar for directory ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold mr-2">{t('Jurisdictions Directory', 'Directorio de Jurisdicciones')}</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            value={jurSearch}
            onChange={(e) => setJurSearch(e.target.value)}
            placeholder="Search jurisdictions…"
            className="rounded-lg border border-input bg-card pl-9 pr-3 py-1.5 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <span className="ml-auto text-xs font-mono text-muted-foreground">{filtered.length} jurisdictions</span>
      </div>

      {/* ── Directory — grouped by state ─────────────────────────────────── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary" />
          <span className="text-sm">Loading jurisdictions…</span>
        </div>
      ) : (
        <div className="space-y-8">
          {stateKeys.filter((s) => grouped[s]?.length).map((stateCode) => {
            const meta = STATE_META[stateCode];
            return (
              <div key={stateCode}>
                {/* State header */}
                <div className={`flex items-center gap-3 rounded-xl border ${meta.border} ${meta.bg} px-5 py-3 mb-4`}>
                  <Globe className={`size-5 ${meta.color}`} />
                  <h3 className={`font-bold text-base ${meta.color}`}>{meta.label} ({stateCode})</h3>
                  <span className="ml-auto text-xs text-muted-foreground font-mono">
                    {grouped[stateCode].length} jurisdictions
                  </span>
                </div>

                {/* Cards grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[stateCode].map((j) => {
                    const profile = PROFILES[j.id];
                    const flagMeta = profile ? FLAG_META[profile.flag] : FLAG_META.low;
                    const isState = j.level === 'state';
                    return (
                      <div
                        key={j.id}
                        className="group rounded-xl border border-border bg-card shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col overflow-hidden"
                      >
                        {/* Card top strip */}
                        <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-secondary border border-border text-foreground">
                              {j.id}
                            </span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                              isState
                                ? 'bg-blue-500/10 text-blue-500'
                                : 'bg-primary/10 text-primary'
                            }`}>
                              {isState ? 'State Law' : 'Municipal'}
                            </span>
                            {profile && (
                              <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${flagMeta.bg} ${flagMeta.color}`}>
                                <span className={`inline-block size-1.5 rounded-full ${flagMeta.dot}`} />
                                {flagMeta.label}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Body */}
                        <div className="px-4 flex-1">
                          <div className="flex items-start gap-2">
                            <div className={`flex-shrink-0 flex items-center justify-center size-8 rounded-lg ${isState ? 'bg-blue-500/10' : 'bg-primary/10'}`}>
                              {isState ? <Globe className={`size-4 ${meta.color}`} /> : <Building2 className="size-4 text-primary" />}
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-foreground leading-tight group-hover:text-primary transition-colors">
                                {j.name}
                              </h3>
                              {profile?.keyLaw && (
                                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{profile.keyLaw}</p>
                              )}
                            </div>
                          </div>

                          {profile?.highlight && (
                            <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {profile.highlight}
                            </p>
                          )}

                          {/* Regulatory programs */}
                          {profile?.programs && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {profile.programs.slice(0, 4).map((prog) => (
                                <span key={prog} className="rounded-full bg-secondary border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                  {prog}
                                </span>
                              ))}
                              {profile.programs.length > 4 && (
                                <span className="rounded-full bg-secondary border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                  +{profile.programs.length - 4} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="mt-4 px-4 pb-4 pt-3 border-t border-border flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="size-3" />
                              {profile?.docCount ?? 0} docs
                            </span>
                            <span className="flex items-center gap-1">
                              <Gavel className="size-3" />
                              {j.rule_count || 0} rules
                            </span>
                          </div>
                          <Link
                            to="/lookup"
                            search={{ address: profile?.sampleAddress ?? `${j.name}` } as any}
                          >
                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 font-semibold">
                              <Search className="size-3" />
                              Lookup
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Regulatory Intensity Legend ───────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Filter className="size-4 text-primary" />
          Regulatory Intensity Guide
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {Object.entries(FLAG_META).map(([key, m]) => (
            <div key={key} className={`rounded-lg border ${m.bg.replace('/10', '/20')} p-3`}>
              <div className={`flex items-center gap-2 font-bold text-xs ${m.color} mb-1`}>
                <span className={`inline-block size-2 rounded-full ${m.dot}`} />
                {m.label}
              </div>
              <p className="text-[11px] text-muted-foreground">
                {key === 'high' && 'Has its own ordinance + layers on statewide law. Strict enforcement, rent boards, eviction protections.'}
                {key === 'medium' && 'Relies partly on local rules, partly on statewide baselines. Some local amplification.'}
                {key === 'low' && 'Primarily governed by statewide law only. No independent local rent control ordinance.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

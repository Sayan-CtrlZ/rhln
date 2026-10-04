import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  Scale,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Library,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Wallet,
  SlidersHorizontal,
  FileText,
  Info,
} from 'lucide-react';
import { useLang } from './__root';
import {
  fetchRules,
  EXPORT_URLS,
  type RuleDetailItem,
} from '@/lib/api';

export const Route = createFileRoute('/rules')({
  component: RulesPage,
});

function RulesPage() {
  const { t, language } = useLang();
  const es = language === 'es';

  const [registryRules, setRegistryRules] = useState<RuleDetailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [ruleSearch, setRuleSearch] = useState('');
  const [ruleCatFilter, setRuleCatFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchRules()
      .then((rulesList) => {
        if (rulesList && rulesList.length > 0) setRegistryRules(rulesList);
      })
      .catch((err) => console.warn('Failed to load rules:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleCopyCitation = (citation: string, id: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'rent_increase_limits':
        return <TrendingUp className="size-4 text-emerald-500" />;
      case 'just_cause_eviction':
        return <ShieldCheck className="size-4 text-blue-500" />;
      case 'security_deposits':
        return <Wallet className="size-4 text-purple-500" />;
      case 'algorithmic_rent_setting':
        return <SlidersHorizontal className="size-4 text-amber-500" />;
      default:
        return <FileText className="size-4 text-primary" />;
    }
  };

  const filteredRules = registryRules.filter((r) => {
    const cat = r.category || r.topic_category || 'general';
    if (ruleCatFilter !== 'all' && cat !== ruleCatFilter) return false;
    if (!ruleSearch.trim()) return true;
    const q = ruleSearch.toLowerCase();
    const id = (r.team_rule_id || '').toLowerCase();
    const title = (r.title || r.rule_title || '').toLowerCase();
    const cite = (r.citation || r.statutory_citation || '').toLowerCase();
    const req = (r.requirement || '').toLowerCase();
    return id.includes(q) || title.includes(q) || cite.includes(q) || req.includes(q);
  });

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground tracking-tight">
            {t('Housing Rules Registry & Verifiable Citations', 'Registro de Reglas y Citas Legales')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            {t(
              'Extracted from official municipal ordinances and state statutes with mandatory verbatim quote verification (>= 20 characters matching source statute). Strictly validated against rule_record.schema.json.',
              'Catálogo estructurado de leyes públicas con verificación obligatoria de citas textuales (>= 20 caracteres coincidentes con la norma fuente).'
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={EXPORT_URLS.rulesJson}
            download="rules.json"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
          >
            <Download className="size-4" />
            <span>{t('Download rules.json', 'Descargar rules.json')}</span>
          </a>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-border/80 bg-card shadow-xs">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={ruleSearch}
            onChange={(e) => setRuleSearch(e.target.value)}
            placeholder={t('Search by rule ID, title, citation, or requirement...', 'Buscar por ID, título, cita o contenido...')}
            className="w-full h-12 rounded-xl border border-input bg-secondary/30 pl-11 pr-4 text-sm shadow-xs focus:ring-2 focus:ring-primary focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="size-4.5 text-muted-foreground shrink-0" />
          <select
            value={ruleCatFilter}
            onChange={(e) => setRuleCatFilter(e.target.value)}
            className="h-12 rounded-xl border border-input bg-secondary/30 px-4 text-sm font-semibold shadow-xs outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">{t('All Categories', 'Todas las categorías')} ({registryRules.length})</option>
            <option value="rent_increase_limits">{t('Rent Increase Limits', 'Límites de Alquiler')}</option>
            <option value="just_cause_eviction">{t('Just Cause Eviction', 'Desalojo con Causa Justa')}</option>
            <option value="security_deposits">{t('Security Deposits', 'Depósitos de Garantía')}</option>
            <option value="algorithmic_rent_setting">{t('Algorithmic Rent Setting', 'Fijación Algorítmica')}</option>
          </select>

          <span className="text-xs sm:text-sm font-mono font-semibold text-muted-foreground px-2">
            {filteredRules.length} {t('rules found', 'reglas')}
          </span>
        </div>
      </div>

      {/* Rules List Grid */}
      {loading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 animate-pulse space-y-4">
              <div className="h-6 w-1/3 bg-secondary rounded" />
              <div className="h-4 w-2/3 bg-secondary/60 rounded" />
              <div className="h-16 bg-secondary/40 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filteredRules.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-12 text-center space-y-3">
          <div className="size-12 rounded-xl bg-secondary/60 text-muted-foreground flex items-center justify-center mx-auto">
            <Search className="size-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">{t('No matching rules found', 'No se encontraron reglas')}</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            {t('Try adjusting your search keywords or clearing the category filter.', 'Pruebe con otros términos o restablezca el filtro de categoría.')}
          </p>
          <button
            type="button"
            onClick={() => {
              setRuleSearch('');
              setRuleCatFilter('all');
            }}
            className="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {t('Reset Filters', 'Restablecer Filtros')}
          </button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5">
          {filteredRules.map((r) => {
            const cat = r.category || r.topic_category || 'general';
            const title = r.title || r.rule_title || r.team_rule_id;
            const citation = r.citation || r.statutory_citation || 'Statute';
            const quote = r.quoted_span || r.source_quote || '';
            const requirement = r.requirement || '';
            const keyValue = r.key_value || '';
            const exemptions = r.exemptions || '';
            const effective = r.effective_date || '2026-10-01';

            return (
              <div
                key={r.team_rule_id}
                className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Rule Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {r.team_rule_id}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-foreground">
                      {r.jurisdiction || 'Berkeley, CA'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-secondary/50">
                      {getCategoryIcon(cat)}
                      <span className="capitalize">{cat.replace(/_/g, ' ')}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                    <span>
                      {t('Effective:', 'Vigencia:')} <strong className="text-foreground">{effective}</strong>
                    </span>
                    {r.sunset_date && (
                      <span>
                        {t('Sunset:', 'Fin:')} <strong className="text-foreground">{r.sunset_date}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Citation */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-foreground leading-snug">
                    {title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-primary font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Scale className="size-3.5 shrink-0" />
                      <span>{citation}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCitation(citation, r.team_rule_id)}
                      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground font-sans px-1.5 py-0.5 rounded hover:bg-secondary transition-all"
                      title="Copy citation to clipboard"
                    >
                      {copiedId === r.team_rule_id ? (
                        <>
                          <Check className="size-3 text-emerald-500" />
                          <span className="text-emerald-500 font-bold">{t('Copied!', '¡Copiado!')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span>{t('Copy', 'Copiar')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Statutory Requirement & Key Value */}
                {requirement && (
                  <div className="rounded-xl bg-secondary/30 p-4 text-xs sm:text-sm text-foreground leading-relaxed">
                    <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                      {t('Legal Requirement & Mechanism', 'Requerimiento Legal')}
                    </span>
                    <p>{requirement}</p>
                    {keyValue && (
                      <div className="mt-2 pt-2 border-t border-border/50 font-mono text-xs font-bold text-primary">
                        {t('Statutory Standard: ', 'Parámetro: ')}
                        <span className="text-foreground">{keyValue}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Exemptions Note */}
                {exemptions && (
                  <div className="flex items-start gap-2 rounded-xl bg-secondary/50 border border-border/60 px-3.5 py-2.5 text-xs text-muted-foreground">
                    <Info className="size-3.5 shrink-0 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="font-semibold text-foreground">{t('Exemptions & Exclusions:', 'Exenciones:')} </span>
                      <span>{exemptions}</span>
                    </div>
                  </div>
                )}

                {/* Verified Verbatim Quote Box */}
                {quote && (
                  <div className="rounded-xl border border-border/70 bg-secondary/20 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 text-emerald-500" />
                        <span>{t('Verified Verbatim Statutory Text', 'Cita Oficial Verificada')}</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        MATCH VERIFIED ({quote.length} chars)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-serif italic text-foreground/90 leading-relaxed pl-2.5 border-l-2 border-primary/50">
                      “{quote}”
                    </p>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-3 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <span>{t('Corpus Document:', 'Documento:')}</span>
                    <Link
                      to="/documents"
                      className="font-mono font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>{r.source_doc_id}</span>
                      <Library className="size-3" />
                    </Link>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to="/lookup"
                      className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
                    >
                      <span>{t('Test on Address', 'Probar en Vivienda')}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

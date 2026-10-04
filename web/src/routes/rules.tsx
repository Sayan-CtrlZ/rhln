import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  Scale,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Library,
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

export function RulesPage() {
  const { t } = useLang();

  const [registryRules, setRegistryRules] = useState<RuleDetailItem[]>([]);
  const [ruleSearch, setRuleSearch] = useState('');
  const [ruleCatFilter, setRuleCatFilter] = useState<string>('all');

  useEffect(() => {
    fetchRules().then((rulesList) => {
      if (rulesList && rulesList.length > 0) setRegistryRules(rulesList);
    });
  }, []);

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold text-muted-foreground mb-2">
            <Scale className="size-3.5 text-primary" />
            {t('Housing Rules Registry · Official Statutory Intelligence Catalog', 'Registro Oficial de Reglas y Citas')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">
            {t('Housing Rules Registry & Citations', 'Registro de Reglas y Citas')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">
            {t(
              'Extracted via Claude Sonnet with mandatory verbatim quote verification (>= 20 characters matching source statute). Strictly schema validated against rule_record.schema.json.',
              'Extraídas con Claude Sonnet con verificación obligatoria de cita textual. Validadas contra esquema oficial.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={EXPORT_URLS.rulesJson}
            download="rules.json"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90"
          >
            <Download className="size-3.5" />
            {t('Download rules.json', 'Descargar rules.json')}
          </a>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={ruleSearch}
            onChange={(e) => setRuleSearch(e.target.value)}
            placeholder={t('Search by rule ID, title, or citation...', 'Buscar por ID, título o cita...')}
            className="w-full rounded-md border border-input bg-card pl-10 pr-3 py-2 text-xs shadow-xs focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          <select
            value={ruleCatFilter}
            onChange={(e) => setRuleCatFilter(e.target.value)}
            className="rounded-md border border-input bg-card px-3 py-2 text-xs font-medium shadow-xs"
          >
            <option value="all">{t('All Categories', 'Todas las categorías')}</option>
            <option value="algorithmic_rent_setting">{t('Algorithmic Rent Setting', 'Fijación Algorítmica')}</option>
            <option value="rent_increase_limits">{t('Rent Increase Limits', 'Límites de Alquiler')}</option>
            <option value="just_cause_eviction">{t('Just Cause Eviction', 'Desalojo con Causa')}</option>
            <option value="security_deposits">{t('Security Deposits', 'Depósitos de Garantía')}</option>
            <option value="lease_terms">{t('Lease Terms', 'Términos de Contrato')}</option>
          </select>
        </div>
      </div>

      {/* Rules List */}
      <div className="mt-6 grid gap-4">
        {registryRules
          .filter((r) => {
            if (ruleCatFilter !== 'all' && r.topic_category !== ruleCatFilter) return false;
            if (!ruleSearch) return true;
            const q = ruleSearch.toLowerCase();
            return (
              r.team_rule_id.toLowerCase().includes(q) ||
              r.rule_title.toLowerCase().includes(q) ||
              r.statutory_citation.toLowerCase().includes(q)
            );
          })
          .map((r) => (
            <div key={r.team_rule_id} className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {r.team_rule_id}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-foreground">
                    {r.jurisdiction}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {r.topic_category.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <span>{t('Effective:', 'Vigencia:')} <strong className="text-foreground">{r.effective_date}</strong></span>
                  {r.sunset_date && <span>{t('Sunset:', 'Fin:')} <strong className="text-foreground">{r.sunset_date}</strong></span>}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold font-display text-foreground leading-snug">{r.rule_title}</h3>
                <p className="mt-1 text-xs font-mono text-primary font-semibold flex items-center gap-1.5">
                  <Scale className="size-3.5" />
                  <span>{r.statutory_citation}</span>
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    {t('Verified Statutory Text', 'Cita Oficial Verificada')}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    MATCH VERIFIED
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-serif italic text-foreground/90 leading-relaxed pl-2 border-l-2 border-primary/40">
                  “{r.source_quote}”
                </p>
              </div>

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
                  {r.supersedes_rule_id && (
                    <span className="text-purple-600 dark:text-purple-400 font-mono text-xs">
                      {t('Overrides:', 'Sustituye a:')} {r.supersedes_rule_id}
                    </span>
                  )}
                  <Link
                    to="/lookup"
                    search={{ source: r.team_rule_id }}
                    className="font-bold text-primary hover:underline text-xs"
                  >
                    {t('Test on Address →', 'Probar en Vivienda →')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

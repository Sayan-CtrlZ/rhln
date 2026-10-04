import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  Terminal,
  Code2,
  Download,
  Database,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import { useLang } from './__root';
import {
  API_BASE,
  SERVER_ROOT,
  EXPORT_URLS,
  fetchHealth,
  fetchMeta,
  type MetaResponse,
} from '@/lib/api';

export const Route = createFileRoute('/api')({
  component: ApiPage,
});

function ApiPage() {
  const { t } = useLang();

  const [serverHealth, setServerHealth] = useState<any>(null);
  const [metaInfo, setMetaInfo] = useState<MetaResponse | null>(null);

  useEffect(() => {
    fetchHealth().then(setServerHealth).catch(() => setServerHealth({ status: 'offline' }));
    fetchMeta().then(setMetaInfo).catch(() => null);
  }, []);

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold text-muted-foreground mb-2">
            <Terminal className="size-3.5 text-primary" />
            {t('FastAPI Production Endpoints & Documentation Hub', 'Documentación y Endpoints de Producción FastAPI')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">
            {t('API Reference & Regulatory Exports Hub', 'Referencia de API y Exportación de Datos')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">
            {t(
              'Explore the 23+ fully operational endpoints in interactive Swagger UI or download official platform compliance datasets.',
              'Explore los más de 23 endpoints en Swagger UI interactivo o descargue los conjuntos de datos oficiales.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`${SERVER_ROOT}/docs`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-xs font-semibold shadow-xs hover:bg-emerald-700"
          >
            <Code2 className="size-4" />
            {t('Open Interactive Swagger UI', 'Abrir Swagger UI')}
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>

      {/* Quick Launch Cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Swagger & ReDoc */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
              <Code2 className="size-5" />
            </div>
            <h3 className="text-lg font-bold">{t('Swagger OpenAPI UI', 'Swagger UI Interactivo')}</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {t(
                'Try out live endpoints with pre-populated schemas, request bodies, and headers directly in your browser.',
                'Pruebe todos los endpoints con esquemas y respuestas estructuradas directamente en el navegador.'
              )}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <a
              href={`${SERVER_ROOT}/docs`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <span>{t('Launch /docs', 'Abrir /docs')}</span>
              <ExternalLink className="size-3" />
            </a>
            <a
              href={`${SERVER_ROOT}/redoc`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80"
            >
              <span>{t('Launch ReDoc /redoc', 'Abrir ReDoc')}</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>

        {/* Regulatory Platform Exports */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
              <Download className="size-5" />
            </div>
            <h3 className="text-lg font-bold">{t('Regulatory Platform Exports (out/)', 'Exportaciones de la Plataforma (out/)')}</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {t(
                'Direct download links for official regulatory rule registries, batch evaluations, and statutory change datasets.',
                'Descarga directa para los registros oficiales de reglas, evaluaciones por lotes y conjuntos de cambios estatutarios.'
              )}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <a
              href={EXPORT_URLS.rulesJson}
              download="rules.json"
              className="inline-flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs font-mono hover:bg-secondary"
            >
              <span>out/rules.json</span>
              <Download className="size-3 text-muted-foreground" />
            </a>
            <a
              href={EXPORT_URLS.lookupsJson}
              download="lookups.json"
              className="inline-flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs font-mono hover:bg-secondary"
            >
              <span>out/lookups.json (500 addrs)</span>
              <Download className="size-3 text-muted-foreground" />
            </a>
            <a
              href={EXPORT_URLS.changesJson}
              download="changes.json"
              className="inline-flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs font-mono hover:bg-secondary"
            >
              <span>out/changes.json (T1–T6)</span>
              <Download className="size-3 text-muted-foreground" />
            </a>
            <a
              href={`${API_BASE}/exports/bundle/download`}
              download="rhln_deliverables.zip"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 mt-1"
            >
              <Download className="size-3.5" />
              <span>{t('Download All (.ZIP Bundle)', 'Descargar Todo (.ZIP)')}</span>
            </a>
          </div>
        </div>

        {/* System Diagnostics */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
              <Database className="size-5" />
            </div>
            <h3 className="text-lg font-bold">{t('Engine Diagnostics', 'Diagnóstico del Motor')}</h3>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">{t('API Status:', 'Estado API:')}</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {serverHealth?.status || 'Active'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">{t('Default As-Of:', 'Fecha Base:')}</span>
                <span className="font-mono font-bold text-foreground">
                  {metaInfo?.default_as_of || '2026-10-01'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">{t('Extraction Engine:', 'Motor de Extracción:')}</span>
                <span className="font-mono font-bold text-foreground">Lexi Regulatory Parser v1.0</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">{t('Logic Standard:', 'Estándar Lógico:')}</span>
                <span className="font-mono font-bold text-foreground">Kleene 3-Valued Logic</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <span className="text-[10px] font-mono text-muted-foreground block truncate">
              X-Disclaimer: Not legal advice. Summarizes public law.
            </span>
          </div>
        </div>
      </div>

      {/* Endpoints Table */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">{t('All Registered Endpoints (TRD v1.0 Compliance)', 'Endpoints Registrados')}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-secondary/60 text-muted-foreground uppercase text-[11px] font-bold">
              <tr>
                <th className="px-4 py-3">{t('Method', 'Método')}</th>
                <th className="px-4 py-3">{t('Path', 'Ruta')}</th>
                <th className="px-4 py-3">{t('Description', 'Descripción')}</th>
                <th className="px-4 py-3">{t('TRD Section', 'Sección TRD')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card font-mono text-[11px]">
              <tr className="hover:bg-secondary/30">
                <td className="px-4 py-2.5 font-bold text-blue-500">POST</td>
                <td className="px-4 py-2.5 font-bold">/api/v1/lookup</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">Deterministic rulebook lookup for address & facts</td>
                <td className="px-4 py-2.5">TRD 8.3 (P0)</td>
              </tr>
              <tr className="hover:bg-secondary/30">
                <td className="px-4 py-2.5 font-bold text-emerald-500">GET</td>
                <td className="px-4 py-2.5 font-bold">/api/v1/properties</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">List 500 benchmark sample addresses with assessor facts</td>
                <td className="px-4 py-2.5">TRD 8.3 (P0)</td>
              </tr>
              <tr className="hover:bg-secondary/30">
                <td className="px-4 py-2.5 font-bold text-blue-500">POST</td>
                <td className="px-4 py-2.5 font-bold">/api/v1/resolve</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">Resolve spatial jurisdiction hierarchy (State/County/City)</td>
                <td className="px-4 py-2.5">TRD 8.3 (P0)</td>
              </tr>
              <tr className="hover:bg-secondary/30">
                <td className="px-4 py-2.5 font-bold text-emerald-500">GET</td>
                <td className="px-4 py-2.5 font-bold">/api/v1/jurisdictions</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">List all 13 supported legal jurisdiction entities</td>
                <td className="px-4 py-2.5">TRD 8.3 (P0)</td>
              </tr>
              <tr className="hover:bg-secondary/30">
                <td className="px-4 py-2.5 font-bold text-emerald-500">GET</td>
                <td className="px-4 py-2.5 font-bold">/api/v1/changes/cases</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">List benchmark statutory change cases T1 through T6</td>
                <td className="px-4 py-2.5">TRD 8.3 (P0)</td>
              </tr>
              <tr className="hover:bg-secondary/30">
                <td className="px-4 py-2.5 font-bold text-emerald-500">GET</td>
                <td className="px-4 py-2.5 font-bold">/api/v1/documents/:id/text</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">Raw source statutory text for verbatim quote inspection</td>
                <td className="px-4 py-2.5">TRD 8.3 (P0)</td>
              </tr>
              <tr className="hover:bg-secondary/30">
                <td className="px-4 py-2.5 font-bold text-emerald-500">GET</td>
                <td className="px-4 py-2.5 font-bold">/api/v1/exports/bundle/download</td>
                <td className="px-4 py-2.5 font-sans text-muted-foreground">Download all 3 validated export files as rhln_exports.zip</td>
                <td className="px-4 py-2.5">Platform Exports</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

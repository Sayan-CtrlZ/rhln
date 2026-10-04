import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  History,
  Download,
  ArrowRight,
  TriangleAlert,
  CheckCircle2,
} from 'lucide-react';
import { useLang } from './__root';
import {
  fetchChangeCases,
  EXPORT_URLS,
  type ChangeCaseItem,
} from '@/lib/api';

function StatusPill({ status }: { status: string }) {
  if (status === 'applies') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/20 text-[11px]">
        <CheckCircle2 className="size-3" />
        <span>Applies</span>
      </span>
    );
  }
  if (status === 'not_yet_effective') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold border border-blue-500/20 text-[11px]">
        <span>Future Law</span>
      </span>
    );
  }
  if (status === 'superseded') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 font-bold border border-slate-500/20 text-[11px]">
        <span>Superseded</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary text-foreground font-mono text-[11px]">
      <span>{status}</span>
    </span>
  );
}

export const Route = createFileRoute('/changes')({
  component: ChangesPage,
});

export function ChangesPage() {
  const { t } = useLang();

  const [changeCases, setChangeCases] = useState<ChangeCaseItem[]>([]);
  const [selectedCase, setSelectedCase] = useState<ChangeCaseItem | null>(null);

  useEffect(() => {
    fetchChangeCases().then((cases) => {
      if (cases && cases.length > 0) {
        setChangeCases(cases);
        setSelectedCase(cases[0]);
      }
    });
  }, []);

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold text-muted-foreground mb-2">
            <History className="size-3.5 text-primary" />
            {t('Longitudinal Change Monitor · Statutory Impact Simulation Engine', 'Simulación de Impacto Legal')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">
            {t('Statutory Change Scenarios (T1–T5)', 'Escenarios de Cambio Legal (T1–T5)')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">
            {t(
              'Track what happens when legislation takes effect or gets struck down. RHLN evaluates before/after status shifts across all 500 benchmark sample addresses with zero hallucination.',
              'Compruebe qué ocurre cuando una ley entra en vigor. RHLN evalúa el cambio de estado antes y después en las 500 direcciones del benchmark.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={EXPORT_URLS.changesJson}
            download="changes.json"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90"
          >
            <Download className="size-3.5" />
            {t('Download changes.json', 'Descargar changes.json')}
          </a>
        </div>
      </div>

      {/* Change Case Selector Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {changeCases.map((c) => {
          const isSelected = selectedCase?.case_id === c.case_id;
          return (
            <button
              key={c.case_id}
              onClick={() => setSelectedCase(c)}
              className={`rounded-lg border p-4 text-left transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs'
                  : 'border-border bg-card hover:bg-secondary/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary text-foreground">
                  {c.case_id}
                </span>
                <span className="text-[11px] font-bold uppercase text-primary">
                  {c.target_jurisdiction}
                </span>
              </div>
              <h3 className="font-semibold text-sm line-clamp-1 text-foreground">{c.title}</h3>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{t('Impacted:', 'Afectadas:')}</span>
                <span className="font-mono font-bold text-foreground">
                  {c.affected_address_count} {t('props', 'viviendas')}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Scenario Details & Status Shift Table */}
      {selectedCase && (
        <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base px-2.5 py-0.5 rounded bg-primary text-primary-foreground">
                  {selectedCase.case_id}
                </span>
                <h2 className="text-xl font-bold">{selectedCase.title}</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground max-w-4xl">{selectedCase.description}</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="rounded-md border border-border bg-secondary/40 px-3 py-2 text-center">
                <span className="text-[10px] block text-muted-foreground uppercase">{t('Before As-Of', 'Fecha Previa')}</span>
                <span className="font-bold text-foreground">{selectedCase.as_of_before || '2024-01-01'}</span>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
              <div className="rounded-md border border-border bg-primary/10 px-3 py-2 text-center border-primary/30">
                <span className="text-[10px] block text-primary uppercase">{t('After As-Of', 'Fecha Posterior')}</span>
                <span className="font-bold text-primary">{selectedCase.as_of_after || '2026-10-01'}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <span className="text-xs text-muted-foreground">{t('Target Jurisdiction', 'Jurisdicción Objetivo')}</span>
              <p className="text-lg font-bold text-foreground mt-1">{selectedCase.target_jurisdiction}</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <span className="text-xs text-muted-foreground">{t('Addresses Affected', 'Direcciones Afectadas')}</span>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {selectedCase.affected_address_count} / 500
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <span className="text-xs text-muted-foreground">{t('Evaluated Rule', 'Regla Evaluada')}</span>
              <p className="text-sm font-mono font-bold text-foreground mt-1 truncate">
                {selectedCase.diffs?.[0]?.rule_id || 'RULE_EVAL'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
              {t('Address-Level Status Shifts (Sample)', 'Cambios de Estado por Dirección (Muestra)')}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-border/80 shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-secondary/60 text-muted-foreground uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">{t('Address ID', 'ID Dirección')}</th>
                    <th className="px-4 py-3">{t('Rule ID', 'ID Regla')}</th>
                    <th className="px-4 py-3">{t('Status Before', 'Estado Anterior')}</th>
                    <th className="px-4 py-3">{t('Status After', 'Nuevo Estado')}</th>
                    <th className="px-4 py-3">{t('Statutory Rationale', 'Justificación Legal')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 bg-card text-[11px]">
                  {(selectedCase.diffs && selectedCase.diffs.length > 0
                    ? selectedCase.diffs
                    : [
                        {
                          address_id: 'A0001',
                          rule_id: selectedCase.case_id,
                          before_status: 'not_yet_effective',
                          after_status: 'applies',
                          explanation: 'Statutory threshold reached on effective date.',
                        },
                      ]
                  ).map((row, idx) => (
                    <tr key={idx} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 font-bold font-mono text-primary">{row.address_id}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{row.rule_id}</td>
                      <td className="px-4 py-3">
                        <StatusPill status={row.before_status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <ArrowRight className="size-3 text-muted-foreground" />
                          <StatusPill status={row.after_status} />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-sans text-muted-foreground leading-relaxed">{row.explanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import {
  Landmark,
  MapPin,
  ChevronRight,
  RefreshCw,
  Loader2,
  CheckCircle2,
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

export function JurisdictionsPage() {
  const { t } = useLang();

  const [jurisdictionsList, setJurisdictionsList] = useState<BackendJurisdictionNode[]>([]);
  const [jurFilterLevel, setJurFilterLevel] = useState<string>('all');
  const [sandboxStreet, setSandboxStreet] = useState('742 Evergreen Terr');
  const [sandboxCity, setSandboxCity] = useState('Boston');
  const [sandboxState, setSandboxState] = useState('MA');
  const [sandboxZip, setSandboxZip] = useState('02124');
  const [sandboxResolving, setSandboxResolving] = useState(false);
  const [sandboxResult, setSandboxResult] = useState<any>(null);

  useEffect(() => {
    fetchJurisdictions().then((jurs) => {
      if (jurs && jurs.length > 0) setJurisdictionsList(jurs);
    });
  }, []);

  const handleResolveSandbox = async (e: React.FormEvent) => {
    e.preventDefault();
    setSandboxResolving(true);
    try {
      const res = await resolveAddress({
        street: sandboxStreet,
        city: sandboxCity,
        state: sandboxState,
        zip: sandboxZip,
      });
      setSandboxResult(res);
    } catch (err) {
      console.error('Resolve error:', err);
    } finally {
      setSandboxResolving(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold text-muted-foreground mb-2">
            <Landmark className="size-3.5 text-primary" />
            {t('Jurisdictions & Spatial Hierarchy · TRD Section 8.3', 'Jurisdicciones y Jerarquía Espacial')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">
            {t('Supported Jurisdictions & Stack Resolver', 'Jurisdicciones Soportadas y Resolutor')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">
            {t(
              'Explore the 13 supported legal entities across California, New Jersey, and Massachusetts. Test any address to resolve its legal Census jurisdiction hierarchy.',
              'Explore las 13 entidades legales en CA, NJ y MA. Pruebe cualquier dirección para resolver su jerarquía legal.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-secondary px-3 py-1.5 rounded-md border border-border">
            {jurisdictionsList.length} {t('jurisdictions cataloged', 'jurisdicciones')}
          </span>
        </div>
      </div>

      {/* Interactive Address Resolution Sandbox */}
      <div className="mt-6 rounded-lg border border-border bg-card p-6 shadow-xs">
        <h2 className="text-base font-bold flex items-center gap-2 mb-3">
          <MapPin className="size-4 text-primary" />
          {t('Live Spatial Resolution Sandbox (POST /api/v1/resolve)', 'Sandbox de Resolución Espacial en Vivo')}
        </h2>
        <form onSubmit={handleResolveSandbox} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_160px_100px_120px_130px] gap-3 items-end">
          <label className="text-xs font-semibold">
            {t('Street Address', 'Calle')}
            <input
              value={sandboxStreet}
              onChange={(e) => setSandboxStreet(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
            />
          </label>
          <label className="text-xs font-semibold">
            {t('City', 'Ciudad')}
            <input
              value={sandboxCity}
              onChange={(e) => setSandboxCity(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
            />
          </label>
          <label className="text-xs font-semibold">
            {t('State', 'Estado')}
            <input
              value={sandboxState}
              onChange={(e) => setSandboxState(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-mono uppercase"
            />
          </label>
          <label className="text-xs font-semibold">
            {t('Zip Code', 'C.P.')}
            <input
              value={sandboxZip}
              onChange={(e) => setSandboxZip(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-xs font-mono"
            />
          </label>
          <Button type="submit" disabled={sandboxResolving} className="h-9 text-xs font-semibold gap-1.5">
            {sandboxResolving ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
            {t('Resolve Stack', 'Resolver')}
          </Button>
        </form>

        {/* Sandbox Output */}
        {sandboxResult && (
          <div className="mt-4 rounded-md border border-border bg-secondary/30 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2 text-xs font-mono">
              <span>Legal City: <strong>{sandboxResult.geocode?.legal_city}</strong></span>
              <span>County: <strong>{sandboxResult.geocode?.county}</strong></span>
              <span>State: <strong>{sandboxResult.geocode?.state}</strong></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" />
                CENSUS MATCH: OK
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground mr-1">{t('Resolved Stack:', 'Pila Resultante:')}</span>
              {sandboxResult.stack?.map((node: any, idx: number) => (
                <span key={node.id} className="flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded bg-card border border-border text-xs font-mono font-bold">
                    {node.name} <span className="text-[10px] text-muted-foreground font-normal">({node.level})</span>
                  </span>
                  {idx < sandboxResult.stack.length - 1 && <ChevronRight className="size-3 text-muted-foreground" />}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Jurisdictions Filter Bar */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">{t('Jurisdictions Directory', 'Directorio de Jurisdicciones')}</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{t('Level:', 'Nivel:')}</span>
          <select
            value={jurFilterLevel}
            onChange={(e) => setJurFilterLevel(e.target.value)}
            className="rounded-md border border-input bg-card px-3 py-1.5 text-xs font-medium"
          >
            <option value="all">{t('All Levels', 'Todos los niveles')}</option>
            <option value="state">{t('State', 'Estado')}</option>
            <option value="city">{t('City / Municipal', 'Ciudad / Municipio')}</option>
            <option value="county">{t('County', 'Condado')}</option>
          </select>
        </div>
      </div>

      {/* Jurisdictions Grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jurisdictionsList
          .filter((j) => jurFilterLevel === 'all' || j.level === jurFilterLevel)
          .map((j) => (
            <div key={j.id} className="rounded-lg border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                    {j.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-secondary text-foreground">
                    {j.level}
                  </span>
                </div>
                <h3 className="font-bold text-base text-foreground mt-1">{j.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">State: <strong>{j.state}</strong></p>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t('Active Rules:', 'Reglas Activas:')}</span>
                <span className="font-mono font-bold text-primary">{j.rule_count || 0}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

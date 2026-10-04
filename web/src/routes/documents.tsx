import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Library,
  Search,
  FileText,
  Loader2,
  X,
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

export function DocumentsPage() {
  const { t } = useLang();

  const [corpusDocs, setCorpusDocs] = useState<DocumentItem[]>([]);
  const [docSearch, setDocSearch] = useState('');
  const [docLevelFilter, setDocLevelFilter] = useState<string>('all');
  const [activeDocText, setActiveDocText] = useState<{ title: string; text: string; doc_id: string } | null>(null);
  const [loadingDocText, setLoadingDocText] = useState(false);

  useEffect(() => {
    fetchDocuments({ limit: 100 }).then((docs) => {
      if (docs && docs.length > 0) setCorpusDocs(docs);
    });
  }, []);

  const openDocumentReader = async (docId: string, title?: string) => {
    setLoadingDocText(true);
    try {
      const data = await fetchDocumentText(docId);
      setActiveDocText({
        doc_id: data.doc_id,
        title: title || data.title || docId,
        text: data.text,
      });
    } catch (err) {
      console.error('Failed to load doc text:', err);
    } finally {
      setLoadingDocText(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold text-muted-foreground mb-2">
            <Library className="size-3.5 text-primary" />
            {t('Official 87-Document Corpus Manifest', 'Manifest Oficial de 87 Documentos')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display">
            {t('Housing Law Corpus Library', 'Biblioteca Legal del Corpus')}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-3xl">
            {t(
              'Search, filter, and inspect the complete source legal texts across state statutes, municipal codes, and rent board regulations.',
              'Busque, filtre e inspeccione los textos legales oficiales completos.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-secondary px-3 py-1.5 rounded-md border border-border">
          <span>{corpusDocs.length} {t('documents indexed', 'documentos indexados')}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={docSearch}
            onChange={(e) => setDocSearch(e.target.value)}
            placeholder={t('Search documents by title or ID (e.g., D001, Boston, AB 1482)...', 'Buscar documentos...')}
            className="w-full rounded-md border border-input bg-card pl-10 pr-3 py-2 text-xs shadow-xs focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">{t('Level:', 'Nivel:')}</span>
          <select
            value={docLevelFilter}
            onChange={(e) => setDocLevelFilter(e.target.value)}
            className="rounded-md border border-input bg-card px-3 py-2 text-xs font-medium shadow-xs"
          >
            <option value="all">{t('All Levels', 'Todos los niveles')}</option>
            <option value="state">{t('State Law', 'Leyes Estatales')}</option>
            <option value="city">{t('Municipal / City', 'Municipales')}</option>
            <option value="county">{t('County', 'Condados')}</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {corpusDocs
          .filter((d) => {
            if (docLevelFilter !== 'all' && d.jurisdiction_level !== docLevelFilter) return false;
            if (!docSearch) return true;
            const q = docSearch.toLowerCase();
            return (
              d.doc_id.toLowerCase().includes(q) ||
              d.document_title.toLowerCase().includes(q) ||
              d.jurisdiction_name.toLowerCase().includes(q)
            );
          })
          .map((d) => (
            <div key={d.doc_id} className="rounded-lg border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary text-foreground">
                    {d.doc_id}
                  </span>
                  <span className="text-[11px] font-bold uppercase text-primary">
                    {d.jurisdiction_name} ({d.state})
                  </span>
                </div>
                <h3 className="font-bold text-sm text-foreground line-clamp-2">{d.document_title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="bg-secondary px-1.5 py-0.5 rounded font-mono">{d.category}</span>
                  <span>·</span>
                  <span>{d.source_type}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => openDocumentReader(d.doc_id, d.document_title)}
                  className="h-8 text-xs font-semibold gap-1.5"
                >
                  <FileText className="size-3.5" />
                  {t('Read Full Statute', 'Leer Ley')}
                </Button>
                <span className="text-[11px] text-muted-foreground font-mono">{d.jurisdiction_level}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Statute Text Modal / Reader */}
      <Dialog.Root open={activeDocText !== null} onOpenChange={(open) => { if (!open) setActiveDocText(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[95vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-secondary/30">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                <h3 className="font-bold text-base font-display">{activeDocText?.title}</h3>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                  {activeDocText?.doc_id}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setActiveDocText(null)} className="size-8">
                <X className="size-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 font-mono text-xs leading-relaxed bg-background/50 select-text whitespace-pre-wrap">
              {loadingDocText ? (
                <div className="flex items-center justify-center py-12 gap-2 text-muted-foreground">
                  <Loader2 className="size-5 animate-spin text-primary" />
                  <span>{t('Loading official statute text...', 'Cargando texto oficial...')}</span>
                </div>
              ) : (
                activeDocText?.text || t('No statute text available.', 'No hay texto disponible.')
              )}
            </div>
            <div className="border-t border-border px-6 py-3 bg-secondary/20 flex items-center justify-between text-xs text-muted-foreground">
              <span>{t('Corpus source document (verbatim text)', 'Documento fuente del corpus (texto íntegro)')}</span>
              <Button variant="default" size="sm" onClick={() => setActiveDocText(null)}>
                {t('Close Reader', 'Cerrar')}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

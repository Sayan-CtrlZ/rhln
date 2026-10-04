import { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  User,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/routes/__root';
import { askAICopilot, type AIChatResult } from '@/lib/api';

function FormattedMessageText({ text }: { text: string }) {
  const paragraphs = text.split('\n\n');
  return (
    <div className="space-y-2">
      {paragraphs.map((p, pIdx) => {
        const lines = p.split('\n');
        return (
          <div key={pIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const parts = line.split(/(\*\*.*?\*\*)/g);
              const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ');
              return (
                <div
                  key={lIdx}
                  className={`leading-relaxed ${isBullet ? 'pl-3 relative before:content-["•"] before:absolute before:left-0 before:text-primary font-normal' : ''}`}
                >
                  {parts.map((part, partIdx) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <strong key={partIdx} className="font-bold text-foreground">
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    return isBullet ? part.replace(/^[-•]\s*/, '') : part;
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

interface AICopilotDrawerProps {
  open: boolean;
  onClose: () => void;
  addressContext?: string;
  activeRules?: any[];
}

export function AICopilotDrawer({
  open,
  onClose,
  addressContext,
  activeRules,
}: AICopilotDrawerProps) {
  const { t, language } = useLang();
  const es = language === 'es';

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<
    Array<{
      sender: 'user' | 'assistant';
      text: string;
      citations?: string[];
      model?: string;
    }>
  >([
    {
      sender: 'assistant',
      text: es
        ? 'Hola, soy el Asistente Legal Inteligente de RHLN, impulsado por Anthropic Claude. Pregúntame sobre aumentos de alquiler, causa justa de desalojo, depósitos de garantía o leyes algorítmicas para cualquier dirección.'
        : 'Hello, I am the RHLN AI Legal Copilot powered by Anthropic Claude. Ask me anything about rent increase limits, just cause evictions, security deposits, or algorithmic bans for your apartment address.',
      model: 'Anthropic Claude',
    },
  ]);

  if (!open) return null;

  const handleSend = async (questionText?: string) => {
    const q = questionText || input;
    if (!q.trim() || loading) return;

    const userMsg = q.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res: AIChatResult = await askAICopilot({
        question: userMsg,
        address: addressContext,
        as_of: '2026-10-01',
        lang: language,
        active_rules: activeRules,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: res.answer,
          citations: res.citations,
          model: res.model_used,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: es
            ? 'Error al consultar el modelo de IA. Verifique que el servicio esté activo.'
            : 'Error querying the AI model. Please verify backend service connection.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = es
    ? [
        '¿Cuánto puede subir el alquiler mi arrendador en Berkeley?',
        '¿Cuáles son las causas justas válidas de desalojo bajo AB 1482?',
        '¿La ley AB 12 permite cobrar 2 meses de fianza o depósito?',
        '¿Está prohibida la fijación algorítmica de alquileres bajo AB 325?',
      ]
    : [
        'Can my landlord raise my rent by 10% in Berkeley?',
        'What are the valid just cause eviction grounds under CA AB 1482?',
        'Does California AB 12 allow charging 2 months security deposit?',
        'Is algorithmic rent-setting illegal in California under AB 325?',
      ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-card border-l border-border h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="border-b border-border p-4 sm:p-5 flex items-center justify-between bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="size-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">
                  {t('AI Legal Copilot', 'Copiloto Legal de IA')}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:text-purple-400">
                  <Cpu className="size-2.5" />
                  Anthropic Claude
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {addressContext
                  ? t(`Grounding answers in laws for: ${addressContext}`, `Respuestas basadas en: ${addressContext}`)
                  : t('Statutory reasoning & plain-language legal explanation', 'Explicación legal en lenguaje accesible')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'assistant' && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 mt-1">
                  <Bot className="size-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-primary text-primary-foreground font-medium shadow-xs'
                    : 'bg-secondary/60 border border-border text-foreground shadow-2xs'
                }`}
              >
                <FormattedMessageText text={m.text} />

                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-border/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 mb-1.5">
                      <BookOpen className="size-3 text-primary" />
                      {t('Verified Statutory Citations', 'Citas Legales Verificadas')}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {m.citations.map((cite, cidx) => (
                        <span
                          key={cidx}
                          className="rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground border border-border"
                        >
                          {cite}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {m.model && (
                  <div className="mt-2 text-[10px] text-muted-foreground flex items-center justify-between">
                    <span>{m.model}</span>
                    <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="size-2.5" />
                      {t('Grounded in Corpus', 'Fundamentado en Corpus')}
                    </span>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground border border-border mt-1">
                  <User className="size-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
              <Loader2 className="size-4 animate-spin text-primary" />
              <span>{t('Claude is analyzing housing law statutes...', 'Claude está analizando la legislación...')}</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts & Input Box */}
        <div className="border-t border-border p-4 bg-card space-y-3">
          {messages.length <= 2 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <HelpCircle className="size-3 text-primary" />
                {t('Suggested Questions:', 'Preguntas Sugeridas:')}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((prompt, pidx) => (
                  <button
                    key={pidx}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="rounded-md border border-border/80 bg-secondary/50 px-2 py-1 text-[11px] text-foreground hover:bg-secondary hover:border-primary/40 text-left transition-all"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                es
                  ? 'Pregunte sobre leyes de alquiler, fianzas o desalojo...'
                  : 'Ask about rent increases, deposits, or just cause rules...'
              }
              className="flex-1 h-10 px-3 text-xs sm:text-sm rounded-lg border border-input bg-secondary/40 focus:bg-card focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <Button type="submit" size="sm" disabled={loading || !input.trim()} className="h-10 px-4 gap-1.5 font-semibold">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              <span>{t('Ask', 'Enviar')}</span>
            </Button>
          </form>

          <p className="text-[10px] text-muted-foreground text-center">
            {t(
              'Not legal advice. Generates informational answers synthesized from verified government statutes.',
              'No es asesoría legal. Respuestas informativas extraídas de códigos legales oficiales.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

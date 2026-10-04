import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import {
  House,
  Search,
  Landmark,
  History,
  Scale,
  Library,
  Terminal,
  Code2,
  Globe2,
  Moon,
  Sun,
  TriangleAlert,
  ArrowRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import appCss from "../styles.css?url";
import { SERVER_ROOT } from "../lib/api";
import { AICopilotDrawer } from "@/components/AICopilotDrawer";

// Shared Language Context
type Language = 'en' | 'es';
interface LangContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, es: string) => string;
}
export const LangContext = createContext<LangContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (en) => en,
});

export const useLang = () => useContext(LangContext);

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The requested page does not exist in the Rental Housing Law Navigator.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Navigation Error
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while rendering this section.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rental Housing Law Navigator (RHLN)" },
      {
        name: "description",
        content:
          "Autonomous multi-jurisdictional housing law navigator. Determine applicable rules today and trace statutory changes with citations.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [language, setLanguage] = useState<Language>('en');
  const [dark, setDark] = useState(false);
  const [aiCopilotOpen, setAiCopilotOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    setDark(window.localStorage.getItem('theme') === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  const es = language === 'es';
  const t = (en: string, spanish: string) => (es ? spanish : en);

  return (
    <QueryClientProvider client={queryClient}>
      <LangContext.Provider value={{ language, setLanguage, t }}>
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
          {/* Top Legal Disclaimer (TRD P0 Mandatory Notice) - Shown on Dashboard & Inner Pages */}
          {!isLandingPage && (
            <div className="border-b border-border/80 bg-secondary/90 px-4 py-3 text-center shadow-xs">
              <div className="mx-auto flex max-w-[1600px] w-full items-center justify-center">
                <p className="inline-flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold text-foreground tracking-tight">
                  <TriangleAlert className="size-4.5 sm:size-5 shrink-0 text-amber-500" />
                  <span>
                    {t(
                      'Not legal advice. Summaries of public housing law. All rules cite verified verbatim statutory text.',
                      'No es asesoría legal. Resúmenes de leyes públicas. Todas las reglas citan texto legal verificado.'
                    )}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Sticky Navigation Header */}
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur shadow-xs">
            <div className="mx-auto flex max-w-[1600px] w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
              <Link to="/" className="flex items-center gap-3 group shrink-0">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg shadow-xs group-hover:scale-105 transition-transform overflow-hidden bg-white/10 dark:bg-black/10">
                  <img src="/logo.png" alt="RHLN Logo" className="size-full object-contain" />
                </span>
                <div className="hidden sm:block">
                  <span className="font-display font-bold text-base leading-none sm:text-lg">
                    Rental Housing Law Navigator
                  </span>
                  <span className="block text-[11px] text-muted-foreground font-mono">
                    {isLandingPage ? t('Public Housing Law Intelligence', 'Inteligencia de Leyes de Vivienda') : 'RHLN · Compliance Dashboard'}
                  </span>
                </div>
              </Link>

              {/* Navigation Bar: Landing Page Section Anchor Links VS Dashboard Functional Tabs */}
              {isLandingPage ? (
                /* Landing Page Smooth-Scroll Navigation */
                <nav className="hidden lg:flex items-center gap-1.5 bg-secondary/50 p-1.5 rounded-xl border border-border/70 text-sm font-semibold">
                  <a
                    href="#overview"
                    className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all"
                  >
                    {t('Overview', 'Inicio')}
                  </a>
                  <a
                    href="#how-it-works"
                    className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all"
                  >
                    {t('How It Works', 'Cómo Funciona')}
                  </a>
                  <a
                    href="#features"
                    className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all"
                  >
                    {t('Capabilities', 'Capacidades')}
                  </a>
                  <a
                    href="#solutions"
                    className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all"
                  >
                    {t('Who It\'s For', 'Para Quién Es')}
                  </a>
                  <a
                    href="#jurisdictions"
                    className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all"
                  >
                    {t('Coverage', 'Cobertura')}
                  </a>
                  <a
                    href="#faq"
                    className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all"
                  >
                    {t('FAQ', 'Preguntas')}
                  </a>
                </nav>
              ) : (
                /* Dashboard 6-Column Navigation Bar - Enhanced Size */
                <nav className="hidden lg:grid grid-cols-6 gap-2 flex-1 max-w-4xl mx-4 rounded-xl border border-border/80 bg-secondary/50 p-1.5">
                  <Link
                    to="/lookup"
                    className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs"
                  >
                    <Search className="size-4 shrink-0" />
                    <span>{t('Lookup', 'Consulta')}</span>
                  </Link>
                  <Link
                    to="/changes"
                    className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs"
                  >
                    <History className="size-4 shrink-0" />
                    <span>{t('Changes', 'Cambios')}</span>
                  </Link>
                  <Link
                    to="/jurisdictions"
                    className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs"
                  >
                    <Landmark className="size-4 shrink-0" />
                    <span>{t('Jurisdictions', 'Jurisdicciones')}</span>
                  </Link>
                  <Link
                    to="/rules"
                    className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs"
                  >
                    <Scale className="size-4 shrink-0" />
                    <span>{t('Rules', 'Reglas')}</span>
                  </Link>
                  <Link
                    to="/documents"
                    className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs"
                  >
                    <Library className="size-4 shrink-0" />
                    <span>{t('Corpus', 'Corpus')}</span>
                  </Link>
                  <Link
                    to="/api"
                    className="flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs"
                  >
                    <Terminal className="size-4 shrink-0" />
                    <span>{t('API & Docs', 'API y Docs')}</span>
                  </Link>
                </nav>
              )}

              {/* Utility Actions & Primary CTA Button */}
              <div className="flex items-center gap-3 shrink-0">
                {isLandingPage && (
                  /* Landing Page CTA Button */
                  <Link
                    to="/lookup"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>{t('Launch Dashboard', 'Iniciar Panel')}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="h-9 gap-1.5 px-3 text-xs font-semibold shrink-0"
                >
                  <Globe2 className="size-4" />
                  <span>{language === 'en' ? 'EN' : 'ES'}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDark(!dark)}
                  className="size-9 shrink-0"
                >
                  {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="size-9 shrink-0 lg:hidden ml-1"
                >
                  {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </Button>

                {isLandingPage && (
                  <Link
                    to="/lookup"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all shrink-0 ml-1"
                  >
                    <span>{t('Launch App', 'Ir al Panel')}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
              <div className="flex flex-col lg:hidden border-t border-border bg-background/95 backdrop-blur absolute left-0 w-full top-full shadow-lg p-2 gap-1 z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                {isLandingPage ? (
                  <>
                    <a
                      href="#overview"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    >
                      {t('Overview', 'Inicio')}
                    </a>
                    <a
                      href="#how-it-works"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    >
                      {t('How It Works', 'Cómo Funciona')}
                    </a>
                    <a
                      href="#coverage"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    >
                      {t('Coverage', 'Cobertura')}
                    </a>
                    <a
                      href="#faq"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    >
                      {t('FAQ', 'Preguntas')}
                    </a>
                    <Link
                      to="/lookup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-2 flex justify-center items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90"
                    >
                      <span>{t('Launch Dashboard', 'Iniciar Panel')}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/lookup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                    >
                      {t('Lookup', 'Consulta')}
                    </Link>
                    <Link
                      to="/changes"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                    >
                      {t('Changes', 'Cambios')}
                    </Link>
                    <Link
                      to="/jurisdictions"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                    >
                      {t('Jurisdictions', 'Jurisdicciones')}
                    </Link>
                    <Link
                      to="/rules"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                    >
                      {t('Rules', 'Reglas')}
                    </Link>
                    <Link
                      to="/documents"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                    >
                      {t('Corpus', 'Corpus')}
                    </Link>
                    <Link
                      to="/api"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-secondary/50 hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                    >
                      {t('API', 'API')}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setAiCopilotOpen(true);
                      }}
                      className="px-4 py-3 mt-2 rounded-lg text-sm font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex justify-center items-center gap-2"
                    >
                      <Sparkles className="size-4" />
                      {t('AI Copilot', 'Copiloto de IA')}
                    </button>
                  </>
                )}
              </div>
            )}
          </header>

          {/* AI Copilot Slide-Over Drawer */}
          <AICopilotDrawer open={aiCopilotOpen} onClose={() => setAiCopilotOpen(false)} />

          {/* Page Body */}
          <div className="flex-1 animate-in fade-in zoom-in-[0.98] duration-500 ease-out">
            <Outlet />
          </div>

          {/* Global Footer */}
          <footer className="mt-12 border-t border-border bg-card/60 py-6 text-xs text-muted-foreground">
            <div className="mx-auto flex max-w-[1600px] w-full flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2">
                <House className="size-4 text-primary" />
                <span className="font-semibold text-foreground">Rental Housing Law Navigator</span>
                <span>·</span>
                <span>{t('Strictly Deterministic Logic Engine', 'Motor Determinista de Reglas')}</span>
              </div>
              <div className="flex items-center gap-4">
                <a href={`${SERVER_ROOT}/docs`} target="_blank" rel="noreferrer" className="hover:text-foreground">
                  Swagger /docs
                </a>
                <a href={`${SERVER_ROOT}/redoc`} target="_blank" rel="noreferrer" className="hover:text-foreground">
                  ReDoc
                </a>
                <span>·</span>
                <span>{t('Verified public sources. Not legal advice.', 'Fuentes públicas verificadas. No es asesoría legal.')}</span>
              </div>
            </div>
          </footer>
        </div>
      </LangContext.Provider>
    </QueryClientProvider>
  );
}

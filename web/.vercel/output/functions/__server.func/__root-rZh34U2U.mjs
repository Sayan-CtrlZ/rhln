import { i as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link, d as Scripts, f as HeadContent, g as Outlet, p as useLocation, x as useRouter, y as createRootRouteWithContext } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { t as QueryClientProvider } from "./_libs/tanstack__react-query.mjs";
import { C as Library, D as House, I as Earth, O as History, T as Landmark, U as CircleQuestionMark, _ as Moon, a as User, c as Terminal, ct as ArrowRight, f as ShieldCheck, h as Scale, it as BookOpen, l as Sun, m as Search, n as X, o as TriangleAlert, p as Send, rt as Bot, u as Sparkles, x as LoaderCircle, z as Cpu } from "./_libs/lucide-react.mjs";
import { v as Slot } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "./_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "./_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/__root-rZh34U2U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			neo: "edge border-primary bg-primary text-primary-foreground font-bold rounded-md hover:lift hover:bg-primary/90 hover:text-primary-foreground active:translate-y-px",
			neoOutline: "edge text-foreground font-semibold rounded-lg hover:lift hover:border-primary/40 active:translate-y-px",
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var styles_default = "/assets/styles-BqWZzzPG.css";
/**
* Comprehensive API client connecting the React UI to the RHLN FastAPI backend.
* Adheres strictly to the RHLN Technical Requirements Document (TRD v1.0).
*/
var API_BASE = "http://localhost:8000/api/v1";
var SERVER_ROOT = "http://localhost:8000";
async function fetchHealth() {
	return (await (await fetch(`${SERVER_ROOT}/health`)).json()).data;
}
async function fetchMeta() {
	return (await (await fetch(`${API_BASE}/meta`)).json()).data;
}
async function fetchJurisdictions(params) {
	const url = new URL(`${API_BASE}/jurisdictions`);
	if (params?.state) url.searchParams.set("state", params.state);
	if (params?.level) url.searchParams.set("level", params.level);
	return (await (await fetch(url.toString())).json()).data || [];
}
async function resolveAddress(addr) {
	return (await (await fetch(`${API_BASE}/resolve`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(addr)
	})).json()).data;
}
async function fetchDocuments(params) {
	const url = new URL(`${API_BASE}/documents`);
	if (params?.jurisdiction_id) url.searchParams.set("jurisdiction_id", params.jurisdiction_id);
	if (params?.category) url.searchParams.set("category", params.category);
	if (params?.limit) url.searchParams.set("limit", String(params.limit));
	return (await (await fetch(url.toString())).json()).data || [];
}
async function fetchDocumentText(docId) {
	const d = (await (await fetch(`${API_BASE}/documents/${docId}/text`)).json()).data;
	if (d && !d.text) d.text = d.text_slice || "";
	return d;
}
async function fetchRules(params) {
	const url = new URL(`${API_BASE}/rules`);
	if (params?.jurisdiction) url.searchParams.set("jurisdiction", params.jurisdiction);
	if (params?.category) url.searchParams.set("category", params.category);
	if (params?.as_of) url.searchParams.set("as_of", params.as_of);
	return (await (await fetch(url.toString())).json()).data || [];
}
async function fetchRuleSource(ruleId) {
	const res = await fetch(`${API_BASE}/rules/${ruleId}/source`);
	if (!res.ok) throw new Error(`Failed to fetch source for rule ${ruleId}`);
	return (await res.json()).data;
}
async function lookupAddress(params) {
	const payload = {
		as_of: params.as_of || "2026-10-01",
		facts: {}
	};
	if (params.property_id) payload.property_id = params.property_id;
	else if (params.street) payload.address = {
		street: params.street,
		city: params.city || "San Francisco",
		state: params.state || "CA",
		zip: params.zip || "94110"
	};
	if (params.year_built !== void 0 && params.year_built !== null) payload.facts.year_built = Number(params.year_built);
	if (params.units !== void 0 && params.units !== null) payload.facts.units = Number(params.units);
	const response = await fetch(`${API_BASE}/lookup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
	if (!response.ok) {
		const errorBody = await response.json().catch(() => ({}));
		throw new Error(errorBody?.error?.message || `Lookup failed with status ${response.status}`);
	}
	return (await response.json()).data;
}
async function fetchSampleProperties(limit = 100) {
	try {
		const response = await fetch(`${API_BASE}/properties?limit=${limit}`);
		if (!response.ok) return [];
		return (await response.json()).data || [];
	} catch (err) {
		console.warn("Backend unavailable, using local fallback:", err);
		return [];
	}
}
async function fetchChangeCases() {
	try {
		const response = await fetch(`${API_BASE}/changes/cases`);
		if (!response.ok) return [];
		return (await response.json()).data || [];
	} catch (err) {
		console.warn("Failed to fetch change cases from backend:", err);
		return [];
	}
}
async function fetchChangeCaseDetail(caseId) {
	try {
		const response = await fetch(`${API_BASE}/changes/cases/${caseId}`);
		if (!response.ok) return null;
		return (await response.json()).data || null;
	} catch (err) {
		console.warn(`Failed to fetch change case detail ${caseId}:`, err);
		return null;
	}
}
async function askAICopilot(params) {
	const res = await fetch(`${API_BASE}/ai/chat`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(params)
	});
	if (!res.ok) throw new Error(`AI query failed with status ${res.status}`);
	return (await res.json()).data;
}
async function explainRuleWithAI(ruleId, lang = "en", context) {
	const res = await fetch(`${API_BASE}/ai/explain-rule`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			rule_id: ruleId,
			lang,
			address: context?.address,
			year_built: context?.year_built ? Number(context.year_built) : void 0,
			units: context?.units ? Number(context.units) : void 0
		})
	});
	if (!res.ok) throw new Error(`Rule explanation failed with status ${res.status}`);
	return (await res.json()).data;
}
var EXPORT_URLS = {
	rulesJson: `${API_BASE}/rules/export`,
	lookupsJson: `${API_BASE}/lookup/export`,
	changesJson: `${API_BASE}/changes/export`,
	bundleZip: `${API_BASE}/exports/bundle/latest`,
	swaggerDocs: `${SERVER_ROOT}/docs`,
	redocDocs: `${SERVER_ROOT}/redoc`,
	openapiJson: `${SERVER_ROOT}/openapi.json`,
	auditVerify: `${API_BASE}/audit/verify-chain`
};
async function fetchAuditEvents() {
	try {
		const res = await fetch(`${API_BASE}/audit/events`);
		if (!res.ok) return [];
		return (await res.json()).data || [];
	} catch (err) {
		console.warn("Failed to fetch audit events:", err);
		return [];
	}
}
async function verifyAuditChain() {
	try {
		const res = await fetch(`${API_BASE}/audit/verify-chain`);
		if (!res.ok) return null;
		return (await res.json()).data;
	} catch (err) {
		console.warn("Failed to verify audit chain:", err);
		return null;
	}
}
function FormattedMessageText({ text }) {
	const paragraphs = text.split("\n\n");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: paragraphs.map((p, pIdx) => {
			const lines = p.split("\n");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: lines.map((line, lIdx) => {
					const parts = line.split(/(\*\*.*?\*\*)/g);
					const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("• ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `leading-relaxed ${isBullet ? "pl-3 relative before:content-[\"•\"] before:absolute before:left-0 before:text-primary font-normal" : ""}`,
						children: parts.map((part, partIdx) => {
							if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-bold text-foreground",
								children: part.slice(2, -2)
							}, partIdx);
							return isBullet ? part.replace(/^[-•]\s*/, "") : part;
						})
					}, lIdx);
				})
			}, pIdx);
		})
	});
}
function AICopilotDrawer({ open, onClose, addressContext, activeRules }) {
	const { t, language } = useLang();
	const es = language === "es";
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([{
		sender: "assistant",
		text: es ? "Hola, soy Lexi, tu Especialista en Inteligencia Legal de Vivienda de RHLN. Pregúntame sobre aumentos de alquiler, causa justa de desalojo, depósitos de garantía o regulaciones de fijación algorítmica para cualquier dirección." : "Hello, I am Lexi, your RHLN AI Housing Law Intelligence Specialist. Ask me anything about rent increase limits, just cause evictions, security deposits, or algorithmic bans for your apartment address.",
		model: "Lexi Intelligence v1.0"
	}]);
	if (!open) return null;
	const handleSend = async (questionText) => {
		const q = questionText || input;
		if (!q.trim() || loading) return;
		const userMsg = q.trim();
		setInput("");
		setMessages((prev) => [...prev, {
			sender: "user",
			text: userMsg
		}]);
		setLoading(true);
		try {
			const res = await askAICopilot({
				question: userMsg,
				address: addressContext,
				as_of: "2026-10-01",
				lang: language,
				active_rules: activeRules
			});
			setMessages((prev) => [...prev, {
				sender: "assistant",
				text: res.answer,
				citations: res.citations,
				model: res.model_used,
				confidence: res.confidence
			}]);
		} catch (err) {
			setMessages((prev) => [...prev, {
				sender: "assistant",
				text: es ? "Error al consultar el servicio de Lexi. Verifique que la conexión esté activa." : "Error querying the Lexi AI service. Please verify backend connection."
			}]);
		} finally {
			setLoading(false);
		}
	};
	const samplePrompts = es ? [
		"¿Cuánto puede subir el alquiler mi arrendador en Berkeley?",
		"¿Cuáles son las causas justas válidas de desalojo bajo AB 1482?",
		"¿La ley AB 12 permite cobrar 2 meses de fianza o depósito?",
		"¿Está prohibida la fijación algorítmica de alquileres bajo AB 325?"
	] : [
		"Can my landlord raise my rent by 10% in Berkeley?",
		"What are the valid just cause eviction grounds under CA AB 1482?",
		"Does California AB 12 allow charging 2 months security deposit?",
		"Is algorithmic rent-setting illegal in California under AB 325?"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl bg-card border-l border-border h-full flex flex-col justify-between shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border p-4 sm:p-5 flex items-center justify-between bg-secondary/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm sm:text-base",
								children: t("Lexi — AI Housing Specialist", "Lexi — Especialista Legal de IA")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-2.5" }), "Lexi AI"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: addressContext ? t(`Grounding answers in laws for: ${addressContext}`, `Respuestas basadas en: ${addressContext}`) : t("Statutory reasoning & plain-language legal explanation", "Explicación legal en lenguaje accesible")
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 sm:p-5 space-y-4",
					children: [messages.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-start gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`,
						children: [
							m.sender === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `max-w-[85%] rounded-xl p-3.5 text-xs sm:text-sm leading-relaxed ${m.sender === "user" ? "bg-primary text-primary-foreground font-medium shadow-xs" : "bg-secondary/60 border border-border text-foreground shadow-2xs"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormattedMessageText, { text: m.text }),
									m.citations && m.citations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 pt-2.5 border-t border-border/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 mb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3 text-primary" }), t("Verified Statutory Citations", "Citas Legales Verificadas")]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1",
											children: m.citations.map((cite, cidx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground border border-border",
												children: cite
											}, cidx))
										})]
									}),
									m.model && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 text-[10px] text-muted-foreground flex items-center justify-between border-t border-border/40 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.model }),
											m.confidence !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400",
												children: [
													t("Confidence:", "Confianza:"),
													" ",
													(m.confidence * 100).toFixed(1),
													"%"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-2.5" }), t("Grounded in Corpus", "Fundamentado en Corpus")]
											})
										]
									})
								]
							}),
							m.sender === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground border border-border mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" })
							})
						]
					}, idx)), loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Lexi is analyzing housing law statutes...", "Lexi está analizando la legislación...") })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border p-4 bg-card space-y-3",
					children: [
						messages.length <= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-3 text-primary" }), t("Suggested Questions:", "Preguntas Sugeridas:")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: samplePrompts.map((prompt, pidx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleSend(prompt),
									className: "rounded-md border border-border/80 bg-secondary/50 px-2 py-1 text-[11px] text-foreground hover:bg-secondary hover:border-primary/40 text-left transition-all",
									children: prompt
								}, pidx))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								handleSend();
							},
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: input,
								onChange: (e) => setInput(e.target.value),
								placeholder: es ? "Pregunte sobre leyes de alquiler, fianzas o desalojo..." : "Ask about rent increases, deposits, or just cause rules...",
								className: "flex-1 h-10 px-3 text-xs sm:text-sm rounded-lg border border-input bg-secondary/40 focus:bg-card focus:ring-2 focus:ring-primary focus:outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								size: "sm",
								disabled: loading || !input.trim(),
								className: "h-10 px-4 gap-1.5 font-semibold",
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Ask", "Enviar") })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted-foreground text-center",
							children: t("Not legal advice. Generates informational answers synthesized from verified government statutes.", "No es asesoría legal. Respuestas informativas extraídas de códigos legales oficiales.")
						})
					]
				})
			]
		})
	});
}
var LangContext = (0, import_react.createContext)({
	language: "en",
	setLanguage: () => {},
	t: (en) => en
});
var useLang = () => (0, import_react.useContext)(LangContext);
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The requested page does not exist in the Rental Housing Law Navigator."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Return to Home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "Navigation Error"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong while rendering this section."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							router.invalidate();
							reset();
						},
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary",
						children: "Home"
					})]
				})
			]
		})
	});
}
var Route = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Rental Housing Law Navigator (RHLN)" },
			{
				name: "description",
				content: "Autonomous multi-jurisdictional housing law navigator. Determine applicable rules today and trace statutory changes with citations."
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&family=IBM+Plex+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route.useRouteContext();
	const [language, setLanguage] = (0, import_react.useState)("en");
	const [dark, setDark] = (0, import_react.useState)(false);
	const [aiCopilotOpen, setAiCopilotOpen] = (0, import_react.useState)(false);
	const isLandingPage = useLocation().pathname === "/";
	(0, import_react.useEffect)(() => {
		setDark(window.localStorage.getItem("theme") === "dark");
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", dark);
		window.localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);
	const es = language === "es";
	const t = (en, spanish) => es ? spanish : en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangContext.Provider, {
			value: {
				language,
				setLanguage,
				t
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-screen bg-background text-foreground flex flex-col font-sans",
				children: [
					!isLandingPage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-border/80 bg-secondary/90 px-4 py-3 text-center shadow-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex max-w-[1600px] w-full items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "inline-flex items-center justify-center gap-2.5 text-sm sm:text-base font-semibold text-foreground tracking-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4.5 sm:size-5 shrink-0 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Not legal advice. Summaries of public housing law. All rules cite verified verbatim statutory text.", "No es asesoría legal. Resúmenes de leyes públicas. Todas las reglas citan texto legal verificado.") })]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-[1600px] w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									className: "flex items-center gap-3 group shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-primary text-primary-foreground shadow-xs group-hover:scale-105 transition-transform",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
											className: "size-4",
											strokeWidth: 2.2
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden sm:block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display font-bold text-base leading-none sm:text-lg",
											children: "Rental Housing Law Navigator"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-[11px] text-muted-foreground font-mono",
											children: isLandingPage ? t("Public Housing Law Intelligence", "Inteligencia de Leyes de Vivienda") : "RHLN · Compliance Dashboard"
										})]
									})]
								}),
								isLandingPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
									className: "hidden lg:flex items-center gap-1.5 bg-secondary/50 p-1.5 rounded-xl border border-border/70 text-sm font-semibold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#overview",
											className: "px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all",
											children: t("Overview", "Inicio")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#how-it-works",
											className: "px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all",
											children: t("How It Works", "Cómo Funciona")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#features",
											className: "px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all",
											children: t("Capabilities", "Capacidades")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#solutions",
											className: "px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all",
											children: t("Who It's For", "Para Quién Es")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#jurisdictions",
											className: "px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all",
											children: t("Coverage", "Cobertura")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#faq",
											className: "px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/80 transition-all",
											children: t("FAQ", "Preguntas")
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
									className: "hidden lg:grid grid-cols-6 gap-2 flex-1 max-w-4xl mx-4 rounded-xl border border-border/80 bg-secondary/50 p-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/lookup",
											className: "flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Lookup", "Consulta") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/changes",
											className: "flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Changes", "Cambios") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/jurisdictions",
											className: "flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Jurisdictions", "Jurisdicciones") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/rules",
											className: "flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Rules", "Reglas") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/documents",
											className: "flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Corpus", "Corpus") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/api",
											className: "flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all text-center whitespace-nowrap [&.active]:bg-primary [&.active]:text-primary-foreground [&.active]:shadow-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("API & Docs", "API y Docs") })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 shrink-0",
									children: [
										isLandingPage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/lookup",
											className: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Launch Dashboard", "Iniciar Panel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => setLanguage(language === "en" ? "es" : "en"),
											className: "h-9 gap-1.5 px-3 text-xs font-semibold shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: language === "en" ? "EN" : "ES" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											onClick: () => setDark(!dark),
											className: "size-9 shrink-0",
											children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
										}),
										isLandingPage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/lookup",
											className: "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all shrink-0 ml-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Launch App", "Ir al Panel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex lg:hidden overflow-x-auto border-t border-border px-4 py-2 gap-1 bg-secondary/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/lookup",
									className: "px-3 py-1 rounded text-xs font-semibold whitespace-nowrap text-muted-foreground [&.active]:bg-primary [&.active]:text-primary-foreground",
									children: t("Lookup", "Consulta")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/changes",
									className: "px-3 py-1 rounded text-xs font-semibold whitespace-nowrap text-muted-foreground [&.active]:bg-primary [&.active]:text-primary-foreground",
									children: t("Changes", "Cambios")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/jurisdictions",
									className: "px-3 py-1 rounded text-xs font-semibold whitespace-nowrap text-muted-foreground [&.active]:bg-primary [&.active]:text-primary-foreground",
									children: t("Jurisdictions", "Jurisdicciones")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/rules",
									className: "px-3 py-1 rounded text-xs font-semibold whitespace-nowrap text-muted-foreground [&.active]:bg-primary [&.active]:text-primary-foreground",
									children: t("Rules", "Reglas")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/documents",
									className: "px-3 py-1 rounded text-xs font-semibold whitespace-nowrap text-muted-foreground [&.active]:bg-primary [&.active]:text-primary-foreground",
									children: t("Corpus", "Corpus")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/api",
									className: "px-3 py-1 rounded text-xs font-semibold whitespace-nowrap text-muted-foreground [&.active]:bg-primary [&.active]:text-primary-foreground",
									children: t("API", "API")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setAiCopilotOpen(true),
									className: "px-3 py-1 rounded text-xs font-bold whitespace-nowrap bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
									children: "✨ AI Copilot"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AICopilotDrawer, {
						open: aiCopilotOpen,
						onClose: () => setAiCopilotOpen(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "mt-12 border-t border-border bg-card/60 py-6 text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-[1600px] w-full flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-4 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "Rental Housing Law Navigator"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Strictly Deterministic Logic Engine", "Motor Determinista de Reglas") })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `${SERVER_ROOT}/docs`,
										target: "_blank",
										rel: "noreferrer",
										className: "hover:text-foreground",
										children: "Swagger /docs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `${SERVER_ROOT}/redoc`,
										target: "_blank",
										rel: "noreferrer",
										className: "hover:text-foreground",
										children: "ReDoc"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Verified public sources. Not legal advice.", "Fuentes públicas verificadas. No es asesoría legal.") })
								]
							})]
						})
					})
				]
			})
		})
	});
}
//#endregion
export { useLang as C, resolveAddress as S, fetchMeta as _, Route as a, fetchSampleProperties as b, cn as c, fetchChangeCaseDetail as d, fetchChangeCases as f, fetchJurisdictions as g, fetchHealth as h, EXPORT_URLS as i, explainRuleWithAI as l, fetchDocuments as m, API_BASE as n, SERVER_ROOT as o, fetchDocumentText as p, Button as r, buttonVariants as s, AICopilotDrawer as t, fetchAuditEvents as u, fetchRuleSource as v, verifyAuditChain as w, lookupAddress as x, fetchRules as y };

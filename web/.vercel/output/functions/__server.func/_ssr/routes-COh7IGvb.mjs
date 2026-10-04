import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as Library, G as CircleCheck, H as Clock3, N as FileText, O as History, T as Landmark, X as ChevronDown, c as Terminal, ct as ArrowRight, d as SlidersHorizontal, f as ShieldCheck, h as Scale, i as Users, j as Gavel, m as Search, r as Wallet, s as TrendingUp, t as Zap, tt as Building2, y as MapPin, z as Cpu } from "../_libs/lucide-react.mjs";
import { C as useLang } from "../__root-rZh34U2U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-COh7IGvb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_building_default = "/assets/hero-building-B_bYmZBt.jpg";
var hero_law_default = "/assets/hero-law-BIvU3WW0.jpg";
var hero_civic_default = "/assets/hero-civic-J9t6NCLB.jpg";
var hero_community_default = "/assets/hero-community-DJ8zXwOs.jpg";
function LandingPage() {
	const { t, language } = useLang();
	const es = language === "es";
	const [activePersona, setActivePersona] = (0, import_react.useState)("renter");
	const [openFaqIndex, setOpenFaqIndex] = (0, import_react.useState)(0);
	const toggleFaq = (index) => {
		setOpenFaqIndex(openFaqIndex === index ? null : index);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col scroll-smooth",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "overview",
				className: "relative overflow-hidden border-b border-border bg-linear-to-b from-card/80 via-background to-background py-16 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.08] text-foreground",
								children: t("From Thousands of Pages of Housing Law to Instant, Address-Level Answers.", "De Miles de Páginas de Leyes de Vivienda a Respuestas Precisas por Dirección.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl",
								children: t("Which rental rules apply to an apartment today, and what is about to change? RHLN turns complex state statutes, county codes, and municipal ordinances into cited, deterministic, verifiable compliance intelligence for renters, housing providers, and legal aid attorneys.", "¿Qué leyes de vivienda aplican hoy a una dirección y cuáles están por cambiar? RHLN transforma códigos estatales, de condado y municipales en inteligencia normativa verificable con citas textuales.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/lookup",
										className: "inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Launch Compliance Navigator", "Iniciar Navegador de Cumplimiento") }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#how-it-works",
										className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/80 px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary hover:border-primary/40 transition-all",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Explore Architecture", "Ver Arquitectura") })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/changes",
										className: "inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/80 px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary hover:border-primary/40 transition-all",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Change Scenarios (T1–T6)", "Casos de Cambio (T1–T6)") })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 pt-6 border-t border-border/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium text-muted-foreground",
											children: t("500 Benchmark Addresses", "500 Direcciones")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium text-muted-foreground",
											children: t("100% Verbatim Citations", "Citas Textuales 100%")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium text-muted-foreground",
											children: t("Kleene 3-Valued Logic", "Lógica de Kleene")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium text-muted-foreground",
											children: t("Sub-Millisecond Engine", "Motor Sub-milisegundo")
										})]
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xl relative overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/80 pb-3 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-emerald-500 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: t("Live Compliance Scorecard Preview", "Vista Previa de Inteligencia Normativa")
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-mono font-medium text-muted-foreground",
											children: "As-Of: 2026-10-01"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-sm font-bold text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "2150 Shattuck Ave, Berkeley, CA 94704" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-mono mt-0.5 ml-5",
											children: "Multi-Family · 18 Units · Built 1972 · Alameda County"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] font-bold text-emerald-600 dark:text-emerald-400",
															children: t("Rent Cap Protection", "Control de Renta")
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3 text-emerald-600 dark:text-emerald-400" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-extrabold text-foreground block",
														children: "Local Cap Applies"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground block font-mono",
														children: "Berkeley Rent Ordinance"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] font-bold text-emerald-600 dark:text-emerald-400",
															children: t("Eviction Rights", "Causa Justa")
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3 text-emerald-600 dark:text-emerald-400" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-extrabold text-foreground block",
														children: "Just Cause Required"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground block font-mono",
														children: "Cal. Civ. Code § 1946.2"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-blue-500/20 bg-blue-500/5 p-3.5 space-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] font-bold text-blue-600 dark:text-blue-400",
															children: t("Security Deposit", "Fianza / Depósito")
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-3 text-blue-600 dark:text-blue-400" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-extrabold text-foreground block",
														children: "1 Month Max (AB 12)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground block font-mono",
														children: "Cal. Civ. Code § 1950.5"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-purple-500/20 bg-purple-500/5 p-3.5 space-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] font-bold text-purple-600 dark:text-purple-400",
															children: t("Algorithmic Pricing", "Precios por Software")
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3 text-purple-600 dark:text-purple-400" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-extrabold text-foreground block",
														children: "Prohibited (AB 325)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-muted-foreground block font-mono",
														children: "Cal. Bus. & Prof. § 16700"
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3.5 rounded-lg border border-border/80 bg-secondary/40 p-2.5 text-[11px] font-mono text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: "Verified Verbatim Quote: "
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "italic",
											children: "\"...an owner of residential real property shall not, over the course of any 12-month period, increase the gross rental rate...\""
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/lookup",
										className: "mt-3.5 w-full inline-flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3 text-xs sm:text-sm font-bold text-primary hover:bg-primary/20 transition-all",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Evaluate Real Address in Navigator Dashboard", "Consultar Dirección en el Panel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								]
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "how-it-works",
				className: "border-b border-border bg-secondary/30 py-16 sm:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-3xl mx-auto mb-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-primary",
								children: t("Deterministic Architecture", "Arquitectura Determinista")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display mt-2 text-foreground",
								children: t("How the Housing Law Navigator Evaluates Any Apartment", "Cómo Evalúa RHLN Cualquier Apartamento")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground leading-relaxed",
								children: t("Built on the foundational principle: \"The model reads, the code decides.\" We eliminate AI hallucinations by keeping execution completely deterministic, audit-traced, and cited verbatim.", "Basado en el principio rector: \"El modelo lee, el código decide\". Eliminamos alucinaciones mediante un motor 100% determinista y con citas textuales verificadas.")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between relative group hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm",
												children: "01"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5 text-primary" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold text-foreground",
											children: t("Multi-Tier Spatial Resolution", "Resolución Espacial Multinivel")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: t("Resolves postal mailing cities to legal municipal boundaries across State → County → City. Checks boundary shapefiles so unincorporated county parcels are not erroneously subjected to city rent caps.", "Distingue direcciones postales de los municipios legales reales. Evita asignar erróneamente ordenanzas locales a áreas no incorporadas.")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-4 border-t border-border/60 text-[11px] font-mono text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: "Input: "
									}), " Street, City, State, Zip, Coordinates"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between relative group hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm",
												children: "02"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-5 text-emerald-600 dark:text-emerald-400" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold text-foreground",
											children: t("Kleene 3-Valued Logic & Exemptions", "Lógica de Kleene y Exenciones")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: t("Evaluates Costa-Hawkins exemptions, 15-year rolling construction windows under AB 1482, unit counts, and tenancy duration. If assessor data is incomplete, returns transparent \"unknown\" rather than guessing.", "Evalúa exenciones de Costa-Hawkins, antigüedad de 15 años bajo AB 1482 y número de unidades. Si faltan datos, devuelve \"desconocido\" en lugar de inventar.")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-4 border-t border-border/60 text-[11px] font-mono text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: "Logic: "
									}), " True · False · Unknown (Conditional)"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between relative group hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm",
												children: "03"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-5 text-blue-600 dark:text-blue-400" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold text-foreground",
											children: t("Verbatim Cited Verdicts & Change Tracking", "Veredictos con Citas Textuales")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: t("Generates plain-language compliance summaries grounded in exact verbatim quotes (≥20 chars) from the statutory corpus. Evaluates historical and upcoming effective dates (T1–T6).", "Genera resúmenes claros respaldados por citas textuales exactas (≥20 caracteres). Permite evaluar fechas efectivas pasadas y futuras (T1–T6).")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-4 border-t border-border/60 text-[11px] font-mono text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: "Output: "
									}), " 100% Verifiable Statutory Trace"]
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20 bg-background border-b border-border space-y-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8 space-y-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid lg:grid-cols-2 gap-10 lg:gap-14 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative group overflow-hidden rounded-3xl border border-border shadow-xl aspect-4/3 sm:aspect-16/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: hero_civic_default,
									alt: "Civic & Legal Justice Center",
									className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-sm w-fit mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Spatial Intelligence", "Inteligencia Espacial") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white font-display font-bold text-lg sm:text-xl",
											children: t("13 Supported Municipal and State Jurisdictions", "13 Jurisdicciones Municipales y Estatales")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white/80 text-xs sm:text-sm mt-1 font-mono",
											children: "California · New Jersey · Massachusetts"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Spatial Hierarchy & Boundary Resolution", "Jerarquía Espacial y Límites") })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground tracking-tight leading-tight",
										children: t("Precision Geocoding & Municipal Boundary Verification", "Geocodificación Precisa y Verificación Municipal")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm sm:text-base text-muted-foreground leading-relaxed",
										children: t("A single postal mailing address can be deceiving. RHLN resolves addresses to precise Census FIPS codes and incorporated boundary shapefiles to distinguish unincorporated county parcels from incorporated municipal rent boards.", "Una dirección postal puede inducir a error. RHLN resuelve direcciones con códigos FIPS y mapas de límites municipales para distinguir zonas no incorporadas de distritos con juntas de alquiler.")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs sm:text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("Zero Postal Traps: ", "Sin Errores Postales: ") }), t("Distinguishes USPS mailing city names from legal municipal taxation and regulatory boundaries.", "Distingue ciudades postales de las autoridades regulatorias municipales reales.")]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs sm:text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("Hierarchical Precedence: ", "Prevalencia Jerárquica: ") }), t("Automatically layers municipal ordinances (e.g. Berkeley Measure BB) on top of statewide baselines (AB 1482).", "Aplica ordenanzas municipales sobre los marcos estatales de protección.")]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/jurisdictions",
											className: "inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-sm hover:bg-primary/90 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Explore Jurisdictions Directory", "Ver Directorio de Jurisdicciones") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid lg:grid-cols-2 gap-10 lg:gap-14 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5 order-2 lg:order-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Deterministic Rulebook Engine", "Motor Determinista de Reglas") })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground tracking-tight leading-tight",
										children: t("Property Attribute Modeling & Exemption Evaluation", "Modelado de Atributos y Evaluación de Exenciones")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm sm:text-base text-muted-foreground leading-relaxed",
										children: t("Housing laws turn on intricate property facts: year built, certificate of occupancy, corporate vs individual ownership, unit count, and owner-occupancy status. RHLN evaluates every rule condition with exact mathematical determinism.", "Las leyes de vivienda dependen de datos específicos del inmueble: año de construcción, propiedad corporativa o individual y número de unidades. RHLN evalúa cada condición con determinismo exacto.")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs sm:text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("Kleene 3-Valued Logic: ", "Lógica de Kleene: ") }), t("Emits transparent conditional verdicts (True, False, Unknown) without hallucinating missing facts.", "Emite veredictos condicionales claros sin inventar información faltante.")]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs sm:text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("4-Pillar Scorecard: ", "Evaluación en 4 Pilares: ") }), t("Simultaneously evaluates Rent Increase Caps, Just Cause Eviction, Security Deposit Limits, and Algorithmic Bans.", "Calcula límites de alquiler, causa justa de desalojo, depósitos y precios por software.")]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/lookup",
											className: "inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-sm hover:bg-primary/90 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Run Property Fact Lookup", "Consultar Datos de Propiedad") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative group overflow-hidden rounded-3xl border border-border shadow-xl aspect-4/3 sm:aspect-16/10 order-1 lg:order-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: hero_building_default,
									alt: "Apartment Building Architecture",
									className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm w-fit mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Assessor Fact Engine", "Motor Catastral") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white font-display font-bold text-lg sm:text-xl",
											children: t("500 Benchmark Properties Tested Deterministically", "500 Propiedades del Benchmark Auditadas")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white/80 text-xs sm:text-sm mt-1 font-mono",
											children: "Sub-millisecond Predicate Evaluation"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid lg:grid-cols-2 gap-10 lg:gap-14 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative group overflow-hidden rounded-3xl border border-border shadow-xl aspect-4/3 sm:aspect-16/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: hero_law_default,
									alt: "Public Housing Statutes and Law Books",
									className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-sm w-fit mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Verbatim Statutory Proof", "Prueba Textual Verificada") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white font-display font-bold text-lg sm:text-xl",
											children: t("257 Official Rules with 99.2% Verbatim Fidelity", "257 Reglas con 99.2% de Coincidencia Textual")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white/80 text-xs sm:text-sm mt-1 font-mono",
											children: "87 Housing Law Corpus Documents"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Grounded Legal Verification", "Verificación Legal Fundamentada") })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground tracking-tight leading-tight",
										children: t("Strict Verbatim Text Quotes & Source Statute Grounding", "Citas Textuales Estrictas y Fundamentación Legal")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm sm:text-base text-muted-foreground leading-relaxed",
										children: t("Every single rule verdict is directly grounded in public statutes. We enforce a mandatory 20+ character exact verbatim substring requirement against raw corpus documents, completely eliminating hallucinations and unsupported claims.", "Cada veredicto legal está fundamentado en leyes públicas. Exigimos coincidencia textual exacta de al menos 20 caracteres con los documentos oficiales, eliminando cualquier tipo de alucinación.")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs sm:text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("Verifiable Citations: ", "Citas Verificables: ") }), t("Exact statutory section references (e.g. Cal. Civ. Code § 1947.12, N.J.S.A. 2A:18-61.1).", "Referencias legales exactas con enlaces al documento fuente.")]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs sm:text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("Schema-Conformant: ", "Conforme al Esquema: ") }), t("All rules conform 100% to the official rule_record.schema.json format.", "Todas las reglas cumplen al 100% con el estándar oficial de datos.")]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/rules",
											className: "inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-sm hover:bg-primary/90 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Inspect Rules Registry", "Consultar Registro de Reglas") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid lg:grid-cols-2 gap-10 lg:gap-14 items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5 order-2 lg:order-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Longitudinal Change Monitor", "Monitor de Cambios Legislativos") })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground tracking-tight leading-tight",
										children: t("Longitudinal Statutory Shifts & Time-Series Impact (T1–T6)", "Cambios Temporales e Impacto Longitudinal (T1–T6)")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm sm:text-base text-muted-foreground leading-relaxed",
										children: t("Housing legislation changes constantly. RHLN tracks past, present, and pending legislative shifts across all benchmark properties, evaluating how new statutes (such as California AB 325, New Jersey FAIR Act, and Cambridge Algorithmic Pricing Ordinance) alter coverage on specific effective dates.", "Las leyes de vivienda evolucionan continuamente. RHLN evalúa el impacto de cambios legales pasados y futuros en todas las propiedades del benchmark conforme entran en vigor nuevas leyes.")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs sm:text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("Time-Travel Queries: ", "Consultas Temporales: ") }), t("Evaluate apartment compliance under custom As-Of dates (past, present, or upcoming years).", "Evalúe el cumplimiento normativo en fechas pasadas, actuales o futuras.")]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-emerald-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs sm:text-sm text-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("6 Benchmark Scenarios: ", "6 Escenarios de Prueba: ") }), t("Includes T1 (CA AB 325), T2 (Hoboken), T3 (NJ FAIR Act), T4 (MA pending), T5 (struck initiatives), and T6 (Cambridge).", "Cubre todos los casos de prueba longitudinales T1 a T6.")]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/changes",
											className: "inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-sm hover:bg-primary/90 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("View Longitudinal Scenarios", "Ver Escenarios de Cambio") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative group overflow-hidden rounded-3xl border border-border shadow-xl aspect-4/3 sm:aspect-16/10 order-1 lg:order-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: hero_community_default,
									alt: "Urban Residential Community",
									className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white shadow-sm w-fit mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Policy Transition Tracking", "Transición Normativa") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white font-display font-bold text-lg sm:text-xl",
											children: t("Address-by-Address Shift Simulation", "Simulación de Impacto por Dirección")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white/80 text-xs sm:text-sm mt-1 font-mono",
											children: "All 6 Change Test Cases (T1–T6)"
										})
									]
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "features",
				className: "py-16 sm:py-20 bg-background border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-4 mb-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider text-primary",
							children: t("Core Platform Capabilities", "Capacidades de la Plataforma")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display mt-2 text-foreground",
							children: t("Built for Legal Rigor and Extreme Accuracy", "Diseñado para Rigor Jurídico y Precisión")
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground max-w-md leading-relaxed",
							children: t("Six purpose-built engines working in concert to turn unstructured legal texts into programmatic compliance decisions.", "Seis módulos especializados trabajando juntos para convertir textos legales en decisiones normativas programáticas.")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold text-foreground",
											children: t("Address-Level Law Lookup", "Consulta de Leyes por Dirección")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: t("Input any residential address to evaluate all active municipal, county, and state rules. Automatically computes 4 primary scorecard pillars: rent caps, just cause eviction, security deposit ceiling, and algorithmic pricing bans.", "Evalúe cualquier dirección residencial para conocer las reglas aplicables de tope de renta, causa justa, fianza y software de precios.")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 pt-4 border-t border-border/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/lookup",
										className: "inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Go to Address Lookup", "Ir a Consulta") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "size-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold text-foreground",
											children: t("Statutory Change Scenarios (T1–T6)", "Seguimiento de Cambios (T1–T6)")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: t("Trace longitudinal legislative shifts across 6 benchmark tests: California AB 325 algorithmic ban, Hoboken/Jersey City bans, NJ FAIR Act, Massachusetts pending bills, struck ballot measures, and Cambridge ordinance.", "Rastree cambios legislativos en 6 escenarios: AB 325, ordenanzas de Hoboken/JC, NJ FAIR Act, proyectos de ley de Massachusetts y Cambridge.")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 pt-4 border-t border-border/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/changes",
										className: "inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Explore Change Scenarios", "Ver Escenarios") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "size-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold text-foreground",
											children: t("Jurisdiction Stack Resolver", "Resolutor de Jurisdicciones")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: t("Hierarchical geocoding that resolves State, County, and Municipal authority layers. Displays constitutional authority level, home rule powers, and spatial boundaries for all 13 supported jurisdictions.", "Geocodificación jerárquica que resuelve capas de autoridad estatal, de condado y municipal, mostrando competencias legales.")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 pt-4 border-t border-border/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/jurisdictions",
										className: "inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Browse Jurisdictions", "Ver Jurisdicciones") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "size-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold text-foreground",
											children: t("Statutory Rules Registry", "Registro de Reglas Legales")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: t("Searchable catalog of extracted legal rules matching rule_record.schema.json. Every entry specifies requirements, exemptions, citation strings, and verified verbatim quote matches against the corpus.", "Catálogo consultable de reglas con citas formales, requerimientos, excepciones y textos verificados con el corpus.")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 pt-4 border-t border-border/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/rules",
										className: "inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Inspect Rules Registry", "Ver Catálogo de Reglas") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "size-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold text-foreground",
											children: t("Corpus Legal Document Reader", "Lector de Documentos Legales")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: t("Full in-app document reader for 87 official housing statutes, local ordinances, and regulations. Search statutory text and jump directly to verbatim cited paragraphs in the slide-out source drawer.", "Lector integrado para consultar los 87 textos legales del corpus con visor lateral de citas textuales destacadas.")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 pt-4 border-t border-border/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/documents",
										className: "inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Open Law Library", "Abrir Biblioteca") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between hover:border-primary/50 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "size-11 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold text-foreground",
											children: t("Bilateral REST API & Exports", "API REST y Exportaciones")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground leading-relaxed",
											children: t("Programmatic FastAPI backend with Swagger docs (/docs), health monitoring, and one-click JSON/ZIP downloads for scored system deliverables: rules.json, lookups.json, and changes.json.", "Backend FastAPI con documentación Swagger (/docs), métricas y descarga directa de los archivos de exportación rules.json, lookups.json y changes.json.")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 pt-4 border-t border-border/60",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/api",
										className: "inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Open API Hub", "Ver Hub de API") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
									})
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "solutions",
				className: "py-16 sm:py-20 bg-secondary/20 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-3xl mx-auto mb-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-primary",
								children: t("Audience Solutions", "Soluciones por Usuario")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display mt-2 text-foreground",
								children: t("Who RHLN is Built For", "Para Quién Está Construido RHLN")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: t("Select your role to explore how the platform delivers tailored compliance intelligence for your specific workflow.", "Seleccione su perfil para ver cómo la plataforma adapta la información normativa a su caso de uso.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-card rounded-2xl border border-border/80 shadow-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setActivePersona("renter"),
										className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activePersona === "renter" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Renters & Tenants", "Inquilinos") })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setActivePersona("owner"),
										className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activePersona === "owner" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Housing Providers & Owners", "Propietarios") })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setActivePersona("advocate"),
										className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activePersona === "advocate" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Legal Aid & Advocates", "Defensores Legales") })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setActivePersona("agency"),
										className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activePersona === "agency" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Housing Agencies", "Agencias Públicas") })]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-lg",
						children: [
							activePersona === "renter" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-8 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Tenant Protection Suite", "Protección para el Inquilino") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold font-display text-foreground",
											children: t("Know Your Rights Before Paying Illegal Rent Hikes", "Conozca sus Derechos Frente a Aumentos Ilegales")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed",
											children: t("Landlords frequently attempt rent increases or demand excessive security deposits without realizing local municipal rent boards or state laws cap their amounts. RHLN gives you instant, cited answers in plain English and Spanish.", "A menudo se exigen aumentos o depósitos excesivos que vulneran la ley. RHLN le brinda claridad inmediata respaldada con leyes oficiales.")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "space-y-2.5 text-xs text-foreground/90",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Confirm your exact rent increase cap (e.g. Berkeley annual board limit vs CA AB 1482 8.8%)", "Verifique el tope de aumento aplicable a su vivienda") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Verify if your landlord needs legal \"just cause\" before issuing an eviction notice", "Compruebe si el arrendador requiere \"causa justa\" para desalojar") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Ensure security deposits do not exceed the 1-month statutory ceiling (AB 12)", "Valide que el depósito no supere el límite legal de 1 mes (AB 12)") })]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/lookup",
												className: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Check My Apartment Address", "Consultar Mi Dirección") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/80 bg-secondary/30 p-5 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-foreground",
											children: t("Sample Renter Assessment", "Ejemplo de Evaluación")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold",
											children: "Protected"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 rounded-lg bg-card border border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold text-muted-foreground uppercase block",
													children: t("Rent Increase Ceiling", "Tope de Alquiler")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-extrabold text-foreground",
													children: "5.0% + Local CPI Max"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground mt-0.5",
													children: "Increases strictly limited to once every 12 months with 30-day advance notice."
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 rounded-lg bg-card border border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold text-muted-foreground uppercase block",
													children: t("Eviction Defense", "Defensa de Desalojo")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-extrabold text-foreground",
													children: "Statutory Just Cause Required"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground mt-0.5",
													children: "No-fault eviction requires statutory relocation assistance payment."
												})
											]
										})]
									})]
								})]
							}),
							activePersona === "owner" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-8 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Owner Compliance Engine", "Cumplimiento para Propietarios") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold font-display text-foreground",
											children: t("Prevent Regulatory Fines & Verify Legal Exemptions", "Evite Sanciones y Compruebe Exenciones")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed",
											children: t("Navigating the layered maze of Costa-Hawkins exemptions, 15-year rolling construction windows under AB 1482, and local municipal registration requirements can expose owners to legal risk. RHLN computes exact exemption eligibility deterministically.", "Conozca si sus inmuebles están exentos por antigüedad, tipo de propiedad o número de unidades, evitando riesgos legales y multas.")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "space-y-2.5 text-xs text-foreground/90",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Verify 15-year rolling construction exemption dates for modern buildings", "Compruebe la exención de 15 años para edificios modernos") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Audit single-family home separately alienable status under Costa-Hawkins", "Audite el estatus de viviendas unifamiliares bajo Costa-Hawkins") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Ensure compliance with algorithmic rent-setting prohibitions (AB 325)", "Cumpla con las prohibiciones de software algorítmico de rentas") })]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/lookup",
												className: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Audit Building Compliance", "Auditar Inmueble") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/80 bg-secondary/30 p-5 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-foreground",
											children: t("Exemption Verification Breakdown", "Desglose de Exenciones")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold",
											children: "Exemption Audit"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 rounded-lg bg-card border border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold text-muted-foreground uppercase block",
													children: t("Costa-Hawkins Check", "Verificación Costa-Hawkins")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-extrabold text-foreground",
													children: "Separate Alienability"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground mt-0.5",
													children: "Single-family homes and separately alienable condos exempt from local rent control."
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3 rounded-lg bg-card border border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] font-bold text-muted-foreground uppercase block",
													children: t("15-Year Rolling Window", "Ventana Móvil de 15 Años")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-extrabold text-foreground",
													children: "AB 1482 Exemption Test"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-muted-foreground mt-0.5",
													children: "Properties built after 2011 exempt from statewide rent caps for evaluation date 2026-10-01."
												})
											]
										})]
									})]
								})]
							}),
							activePersona === "advocate" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-8 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Legal Aid & Litigation Suite", "Herramientas para Abogados") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold font-display text-foreground",
											children: t("Audit-Grade Statutory Evidence with Verbatim Quotes", "Evidencia Jurídica con Citas Textuales")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed",
											children: t("Every single determination is backed by an exact quote substring from the enacted housing corpus. Housing attorneys can cite exact civil code sections and municipal ordinance provisions directly in court motions.", "Cada determinación está respaldada por citas textuales exactas del corpus, permitiendo fundamentar escritos y demandas judiciales.")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "space-y-2.5 text-xs text-foreground/90",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("100% Citation Metric: Every rule matched against source documents", "Métrica de Citas 100%: Cada regla contrastada con el documento original") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Inspect exact verbatim statutory text in the slide-out source drawer", "Inspeccione el texto legal en el visor interactivo de fuentes") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Kleene 3-valued logic traces missing factual predicates with legal transparency", "La lógica de Kleene transparenta los predicados fácticos pendientes") })]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/rules",
												className: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Open Rules & Evidence Registry", "Abrir Catálogo de Reglas") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/80 bg-secondary/30 p-5 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-foreground",
											children: t("Auditor Statutory Trace", "Trazabilidad Legal")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold",
											children: "D006 / Measure BB"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 rounded-lg bg-card border border-border text-xs font-mono",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary font-bold",
												children: "BERKELEY-RENT-01"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground mt-1 italic text-[11px]",
												children: "\"...an owner of residential real property shall not, over the course of any 12-month period, increase the gross rental rate for a dwelling or a unit to an amount greater than the lesser of...\""
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block",
												children: "✓ Exact Quote Verified (187 chars)"
											})
										]
									})]
								})]
							}),
							activePersona === "agency" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-8 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Municipal Policy & Agency Hub", "Gestión para Agencias Públicas") })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold font-display text-foreground",
											children: t("Programmatic Jurisdiction Stacks & Batch Analysis", "Resolución Jurisdiccional y Análisis Masivo")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed",
											children: t("Housing authorities and municipal agencies can audit compliance across entire property portfolios. Test batch lookups across 500 benchmark properties and export verified deliverables (lookups.json, changes.json) via our REST API.", "Permite a las administraciones públicas y observatorios de vivienda auditar carteras completas y descargar entregables validados en JSON o ZIP.")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "space-y-2.5 text-xs text-foreground/90",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Batch evaluation across 500 benchmark properties in under 5 seconds", "Evaluación por lotes de 500 propiedades en menos de 5 segundos") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Multi-tier jurisdictional boundary resolution across 13 legal entities", "Resolución de límites espaciales en 13 entidades jurídicas") })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Direct API export of official platform deliverables (rules.json, lookups.json)", "Exportación directa vía API de entregables en JSON y ZIP") })]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/api",
												className: "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Explore Agency API Endpoints", "Ver Endpoints de la API") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/80 bg-secondary/30 p-5 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-foreground",
											children: t("REST API Specifications", "Especificaciones de API")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold",
											children: "FastAPI 1.0"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 text-xs font-mono",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-2.5 rounded-lg bg-card border border-border flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary font-bold",
													children: "POST /api/v1/lookup"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground text-[11px]",
													children: "Deterministic Address Query"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-2.5 rounded-lg bg-card border border-border flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary font-bold",
													children: "POST /api/v1/resolve"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground text-[11px]",
													children: "Jurisdiction Stack Geocode"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-2.5 rounded-lg bg-card border border-border flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary font-bold",
													children: "GET /api/v1/export/zip"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground text-[11px]",
													children: "Complete All-In-One Deliverable"
												})]
											})
										]
									})]
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "jurisdictions",
				className: "py-16 sm:py-20 bg-background border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1600px] w-full px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-3xl mx-auto mb-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-primary",
								children: t("Multi-Tier Statutory Scope", "Alcance Legal Multinivel")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display mt-2 text-foreground",
								children: t("Active Legal Coverage Across 3 States & Municipal Layers", "Cobertura Activa en 3 Estados y Capas Locales")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: t("RHLN reconciles state baseline protections with local municipal rent stabilization ordinances.", "RHLN articula las leyes estatales de base con las ordenanzas municipales de estabilización de alquileres.")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4 hover:border-primary/50 transition-all",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full bg-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold text-lg text-foreground",
												children: "California"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-mono text-muted-foreground font-semibold",
											children: "CA"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: t("Statewide baseline under AB 1482 (Cal. Civ. Code §§ 1946.2 & 1947.12) with 5% + CPI rent cap. Reconciled with stricter municipal ordinances in Berkeley, Oakland, and San Francisco.", "Marco estatal AB 1482 articulado con ordenanzas municipales más estrictas en Berkeley, Oakland y San Francisco.")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 pt-2 border-t border-border/40 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Local Ordinances:", "Ordenanzas:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: "Berkeley Measure BB"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Security Deposit:", "Fianza:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: "1 Month Max (AB 12)"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Algorithmic Pricing:", "Software de Precios:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: "AB 325 / SB 763"
												})]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4 hover:border-primary/50 transition-all",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full bg-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold text-lg text-foreground",
												children: "New Jersey"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-mono text-muted-foreground font-semibold",
											children: "NJ"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: t("Anti-Eviction Act (N.J.S.A. 2A:18-61.1) requires judicial just cause. Rent control is strictly municipal via local rent leveling boards in Newark, Jersey City, and Hoboken.", "Ley Anti-Desalojo con causa justa judicial. El control de rentas se articula mediante juntas locales en Newark, Jersey City y Hoboken.")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 pt-2 border-t border-border/40 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Rent Control:", "Control de Renta:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: "Municipal Rent Boards"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Security Deposit:", "Fianza:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: "1.5 Months (Escrow)"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Upcoming Reform:", "Próxima Ley:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: "NJ FAIR Act (2027)"
												})]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4 hover:border-primary/50 transition-all",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-border/60 pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full bg-purple-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold text-lg text-foreground",
												children: "Massachusetts"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-mono text-muted-foreground font-semibold",
											children: "MA"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: t("Market-rate tenancy framework under M.G.L. c. 186 & c. 239 summary process. Algorithmic rent-setting bills S.2983 and H.5222 remain pending before legislative committees.", "Régimen de mercado bajo leyes M.G.L. c. 186 y c. 239. Proyectos de ley contra software de precios en trámite legislativo.")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5 pt-2 border-t border-border/40 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Rent Control:", "Control de Renta:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: "Market Rate Baseline"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Security Deposit:", "Fianza:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: "1 Month Max (Bank Escrow)"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Pending Bills:", "Proyectos en Trámite:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-foreground",
													children: "S.2983 / H.5222"
												})]
											})
										]
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "faq",
				className: "py-16 sm:py-20 bg-secondary/20 border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-primary",
								children: t("Frequently Asked Questions", "Preguntas Frecuentes")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display mt-2 text-foreground",
								children: t("Common Questions About RHLN Regulatory Intelligence", "Preguntas Frecuentes sobre el Funcionamiento de RHLN")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: t("Everything you need to know about deterministic legal logic, verbatim citations, and coverage evaluation.", "Todo lo que necesita saber sobre el motor determinista, citas textuales y alcance legal.")
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: [
							{
								qEn: "How does RHLN distinguish a mailing address from a legal municipality?",
								qEs: "¿Cómo distingue RHLN una dirección postal de un municipio legal?",
								aEn: "USPS mailing cities often differ from legal tax jurisdictions (e.g., unincorporated county areas or neighboring cities). RHLN resolves addresses through a strict 3-tier hierarchy (State → County → Legal Incorporated Municipality) cross-referenced against authoritative geographic boundary shapefiles rather than naive zip code guesses.",
								aEs: "Las ciudades postales a menudo difieren de las jurisdicciones legales. RHLN resuelve cada dirección mediante una jerarquía estricta de 3 niveles (Estado → Condado → Municipio Legal) cruzada con límites geográficos oficiales."
							},
							{
								qEn: "What happens when state law and local municipal ordinances conflict?",
								qEs: "¿Qué sucede cuando la ley estatal y una ordenanza municipal entran en conflicto?",
								aEn: "The engine applies codified constitutional preemption rules: local municipalities may establish more protective rent stabilization or just cause eviction ordinances unless explicitly preempted by state statutes (such as California Costa-Hawkins for single-family homes). Conflicting rules are explicitly evaluated and flagged in the audit trace.",
								aEs: "El motor aplica reglas de precedencia constitucional: los municipios locales pueden dictar normas más protectoras salvo que una ley estatal superior lo prohíba expresamente (como Costa-Hawkins). Las discrepancias se señalan explícitamente en el registro de auditoría."
							},
							{
								qEn: "How are 15-year rolling window exemptions calculated for newer construction?",
								qEs: "¿Cómo se calculan las exenciones de 15 años para construcciones recientes?",
								aEn: "Under statutes like California AB 1482 (Cal. Civ. Code § 1947.12), residential property with a certificate of occupancy issued within the last 15 years is exempt. RHLN computes the rolling age relative to the query evaluation date (`as_of`), ensuring that temporal eligibility updates automatically year over year.",
								aEs: "Leyes como AB 1482 en California eximen propiedades de menos de 15 años de antigüedad. RHLN calcula la edad respecto a la fecha de consulta (`as_of`), actualizando la vigencia automáticamente."
							},
							{
								qEn: "What is Kleene 3-Valued Logic and why is it used instead of binary true/false?",
								qEs: "¿Qué es la lógica de Kleene de 3 valores y por qué se utiliza?",
								aEn: "Real-world property records often lack specific assessor facts (e.g., exact unit count or unverified certificate of occupancy). Rather than hallucinating or guessing compliance, RHLN uses Kleene logic (True, False, Unknown) to return transparent conditional verdicts and explain precisely which missing facts are required to resolve coverage.",
								aEs: "Los registros catastrales a veces carecen de datos específicos. En vez de adivinar, RHLN usa lógica ternaria (Verdadero, Falso, Desconocido) para emitir veredictos condicionales transparentes."
							},
							{
								qEn: "How are statutory changes (T1 through T6) tracked longitudinally?",
								qEs: "¿Cómo se rastrean los cambios legislativos (T1 a T6)?",
								aEn: "RHLN models statutory shifts as time-series transitions. The system tests pending legislation (California AB 325, Hoboken ch. 158, New Jersey FAIR Act, Massachusetts S.2983, struck ballot questions, and Cambridge algorithmic pricing ordinance) across benchmark properties to show exactly which units gain or lose coverage on specific effective dates.",
								aEs: "RHLN modela los cambios legales como transiciones temporales, evaluando leyes aprobadas o en trámite en propiedades del benchmark."
							},
							{
								qEn: "Does RHLN provide legal advice?",
								qEs: "¿RHLN proporciona asesoramiento legal?",
								aEn: "No. RHLN is an automated regulatory intelligence engine providing structured informational summaries of enacted public housing laws. Every output cites verified, verbatim statutory text with exact document identifiers for independent legal review.",
								aEs: "No. RHLN es un motor de información normativa que resume leyes públicas. Cada resultado incluye citas textuales verificadas para su revisión jurídica independiente."
							}
						].map((item, index) => {
							const isOpen = openFaqIndex === index;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card overflow-hidden shadow-2xs transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggleFaq(index),
									className: "w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-foreground hover:bg-secondary/40 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: es ? item.qEs : item.qEn }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}` })]
								}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40",
									children: es ? item.aEs : item.aEn
								})]
							}, index);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16 sm:py-24 bg-linear-to-br from-primary/10 via-card to-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl w-full px-4 text-center sm:px-6 lg:px-8 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-14 mx-auto rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl sm:text-4xl font-extrabold font-display text-foreground tracking-tight",
							children: t("Ready to Evaluate an Apartment Address?", "¿Listo para Consultar una Dirección de Apartamento?")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed",
							children: t("Access the live deterministic engine now. Evaluate any apartment address against public state and municipal statutes with cited, transparent answers.", "Acceda ahora al motor determinista. Evalúe cualquier dirección de apartamento frente a leyes estatales y municipales con citas verificables.")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-center gap-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/lookup",
								className: "inline-flex items-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Launch Compliance Navigator", "Iniciar Navegador de Cumplimiento") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/changes",
								className: "inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/80 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("View Longitudinal Scenarios (T1–T6)", "Ver Escenarios Temporales") })]
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { LandingPage as component };

import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { B as Copy, C as Library, E as Info, G as CircleCheck, L as Download, M as Funnel, N as FileText, Z as Check, ct as ArrowRight, d as SlidersHorizontal, f as ShieldCheck, h as Scale, m as Search, r as Wallet, s as TrendingUp } from "../_libs/lucide-react.mjs";
import { C as useLang, i as EXPORT_URLS, y as fetchRules } from "../__root-rZh34U2U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rules-CiOmI2jj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RulesPage() {
	const { t, language } = useLang();
	const [registryRules, setRegistryRules] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [ruleSearch, setRuleSearch] = (0, import_react.useState)("");
	const [ruleCatFilter, setRuleCatFilter] = (0, import_react.useState)("all");
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		fetchRules().then((rulesList) => {
			if (rulesList && rulesList.length > 0) setRegistryRules(rulesList);
		}).catch((err) => console.warn("Failed to load rules:", err)).finally(() => setLoading(false));
	}, []);
	const handleCopyCitation = (citation, id) => {
		navigator.clipboard.writeText(citation);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 2e3);
	};
	const getCategoryIcon = (cat) => {
		switch (cat) {
			case "rent_increase_limits": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4 text-emerald-500" });
			case "just_cause_eviction": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-blue-500" });
			case "security_deposits": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4 text-purple-500" });
			case "algorithmic_rent_setting": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-amber-500" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-primary" });
		}
	};
	const filteredRules = registryRules.filter((r) => {
		const cat = r.category || r.topic_category || "general";
		if (ruleCatFilter !== "all" && cat !== ruleCatFilter) return false;
		if (!ruleSearch.trim()) return true;
		const q = ruleSearch.toLowerCase();
		const id = (r.team_rule_id || "").toLowerCase();
		const title = (r.title || r.rule_title || "").toLowerCase();
		const cite = (r.citation || r.statutory_citation || "").toLowerCase();
		const req = (r.requirement || "").toLowerCase();
		return id.includes(q) || title.includes(q) || cite.includes(q) || req.includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-foreground tracking-tight",
					children: t("Housing Rules Registry & Verifiable Citations", "Registro de Reglas y Citas Legales")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed",
					children: t("Extracted from official municipal ordinances and state statutes with mandatory verbatim quote verification (>= 20 characters matching source statute). Strictly validated against rule_record.schema.json.", "Catálogo estructurado de leyes públicas con verificación obligatoria de citas textuales (>= 20 caracteres coincidentes con la norma fuente).")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: EXPORT_URLS.rulesJson,
						download: "rules.json",
						className: "inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-sm hover:bg-primary/90 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Download rules.json", "Descargar rules.json") })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-border/80 bg-card shadow-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1 max-w-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: ruleSearch,
						onChange: (e) => setRuleSearch(e.target.value),
						placeholder: t("Search by rule ID, title, citation, or requirement...", "Buscar por ID, título, cita o contenido..."),
						className: "w-full h-12 rounded-xl border border-input bg-secondary/30 pl-11 pr-4 text-sm shadow-xs focus:ring-2 focus:ring-primary focus:outline-none transition-all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-4.5 text-muted-foreground shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: ruleCatFilter,
							onChange: (e) => setRuleCatFilter(e.target.value),
							className: "h-12 rounded-xl border border-input bg-secondary/30 px-4 text-sm font-semibold shadow-xs outline-none focus:ring-2 focus:ring-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: "all",
									children: [
										t("All Categories", "Todas las categorías"),
										" (",
										registryRules.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "rent_increase_limits",
									children: t("Rent Increase Limits", "Límites de Alquiler")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "just_cause_eviction",
									children: t("Just Cause Eviction", "Desalojo con Causa Justa")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "security_deposits",
									children: t("Security Deposits", "Depósitos de Garantía")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "algorithmic_rent_setting",
									children: t("Algorithmic Rent Setting", "Fijación Algorítmica")
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs sm:text-sm font-mono font-semibold text-muted-foreground px-2",
							children: [
								filteredRules.length,
								" ",
								t("rules found", "reglas")
							]
						})
					]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2",
				children: [
					1,
					2,
					3,
					4
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-6 animate-pulse space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-1/3 bg-secondary rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-2/3 bg-secondary/60 rounded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 bg-secondary/40 rounded-xl" })
					]
				}, i))
			}) : filteredRules.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border border-border bg-card p-12 text-center space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-12 rounded-xl bg-secondary/60 text-muted-foreground flex items-center justify-center mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-bold text-foreground",
						children: t("No matching rules found", "No se encontraron reglas")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground max-w-sm mx-auto",
						children: t("Try adjusting your search keywords or clearing the category filter.", "Pruebe con otros términos o restablezca el filtro de categoría.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setRuleSearch("");
							setRuleCatFilter("all");
						},
						className: "mt-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90",
						children: t("Reset Filters", "Restablecer Filtros")
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5",
				children: filteredRules.map((r) => {
					const cat = r.category || r.topic_category || "general";
					const title = r.title || r.rule_title || r.team_rule_id;
					const citation = r.citation || r.statutory_citation || "Statute";
					const quote = r.quoted_span || r.source_quote || "";
					const requirement = r.requirement || "";
					const keyValue = r.key_value || "";
					const exemptions = r.exemptions || "";
					const effective = r.effective_date || "2026-10-01";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20",
											children: r.team_rule_id
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary text-foreground",
											children: r.jurisdiction || "Berkeley, CA"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-secondary/50",
											children: [getCategoryIcon(cat), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "capitalize",
												children: cat.replace(/_/g, " ")
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-xs text-muted-foreground font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										t("Effective:", "Vigencia:"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: effective
										})
									] }), r.sunset_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										t("Sunset:", "Fin:"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: r.sunset_date
										})
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base sm:text-lg font-bold font-display text-foreground leading-snug",
								children: title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-primary font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: citation })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => handleCopyCitation(citation, r.team_rule_id),
									className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground font-sans px-1.5 py-0.5 rounded hover:bg-secondary transition-all",
									title: "Copy citation to clipboard",
									children: copiedId === r.team_rule_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-500 font-bold",
										children: t("Copied!", "¡Copiado!")
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Copy", "Copiar") })] })
								})]
							})] }),
							requirement && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-secondary/30 p-4 text-xs sm:text-sm text-foreground leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-xs uppercase tracking-wider text-muted-foreground block mb-1",
										children: t("Legal Requirement & Mechanism", "Requerimiento Legal")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: requirement }),
									keyValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 pt-2 border-t border-border/50 font-mono text-xs font-bold text-primary",
										children: [t("Statutory Standard: ", "Parámetro: "), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: keyValue
										})]
									})
								]
							}),
							exemptions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2 rounded-xl bg-secondary/50 border border-border/60 px-3.5 py-2.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-3.5 shrink-0 text-muted-foreground mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground",
									children: [t("Exemptions & Exclusions:", "Exenciones:"), " "]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exemptions })] })]
							}),
							quote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/70 bg-secondary/20 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Verified Verbatim Statutory Text", "Cita Oficial Verificada") })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20",
										children: [
											"MATCH VERIFIED (",
											quote.length,
											" chars)"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs sm:text-sm font-serif italic text-foreground/90 leading-relaxed pl-2.5 border-l-2 border-primary/50",
									children: [
										"“",
										quote,
										"”"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-3 border-t border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Corpus Document:", "Documento:") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/documents",
										className: "font-mono font-bold text-primary hover:underline flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.source_doc_id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Library, { className: "size-3" })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/lookup",
										className: "inline-flex items-center gap-1 font-bold text-primary hover:underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Test on Address", "Probar en Vivienda") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
									})
								})]
							})
						]
					}, r.team_rule_id);
				})
			})
		]
	});
}
//#endregion
export { RulesPage as component };

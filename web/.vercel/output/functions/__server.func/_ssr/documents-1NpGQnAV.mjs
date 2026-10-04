import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { B as Copy, D as House, F as ExternalLink, K as CircleAlert, N as FileText, Q as CheckCheck, S as Link2, W as CircleDollarSign, f as ShieldCheck, h as Scale, it as BookOpen, k as Hash, m as Search, n as X, nt as Briefcase, ot as BadgeCheck, st as ArrowUpRight, x as LoaderCircle, y as MapPin } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { C as useLang, m as fetchDocuments, p as fetchDocumentText, r as Button } from "../__root-rZh34U2U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-1NpGQnAV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORY_META = {
	algorithmic_pricing: {
		label: "Algorithmic Pricing",
		color: "text-violet-500",
		bg: "bg-violet-500/10",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-3" })
	},
	rent_stabilization: {
		label: "Rent Stabilization",
		color: "text-emerald-500",
		bg: "bg-emerald-500/10",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, { className: "size-3" })
	},
	eviction_protection: {
		label: "Eviction Protection",
		color: "text-amber-500",
		bg: "bg-amber-500/10",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" })
	},
	screening_fair_chance: {
		label: "Fair Chance / Screening",
		color: "text-sky-500",
		bg: "bg-sky-500/10",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-3" })
	},
	security_deposit: {
		label: "Security Deposit",
		color: "text-rose-500",
		bg: "bg-rose-500/10",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-3" })
	},
	tenant_rights: {
		label: "Tenant Rights",
		color: "text-teal-500",
		bg: "bg-teal-500/10",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-3" })
	},
	general_housing_code: {
		label: "Housing Code",
		color: "text-slate-400",
		bg: "bg-slate-400/10",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3" })
	}
};
function CategoryBadge({ category }) {
	const meta = CATEGORY_META[category] ?? CATEGORY_META.general_housing_code;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${meta.bg} ${meta.color}`,
		children: [meta.icon, meta.label]
	});
}
function JurisdictionLevelBadge({ level }) {
	const m = {
		state: {
			label: "State Law",
			color: "text-blue-500 bg-blue-500/10"
		},
		county: {
			label: "County",
			color: "text-orange-500 bg-orange-500/10"
		},
		city: {
			label: "Municipal",
			color: "text-primary bg-primary/10"
		}
	}[level] ?? {
		label: level,
		color: "text-muted-foreground bg-secondary"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${m.color}`,
		children: m.label
	});
}
function DocumentsPage() {
	const { t } = useLang();
	const [corpusDocs, setCorpusDocs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [docSearch, setDocSearch] = (0, import_react.useState)("");
	const [jurFilter, setJurFilter] = (0, import_react.useState)("all");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const [captureFilter, setCaptureFilter] = (0, import_react.useState)("all");
	const [activeDoc, setActiveDoc] = (0, import_react.useState)(null);
	const [readerLoading, setReaderLoading] = (0, import_react.useState)(false);
	const [readerText, setReaderText] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setLoading(true);
		fetchDocuments({ limit: 100 }).then((docs) => {
			if (docs && docs.length > 0) setCorpusDocs(docs);
		}).finally(() => setLoading(false));
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		return corpusDocs.filter((d) => {
			if (jurFilter !== "all" && d.jurisdiction !== jurFilter) return false;
			if (categoryFilter !== "all" && d.category !== categoryFilter) return false;
			if (captureFilter === "text" && !d.has_text) return false;
			if (captureFilter === "link-only" && d.has_text) return false;
			if (!docSearch) return true;
			const q = docSearch.toLowerCase();
			return d.doc_id.toLowerCase().includes(q) || d.document_title.toLowerCase().includes(q) || d.jurisdiction_name.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
		});
	}, [
		corpusDocs,
		jurFilter,
		categoryFilter,
		captureFilter,
		docSearch
	]);
	const statCounts = (0, import_react.useMemo)(() => {
		const counts = {};
		for (const d of corpusDocs) counts[d.category] = (counts[d.category] ?? 0) + 1;
		return counts;
	}, [corpusDocs]);
	const openDocumentReader = async (doc) => {
		setActiveDoc(doc);
		if (!doc.has_text) {
			setReaderText("");
			return;
		}
		setReaderLoading(true);
		try {
			const data = await fetchDocumentText(doc.doc_id);
			setReaderText(data.text || data.text_slice || "");
		} catch {
			setReaderText("");
		} finally {
			setReaderLoading(false);
		}
	};
	const copyText = () => {
		if (!readerText) return;
		navigator.clipboard.writeText(readerText);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border pb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl sm:text-3xl font-bold font-display leading-tight",
						children: t("Housing Law Corpus Library", "Biblioteca Legal del Corpus")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl",
						children: t("Every rule verdict is verifiably grounded in this corpus. Search, filter, and read the complete source texts across state statutes, municipal ordinances, and rent board regulations.", "Todos los veredictos están fundamentados en este corpus. Busque, filtre y lea los textos legales oficiales completos.")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: Object.entries(CATEGORY_META).filter(([k]) => statCounts[k]).map(([k, m]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCategoryFilter(categoryFilter === k ? "all" : k),
							className: `flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${categoryFilter === k ? `${m.bg} ${m.color} border-current` : "border-border bg-card text-muted-foreground hover:border-primary/30"}`,
							children: [
								m.icon,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: statCounts[k] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.label })
							]
						}, k))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-[220px] max-w-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: docSearch,
								onChange: (e) => setDocSearch(e.target.value),
								placeholder: t("Search by title, ID, or jurisdiction…", "Buscar documentos…"),
								className: "w-full rounded-lg border border-input bg-card pl-10 pr-9 py-2 text-sm shadow-xs focus:ring-2 focus:ring-primary focus:outline-none"
							}),
							docSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDocSearch(""),
								className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: jurFilter,
						onChange: (e) => setJurFilter(e.target.value),
						className: "rounded-lg border border-input bg-card px-3 py-2 text-sm font-medium shadow-xs focus:ring-2 focus:ring-primary focus:outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: t("All Jurisdictions", "Todas las jurisdicciones")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
								label: "California",
								children: [
									"Berkeley, CA",
									"San Francisco, CA",
									"Los Angeles, CA",
									"San Diego, CA",
									"Santa Ana, CA",
									"CA"
								].map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: j,
									children: j
								}, j))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
								label: "New Jersey",
								children: [
									"Newark, NJ",
									"Jersey City, NJ",
									"Hoboken, NJ",
									"NJ"
								].map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: j,
									children: j
								}, j))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
								label: "Massachusetts",
								children: [
									"Boston, MA",
									"Cambridge, MA",
									"MA"
								].map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: j,
									children: j
								}, j))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1 rounded-lg border border-input bg-card p-1 shadow-xs",
						children: [
							"all",
							"text",
							"link-only"
						].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setCaptureFilter(v),
							className: `rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${captureFilter === v ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: v === "all" ? "All" : v === "text" ? "✓ Full Text" : "🔗 Link Only"
						}, v))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto text-xs font-mono text-muted-foreground",
						children: [
							filtered.length,
							" / ",
							corpusDocs.length,
							" ",
							t("documents", "documentos")
						]
					})
				]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 flex flex-col items-center justify-center gap-3 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: t("Loading corpus…", "Cargando corpus…")
				})]
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 flex flex-col items-center justify-center gap-3 text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-10 opacity-30" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: t("No documents match your filters.", "Ningún documento coincide.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => {
							setDocSearch("");
							setJurFilter("all");
							setCategoryFilter("all");
							setCaptureFilter("all");
						},
						children: t("Clear filters", "Limpiar filtros")
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentCard, {
					doc: d,
					onRead: () => openDocumentReader(d),
					t
				}, d.doc_id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: activeDoc !== null,
				onOpenChange: (open) => {
					if (!open) {
						setActiveDoc(null);
						setReaderText("");
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[95vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-6 py-4 bg-secondary/30 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-shrink-0 flex items-center justify-center size-9 rounded-lg bg-primary/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-5 text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary",
													children: activeDoc?.doc_id
												}),
												activeDoc?.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBadge, { category: activeDoc.category }),
												activeDoc?.jurisdiction_level && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JurisdictionLevelBadge, { level: activeDoc.jurisdiction_level })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-sm text-foreground mt-0.5 leading-snug line-clamp-1",
											children: activeDoc?.document_title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground mt-0.5",
											children: [
												activeDoc?.jurisdiction_name,
												", ",
												activeDoc?.state,
												" · ",
												activeDoc?.source_type
											]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 flex-shrink-0",
								children: [
									activeDoc?.has_text && readerText && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										onClick: copyText,
										className: "h-8 text-xs gap-1.5",
										children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-3.5 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? t("Copied!", "¡Copiado!") : t("Copy Text", "Copiar")]
									}),
									activeDoc?.url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: activeDoc.url,
										target: "_blank",
										rel: "noopener noreferrer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											className: "h-8 text-xs gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }), t("Source", "Fuente")]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-8",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-y-auto p-6 bg-background/50",
							children: readerLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: t("Loading official statute text…", "Cargando texto oficial…")
								})]
							}) : !activeDoc?.has_text ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-10 opacity-40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-foreground",
											children: t("Link-Only Document", "Documento Solo por Enlace")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm mt-1",
											children: t("This document is catalogued by URL reference only. No local text capture was included in the corpus.", "Este documento está catalogado solo por URL.")
										})]
									}),
									activeDoc?.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: activeDoc.url,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline",
										children: [t("Visit official source", "Visitar fuente oficial"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
									})
								]
							}) : !readerText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center py-20 text-muted-foreground text-sm",
								children: t("No statute text available.", "No hay texto disponible.")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap select-text",
								children: readerText
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border px-6 py-3 bg-secondary/20 flex items-center justify-between text-xs text-muted-foreground gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeDoc?.has_text ? `${t("Verbatim corpus text", "Texto íntegro del corpus")} · ${activeDoc?.character_count?.toLocaleString()} {t('characters', 'caracteres')}` : t("Link-only — not captured in local corpus", "Solo enlace — no capturado localmente") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/lookup",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											className: "h-7 text-xs",
											children: t("Lookup Address", "Buscar Dirección")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/rules",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											className: "h-7 text-xs",
											children: t("Rules Registry", "Registro de Reglas")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "default",
											size: "sm",
											className: "h-7 text-xs",
											children: t("Close", "Cerrar")
										})
									})
								]
							})]
						})
					]
				})] })
			})
		]
	});
}
function DocumentCard({ doc, onRead, t }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group rounded-xl border border-border bg-card shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 pt-4 pb-3 flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary text-foreground border border-border",
							children: doc.doc_id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JurisdictionLevelBadge, { level: doc.jurisdiction_level }),
						doc.has_text ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-2.5" }), "Full Text"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-2.5" }), "Link Only"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: doc.url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "flex-shrink-0 text-muted-foreground hover:text-primary transition-colors",
					title: t("Open source URL", "Abrir URL fuente"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors",
						children: doc.document_title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [doc.jurisdiction_name, doc.state ? `, ${doc.state}` : ""]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBadge, { category: doc.category })
					}),
					doc.character_count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-1 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							doc.character_count.toLocaleString(),
							" ",
							t("characters", "caracteres")
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 px-4 pb-4 pt-3 border-t border-border flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "default",
					size: "sm",
					onClick: onRead,
					className: "h-8 text-xs font-semibold gap-1.5 flex-1",
					disabled: !doc.has_text && doc.capture === "link-only",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), doc.has_text ? t("Read Full Statute", "Leer Ley Completa") : t("View Details", "Ver Detalles")]
				}), doc.source_type && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted-foreground font-mono truncate max-w-[90px]",
					title: doc.source_type,
					children: doc.source_type.replace("secondary (law firm / news / mirror)", "secondary").replace("official city-linked policy", "city-linked")
				})]
			})
		]
	});
}
//#endregion
export { DocumentsPage as component };

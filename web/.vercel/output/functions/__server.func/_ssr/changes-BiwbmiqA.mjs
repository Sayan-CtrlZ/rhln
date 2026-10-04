import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as Info, F as ExternalLink, G as CircleCheck, J as ChevronRight, L as Download, P as FileClock, Y as ChevronLeft, at as Ban, ct as ArrowRight, et as CalendarClock, h as Scale, m as Search, o as TriangleAlert, tt as Building2, v as MapPinned, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { C as useLang, b as fetchSampleProperties, d as fetchChangeCaseDetail, f as fetchChangeCases, i as EXPORT_URLS } from "../__root-rZh34U2U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/changes-BiwbmiqA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SCENARIO_META = {
	T1: {
		kind: "effective",
		label: ["Law Takes Effect", "Entrada en Vigor"],
		before: "not_yet_effective",
		after: "applies",
		question: ["Does the engine flip status exactly on the effective date?", "¿Cambia el estado exactamente en la fecha de vigencia?"]
	},
	T2: {
		kind: "boundary",
		label: ["Municipal Boundary", "Límite Municipal"],
		before: "applies",
		after: "applies",
		question: ["Are city ordinances applied only inside city limits (not by postal code or county)?", "¿Se aplican las ordenanzas solo dentro de los límites de la ciudad?"]
	},
	T3: {
		kind: "conflict",
		label: ["Preemption Conflict", "Conflicto de Preferencia"],
		before: "not_yet_effective",
		after: "applies",
		question: ["Does a future state law get flagged for review where it may preempt local law?", "¿Se marca para revisión una ley estatal futura que puede anular la local?"]
	},
	T4: {
		kind: "pending",
		label: ["Pending Bill", "Proyecto Pendiente"],
		before: "pending",
		after: "pending",
		question: ["Are unenacted bills reported as pending, never as binding law?", "¿Se reportan los proyectos no aprobados como pendientes y no como ley?"]
	},
	T5: {
		kind: "struck",
		label: ["Struck Down", "Anulada"],
		before: "",
		after: "",
		question: ["Does a law struck by a court produce zero affected addresses?", "¿Una ley anulada por un tribunal produce cero direcciones afectadas?"]
	},
	T6: {
		kind: "effective",
		label: ["Live Cambridge Ordinance (Hour 16)", "Ordenanza de Cambridge (Hora 16)"],
		before: "not_yet_effective",
		after: "applies",
		question: ["Can the system extract an unseen ordinance unaided and evaluate future effective dates across all Cambridge addresses?", "¿Puede el sistema extraer una ordenanza no vista de forma autónoma y evaluar fechas futuras en Cambridge?"]
	}
};
var KIND_STYLE = {
	effective: {
		icon: CalendarClock,
		chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
		bar: "bg-emerald-500",
		accent: "border-l-emerald-500"
	},
	boundary: {
		icon: MapPinned,
		chip: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
		bar: "bg-sky-500",
		accent: "border-l-sky-500"
	},
	conflict: {
		icon: Scale,
		chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
		bar: "bg-amber-500",
		accent: "border-l-amber-500"
	},
	pending: {
		icon: FileClock,
		chip: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/25",
		bar: "bg-violet-500",
		accent: "border-l-violet-500"
	},
	struck: {
		icon: Ban,
		chip: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/25",
		bar: "bg-rose-500",
		accent: "border-l-rose-500"
	}
};
var TOTAL_ADDRESSES = 500;
var PAGE_SIZE = 20;
var STATE_NAMES = {
	CA: "California",
	NJ: "New Jersey",
	MA: "Massachusetts"
};
function stateName(code) {
	if (!code) return "";
	return STATE_NAMES[code.toUpperCase()] || code;
}
var STATUS_STYLE = {
	applies: {
		cls: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
		label: ["Applies", "Aplica"]
	},
	not_yet_effective: {
		cls: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
		label: ["Not Yet Effective", "Aún No Vigente"]
	},
	pending: {
		cls: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20",
		label: ["Pending Bill", "Pendiente"]
	},
	unknown: {
		cls: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
		label: ["Unknown", "Desconocido"]
	},
	superseded: {
		cls: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
		label: ["Superseded", "Reemplazada"]
	}
};
function StatusPill({ status }) {
	const { t } = useLang();
	const s = STATUS_STYLE[status];
	if (!s) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary text-foreground font-mono text-[11px]",
		children: status
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold border text-[11px] whitespace-nowrap ${s.cls}`,
		children: [status === "applies" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), t(s.label[0], s.label[1])]
	});
}
function ChangesPage() {
	const { t } = useLang();
	const [changeCases, setChangeCases] = (0, import_react.useState)([]);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [details, setDetails] = (0, import_react.useState)({});
	const [properties, setProperties] = (0, import_react.useState)({});
	const [loadingCases, setLoadingCases] = (0, import_react.useState)(true);
	const [loadingDetail, setLoadingDetail] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [onlyConflicts, setOnlyConflicts] = (0, import_react.useState)(false);
	const [page, setPage] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		fetchChangeCases().then((cases) => {
			setChangeCases(cases);
			if (cases[0]) setSelectedId(cases[0].case_id);
			setLoadingCases(false);
		});
		fetchSampleProperties(TOTAL_ADDRESSES).then((items) => {
			const map = {};
			items.forEach((p) => map[p.address_id] = p);
			setProperties(map);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!selectedId || details[selectedId]) return;
		setLoadingDetail(true);
		fetchChangeCaseDetail(selectedId).then((d) => {
			if (d) setDetails((prev) => ({
				...prev,
				[selectedId]: d
			}));
			setLoadingDetail(false);
		});
	}, [selectedId, details]);
	(0, import_react.useEffect)(() => {
		setQuery("");
		setOnlyConflicts(false);
		setPage(0);
	}, [selectedId]);
	const selectedCase = changeCases.find((c) => c.case_id === selectedId) || null;
	const detail = selectedId ? details[selectedId] : void 0;
	const meta = selectedId ? SCENARIO_META[selectedId] : void 0;
	const style = meta ? KIND_STYLE[meta.kind] : KIND_STYLE.effective;
	const conflictSet = (0, import_react.useMemo)(() => new Set(detail?.conflict_flag_address_ids || []), [detail]);
	const affectedRows = (0, import_react.useMemo)(() => {
		return (detail?.affected_address_ids || []).map((id) => ({
			id,
			prop: properties[id],
			conflict: conflictSet.has(id)
		}));
	}, [
		detail,
		properties,
		conflictSet
	]);
	const cityBreakdown = (0, import_react.useMemo)(() => {
		const counts = {};
		affectedRows.forEach((r) => {
			const city = r.prop?.postal_city || t("Unknown", "Desconocida");
			counts[city] = (counts[city] || 0) + 1;
		});
		return Object.entries(counts).sort((a, b) => b[1] - a[1]);
	}, [affectedRows, t]);
	const filteredRows = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return affectedRows.filter((r) => {
			if (onlyConflicts && !r.conflict) return false;
			if (!q) return true;
			return r.id.toLowerCase().includes(q) || r.prop?.street_address.toLowerCase().includes(q) || r.prop?.postal_city.toLowerCase().includes(q) || r.prop?.zip.includes(q);
		});
	}, [
		affectedRows,
		query,
		onlyConflicts
	]);
	const pageCount = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
	const pagedRows = filteredRows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
	const totalConflicts = changeCases.reduce((acc, c) => acc + (c.conflict_count || 0), 0);
	const totalImpacts = changeCases.reduce((acc, c) => acc + c.affected_address_count, 0);
	const hasDateShift = !!(selectedCase?.as_of_before && selectedCase?.as_of_after);
	const lookupHref = (p) => {
		if (!p) return "/lookup";
		const params = new URLSearchParams({
			address: `${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}`,
			asOf: selectedCase?.as_of_after || "2026-10-01"
		});
		if (p.units) params.set("units", String(p.units));
		if (p.year_built) params.set("year_built", String(p.year_built));
		return `/lookup?${params.toString()}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6 flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl sm:text-3xl font-bold font-display",
					children: t("Statutory Change Scenarios (Test Cases 1 to 6)", "Escenarios de Cambio Legal (Casos de Prueba 1 a 6)")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground max-w-3xl",
					children: t("Six benchmark scenarios that stress-test how the rules engine handles legal change over time — new laws taking effect, city boundaries, preemption conflicts, pending bills, court strikes, and unseen live ordinances — evaluated across all 500 sample addresses.", "Seis escenarios que ponen a prueba cómo el motor gestiona cambios legales en el tiempo, evaluados en las 500 direcciones de muestra.")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: EXPORT_URLS.changesJson,
					download: "changes.json",
					className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-xs hover:bg-primary/90 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), t("Download changes.json", "Descargar changes.json")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					{
						label: t("Scenarios", "Escenarios"),
						value: changeCases.length || 6,
						sub: t("Benchmark test cases 1 to 6", "Casos de prueba 1 a 6")
					},
					{
						label: t("Address Impacts", "Impactos"),
						value: totalImpacts,
						sub: t("summed across scenarios", "suma de escenarios")
					},
					{
						label: t("Conflicts Flagged", "Conflictos"),
						value: totalConflicts,
						sub: t("routed to human review", "para revisión humana")
					},
					{
						label: t("Sample Addresses", "Direcciones"),
						value: TOTAL_ADDRESSES,
						sub: "California · New Jersey · Massachusetts"
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between min-h-[110px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wider font-bold text-muted-foreground",
							children: s.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-3xl font-black font-mono text-foreground",
							children: loadingCases ? "—" : s.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: s.sub
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6",
				children: [loadingCases && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-[220px] rounded-2xl border border-border bg-secondary/30 animate-pulse" }, i)), changeCases.map((c) => {
					const isSelected = selectedId === c.case_id;
					const m = SCENARIO_META[c.case_id];
					const k = KIND_STYLE[m?.kind || "effective"];
					const Icon = k.icon;
					const pct = Math.round(c.affected_address_count / TOTAL_ADDRESSES * 100);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setSelectedId(c.case_id),
						className: `group rounded-2xl border border-l-4 ${k.accent} p-5 sm:p-6 text-left transition-all flex flex-col min-h-[220px] justify-between ${isSelected ? "border-primary/60 bg-primary/5 ring-2 ring-primary/20 shadow-md scale-[1.02]" : "border-border bg-card hover:bg-secondary/40 hover:-translate-y-1 hover:shadow-sm"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 mb-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-secondary text-foreground",
									children: c.case_id.replace(/^T/, "Test ")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: stateName(c.target_jurisdiction)
								})]
							}),
							m && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `self-start inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${k.chip}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }), t(m.label[0], m.label[1])]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-bold text-sm leading-snug line-clamp-2 text-foreground",
								title: c.title,
								children: c.title
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 pt-3 border-t border-border/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs text-muted-foreground mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Affected", "Afectadas") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono font-bold text-foreground",
										children: [c.affected_address_count, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground font-normal",
											children: [" / ", TOTAL_ADDRESSES]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 rounded-full bg-secondary overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full rounded-full ${k.bar} transition-all`,
										style: { width: `${pct}%` }
									})
								}),
								!!c.conflict_count && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }),
										c.conflict_count,
										" ",
										t("conflicts flagged", "conflictos")
									]
								})
							]
						})]
					}, c.case_id);
				})]
			}),
			!loadingCases && changeCases.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
				children: t("Change scenarios are unavailable. Is the API running on port 8000?", "Escenarios no disponibles. ¿Está la API en ejecución?")
			}),
			selectedCase && meta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-lg border border-border bg-card shadow-xs overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-border flex flex-wrap items-start justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-bold text-sm px-2.5 py-0.5 rounded bg-primary text-primary-foreground",
										children: selectedCase.case_id.replace(/^T/, "Test ")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${style.chip}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(style.icon, { className: "size-3" }), t(meta.label[0], meta.label[1])]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-xl font-bold leading-tight",
									children: selectedCase.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: selectedCase.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 inline-flex items-start gap-1.5 text-xs text-foreground/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-3.5 mt-0.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: t("What this tests: ", "Qué se evalúa: ")
									}), t(meta.question[0], meta.question[1])] })]
								})
							]
						}), hasDateShift ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs font-mono",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-secondary/40 px-3 py-2 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] block text-muted-foreground uppercase",
											children: t("Before", "Antes")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: selectedCase.as_of_before
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: meta.before })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] block text-primary uppercase",
											children: t("After", "Después")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-primary",
											children: selectedCase.as_of_after
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: meta.after })
										})
									]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-dashed border-border bg-secondary/30 px-4 py-3 text-xs max-w-[260px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5 text-muted-foreground" }), t("As of October 1, 2026", "Al 1 de octubre de 2026")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[11px] text-muted-foreground",
									children: t("Default query date · no date shift in this test", "Fecha de consulta predeterminada · sin cambio de fecha")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-muted-foreground leading-relaxed",
									children: [
										meta.kind === "boundary" && t("Compares addresses inside versus outside city limits on the same date.", "Compara direcciones dentro y fuera de la ciudad en la misma fecha."),
										meta.kind === "pending" && t("Bills are not law yet — affected set shows impact if enacted.", "Los proyectos aún no son ley; el conjunto muestra el impacto si se aprueban."),
										meta.kind === "struck" && t("Negative control — a struck measure must affect no one.", "Control negativo: una medida anulada no debe afectar a nadie.")
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mx-6 mt-6 rounded-md border border-border border-l-4 ${style.accent} bg-secondary/30 px-4 py-3`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
							children: t("Engine finding", "Resultado del motor")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-foreground leading-relaxed",
							children: loadingDetail && !detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }),
									" ",
									t("Evaluating scenario…", "Evaluando escenario…")
								]
							}) : detail?.notes || t("No notes returned.", "Sin notas.")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 grid gap-4 lg:grid-cols-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 lg:col-span-1 content-start",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-secondary/30 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground",
										children: t("Jurisdiction", "Jurisdicción")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-bold text-foreground",
										children: stateName(selectedCase.target_jurisdiction)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-secondary/30 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground",
										children: t("Affected", "Afectadas")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-lg font-bold font-mono text-foreground",
										children: [selectedCase.affected_address_count, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground font-normal",
											children: [" / ", TOTAL_ADDRESSES]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-secondary/30 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground",
										children: t("Share of sample", "Porcentaje")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-lg font-bold font-mono text-foreground",
										children: [Math.round(selectedCase.affected_address_count / TOTAL_ADDRESSES * 100), "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `rounded-lg border p-3 ${selectedCase.conflict_count ? "border-amber-500/30 bg-amber-500/5" : "border-border bg-secondary/30"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground",
										children: t("Conflicts", "Conflictos")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-lg font-bold font-mono ${selectedCase.conflict_count ? "text-amber-700 dark:text-amber-300" : "text-foreground"}`,
										children: selectedCase.conflict_count || 0
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-2 rounded-lg border border-border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }), t("Affected addresses by city", "Direcciones afectadas por ciudad")]
							}), cityBreakdown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex items-center gap-2 text-sm text-muted-foreground",
								children: meta.kind === "struck" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-600" }), t("Correct: no addresses affected by a struck measure.", "Correcto: ninguna dirección afectada por una medida anulada.")] }) : loadingDetail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : t("No affected addresses.", "Sin direcciones afectadas.")
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 space-y-2",
								children: cityBreakdown.map(([city, n]) => {
									const max = cityBreakdown[0]?.[1] || 1;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-32 shrink-0 truncate font-medium text-foreground",
												title: city,
												children: city
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex-1 h-2 rounded-full bg-secondary overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `h-full rounded-full ${style.bar}`,
													style: { width: `${n / max * 100}%` }
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-10 text-right font-mono font-bold text-foreground",
												children: n
											})
										]
									}, city);
								})
							})]
						})]
					}),
					affectedRows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-6 pb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-bold uppercase tracking-wider text-muted-foreground",
									children: [t("Affected Addresses", "Direcciones Afectadas"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-2 font-mono normal-case text-foreground",
										children: [
											"(",
											filteredRows.length,
											")"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [conflictSet.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "inline-flex items-center gap-1.5 text-xs font-medium text-foreground cursor-pointer select-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: onlyConflicts,
											onChange: (e) => {
												setOnlyConflicts(e.target.checked);
												setPage(0);
											},
											className: "accent-amber-600"
										}), t("Conflicts only", "Solo conflictos")]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "changes-address-search",
											value: query,
											onChange: (e) => {
												setQuery(e.target.value);
												setPage(0);
											},
											placeholder: t("Search address number, street, city, postal code…", "Buscar número, calle, ciudad, código postal…"),
											className: "h-8 w-64 rounded-md border border-input bg-background pl-8 pr-3 text-xs outline-none focus:ring-2 focus:ring-primary/30"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto rounded-lg border border-border/80",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "border-b border-border bg-secondary/60 text-muted-foreground uppercase text-[10px] font-bold tracking-wider",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2.5",
												children: t("Address Number", "Número de Dirección")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2.5",
												children: t("Address", "Dirección")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2.5",
												children: t("Units", "Unidades")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2.5",
												children: t("Year Built", "Año de Construcción")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2.5",
												children: t("Status Change", "Cambio de Estado")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "px-4 py-2.5",
												children: t("Review", "Revisión")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2.5 text-right" })
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
										className: "divide-y divide-border/60 bg-card",
										children: [pagedRows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-secondary/30 transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-4 py-2.5 font-mono font-bold text-primary",
													children: r.id
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-4 py-2.5",
													children: r.prop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-foreground",
														children: r.prop.street_address
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "block text-[11px] text-muted-foreground",
														children: [
															r.prop.postal_city,
															", ",
															stateName(r.prop.state),
															" ",
															r.prop.zip
														]
													})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "—"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-4 py-2.5 font-mono text-muted-foreground",
													children: r.prop?.units ?? "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-4 py-2.5 font-mono text-muted-foreground",
													children: r.prop?.year_built ?? "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-4 py-2.5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-1.5",
														children: [meta.before !== meta.after && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: meta.before }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3 text-muted-foreground" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: meta.after })]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-4 py-2.5",
													children: r.conflict ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3" }), t("Preemption", "Preferencia")]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "—"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-4 py-2.5 text-right",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: lookupHref(r.prop),
														className: "inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline",
														children: [t("Look up", "Consultar"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
													})
												})
											]
										}, r.id)), pagedRows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 7,
											className: "px-4 py-8 text-center text-muted-foreground",
											children: t("No addresses match your filter.", "Ninguna dirección coincide.")
										}) })]
									})]
								})
							}),
							pageCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									t("Showing", "Mostrando"),
									" ",
									page * PAGE_SIZE + 1,
									"–",
									Math.min((page + 1) * PAGE_SIZE, filteredRows.length),
									" ",
									t("of", "de"),
									" ",
									filteredRows.length
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setPage((p) => Math.max(0, p - 1)),
											disabled: page === 0,
											className: "inline-flex items-center justify-center size-7 rounded-md border border-border hover:bg-secondary disabled:opacity-40",
											"aria-label": "Previous page",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-2 font-mono",
											children: [
												page + 1,
												" / ",
												pageCount
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setPage((p) => Math.min(pageCount - 1, p + 1)),
											disabled: page >= pageCount - 1,
											className: "inline-flex items-center justify-center size-7 rounded-md border border-border hover:bg-secondary disabled:opacity-40",
											"aria-label": "Next page",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })
										})
									]
								})]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { ChangesPage as component };

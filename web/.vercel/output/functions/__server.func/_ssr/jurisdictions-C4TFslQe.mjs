import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Globe, G as CircleCheck, J as ChevronRight, M as Funnel, g as RefreshCw, it as BookOpen, j as Gavel, m as Search, o as TriangleAlert, tt as Building2, x as LoaderCircle, y as MapPin } from "../_libs/lucide-react.mjs";
import { C as useLang, S as resolveAddress, g as fetchJurisdictions, r as Button } from "../__root-rZh34U2U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jurisdictions-C4TFslQe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PROFILES = {
	ca: {
		programs: [
			"AB 1482 Rent Cap",
			"Just Cause (Statewide)",
			"Algorithmic Pricing Ban (AB 325)"
		],
		highlight: "Statewide 5% + CPI rent cap; AB 325 bans algorithm-coordinated pricing.",
		keyLaw: "Cal. Civ. Code § 1947.12",
		docCount: 28,
		sampleAddress: "2150 Shattuck Ave, Berkeley CA",
		flag: "high"
	},
	"ca-berkeley": {
		programs: [
			"RSO (Measure BB)",
			"Just Cause Eviction",
			"Security Deposit Rules",
			"Fair Chance Screening",
			"AGA Annual Increase"
		],
		highlight: "One of the strictest rent ordinances in the US — covers pre-1980 units; strict eviction protections.",
		keyLaw: "Berkeley Municipal Code § 13.76",
		docCount: 14,
		sampleAddress: "2150 Shattuck Ave, Berkeley CA 94704",
		flag: "high"
	},
	"ca-sf": {
		programs: [
			"SF Rent Ordinance",
			"Just Cause Eviction",
			"Costa-Hawkins Exemptions",
			"Relocation Assistance"
		],
		highlight: "Covers units built before June 13 1979; owner move-in and Ellis Act evictions regulated.",
		keyLaw: "SF Admin. Code § 37",
		docCount: 8,
		sampleAddress: "500 Castro St, San Francisco CA 94114",
		flag: "high"
	},
	"ca-la": {
		programs: [
			"LA RSO",
			"Just Cause (AB 1482 + Local)",
			"SCEP Inspections",
			"REAP Program"
		],
		highlight: "Los Angeles RSO covers pre-1978 buildings; SCEP ensures habitability compliance.",
		keyLaw: "LA Municipal Code § 151",
		docCount: 6,
		sampleAddress: "1234 Wilshire Blvd, Los Angeles CA 90017",
		flag: "high"
	},
	"ca-sd": {
		programs: [
			"AB 1482 Statewide Cap",
			"Just Cause (Statewide)",
			"No Local RSO"
		],
		highlight: "San Diego relies on statewide AB 1482 — no independent local rent ordinance.",
		keyLaw: "Cal. Civ. Code § 1947.12",
		docCount: 2,
		sampleAddress: "500 W Broadway, San Diego CA 92101",
		flag: "low"
	},
	"ca-santa-ana": {
		programs: [
			"AB 1482 Statewide Cap",
			"Fair Chance Screening",
			"Local Eviction Rules"
		],
		highlight: "Santa Ana adopted tenant protections in 2023 expanding on statewide baseline.",
		keyLaw: "Santa Ana Municipal Code",
		docCount: 3,
		sampleAddress: "200 N Broadway, Santa Ana CA 92701",
		flag: "medium"
	},
	nj: {
		programs: [
			"NJ Anti-Eviction Act",
			"Truth in Renting",
			"FAIR Act (P.L. 2026 c.43)",
			"Security Deposit Limits"
		],
		highlight: "NJ FAIR Act (2026) bans algorithmic rent-fixing; statewide just cause for all residential rentals.",
		keyLaw: "N.J.S.A. 2A:18-61.1",
		docCount: 18,
		sampleAddress: "744 Broad St, Newark NJ 07102",
		flag: "high"
	},
	"nj-newark": {
		programs: [
			"Newark Rent Control Ord.",
			"Just Cause (Statewide)",
			"FAIR Act Coverage",
			"Certificate of Occupancy Req."
		],
		highlight: "Newark RSO covers buildings with 4+ units; NJ FAIR Act adds algorithmic ban layer.",
		keyLaw: "Newark Rev. Ord. § 4:31",
		docCount: 7,
		sampleAddress: "744 Broad St, Newark NJ 07102",
		flag: "high"
	},
	"nj-jersey-city": {
		programs: [
			"JC Rent Control Ord.",
			"NJ Anti-Eviction Act",
			"FAIR Act Coverage"
		],
		highlight: "Jersey City rent control applies to buildings with 4+ units built before 1987.",
		keyLaw: "Jersey City Ord. § 260",
		docCount: 5,
		sampleAddress: "1 Journal Square, Jersey City NJ 07306",
		flag: "medium"
	},
	"nj-hoboken": {
		programs: [
			"Hoboken Rent Control Ord.",
			"Ch. 158 Coverage",
			"NJ Anti-Eviction Act"
		],
		highlight: "Hoboken Ord. Ch. 158 prohibits algorithmic pricing tools; strict local control.",
		keyLaw: "Hoboken Ord. Ch. 158",
		docCount: 4,
		sampleAddress: "100 Sinatra Dr, Hoboken NJ 07030",
		flag: "high"
	},
	ma: {
		programs: [
			"Chapter 186 Landlord-Tenant",
			"Discrimination Prohibitions",
			"Security Deposit Rules",
			"Pending S.2983 / H.5222"
		],
		highlight: "MA has no statewide rent control — pending bills S.2983 and H.5222 target algorithmic pricing.",
		keyLaw: "M.G.L. c. 186",
		docCount: 15,
		sampleAddress: "100 Tremont St, Boston MA 02108",
		flag: "medium"
	},
	"ma-boston": {
		programs: [
			"Boston HSNA (Notice Act)",
			"Fair Chance Housing",
			"ADA/Section 8 Acceptance",
			"No Local Rent Control"
		],
		highlight: "Boston HSNA requires 30-day written notice of lease non-renewal; Fair Chance ordinance limits screening.",
		keyLaw: "Boston Code § 9-20",
		docCount: 8,
		sampleAddress: "100 Tremont St, Boston MA 02108",
		flag: "medium"
	},
	"ma-cambridge": {
		programs: [
			"Cambridge Fair Housing Rules",
			"Section 8 Acceptance Required",
			"No Local Rent Control"
		],
		highlight: "Cambridge has not restored rent control since the 1994 statewide ban, but has strong fair housing rules.",
		keyLaw: "Cambridge Code of Ordinances",
		docCount: 3,
		sampleAddress: "1 Harvard Square, Cambridge MA 02138",
		flag: "low"
	}
};
var FLAG_META = {
	high: {
		label: "Highly Regulated",
		color: "text-rose-500",
		bg: "bg-rose-500/10",
		dot: "bg-rose-500"
	},
	medium: {
		label: "Moderately Regulated",
		color: "text-amber-500",
		bg: "bg-amber-500/10",
		dot: "bg-amber-500"
	},
	low: {
		label: "Minimal Local Rules",
		color: "text-slate-400",
		bg: "bg-slate-400/10",
		dot: "bg-slate-400"
	}
};
var STATE_META = {
	CA: {
		label: "California",
		color: "text-blue-500",
		border: "border-blue-500/30",
		bg: "bg-blue-500/5"
	},
	NJ: {
		label: "New Jersey",
		color: "text-emerald-500",
		border: "border-emerald-500/30",
		bg: "bg-emerald-500/5"
	},
	MA: {
		label: "Massachusetts",
		color: "text-violet-500",
		border: "border-violet-500/30",
		bg: "bg-violet-500/5"
	}
};
var SAMPLE_ADDRESSES = [
	{
		label: "Berkeley Multifamily",
		street: "2150 Shattuck Ave",
		city: "Berkeley",
		state: "CA",
		zip: "94704"
	},
	{
		label: "Newark Statewide",
		street: "744 Broad St",
		city: "Newark",
		state: "NJ",
		zip: "07102"
	},
	{
		label: "Boston Market Rate",
		street: "100 Tremont St",
		city: "Boston",
		state: "MA",
		zip: "02108"
	},
	{
		label: "San Francisco RSO",
		street: "500 Castro St",
		city: "San Francisco",
		state: "CA",
		zip: "94114"
	}
];
function JurisdictionsPage() {
	const { t } = useLang();
	const [jurisdictionsList, setJurisdictionsList] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [jurFilterState, setJurFilterState] = (0, import_react.useState)("all");
	const [jurSearch, setJurSearch] = (0, import_react.useState)("");
	const [sandboxStreet, setSandboxStreet] = (0, import_react.useState)("2150 Shattuck Ave");
	const [sandboxCity, setSandboxCity] = (0, import_react.useState)("Berkeley");
	const [sandboxState, setSandboxState] = (0, import_react.useState)("CA");
	const [sandboxZip, setSandboxZip] = (0, import_react.useState)("94704");
	const [sandboxResolving, setSandboxResolving] = (0, import_react.useState)(false);
	const [sandboxResult, setSandboxResult] = (0, import_react.useState)(null);
	const [sandboxError, setSandboxError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setLoading(true);
		fetchJurisdictions().then((jurs) => {
			if (jurs && jurs.length > 0) setJurisdictionsList(jurs);
		}).finally(() => setLoading(false));
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		return jurisdictionsList.filter((j) => {
			if (jurFilterState !== "all" && j.state !== jurFilterState) return false;
			if (jurSearch) {
				const q = jurSearch.toLowerCase();
				return j.name.toLowerCase().includes(q) || j.id.toLowerCase().includes(q);
			}
			return true;
		});
	}, [
		jurisdictionsList,
		jurFilterState,
		jurSearch
	]);
	const grouped = (0, import_react.useMemo)(() => {
		const g = {};
		for (const j of filtered) {
			if (!g[j.state]) g[j.state] = [];
			g[j.state].push(j);
		}
		return g;
	}, [filtered]);
	const applyChip = (chip) => {
		setSandboxStreet(chip.street);
		setSandboxCity(chip.city);
		setSandboxState(chip.state);
		setSandboxZip(chip.zip);
		setSandboxResult(null);
		setSandboxError("");
	};
	const handleResolveSandbox = async (e) => {
		e.preventDefault();
		setSandboxResolving(true);
		setSandboxError("");
		try {
			const res = await resolveAddress({
				street: sandboxStreet,
				city: sandboxCity,
				state: sandboxState,
				zip: sandboxZip
			});
			setSandboxResult(res);
		} catch {
			setSandboxError("Resolution failed. Check address and try again.");
		} finally {
			setSandboxResolving(false);
		}
	};
	const stateKeys = [
		"CA",
		"NJ",
		"MA"
	].filter((s) => jurFilterState === "all" || s === jurFilterState);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6 flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl sm:text-3xl font-bold font-display",
					children: t("Jurisdictions & Regulatory Coverage", "Jurisdicciones y Cobertura Regulatoria")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl",
					children: t("Every supported jurisdiction with its regulatory programs, key statutes, and coverage intensity. Use the address resolver below to compute the full legal hierarchy for any rental property.", "Cada jurisdicción soportada con sus programas regulatorios, estatutos clave e intensidad de cobertura.")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						"all",
						"CA",
						"NJ",
						"MA"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setJurFilterState(s),
						className: `rounded-xl border px-5 py-2 text-xs sm:text-sm font-bold transition-all ${jurFilterState === s ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"}`,
						children: s === "all" ? "All States" : s
					}, s))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card shadow-sm overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-6 py-4 bg-primary/5 border-b border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center size-9 rounded-lg bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5 text-primary" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-sm text-foreground",
							children: t("Live Jurisdiction Stack Resolver", "Resolutor de Pila Jurisdiccional en Vivo")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t("Enter any US rental address to compute its full legal hierarchy (state → county → city).", "Ingrese cualquier dirección para calcular su jerarquía legal completa.")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto font-mono text-[10px] text-muted-foreground bg-secondary border border-border rounded px-2 py-1",
							children: "POST /api/v1/resolve"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground font-semibold mr-1 self-center",
								children: "Quick addresses:"
							}), SAMPLE_ADDRESSES.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => applyChip(chip),
								className: "rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-foreground transition-all",
								children: chip.label
							}, chip.label))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleResolveSandbox,
							className: "grid grid-cols-1 sm:grid-cols-[1fr_180px_80px_110px_auto] gap-3 items-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-muted-foreground",
										children: "Street Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: sandboxStreet,
										onChange: (e) => setSandboxStreet(e.target.value),
										placeholder: "742 Evergreen Terr",
										className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-muted-foreground",
										children: "City"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: sandboxCity,
										onChange: (e) => setSandboxCity(e.target.value),
										placeholder: "Boston",
										className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-muted-foreground",
										children: "State"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: sandboxState,
										onChange: (e) => setSandboxState(e.target.value.toUpperCase().slice(0, 2)),
										placeholder: "CA",
										maxLength: 2,
										className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono uppercase focus:ring-2 focus:ring-primary focus:outline-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex flex-col gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-muted-foreground",
										children: "ZIP Code"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: sandboxZip,
										onChange: (e) => setSandboxZip(e.target.value),
										placeholder: "02124",
										className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-primary focus:outline-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									disabled: sandboxResolving,
									className: "h-10 px-5 text-sm font-semibold gap-2 self-end",
									children: [sandboxResolving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), "Resolve Stack"]
								})
							]
						}),
						sandboxError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 flex-shrink-0" }), sandboxError]
						}),
						sandboxResult && !sandboxError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-emerald-500/30 bg-emerald-500/5 overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-5 py-3 border-b border-emerald-500/20 flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Legal City: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: sandboxResult.geocode?.legal_city
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "County: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: sandboxResult.geocode?.county
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "State: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: sandboxResult.geocode?.state
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-auto flex items-center gap-1.5 text-emerald-600 font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), "CENSUS MATCH · OK"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-5 py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-muted-foreground mb-3",
										children: "Resolved Jurisdiction Stack"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: sandboxResult.stack?.map((node, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-foreground",
													children: node.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${node.level === "state" ? "bg-blue-500/10 text-blue-500" : node.level === "county" ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary"}`,
													children: node.level
												})]
											}), idx < sandboxResult.stack.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" })]
										}, node.id ?? idx))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/lookup",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												className: "h-8 text-xs gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }), "Evaluate Rules for This Address"]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "→ Runs all applicable laws against this resolved stack"
										})]
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold mr-2",
						children: t("Jurisdictions Directory", "Directorio de Jurisdicciones")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: jurSearch,
							onChange: (e) => setJurSearch(e.target.value),
							placeholder: "Search jurisdictions…",
							className: "rounded-lg border border-input bg-card pl-9 pr-3 py-1.5 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto text-xs font-mono text-muted-foreground",
						children: [filtered.length, " jurisdictions"]
					})
				]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: "Loading jurisdictions…"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-8",
				children: stateKeys.filter((s) => grouped[s]?.length).map((stateCode) => {
					const meta = STATE_META[stateCode];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-3 rounded-xl border ${meta.border} ${meta.bg} px-5 py-3 mb-4`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: `size-5 ${meta.color}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: `font-bold text-base ${meta.color}`,
								children: [
									meta.label,
									" (",
									stateCode,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-auto text-xs text-muted-foreground font-mono",
								children: [grouped[stateCode].length, " jurisdictions"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: grouped[stateCode].map((j) => {
							const profile = PROFILES[j.id];
							const flagMeta = profile ? FLAG_META[profile.flag] : FLAG_META.low;
							const isState = j.level === "state";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group rounded-xl border border-border bg-card shadow-xs hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-4 pt-4 pb-3 flex items-start justify-between gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-secondary border border-border text-foreground",
													children: j.id
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${isState ? "bg-blue-500/10 text-blue-500" : "bg-primary/10 text-primary"}`,
													children: isState ? "State Law" : "Municipal"
												}),
												profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${flagMeta.bg} ${flagMeta.color}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block size-1.5 rounded-full ${flagMeta.dot}` }), flagMeta.label]
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-4 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `flex-shrink-0 flex items-center justify-center size-8 rounded-lg ${isState ? "bg-blue-500/10" : "bg-primary/10"}`,
													children: isState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: `size-4 ${meta.color}` }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-primary" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-bold text-sm text-foreground leading-tight group-hover:text-primary transition-colors",
													children: j.name
												}), profile?.keyLaw && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] font-mono text-muted-foreground mt-0.5",
													children: profile.keyLaw
												})] })]
											}),
											profile?.highlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2",
												children: profile.highlight
											}),
											profile?.programs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex flex-wrap gap-1.5",
												children: [profile.programs.slice(0, 4).map((prog) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-secondary border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground",
													children: prog
												}, prog)), profile.programs.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "rounded-full bg-secondary border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground",
													children: [
														"+",
														profile.programs.length - 4,
														" more"
													]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 px-4 pb-4 pt-3 border-t border-border flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3" }),
													profile?.docCount ?? 0,
													" docs"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-3" }),
													j.rule_count || 0,
													" rules"
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/lookup",
											search: { address: profile?.sampleAddress ?? `${j.name}` },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												size: "sm",
												className: "h-7 text-xs gap-1 font-semibold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3" }), "Lookup"]
											})
										})]
									})
								]
							}, j.id);
						})
					})] }, stateCode);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-bold text-foreground mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-4 text-primary" }), "Regulatory Intensity Guide"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid sm:grid-cols-3 gap-4",
					children: Object.entries(FLAG_META).map(([key, m]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-lg border ${m.bg.replace("/10", "/20")} p-3`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-2 font-bold text-xs ${m.color} mb-1`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block size-2 rounded-full ${m.dot}` }), m.label]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted-foreground",
							children: [
								key === "high" && "Has its own ordinance + layers on statewide law. Strict enforcement, rent boards, eviction protections.",
								key === "medium" && "Relies partly on local rules, partly on statewide baselines. Some local amplification.",
								key === "low" && "Primarily governed by statewide law only. No independent local rent control ordinance."
							]
						})]
					}, key))
				})]
			})
		]
	});
}
//#endregion
export { JurisdictionsPage as component };

import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { $ as CalendarDays, E as Info, F as ExternalLink, G as CircleCheck, H as Clock3, J as ChevronRight, M as Funnel, N as FileText, U as CircleQuestionMark, X as ChevronDown, Y as ChevronLeft, ct as ArrowRight, d as SlidersHorizontal, f as ShieldCheck, h as Scale, i as Users, it as BookOpen, j as Gavel, m as Search, n as X, o as TriangleAlert, ot as BadgeCheck, q as ChevronUp, r as Wallet, s as TrendingUp, tt as Building2, u as Sparkles, w as Layers, x as LoaderCircle, y as MapPin } from "../_libs/lucide-react.mjs";
import { C as useLang, b as fetchSampleProperties, c as cn, l as explainRuleWithAI, r as Button, s as buttonVariants, t as AICopilotDrawer, v as fetchRuleSource, x as lookupAddress } from "../__root-rZh34U2U.mjs";
import { l as format } from "../_libs/date-fns.mjs";
import { n as getDefaultClassNames, t as DayPicker } from "../_libs/react-day-picker.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookup-DjjLl1wy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = "label", buttonVariant = "ghost", formatters, components, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
		showOutsideDays,
		className: cn("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, className),
		captionLayout,
		formatters: {
			formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
			...formatters
		},
		classNames: {
			root: cn("w-fit", defaultClassNames.root),
			months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
			month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
			nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
			button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_previous),
			button_next: cn(buttonVariants({ variant: buttonVariant }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", defaultClassNames.button_next),
			month_caption: cn("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", defaultClassNames.month_caption),
			dropdowns: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
			dropdown_root: cn("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", defaultClassNames.dropdown_root),
			dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
			caption_label: cn("select-none font-medium", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
			table: "w-full border-collapse",
			weekdays: cn("flex", defaultClassNames.weekdays),
			weekday: cn("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", defaultClassNames.weekday),
			week: cn("mt-2 flex w-full", defaultClassNames.week),
			week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
			week_number: cn("text-muted-foreground select-none text-[0.8rem]", defaultClassNames.week_number),
			day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", defaultClassNames.day),
			range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
			range_middle: cn("rounded-none", defaultClassNames.range_middle),
			range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
			today: cn("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", defaultClassNames.today),
			outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
			disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
			hidden: cn("invisible", defaultClassNames.hidden),
			...classNames
		},
		components: {
			Root: ({ className, rootRef, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"data-slot": "calendar",
					ref: rootRef,
					className: cn(className),
					...props
				});
			},
			Chevron: ({ className, orientation, ...props }) => {
				if (orientation === "left") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
					className: cn("size-4", className),
					...props
				});
				if (orientation === "right") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
					className: cn("size-4", className),
					...props
				});
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: cn("size-4", className),
					...props
				});
			},
			DayButton: CalendarDayButton,
			WeekNumber: ({ children, ...props }) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					...props,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-(--cell-size) items-center justify-center text-center",
						children
					})
				});
			},
			...components
		},
		...props
	});
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
	const defaultClassNames = getDefaultClassNames();
	const ref = import_react.useRef(null);
	import_react.useEffect(() => {
		if (modifiers["focused"]) ref.current?.focus();
	}, [modifiers]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		ref,
		variant: "ghost",
		size: "icon",
		"data-day": day.date.toLocaleDateString(),
		"data-selected-single": modifiers["selected"] && !modifiers["range_start"] && !modifiers["range_end"] && !modifiers["range_middle"],
		"data-range-start": modifiers["range_start"],
		"data-range-end": modifiers["range_end"],
		"data-range-middle": modifiers["range_middle"],
		className: cn("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", defaultClassNames.day, className),
		...props
	});
}
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
var STATUS_MAP = {
	applies: {
		badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
		badgeBorder: "border-emerald-500/30",
		badgeText: "text-emerald-700 dark:text-emerald-300",
		cardBorderLeft: "border-l-emerald-500",
		iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
		icon: CircleCheck,
		en: "Applies to Property",
		es: "Aplica a la Vivienda"
	},
	unknown: {
		badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
		badgeBorder: "border-amber-500/30",
		badgeText: "text-amber-700 dark:text-amber-300",
		cardBorderLeft: "border-l-amber-500",
		iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
		icon: CircleQuestionMark,
		en: "More Facts Needed",
		es: "Faltan Datos del Inmueble"
	},
	superseded: {
		badgeBg: "bg-slate-500/10 dark:bg-slate-500/20",
		badgeBorder: "border-slate-500/30",
		badgeText: "text-slate-700 dark:text-slate-300",
		cardBorderLeft: "border-l-slate-400",
		iconBg: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
		icon: Layers,
		en: "Overridden by Local Rule",
		es: "Reemplazada por Norma Local"
	},
	not_yet_effective: {
		badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
		badgeBorder: "border-blue-500/30",
		badgeText: "text-blue-700 dark:text-blue-300",
		cardBorderLeft: "border-l-blue-500",
		iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
		icon: Clock3,
		en: "Upcoming / Future Law",
		es: "Aún no está vigente"
	},
	pending: {
		badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
		badgeBorder: "border-purple-500/30",
		badgeText: "text-purple-700 dark:text-purple-300",
		cardBorderLeft: "border-l-purple-500",
		iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
		icon: FileText,
		en: "Proposed (Pending Bill)",
		es: "Propuesta (No es ley)"
	}
};
function StatusBadge({ status, es }) {
	const cfg = STATUS_MAP[status in STATUS_MAP ? status : "unknown"];
	const Icon = cfg.icon;
	const label = es ? cfg.es : cfg.en;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${cfg.badgeBg} ${cfg.badgeBorder} ${cfg.badgeText}`,
		"aria-label": label,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
var OFFICIAL_CATEGORIES = [
	{
		key: "rent_increase_limits",
		shortEn: "Rent Caps",
		shortEs: "Límites de Renta",
		en: "Rent Increase Limits",
		es: "Límites de Aumento de Alquiler",
		icon: TrendingUp,
		descriptionEn: "Statutory ceilings on allowable rent increases and annual adjustment formulas.",
		descriptionEs: "Topes de incremento anual y fórmulas según el IPC."
	},
	{
		key: "just_cause_eviction",
		shortEn: "Eviction Rules",
		shortEs: "Desalojos",
		en: "Just Cause Eviction Protections",
		es: "Causa Justa de Desalojo",
		icon: ShieldCheck,
		descriptionEn: "Protections requiring enumerated just causes, formal notice, and relocation assistance.",
		descriptionEs: "Protecciones contra desalojos injustificados y compensaciones."
	},
	{
		key: "security_deposits",
		shortEn: "Security Deposits",
		shortEs: "Fianzas",
		en: "Security Deposit Limits",
		es: "Depósitos de Garantía",
		icon: Wallet,
		descriptionEn: "Statutory limits on deposit amounts (AB 12), return deadlines, and deductions.",
		descriptionEs: "Límites máximos de fianza, plazos de devolución y deducciones permitidas."
	},
	{
		key: "application_screening_fees",
		shortEn: "Screening Fees",
		shortEs: "Tarifas",
		en: "Application Screening Fees",
		es: "Tarifas de Evaluación de Solicitud",
		icon: FileText,
		descriptionEn: "Caps on tenant background checks, credit screening, and application processing.",
		descriptionEs: "Límites en cobros por verificación de antecedentes a inquilinos."
	},
	{
		key: "screening_restrictions",
		shortEn: "Screening Limits",
		shortEs: "Restricciones",
		en: "Tenant Screening Restrictions",
		es: "Restricciones de Evaluación",
		icon: SlidersHorizontal,
		descriptionEn: "Restrictions on criminal history lookbacks, eviction records, and credit barriers.",
		descriptionEs: "Prohibiciones sobre antecedentes penales y registros de desahucio."
	},
	{
		key: "algorithmic_rent_setting",
		shortEn: "Algorithmic Bans",
		shortEs: "Leyes de Algoritmos",
		en: "Algorithmic Rent-Setting Bans",
		es: "Fijación Algorítmica de Alquileres",
		icon: SlidersHorizontal,
		descriptionEn: "Bans and antitrust rules restricting shared price-fixing algorithms (AB 325).",
		descriptionEs: "Prohibición de algoritmos de precios compartidos y colusión de rentas."
	}
];
var SESSION_KEYS = {
	EXPLANATIONS_CACHE: "rhln_lexi_explanations_cache",
	VISIBLE_EXPLANATION_IDS: "rhln_lexi_visible_explanations",
	LOOKUP_ADDRESS: "rhln_lookup_address",
	LOOKUP_YEAR: "rhln_lookup_year",
	LOOKUP_UNITS: "rhln_lookup_units",
	LOOKUP_RESULTS: "rhln_lookup_results",
	LOOKUP_STACK: "rhln_lookup_stack"
};
function LookupPage() {
	const { t, language } = useLang();
	const es = language === "es";
	const [address, setAddress] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(new Date(2026, 9, 1));
	const [yearBuilt, setYearBuilt] = (0, import_react.useState)("");
	const [units, setUnits] = (0, import_react.useState)("");
	const [calendarOpen, setCalendarOpen] = (0, import_react.useState)(false);
	const [userRole, setUserRole] = (0, import_react.useState)("renter");
	const [showPropertyContext, setShowPropertyContext] = (0, import_react.useState)(false);
	const [tenancyDuration, setTenancyDuration] = (0, import_react.useState)("12_or_more");
	const [viewMode, setViewMode] = (0, import_react.useState)("plain");
	const [searched, setSearched] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [activeCategoryFilter, setActiveCategoryFilter] = (0, import_react.useState)("all");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [evaluatedRules, setEvaluatedRules] = (0, import_react.useState)([]);
	const [jurisdictionStack, setJurisdictionStack] = (0, import_react.useState)([]);
	const [sampleProperties, setSampleProperties] = (0, import_react.useState)([]);
	const [expandedTraceRuleId, setExpandedTraceRuleId] = (0, import_react.useState)(null);
	const [aiExplanations, setAiExplanations] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") try {
			const saved = sessionStorage.getItem(SESSION_KEYS.EXPLANATIONS_CACHE);
			if (saved) return JSON.parse(saved);
		} catch {}
		return {};
	});
	const [visibleExplanationIds, setVisibleExplanationIds] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") try {
			const saved = sessionStorage.getItem(SESSION_KEYS.VISIBLE_EXPLANATION_IDS);
			if (saved) return JSON.parse(saved);
		} catch {}
		return [];
	});
	const [aiExplainingRuleId, setAiExplainingRuleId] = (0, import_react.useState)(null);
	const [copilotOpen, setCopilotOpen] = (0, import_react.useState)(false);
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	const [activeRuleId, setActiveRuleId] = (0, import_react.useState)(null);
	const [sourceData, setSourceData] = (0, import_react.useState)(null);
	const [sourceLoading, setSourceLoading] = (0, import_react.useState)(false);
	const [sourceError, setSourceError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		fetchSampleProperties(100).then((items) => {
			if (items && items.length > 0) setSampleProperties(items);
		});
		if (typeof window !== "undefined") {
			const urlParams = new URLSearchParams(window.location.search);
			const urlAddress = urlParams.get("address");
			const urlAsOf = urlParams.get("asOf");
			const urlUnits = urlParams.get("units");
			const urlYear = urlParams.get("year_built");
			const sourceParam = urlParams.get("source");
			if (urlAddress) {
				setAddress(urlAddress);
				if (urlUnits) setUnits(urlUnits);
				if (urlYear) setYearBuilt(urlYear);
				if (urlAsOf) try {
					const parsed = new Date(urlAsOf);
					if (!isNaN(parsed.getTime())) setDate(parsed);
				} catch {}
				performLookup({
					addressStr: urlAddress,
					asOfDate: urlAsOf || "2026-10-01",
					yBuilt: urlYear || void 0,
					uCount: urlUnits || void 0
				});
			} else try {
				const savedAddr = sessionStorage.getItem(SESSION_KEYS.LOOKUP_ADDRESS);
				const savedYear = sessionStorage.getItem(SESSION_KEYS.LOOKUP_YEAR);
				const savedUnits = sessionStorage.getItem(SESSION_KEYS.LOOKUP_UNITS);
				const savedResults = sessionStorage.getItem(SESSION_KEYS.LOOKUP_RESULTS);
				const savedStack = sessionStorage.getItem(SESSION_KEYS.LOOKUP_STACK);
				if (savedAddr) setAddress(savedAddr);
				if (savedYear) setYearBuilt(savedYear);
				if (savedUnits) setUnits(savedUnits);
				if (savedResults) {
					const parsed = JSON.parse(savedResults);
					if (Array.isArray(parsed) && parsed.length > 0) {
						setEvaluatedRules(parsed);
						setSearched(true);
					}
				}
				if (savedStack) {
					const parsedStack = JSON.parse(savedStack);
					if (Array.isArray(parsedStack) && parsedStack.length > 0) setJurisdictionStack(parsedStack);
				}
			} catch {}
			if (sourceParam) openSourceDrawer(sourceParam);
		}
	}, []);
	const handlePropertySelect = (val) => {
		setAddress(val);
		const trimmed = val.trim().toLowerCase();
		const found = sampleProperties.find((p) => `${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}`.toLowerCase() === trimmed || p.street_address.toLowerCase() === trimmed || p.address_id.toLowerCase() === trimmed);
		if (found) {
			if (found.year_built) setYearBuilt(String(found.year_built));
			if (found.units) setUnits(String(found.units));
		}
	};
	const handleQuickSample = (sampleAddr, defaultYear, defaultUnits) => {
		setAddress(sampleAddr);
		if (defaultYear) setYearBuilt(defaultYear);
		if (defaultUnits) setUnits(defaultUnits);
		performLookup({
			addressStr: sampleAddr,
			asOfDate: format(date, "yyyy-MM-dd"),
			yBuilt: defaultYear || yearBuilt,
			uCount: defaultUnits || units
		});
	};
	const performLookup = async (params) => {
		const raw = params.addressStr.trim();
		if (!raw) return;
		setLoading(true);
		setSearched(true);
		try {
			let street = raw;
			let city = "Berkeley";
			let state = "CA";
			let zip = "94704";
			let propertyId = void 0;
			const trimmed = raw.toLowerCase();
			const found = sampleProperties.find((p) => `${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}`.toLowerCase() === trimmed || p.street_address.toLowerCase() === trimmed || p.address_id.toLowerCase() === trimmed);
			if (found) {
				street = found.street_address;
				city = found.postal_city;
				state = found.state;
				zip = found.zip;
				propertyId = found.address_id;
				if (!params.yBuilt && found.year_built) setYearBuilt(String(found.year_built));
				if (!params.uCount && found.units) setUnits(String(found.units));
			} else {
				const parts = raw.split(",").map((p) => p.trim());
				street = parts[0] || raw;
				if (parts.length >= 2) city = parts[1];
				if (parts.length >= 3) {
					const stateZip = parts[2].trim().split(/\s+/);
					if (stateZip[0]) state = stateZip[0].toUpperCase();
					if (stateZip[1]) zip = stateZip[1];
				}
				const cLow = city.toLowerCase();
				if ([
					"newark",
					"jersey city",
					"hoboken"
				].includes(cLow)) state = "NJ";
				else if ([
					"boston",
					"cambridge",
					"somerville",
					"allston",
					"brighton",
					"dorchester",
					"roxbury"
				].includes(cLow)) state = "MA";
				else if ([
					"berkeley",
					"san francisco",
					"los angeles",
					"san diego",
					"santa ana",
					"oakland"
				].includes(cLow)) state = "CA";
				const rawLow = raw.toLowerCase();
				if (rawLow.includes("newark") || rawLow.includes("jersey city") || rawLow.includes("hoboken") || rawLow.includes(" nj")) {
					state = "NJ";
					if (!city || city === "Berkeley") city = rawLow.includes("hoboken") ? "Hoboken" : rawLow.includes("jersey city") ? "Jersey City" : "Newark";
				} else if (rawLow.includes("boston") || rawLow.includes("cambridge") || rawLow.includes("somerville") || rawLow.includes(" ma")) {
					state = "MA";
					if (!city || city === "Berkeley") city = rawLow.includes("cambridge") ? "Cambridge" : rawLow.includes("somerville") ? "Somerville" : "Boston";
				}
			}
			const res = await lookupAddress({
				street,
				city,
				state,
				zip,
				property_id: propertyId,
				year_built: params.yBuilt ? parseInt(params.yBuilt, 10) : void 0,
				units: params.uCount ? parseInt(params.uCount, 10) : void 0,
				as_of: params.asOfDate
			});
			if (res && res.results) {
				setEvaluatedRules(res.results);
				let stackItems = [];
				if (res.stack && res.stack.length > 0) {
					stackItems = res.stack.map((s) => ({
						name: s.name,
						level: s.level
					}));
					setJurisdictionStack(stackItems);
				}
				if (typeof window !== "undefined") try {
					sessionStorage.setItem(SESSION_KEYS.LOOKUP_ADDRESS, params.addressStr);
					if (params.yBuilt) sessionStorage.setItem(SESSION_KEYS.LOOKUP_YEAR, params.yBuilt);
					if (params.uCount) sessionStorage.setItem(SESSION_KEYS.LOOKUP_UNITS, params.uCount);
					sessionStorage.setItem(SESSION_KEYS.LOOKUP_RESULTS, JSON.stringify(res.results));
					if (stackItems.length > 0) sessionStorage.setItem(SESSION_KEYS.LOOKUP_STACK, JSON.stringify(stackItems));
				} catch {}
			}
		} catch (err) {
			console.warn("Backend lookup query error:", err);
		} finally {
			setLoading(false);
		}
	};
	const handleSearchSubmit = (event) => {
		if (event) event.preventDefault();
		if (!address.trim()) return;
		performLookup({
			addressStr: address,
			asOfDate: format(date, "yyyy-MM-dd"),
			yBuilt: yearBuilt,
			uCount: units
		});
	};
	const openSourceDrawer = async (ruleId) => {
		setActiveRuleId(ruleId);
		setDrawerOpen(true);
		setSourceLoading(true);
		setSourceError(null);
		try {
			const src = await fetchRuleSource(ruleId);
			setSourceData(src);
			setTimeout(() => {
				document.getElementById("quote")?.scrollIntoView({
					behavior: "smooth",
					block: "center"
				});
			}, 150);
		} catch (err) {
			setSourceError(err.message || "Failed to fetch source document citation slice");
		} finally {
			setSourceLoading(false);
		}
	};
	const handleExplainWithAI = async (ruleId) => {
		if (visibleExplanationIds.includes(ruleId)) {
			const nextVisible = visibleExplanationIds.filter((id) => id !== ruleId);
			setVisibleExplanationIds(nextVisible);
			if (typeof window !== "undefined") try {
				sessionStorage.setItem(SESSION_KEYS.VISIBLE_EXPLANATION_IDS, JSON.stringify(nextVisible));
			} catch {}
			return;
		}
		if (aiExplanations[ruleId]) {
			const nextVisible = [...visibleExplanationIds, ruleId];
			setVisibleExplanationIds(nextVisible);
			if (typeof window !== "undefined") try {
				sessionStorage.setItem(SESSION_KEYS.VISIBLE_EXPLANATION_IDS, JSON.stringify(nextVisible));
			} catch {}
			return;
		}
		setAiExplainingRuleId(ruleId);
		try {
			const expl = await explainRuleWithAI(ruleId, language, {
				address,
				year_built: yearBuilt,
				units
			});
			const updatedCache = {
				...aiExplanations,
				[ruleId]: expl
			};
			setAiExplanations(updatedCache);
			const nextVisible = [...visibleExplanationIds, ruleId];
			setVisibleExplanationIds(nextVisible);
			if (typeof window !== "undefined") try {
				sessionStorage.setItem(SESSION_KEYS.EXPLANATIONS_CACHE, JSON.stringify(updatedCache));
				sessionStorage.setItem(SESSION_KEYS.VISIBLE_EXPLANATION_IDS, JSON.stringify(nextVisible));
			} catch {}
		} catch (err) {
			console.warn("AI explanation failed:", err);
		} finally {
			setAiExplainingRuleId(null);
		}
	};
	const appliesCount = evaluatedRules.filter((r) => r.result === "applies").length;
	const unknownCount = evaluatedRules.filter((r) => r.result === "unknown").length;
	const supersededCount = evaluatedRules.filter((r) => r.result === "superseded").length;
	const upcomingCount = evaluatedRules.filter((r) => r.result === "not_yet_effective" || r.result === "pending").length;
	const conflictCount = evaluatedRules.filter((r) => r.conflict_flag).length;
	const filteredRules = evaluatedRules.filter((rule) => {
		if (statusFilter === "conflicts") {
			if (!rule.conflict_flag) return false;
		} else if (statusFilter === "pending") {
			if (rule.result !== "not_yet_effective" && rule.result !== "pending") return false;
		} else if (statusFilter !== "all" && rule.result !== statusFilter) return false;
		if (activeCategoryFilter !== "all" && (rule.category || "rent_increase_limits") !== activeCategoryFilter) return false;
		return true;
	});
	const categoriesWithRules = OFFICIAL_CATEGORIES.filter((cat) => evaluatedRules.some((r) => (r.category || "rent_increase_limits") === cat.key));
	const categoriesStandard = OFFICIAL_CATEGORIES.filter((cat) => !evaluatedRules.some((r) => (r.category || "rent_increase_limits") === cat.key));
	const rentRule = evaluatedRules.find((r) => (r.category || "").includes("rent") && r.result === "applies");
	const evictionRule = evaluatedRules.find((r) => (r.category || "").includes("eviction") && r.result === "applies");
	const depositRule = evaluatedRules.find((r) => (r.category || "").includes("deposit") && r.result === "applies");
	const algoRule = evaluatedRules.find((r) => (r.category || "").includes("algo") && (r.result === "applies" || r.result === "not_yet_effective" || r.result === "pending"));
	const currentState = jurisdictionStack.find((j) => j.level === "state")?.state || (address.includes("NJ") || address.toLowerCase().includes("newark") || address.toLowerCase().includes("jersey city") || address.toLowerCase().includes("hoboken") ? "NJ" : address.includes("MA") || address.toLowerCase().includes("boston") || address.toLowerCase().includes("cambridge") || address.toLowerCase().includes("somerville") ? "MA" : "CA");
	const rentPillar = rentRule ? {
		badge: t("Local Cap Applies", "Aplica Tope Local"),
		title: rentRule.key_value || "5.0% + CPI Max",
		desc: rentRule.requirement || rentRule.explanation,
		citation: rentRule.citation || "Local Municipal Code"
	} : currentState === "CA" ? {
		badge: t("State Baseline (AB 1482)", "Límite Estatal"),
		title: t("5% + CPI (Max 10%)", "5% + IPC (Máx 10%)"),
		desc: t("California Tenant Protection Act (AB 1482) caps annual rent increases at 5% plus local CPI for non-exempt rental units older than 15 years.", "La ley estatal AB 1482 limita incrementos anuales al 5% más IPC local."),
		citation: "Cal. Civ. Code § 1947.12"
	} : currentState === "NJ" ? {
		badge: t("Local Control Only", "Control Municipal"),
		title: t("Municipal Board Only", "Solo Junta Municipal"),
		desc: t("New Jersey maintains no statewide statutory percentage rent cap; rent leveling is established through municipal ordinances.", "Nueva Jersey no tiene tope porcentual estatal; se regula mediante juntas locales."),
		citation: "N.J.S.A. 2A:18-61.1"
	} : {
		badge: t("Market Rate", "Tasa de Mercado"),
		title: t("No Statewide Cap", "Sin Tope Estatal"),
		desc: t("Massachusetts statutes do not establish a statewide rent control ceiling; rental amounts are determined by lease terms.", "Massachusetts no establece un tope estatal de control de alquiler."),
		citation: "Mass. Gen. Laws ch. 186"
	};
	const evictionPillar = evictionRule ? {
		badge: t("Protected", "Protegido"),
		title: t("Just Cause Required", "Causa Justa Exigida"),
		desc: evictionRule.requirement || evictionRule.explanation,
		citation: evictionRule.citation || "Local Eviction Ordinance"
	} : currentState === "CA" ? {
		badge: t("State Protected", "Protegido por Estado"),
		title: t("Just Cause Required (AB 1482)", "Causa Justa Exigida (AB 1482)"),
		desc: t("Tenants occupying residential property for 12+ months cannot be evicted without statutory at-fault or no-fault just cause.", "Inquilinos con más de 12 meses requieren causa justa para ser desalojados."),
		citation: "Cal. Civ. Code § 1946.2"
	} : currentState === "NJ" ? {
		badge: t("Protected", "Protegido"),
		title: t("Anti-Eviction Act", "Ley Anti-Desalojo"),
		desc: t("New Jersey Anti-Eviction Act requires landlords to prove one of 18 statutory grounds for eviction in Superior Court.", "Exige demostrar una de las 18 causales legales para desalojo ante tribunal."),
		citation: "N.J.S.A. 2A:18-61.1"
	} : {
		badge: t("Due Process", "Debido Proceso"),
		title: t("Summary Process Required", "Proceso Sumario"),
		desc: t("Evictions require legal written notice to quit followed by judicial summary process proceedings in Housing Court.", "Requiere notificación legal previa y proceso sumario ante tribunal de vivienda."),
		citation: "M.G.L. c. 239, § 1"
	};
	const depositPillar = depositRule ? {
		badge: depositRule.key_value || "1 Month Rent",
		title: depositRule.key_value || "1 Month Max",
		desc: depositRule.requirement || depositRule.explanation,
		citation: depositRule.citation || "Local Security Deposit Code"
	} : currentState === "CA" ? {
		badge: t("1 Month Max", "Máx 1 Mes"),
		title: t("1 Month Rent (AB 12)", "1 Mes de Renta (AB 12)"),
		desc: t("California AB 12 caps security deposits at one month rent for furnished and unfurnished units, with small landlord exception.", "Limita depósitos de garantía a un mes de alquiler con excepción para pequeños propietarios."),
		citation: "Cal. Civ. Code § 1950.5"
	} : currentState === "NJ" ? {
		badge: t("1.5 Months Max", "Máx 1.5 Meses"),
		title: t("1.5 Months Rent Max", "Máx 1.5 Meses de Renta"),
		desc: t("New Jersey limits security deposits to 1.5 months rent, required to be deposited in an interest-bearing escrow account.", "Limita depósitos a 1.5 meses de alquiler depositados en cuenta con intereses."),
		citation: "N.J.S.A. 46:8-21.2"
	} : {
		badge: t("1 Month Max", "Máx 1 Mes"),
		title: t("1 Month Rent Max", "Máx 1 Mes de Renta"),
		desc: t("Massachusetts caps security deposits strictly at one month rent, held in a separate interest-bearing bank account.", "Tope estricto de un mes de alquiler en cuenta bancaria separada con intereses."),
		citation: "M.G.L. c. 186, § 15B"
	};
	const pricingPillar = algoRule ? {
		badge: algoRule.result === "applies" ? t("Prohibited", "Prohibido") : algoRule.result === "not_yet_effective" ? t("Upcoming Law", "Próxima Ley") : t("Pending Bill", "Proyecto de Ley"),
		title: algoRule.key_value || (algoRule.result === "applies" ? "Banned (AB 325)" : "Pending Review"),
		desc: algoRule.requirement || algoRule.explanation,
		citation: algoRule.citation || "Algorithmic Pricing Law"
	} : currentState === "CA" ? {
		badge: t("Prohibited", "Prohibido"),
		title: t("Prohibited (AB 325)", "Prohibido (AB 325)"),
		desc: t("California AB 325 / SB 763 prohibits common price-setting algorithms that coordinate rental rates among landlords.", "Prohíbe algoritmos compartidos de fijación y coordinación de precios."),
		citation: "Cal. Civ. Code § 16700 (AB 325)"
	} : currentState === "NJ" ? {
		badge: t("Municipal Bans", "Prohibición Local"),
		title: t("Local Bans (Hoboken/JC)", "Prohibido (Hoboken/JC)"),
		desc: t("Municipal bans in Hoboken (ch. 158) and Jersey City (ch. 260) prohibit revenue management pricing coordination.", "Ordenanzas en Hoboken y Jersey City prohíben el uso de software de precios compartidos."),
		citation: "Hoboken ch. 158 / Jersey City ch. 260"
	} : {
		badge: t("Pending Review", "En Trámite"),
		title: t("Pending Bills (S.2983)", "Proyectos S.2983"),
		desc: t("Massachusetts algorithmic pricing bills S.2983 and H.5222 remain pending before legislative committees.", "Proyectos de ley contra fijación algorítmica de alquileres en trámite legislativo."),
		citation: "Mass. General Court S.2983"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border/70 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-foreground",
					children: t("Address Lookup & Coverage Navigator", "Consulta de Dirección y Cobertura")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed",
					children: t("Enter any residential apartment address to discover which municipal, county, and state rental rules apply today.", "Ingrese una dirección residencial para ver qué normas municipales y estatales aplican hoy.")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setCopilotOpen(true),
					className: "inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-all shadow-xs self-start md:self-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-purple-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Ask Lexi (AI Specialist)", "Consultar a Lexi (IA)") })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border border-border/80 bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 p-1 rounded-xl bg-secondary/60 border border-border/60 text-xs font-semibold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setUserRole("renter");
								setViewMode("plain");
							},
							className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${userRole === "renter" ? "bg-primary text-primary-foreground shadow-2xs font-bold" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Tenant / Renter", "Inquilino") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setUserRole("owner");
								setShowPropertyContext(true);
								setViewMode("plain");
							},
							className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${userRole === "owner" ? "bg-primary text-primary-foreground shadow-2xs font-bold" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Housing Provider / Owner", "Propietario") })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setUserRole("advocate");
								setShowPropertyContext(true);
								setViewMode("legal");
							},
							className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${userRole === "advocate" ? "bg-primary text-primary-foreground shadow-2xs font-bold" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gavel, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Legal Aid Advocate / Attorney", "Abogado / Defensor") })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: userRole === "renter" ? t("Discover your rent cap, eviction defense rights, and security deposit maximum.", "Conozca topes de aumento de alquiler, defensas contra desalojo y depósito máximo.") : userRole === "owner" ? t("Verify Costa-Hawkins exemptions, 15-year building age windows, and compliance notices.", "Verifique exenciones Costa-Hawkins, ventana de 15 años y notificaciones de ley.") : t("Inspect statutory predicates, Kleene 3-valued truth values, and verbatim corpus citations.", "Inspeccione predicados legales, lógica ternaria de Kleene y citas textuales.")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSearchSubmit,
				className: "mt-3 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-sm space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "property-address",
									required: true,
									list: "sample-addresses-list",
									value: address,
									onChange: (event) => handlePropertySelect(event.target.value),
									placeholder: userRole === "renter" ? t("Enter your apartment address (e.g. 2150 Shattuck Ave, Berkeley, CA 94704)...", "Ingrese su dirección (ej. 2150 Shattuck Ave, Berkeley, CA 94704)...") : t("Enter residential property address (e.g. 2150 Shattuck Ave, Berkeley, CA 94704)...", "Ingrese dirección del inmueble (ej. 2150 Shattuck Ave, Berkeley, CA 94704)..."),
									className: "h-12 w-full rounded-xl pl-10 pr-10 text-sm font-normal border border-input bg-secondary/30 focus:bg-card focus:ring-2 focus:ring-primary focus:outline-none transition-all"
								}),
								address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setAddress(""),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
									id: "sample-addresses-list",
									children: sampleProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: `${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}`,
										children: [
											p.use_description || p.postal_city,
											" (Built: ",
											p.year_built || "?",
											")"
										]
									}, p.address_id))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: loading || !address.trim(),
							className: "h-12 px-6 rounded-xl shadow-xs font-bold gap-2 text-sm shrink-0",
							children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Evaluate Apartment", "Evaluar Vivienda") })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 pt-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] font-semibold text-muted-foreground flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Sample Addresses:", "Direcciones de Ejemplo:") })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleQuickSample("2150 Shattuck Ave, Berkeley, CA 94704", "1972", "18"),
								className: "px-2.5 py-1 rounded-lg text-xs bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-all border border-border/60",
								children: "2150 Shattuck Ave (Berkeley Multifamily)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleQuickSample("1918 Oregon St, Berkeley, CA 94703", "1925", "2"),
								className: "px-2.5 py-1 rounded-lg text-xs bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-all border border-border/60",
								children: "1918 Oregon St (Berkeley Duplex)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleQuickSample("744 Broad St, Newark, NJ 07102", "1930", "100"),
								className: "px-2.5 py-1 rounded-lg text-xs bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-all border border-border/60",
								children: "744 Broad St (Newark, NJ Statewide)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => handleQuickSample("100 Tremont St, Boston, MA 02108", "1910", "50"),
								className: "px-2.5 py-1 rounded-lg text-xs bg-secondary/60 hover:bg-primary/10 hover:text-primary transition-all border border-border/60",
								children: "100 Tremont St (Boston, MA Market)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2 border-t border-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setShowPropertyContext(!showPropertyContext),
								className: "inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-all py-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: showPropertyContext ? t("Hide Property Facts & Exemption Settings", "Ocultar Datos del Inmueble y Exenciones") : t("Customize Property Facts & Exemption Settings (Optional)", "Personalizar Datos del Inmueble y Exenciones (Opcional)") }),
									showPropertyContext ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })
								]
							}),
							!showPropertyContext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mt-0.5 ml-5",
								children: t("Year built · Unit count · Tenancy duration · Query date — affects Costa-Hawkins & AB 1482 exemptions", "Año de construcción · Unidades · Duración · Fecha — afecta exenciones Costa-Hawkins y AB 1482")
							}),
							showPropertyContext && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 p-4 rounded-xl border border-border/80 bg-secondary/20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in duration-200",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "year-built",
											className: "block text-[11px] font-bold uppercase tracking-wider text-foreground",
											children: t("Building Year Built", "Año de Construcción")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1.5 flex h-10 items-center gap-2 rounded-lg border border-input bg-card px-3 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "year-built",
												value: yearBuilt,
												onChange: (e) => setYearBuilt(e.target.value),
												className: "w-full bg-transparent font-mono text-xs outline-none",
												placeholder: "e.g. 1972"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] text-muted-foreground",
											children: t("Units built < 15 years ago are exempt from AB 1482 caps.", "Construcciones de < 15 años están exentas del tope AB 1482.")
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "units-count",
											className: "block text-[11px] font-bold uppercase tracking-wider text-foreground",
											children: t("Total Units", "Número de Unidades")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-1.5 flex h-10 items-center rounded-lg border border-input bg-card px-3 text-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "units-count",
												value: units,
												onChange: (e) => setUnits(e.target.value),
												className: "w-full bg-transparent font-mono text-xs outline-none",
												placeholder: "e.g. 18"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] text-muted-foreground",
											children: t("Single-family homes have distinct Costa-Hawkins rules.", "Viviendas unifamiliares tienen reglas Costa-Hawkins.")
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "tenancy-duration",
											className: "block text-[11px] font-bold uppercase tracking-wider text-foreground",
											children: t("Tenancy Duration", "Antigüedad del Contrato")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "tenancy-duration",
											value: tenancyDuration,
											onChange: (e) => setTenancyDuration(e.target.value),
											className: "mt-1.5 h-10 w-full rounded-lg border border-input bg-card px-2.5 text-xs outline-none focus:ring-1 focus:ring-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "12_or_more",
												children: t("12+ Continuous Months", "12+ Meses Continuos")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "less_than_12",
												children: t("Less than 12 Months", "Menos de 12 Meses")
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] text-muted-foreground",
											children: t("Just Cause requires 12 months continuous occupancy.", "Causa Justa requiere 12 meses de ocupación.")
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-[11px] font-bold uppercase tracking-wider text-foreground",
											children: t("Query Date (As-Of)", "Fecha de Consulta")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
											open: calendarOpen,
											onOpenChange: setCalendarOpen,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													type: "button",
													variant: "outline",
													className: "mt-1.5 h-10 w-full justify-between rounded-lg px-2.5 font-normal bg-card border-input text-foreground text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs",
														children: format(date, "yyyy-MM-dd")
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5 text-muted-foreground" })]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
												className: "w-auto rounded-xl border border-border p-0 shadow-lg",
												align: "start",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
													mode: "single",
													selected: date,
													defaultMonth: date,
													onSelect: (value) => {
														if (value) {
															setDate(value);
															setCalendarOpen(false);
														}
													}
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[10px] text-muted-foreground",
											children: t("Test historical dates or pending legislative shifts.", "Pruebe fechas pasadas o leyes en trámite.")
										})
									] })
								]
							})
						]
					})
				]
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 rounded-3xl border border-border/80 bg-card/60 p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-6 text-primary absolute" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base sm:text-lg font-bold text-foreground",
						children: t("Evaluating Housing Laws & Precedence...", "Evaluando Leyes y Precedencia...")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground max-w-md mx-auto",
						children: t(`Resolving legal jurisdiction stack, coverage criteria, and statutory citations for ${address || "address"}...`, `Resolviendo jurisdicciones y reglas legales aplicables para ${address || "dirección"}...`)
					})]
				})]
			}),
			!searched && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-3xl border border-border/80 bg-card/60 p-8 sm:p-10 text-center shadow-xs space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 max-w-2xl mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl sm:text-2xl font-bold font-display text-foreground",
							children: t("Address-Level Regulatory Compliance Engine", "Motor de Cumplimiento Normativo por Dirección")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground leading-relaxed",
							children: t("Enter any residential apartment address in the form above and select an as-of date. Our deterministic engine maps the address to its state, county, and municipal jurisdiction stack, resolves building age and unit thresholds, and evaluates applicable rent increase caps, eviction protections, and security deposit regulations.", "Ingrese una dirección en el formulario y seleccione la fecha de consulta. El motor evaluará el alcance de leyes municipales, del condado y del estado con citas textuales verificadas.")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto pt-4 border-t border-border/60 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-secondary/30 p-4 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 text-primary" }), t("Multi-Tier Hierarchy", "Jerarquía Multi-Nivel")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: t("Disambiguates postal mailing names from legal incorporated municipal boundaries.", "Distingue ciudades postales de límites municipales legales.")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-secondary/30 p-4 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-3.5 text-primary" }), t("Temporal Validity", "Validez Temporal")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: t("Calculates effective dates and handles pending or future statutory shifts with time-travel query dates.", "Calcula fechas de vigencia y cambios legislativos según la fecha de consulta.")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-secondary/30 p-4 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500" }), t("Kleene 3-Valued Logic", "Lógica de Kleene")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: t("Returns unknown for missing building assessor facts rather than guessing compliance.", "Devuelve \"desconocido\" si faltan datos del inmueble en lugar de adivinar.")
								})]
							})
						]
					})
				]
			}),
			searched && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 text-sm font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: t("Jurisdiction Stack:", "Jurisdicciones:")
									}),
									jurisdictionStack.map((j, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `px-3 py-1 rounded-xl text-xs font-bold ${idx === jurisdictionStack.length - 1 ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-foreground"}`,
											children: [
												j.name,
												" (",
												j.level,
												")"
											]
										}), idx < jurisdictionStack.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 text-muted-foreground" })]
									}, j.name))
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									appliesCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStatusFilter(statusFilter === "applies" ? "all" : "applies"),
										className: `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${statusFilter === "applies" ? "bg-emerald-600 text-white border-emerald-700 shadow-xs" : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											appliesCount,
											" ",
											t("Applies", "Aplican")
										] })]
									}),
									unknownCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStatusFilter(statusFilter === "unknown" ? "all" : "unknown"),
										title: t("Rules where building year or unit count is missing — supply property facts above to resolve them.", "Reglas donde faltan datos del inmueble."),
										className: `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${statusFilter === "unknown" ? "bg-amber-600 text-white border-amber-700 shadow-xs" : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 hover:bg-amber-500/20"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											unknownCount,
											" ",
											t("More Facts Needed", "Faltan datos")
										] })]
									}),
									supersededCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStatusFilter(statusFilter === "superseded" ? "all" : "superseded"),
										className: `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${statusFilter === "superseded" ? "bg-slate-700 text-white border-slate-800 shadow-xs" : "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20 hover:bg-slate-500/20"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											supersededCount,
											" ",
											t("Superseded by Local Law", "Sustituidas")
										] })]
									}),
									upcomingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStatusFilter(statusFilter === "pending" ? "all" : "pending"),
										className: `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${statusFilter === "pending" ? "bg-blue-600 text-white border-blue-700 shadow-xs" : "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20 hover:bg-blue-500/20"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											upcomingCount,
											" ",
											t("Pending / Future Law", "Leyes Pendientes")
										] })]
									}),
									conflictCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setStatusFilter(statusFilter === "conflicts" ? "all" : "conflicts"),
										className: `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${statusFilter === "conflicts" ? "bg-purple-600 text-white border-purple-700 shadow-xs" : "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20 hover:bg-purple-500/20"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											conflictCount,
											" ",
											t("Conflict / Review Flagged", "Conflictos Flag")
										] })]
									}),
									statusFilter !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setStatusFilter("all"),
										className: "text-xs font-semibold text-muted-foreground hover:text-foreground underline px-2",
										children: t("Show All", "Mostrar Todos")
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 flex-1 min-w-[280px] max-w-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-4 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										id: "category-filter-select",
										value: activeCategoryFilter,
										onChange: (e) => setActiveCategoryFilter(e.target.value),
										className: "w-full h-11 rounded-xl border border-input bg-secondary/50 px-3.5 pr-8 text-xs font-semibold shadow-2xs outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: "all",
											children: [
												t("All Housing Law Categories", "Todas las Categorías"),
												" (",
												evaluatedRules.length,
												" ",
												t("rules", "reglas"),
												")"
											]
										}), OFFICIAL_CATEGORIES.map((cat) => {
											const count = evaluatedRules.filter((r) => (r.category || "rent_increase_limits") === cat.key).length;
											if (count === 0) return null;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: cat.key,
												children: [
													es ? cat.es : cat.en,
													" (",
													count,
													" ",
													t("rules", "reglas"),
													")"
												]
											}, cat.key);
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 p-1 rounded-xl bg-secondary/80 border border-border shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setViewMode("plain"),
									className: `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === "plain" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Plain Language", "Resumen Claro") })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setViewMode("legal"),
									className: `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === "legal" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Legal Audit Mode", "Auditoría Legal") })]
								})]
							})]
						})]
					}),
					!loading && searched && conflictCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 sm:p-5 flex items-start gap-3 shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 flex-wrap",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-amber-900 dark:text-amber-200 text-sm",
									children: t("Human Legal Review Advisory", "Aviso de Revisión Legal Humana")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300",
									children: [
										conflictCount,
										" ",
										t("Preemption Conflicts Detected", "Conflictos de Preempción Detectados")
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: t("Municipal ordinance provisions in this jurisdiction interact with or override baseline state statutes. These rules have been flagged for human review below.", "Las ordenanzas municipales en esta jurisdicción interactúan o anulan estatutos estatales de base. Estas reglas han sido marcadas para revisión humana.")
							})]
						})]
					}),
					!loading && searched && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 via-card to-card p-5 sm:p-6 shadow-xs space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base sm:text-lg font-bold text-foreground",
									children: t("Executive Summary for this Address", "Resumen Rápido para esta Vivienda")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: t("Core rules and tenant protections derived from local ordinances & state codes.", "Principales reglas y protecciones vigentes derivadas de ordenanzas locales y leyes estatales.")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2 self-start sm:self-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										appliesCount,
										" ",
										t("Rules Apply", "Reglas Aplican")
									] })]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/80 border-l-4 border-l-primary bg-card p-5 sm:p-6 shadow-xs flex flex-col gap-3 min-h-[220px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4 text-primary" }), t("Rent Increase Cap", "Tope de Alquiler")]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
												children: rentPillar.badge
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-black text-foreground",
											children: rentPillar.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed flex-1",
											children: rentPillar.desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-3 border-t border-border/40 text-xs text-primary font-mono font-semibold",
											children: rentPillar.citation
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/80 border-l-4 border-l-emerald-500 bg-card p-5 sm:p-6 shadow-xs flex flex-col gap-3 min-h-[220px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-emerald-600 dark:text-emerald-400" }), t("Eviction Protection", "Protección Desalojo")]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
												children: evictionPillar.badge
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-black text-foreground",
											children: evictionPillar.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed flex-1",
											children: evictionPillar.desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-3 border-t border-border/40 text-xs text-primary font-mono font-semibold",
											children: evictionPillar.citation
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/80 border-l-4 border-l-blue-500 bg-card p-5 sm:p-6 shadow-xs flex flex-col gap-3 min-h-[220px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4 text-blue-600 dark:text-blue-400" }), t("Security Deposit", "Fianza / Depósito")]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400",
												children: depositPillar.badge
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-black text-foreground",
											children: depositPillar.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed flex-1",
											children: depositPillar.desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-3 border-t border-border/40 text-xs text-primary font-mono font-semibold",
											children: depositPillar.citation
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-border/80 border-l-4 border-l-purple-500 bg-card p-5 sm:p-6 shadow-xs flex flex-col gap-3 min-h-[220px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-purple-600 dark:text-purple-400" }), t("Price-Fixing Software", "Software de Precios")]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400",
												children: pricingPillar.badge
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-black text-foreground",
											children: pricingPillar.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed flex-1",
											children: pricingPillar.desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-3 border-t border-border/40 text-xs text-primary font-mono font-semibold",
											children: pricingPillar.citation
										})
									]
								})
							]
						})]
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 md:grid-cols-2",
						children: [
							1,
							2,
							3,
							4
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-6 shadow-xs animate-pulse space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-1/3 bg-secondary rounded" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-2/3 bg-secondary/60 rounded" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 bg-secondary/40 rounded-xl" })
							]
						}, i))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							categoriesWithRules.map((category) => {
								const Icon = category.icon;
								const rulesInCat = filteredRules.filter((r) => (r.category || "rent_increase_limits") === category.key);
								if (rulesInCat.length === 0 && activeCategoryFilter !== "all") return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-lg font-bold text-foreground",
											children: es ? category.es : category.en
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: es ? category.descriptionEs : category.descriptionEn
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-4",
										children: rulesInCat.map((rule) => {
											const statusConfig = STATUS_MAP[rule.result in STATUS_MAP ? rule.result : "unknown"];
											const isTraceExpanded = expandedTraceRuleId === rule.team_rule_id;
											const isExplanationVisible = visibleExplanationIds.includes(rule.team_rule_id);
											const hasCachedExplanation = Boolean(aiExplanations[rule.team_rule_id]);
											const aiExplanation = aiExplanations[rule.team_rule_id];
											const isExplainingThis = aiExplainingRuleId === rule.team_rule_id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs hover:shadow-md transition-all border-l-4 ${statusConfig.cardBorderLeft}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-border/60",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-base sm:text-lg font-bold text-foreground font-display leading-snug",
																children: rule.title || rule.team_rule_id
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-semibold text-foreground/90",
																		children: rule.citation
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-mono text-[11px] text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded",
																		children: rule.team_rule_id
																	}),
																	rule.retrieval_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "text-[11px] text-muted-foreground",
																		children: [
																			t("Retrieved", "Recuperado"),
																			": ",
																			rule.retrieval_date.slice(0, 10)
																		]
																	})] })
																]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex flex-wrap items-center gap-2 shrink-0",
															children: [
																rule.conflict_flag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3" }), t("Conflict Flagged", "Conflicto")]
																}),
																rule.review_required && !rule.conflict_flag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-3" }), t("Review Required", "Revisión")]
																}),
																rule.confidence !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }),
																		Math.round(rule.confidence * 100),
																		"% ",
																		t("Confidence", "Confianza")
																	]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, {
																	status: rule.result,
																	es
																})
															]
														})]
													}),
													rule.key_value && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-3.5 flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/20 px-3.5 py-2 text-xs sm:text-sm font-semibold text-primary",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("Key Limit:", "Tope Clave:") }),
															" ",
															rule.key_value
														] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mt-3 rounded-xl bg-secondary/30 p-4 text-sm sm:text-base leading-relaxed text-foreground font-normal",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: rule.requirement || rule.explanation })
													}),
													rule.exemptions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-2.5 flex items-start gap-2 rounded-xl bg-secondary/60 border border-border/80 px-3.5 py-2.5 text-xs text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-3.5 shrink-0 text-muted-foreground mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-semibold text-foreground",
															children: [t("Exemptions & Exclusions:", "Exenciones Legales:"), " "]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rule.exemptions })] })]
													}),
													rule.conflict_flag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-3 flex items-start gap-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3.5 text-xs text-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-amber-800 dark:text-amber-200 block text-xs",
															children: t("Layered Preemption / Stricter Municipal Rule", "Preempción Jurisdiccional")
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground mt-0.5 block leading-normal",
															children: t("Stricter municipal ordinance overrides baseline state law under California home rule authority.", "La ordenanza municipal más estricta prevalece sobre la norma estatal general.")
														})] })]
													}),
													rule.result === "unknown" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-3.5" }), t("Building Facts Needed for Verdict", "Faltan datos del inmueble")]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-muted-foreground leading-normal",
															children: t("Assessor records do not confirm exact unit count or building completion date. Input units or year built in the search box above to determine applicability.", "Especifique las unidades o el año de construcción en el formulario superior para resolver la regla.")
														})]
													}),
													isExplanationVisible && aiExplanation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mt-3.5 rounded-xl border border-purple-500/30 bg-purple-500/5 p-3.5 space-y-2 text-xs",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-start justify-between gap-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-start gap-2.5 text-foreground leading-relaxed",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-purple-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-purple-700 dark:text-purple-300 mr-1.5",
																	children: t("Lexi Legal Insight:", "Análisis de Lexi:")
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-foreground",
																	children: aiExplanation.concise_explanation || aiExplanation.plain_summary
																})] })]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => setCopilotOpen(true),
																className: "text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline shrink-0 whitespace-nowrap ml-2",
																children: t("Ask Lexi →", "Preguntar a Lexi →")
															})]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex flex-wrap items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => openSourceDrawer(rule.team_rule_id),
																className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/80 px-3 py-1.5 font-medium text-xs text-foreground hover:bg-secondary hover:border-primary/50 transition-all shadow-2xs",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5 text-primary" }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rule.citation || "Statutory Code" }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 text-muted-foreground ml-0.5" })
																]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => handleExplainWithAI(rule.team_rule_id),
																disabled: isExplainingThis,
																className: "inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 font-bold text-xs text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-all",
																children: [isExplainingThis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-purple-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isExplainingThis ? t("Analyzing with Lexi...", "Analizando...") : isExplanationVisible ? t("Hide Lexi Guide", "Ocultar Guía Lexi") : hasCachedExplanation ? t("Show Lexi Guide", "Mostrar Guía Lexi") : t("Explain with Lexi", "Explicar con Lexi") })]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => setExpandedTraceRuleId(isTraceExpanded ? null : rule.team_rule_id),
															className: "inline-flex items-center gap-1 font-semibold text-muted-foreground hover:text-foreground transition-colors text-xs",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Coverage Trace & Audit", "Traza y Auditoría") }), isTraceExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5" })]
														})]
													}),
													isTraceExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-3 rounded-xl border border-border bg-secondary/30 p-4 text-xs space-y-3 font-mono",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between border-b border-border/50 pb-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-foreground block text-[11px] uppercase tracking-wider",
																	children: t("Coverage Decision Logic (3-Valued Logic)", "Lógica de Cobertura")
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[10px] text-muted-foreground",
																	children: ["ID: ", rule.team_rule_id]
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-xs font-sans text-muted-foreground bg-background/50 p-2.5 rounded-lg border border-border/40",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("Engine Note:", "Nota del Motor:") }),
																	" ",
																	rule.explanation
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between text-muted-foreground border-b border-border/50 pb-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	"Units: ",
																	units || "unknown",
																	" ≥ 2 (multi-family):"
																] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-emerald-600 dark:text-emerald-400",
																	children: units && parseInt(units, 10) >= 2 ? "TRUE" : "UNKNOWN"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between text-muted-foreground border-b border-border/50 pb-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	"Built: ",
																	yearBuilt || "unknown",
																	" > 15 years old (rolling window):"
																] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-emerald-600 dark:text-emerald-400",
																	children: yearBuilt && 2026 - parseInt(yearBuilt, 10) >= 15 ? "TRUE" : "UNKNOWN"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between text-muted-foreground",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
																	"Jurisdiction stack match (",
																	jurisdictionStack.map((s) => s.name).join(" > "),
																	"):"
																] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-bold text-emerald-600 dark:text-emerald-400",
																	children: "MATCH"
																})]
															})
														]
													})
												]
											}, rule.team_rule_id);
										})
									})]
								}, category.key);
							}),
							evaluatedRules.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border/80 bg-card p-6 text-center space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-bold text-foreground",
										children: t("Standard Statewide Baseline Applies", "Rige el Marco Legal Estatal")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed",
										children: t(`No local municipal rent stabilization or extra-statutory eviction restrictions are registered for this municipality in the current local ordinance corpus. Tenancies at this address are governed directly by ${currentState === "NJ" ? "New Jersey statewide tenancy statutes (N.J.S.A. 2A:18-61 Anti-Eviction Act & Security Deposit Law)" : currentState === "MA" ? "Massachusetts General Laws (M.G.L. c. 186 Landlord-Tenant & c. 239 Summary Process)" : "California statewide tenancy baseline (Civil Code §§ 1946.2 Just Cause & 1947.12 Rent Cap - AB 1482)"}.`, `No se registran ordenanzas locales adicionales en el corpus legal para este municipio. Aplica directamente el marco regulatorio del estado.`)
									})
								]
							}),
							categoriesStandard.length > 0 && activeCategoryFilter === "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl border border-border/70 bg-secondary/20 p-5 mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "size-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-sm text-foreground",
											children: t("Other Housing Categories Checked", "Otras Categorías Verificadas")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-muted-foreground leading-relaxed",
											children: t(`No special municipal restrictions found for ${categoriesStandard.map((c) => es ? c.shortEs : c.shortEn).join(", ")}. Standard statewide statutes apply with no local caps.`, `No se encontraron restricciones municipales adicionales para ${categoriesStandard.map((c) => es ? c.shortEs : c.shortEn).join(", ")}. Rigen las leyes estatales estándar.`)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 flex flex-wrap gap-1.5",
											children: categoriesStandard.map((c) => {
												const Icon = c.icon;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-secondary border border-border px-2 py-0.5 text-[10px] font-semibold text-muted-foreground",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }), es ? c.shortEs : c.shortEn]
												}, c.key);
											})
										})
									] })]
								})
							}),
							activeCategoryFilter === "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 mt-4 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-blue-500" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-bold text-sm text-foreground",
											children: t("Pending & Future Law Impact (T1–T6 Change Scenarios)", "Impacto de Leyes Pendientes — Escenarios T1–T6")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/changes",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												size: "sm",
												className: "ml-auto h-6 text-[10px] gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" }), t("Full Change Tracker", "Ver todos los cambios")]
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs",
									children: [
										{
											id: "T1",
											status: "effective",
											date: "2026-01-01",
											label: "CA AB 325 / SB 763",
											desc: "Algorithmic pricing ban — already in effect for this address.",
											color: "emerald"
										},
										{
											id: "T2",
											status: "effective",
											date: "2026-09-01",
											label: "Hoboken Ch. 158",
											desc: "Local algorithmic-pricing ban — applies within Hoboken city limits only.",
											color: "emerald"
										},
										{
											id: "T3",
											status: "not_yet_effective",
											date: "2027-01-01",
											label: "NJ FAIR Act c.43",
											desc: "Statewide NJ algorithmic pricing ban — not yet effective as of query date.",
											color: "blue"
										},
										{
											id: "T4",
											status: "pending",
											date: "Pending",
											label: "MA S.2983 / H.5222",
											desc: "MA algorithmic pricing bills remain in committee — not yet enacted.",
											color: "purple"
										},
										{
											id: "T5",
											status: "struck",
											date: "Struck 2026",
											label: "MA Initiative 25-21",
											desc: "Struck by SJC — has no legal effect.",
											color: "slate"
										},
										{
											id: "T6",
											status: "effective",
											date: "2026-11-01",
											label: "Cambridge Algorithmic Ord.",
											desc: "Cambridge municipal ordinance banning algorithmic rent coordination.",
											color: "amber"
										}
									].map((tCase) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `rounded-lg border bg-card p-3 ${tCase.status === "effective" ? "border-emerald-500/30" : tCase.status === "not_yet_effective" ? "border-blue-500/30" : tCase.status === "pending" ? "border-purple-500/30" : "border-slate-500/30"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-mono font-bold text-[11px] text-muted-foreground",
													children: tCase.id
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-[10px] font-bold px-1.5 py-0.5 rounded ${tCase.status === "effective" ? "bg-emerald-500/10 text-emerald-600" : tCase.status === "not_yet_effective" ? "bg-blue-500/10 text-blue-600" : tCase.status === "pending" ? "bg-purple-500/10 text-purple-600" : "bg-slate-500/10 text-slate-500"}`,
													children: tCase.status === "effective" ? "✓ In Effect" : tCase.status === "not_yet_effective" ? "⏳ Upcoming" : tCase.status === "pending" ? "📋 Pending" : "✗ Struck"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground text-[11px] mb-0.5",
												children: tCase.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground text-[11px] leading-snug",
												children: tCase.desc
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 text-[10px] font-mono text-muted-foreground",
												children: tCase.date
											})
										]
									}, tCase.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border/70 bg-card p-5 mt-4 flex flex-wrap items-center justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-sm text-foreground",
									children: t("Save or Share This Report", "Guardar o Compartir este Informe")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-muted-foreground",
									children: t(`${appliesCount} rules evaluated for ${address || "this address"} as of ${format(date, "yyyy-MM-dd")} · Strictly deterministic · No legal advice`, `${appliesCount} reglas evaluadas · Estrictamente determinista · No es asesoría legal`)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												const url = `${window.location.origin}/lookup?address=${encodeURIComponent(address)}&asOf=${format(date, "yyyy-MM-dd")}&units=${units}&year_built=${yearBuilt}`;
												navigator.clipboard.writeText(url);
											},
											className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" }), t("Copy Shareable Link", "Copiar Enlace")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => window.print(),
											className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5" }), t("Print / Save as PDF", "Imprimir / PDF")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setCopilotOpen(true),
											className: "inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-all",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-purple-500" }), t("Ask Lexi About This Report", "Preguntar a Lexi sobre el Informe")]
										})
									]
								})]
							})
						]
					})
				]
			}),
			drawerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-xl bg-card border-l border-border h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
								children: t("Source Law Verbatim Viewer", "Visor de Cita Legal Verbatim")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDrawerOpen(false),
							className: "rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: sourceLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center py-16 text-muted-foreground space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: t("Retrieving statute slice...", "Obteniendo texto legal...")
							})]
						}) : sourceError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-600 dark:text-red-400",
							children: sourceError
						}) : sourceData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-mono text-primary font-bold",
											children: sourceData.rule_id
										}), sourceData.retrieval_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 rounded bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground border border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-2.5 text-primary" }),
												t("Retrieved:", "Fecha de captura:"),
												" ",
												sourceData.retrieval_date
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-bold mt-1 text-foreground",
										children: sourceData.citation
									}),
									sourceData.document_title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-0.5 font-medium",
										children: sourceData.document_title
									}),
									sourceData.doc_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] text-muted-foreground block mt-1",
										children: [
											t("Corpus Manifest ID:", "ID en Manifiesto:"),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono font-bold text-foreground",
												children: sourceData.doc_id
											})
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl border border-border bg-secondary/30 p-4 text-xs leading-relaxed max-h-[460px] overflow-y-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "whitespace-pre-wrap font-serif text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: sourceData.text_before
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
												id: "quote",
												className: "bg-amber-200 dark:bg-amber-900/60 dark:text-amber-100 px-1 py-0.5 rounded font-semibold border-b-2 border-amber-500 shadow-2xs",
												children: sourceData.quote
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: sourceData.text_after
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-muted-foreground space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), t("Verified exact substring match (&ge; 20 chars)", "Cita textual verificada")]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("The quote above is an exact character-for-character substring of the stored government housing statute.", "El texto resaltado es una subcadena exacta del código legal oficial.") })]
								}),
								sourceData.source_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: sourceData.source_url,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("View Official Government Source Document", "Ver Fuente Oficial del Gobierno") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
									})
								})
							]
						}) : null
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-4 mt-6 flex justify-between items-center text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground font-mono",
							children: "TRD 9.5 Quote Viewer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setDrawerOpen(false),
							children: t("Close", "Cerrar")
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AICopilotDrawer, {
				open: copilotOpen,
				onClose: () => setCopilotOpen(false),
				addressContext: address,
				activeRules: evaluatedRules
			})
		]
	});
}
//#endregion
export { LookupPage as component };

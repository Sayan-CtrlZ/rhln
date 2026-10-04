import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as format } from "../_libs/date-fns.mjs";
import { i as DialogPortal, m as Slot, n as DialogContent, r as DialogOverlay, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { C as CalendarDays, E as ArrowRight, S as Check, T as ArrowUpRight, _ as Clock3, a as Sun, b as ChevronLeft, c as Search, d as LoaderCircle, f as Info, g as Earth, h as ExternalLink, i as TrendingUp, l as Moon, m as FileText, n as Wallet, o as SlidersHorizontal, p as House, r as TriangleAlert, s as ShieldCheck, t as X, u as MapPin, v as CircleQuestionMark, w as Building2, x as ChevronDown, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as getDefaultClassNames, t as DayPicker } from "../_libs/react-day-picker.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BeA2SXwO.js
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
var rules = [
	{
		id: "rent",
		title: ["Rent increases", "Aumentos de alquiler"],
		summary: ["Annual rent increases may be limited by local rent control. Statewide limits may also apply, depending on exemptions.", "El control local puede limitar los aumentos anuales. También pueden aplicar límites estatales, según las exenciones."],
		citation: "SF Admin. Code § 37.3",
		code: "San Francisco Administrative Code § 37.3",
		status: "applies",
		icon: "increase",
		source: "https://www.sf.gov/reports/rent-board-laws-and-regulations",
		quotedSpan: "The Rent Board sets the allowable annual rent increase based on 60% of the Consumer Price Index (CPI) for the San Francisco-Oakland-San Jose region.",
		explanation: "Applies to buildings with certificate of occupancy on or before June 13, 1979."
	},
	{
		id: "cause",
		title: ["Just cause", "Causa justa"],
		summary: ["A landlord generally needs a recognized just cause to end a covered tenancy. Notice and relocation requirements may apply.", "Generalmente se requiere una causa justa reconocida para terminar un arrendamiento protegido. Puede requerirse aviso y ayuda de reubicación."],
		citation: "SF Admin. Code § 37.9",
		code: "San Francisco Administrative Code § 37.9",
		status: "applies",
		icon: "shield",
		source: "https://www.sf.gov/reports/rent-board-laws-and-regulations",
		quotedSpan: "A landlord shall not endeavor to recover possession of a rental unit unless at least one of the enumerated just causes is established.",
		explanation: "Tenancy in a covered multi-family residential building."
	},
	{
		id: "deposit",
		title: ["Security deposit", "Depósito de garantía"],
		summary: ["California limits security deposits and sets rules for deductions and returns. Exceptions depend on the landlord and property.", "California limita los depósitos y establece reglas para deducciones y devoluciones. Las excepciones dependen del propietario y la vivienda."],
		citation: "CA Civil Code § 1950.5",
		code: "California Civil Code § 1950.5",
		status: "applies",
		icon: "wallet",
		source: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1950.5.&lawCode=CIV",
		quotedSpan: "Starting July 1, 2024, a landlord may not demand or receive security, however denominated, in an amount or value in excess of an amount equal to one month’s rent.",
		explanation: "Statewide California deposit cap under AB 12 (effective 2024-07-01)."
	},
	{
		id: "screening",
		title: ["Screening fee", "Tarifa de evaluación"],
		summary: ["Application screening fees are subject to state limits and disclosure requirements. Unused amounts may need to be returned.", "Las tarifas de evaluación están sujetas a límites y requisitos estatales. Puede ser necesario devolver los importes no utilizados."],
		citation: "CA Civil Code § 1950.6",
		code: "California Civil Code § 1950.6",
		status: "applies",
		icon: "screening",
		source: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=1950.6.&lawCode=CIV",
		quotedSpan: "The application screening fee shall not exceed the landlord’s actual out-of-pocket costs of gathering information, capped at the statutory CPI-adjusted amount.",
		explanation: "Statewide limit on upfront screening fees."
	},
	{
		id: "algorithm",
		title: ["Algorithmic pricing", "Precios algorítmicos"],
		summary: ["Local restrictions may cover rent-setting software. More information about the pricing tool is needed to determine coverage.", "Las restricciones locales pueden cubrir programas de fijación de alquileres. Se necesita más información para determinar la cobertura."],
		citation: "SF Admin. Code § 37.10C",
		code: "San Francisco Administrative Code § 37.10C (Oct 2024)",
		status: "unknown",
		icon: "algorithm",
		source: "https://www.sf.gov/",
		quotedSpan: "It shall be unlawful to use, contract for the use of, or provide any algorithmic device that uses nonpublic competitor data to recommend or set rents.",
		explanation: "Coverage depends on whether the property manager uses nonpublic competitor data algorithmic tools.",
		conflictFlag: false
	}
];
/**
* API client connecting the React UI to the RHLN FastAPI backend.
*/
var API_BASE = "http://localhost:8000/api/v1";
/**
* Executes a deterministic address lookup against the backend engine.
*/
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
	if (params.year_built !== void 0) payload.facts.year_built = params.year_built;
	if (params.units !== void 0) payload.facts.units = params.units;
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
/**
* Fetches sample addresses for autocomplete and instant testing.
*/
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
var hero_lease_default = "/assets/hero-lease-JqHMLi-T.jpg";
var hero_building_default = "/assets/hero-building-B_bYmZBt.jpg";
var hero_law_default = "/assets/hero-law-BIvU3WW0.jpg";
var ruleIcons = {
	increase: TrendingUp,
	rent_increase_limits: TrendingUp,
	shield: ShieldCheck,
	just_cause_eviction: ShieldCheck,
	wallet: Wallet,
	security_deposits: Wallet,
	screening: FileText,
	application_screening_fees: FileText,
	screening_restrictions: FileText,
	algorithm: SlidersHorizontal,
	algorithmic_rent_setting: SlidersHorizontal
};
function getCategoryIcon(cat) {
	if (!cat) return TrendingUp;
	return ruleIcons[cat] || FileText;
}
/** Wide screens keep the source panel beside the list; narrow screens use a sheet. */
function useIsWide() {
	const [wide, setWide] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const query = window.matchMedia("(min-width: 1024px)");
		const sync = () => setWide(query.matches);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);
	return wide;
}
function Index() {
	const [language, setLanguage] = (0, import_react.useState)("en");
	const es = language === "es";
	const t = (en, spanish) => es ? spanish : en;
	const [address, setAddress] = (0, import_react.useState)("2100 Shattuck Ave, Berkeley, CA 94704");
	const [date, setDate] = (0, import_react.useState)(new Date(2026, 9, 1));
	const [yearBuilt, setYearBuilt] = (0, import_react.useState)("1962");
	const [units, setUnits] = (0, import_react.useState)("20");
	const [calendarOpen, setCalendarOpen] = (0, import_react.useState)(false);
	const [searched, setSearched] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const [dark, setDark] = (0, import_react.useState)(false);
	const wide = useIsWide();
	const [currentRules, setCurrentRules] = (0, import_react.useState)(rules);
	const [sampleProperties, setSampleProperties] = (0, import_react.useState)([]);
	const [jurisdictionStack, setJurisdictionStack] = (0, import_react.useState)([{
		name: "California",
		level: "state"
	}, {
		name: "City of Berkeley",
		level: "city"
	}]);
	(0, import_react.useEffect)(() => {
		setDark(window.localStorage.getItem("theme") === "dark");
		fetchSampleProperties(50).then((items) => {
			if (items && items.length > 0) setSampleProperties(items);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", dark);
		window.localStorage.setItem("theme", dark ? "dark" : "light");
	}, [dark]);
	const visibleRules = currentRules.filter((rule) => filter === "all" || rule.status === filter);
	const appliesCount = currentRules.filter((r) => r.status === "applies").length;
	const unknownCount = currentRules.filter((r) => r.status === "unknown").length;
	const upcomingCount = currentRules.filter((r) => r.status === "not_yet_effective" || r.status === "pending").length;
	(0, import_react.useEffect)(() => {
		if (!wide || !selected) return;
		const onKey = (event) => {
			if (event.key === "Escape") setSelected(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [wide, selected]);
	const handlePropertySelect = (val) => {
		setAddress(val);
		const found = sampleProperties.find((p) => `${p.street_address}, ${p.postal_city}, ${p.state} ${p.zip}` === val);
		if (found) {
			if (found.year_built) setYearBuilt(String(found.year_built));
			if (found.units) setUnits(String(found.units));
		}
	};
	const handleSearchSubmit = async (event) => {
		event.preventDefault();
		setSearched(true);
		setFilter("all");
		setLoading(true);
		try {
			const parts = address.split(",").map((p) => p.strip ? p.strip() : p.trim());
			const street = parts[0] || address;
			const city = parts[1] || "Berkeley";
			let state = "CA";
			let zip = "94704";
			if (parts[2]) {
				const stateZip = parts[2].trim().split(/\s+/);
				state = stateZip[0] || "CA";
				zip = stateZip[1] || "94704";
			}
			const res = await lookupAddress({
				street,
				city,
				state,
				zip,
				year_built: yearBuilt ? parseInt(yearBuilt, 10) : void 0,
				units: units ? parseInt(units, 10) : void 0,
				as_of: format(date, "yyyy-MM-dd")
			});
			if (res && res.results) {
				if (res.stack && res.stack.length > 0) setJurisdictionStack(res.stack.map((s) => ({
					name: s.name,
					level: s.level
				})));
				const mappedRules = res.results.map((r, i) => {
					const category = r.category || "rent_increase_limits";
					return {
						id: r.team_rule_id || `rule-${i}`,
						title: [r.title || r.team_rule_id, r.title || r.team_rule_id],
						summary: [r.explanation, r.explanation],
						citation: r.citation || "Legal Source",
						code: `${r.citation || ""} · ${r.team_rule_id}`,
						status: r.result,
						icon: category in ruleIcons ? category : "increase",
						source: "https://berkeleyca.gov",
						quotedSpan: r.explanation,
						explanation: r.explanation,
						conflictFlag: r.conflict_flag,
						category: r.category
					};
				});
				if (mappedRules.length > 0) {
					setCurrentRules(mappedRules);
					setSelected(mappedRules[0]);
				}
			}
		} catch (err) {
			console.warn("Backend query error, staying on local data view:", err);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-secondary px-5 py-2.5 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mx-auto flex max-w-[1440px] items-center justify-center gap-2 text-xs font-bold sm:text-[13px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 shrink-0 text-unknown" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Not legal advice. Summaries of public law. Always check the source text.", "No es asesoría legal. Resúmenes de leyes públicas. Consulte siempre el texto original.") })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-6 py-3 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
									className: "size-4",
									strokeWidth: 2
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-base leading-none sm:text-lg",
								children: "Rental Housing Law Navigator"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chip hidden bg-secondary text-foreground sm:inline-flex",
								children: "Hackathon v1.0"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-8 rounded-lg border border-border bg-card text-muted-foreground",
								"aria-label": dark ? t("Switch to light mode", "Cambiar a modo claro") : t("Switch to dark mode", "Cambiar a modo oscuro"),
								"aria-pressed": dark,
								onClick: () => setDark(!dark),
								children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { className: "hidden size-4 text-muted-foreground sm:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 rounded-lg border border-border bg-card p-1",
								"aria-label": "Language",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										"aria-pressed": !es,
										className: `h-7 rounded-md px-3 text-xs font-bold ${!es ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "text-muted-foreground"}`,
										onClick: () => setLanguage("en"),
										children: "EN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-border",
										children: "|"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "sm",
										"aria-pressed": es,
										className: `h-7 rounded-md px-3 text-xs font-bold ${es ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "text-muted-foreground"}`,
										onClick: () => setLanguage("es"),
										children: "ES"
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-border bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1440px] flex-wrap items-center gap-10 px-6 py-14 sm:px-8 sm:py-20 lg:flex-nowrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground",
								children: t("A calm place to start", "Un lugar tranquilo para empezar")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-4xl leading-[1.15] sm:text-[46px] sm:leading-[1.12]",
								children: [
									t("Know the rules.", "Conozca las reglas."),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									t("Know your home.", "Conozca su hogar.")
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-lg text-base leading-7 text-muted-foreground",
								children: t("Rental housing laws in plain language. Enter an address to see the rules and the verified sources behind them.", "Leyes de vivienda en lenguaje sencillo. Ingrese una dirección para ver las reglas y sus fuentes verificadas.")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-8 grid max-w-md gap-y-2.5 text-xs font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 shrink-0 text-applies" }), t("Plain-language summaries", "Resúmenes en lenguaje sencillo")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 shrink-0 text-muted-foreground" }), t("Every rule cited to verified source text", "Cada regla citada con texto original")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 shrink-0 text-muted-foreground" }), t("Deterministic three-valued logic", "Lógica determinista de tres valores")]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid w-full max-w-[640px] shrink-0 grid-cols-2 gap-3 xl:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: hero_building_default,
								alt: "Apartment building",
								width: 928,
								height: 720,
								className: "col-span-2 h-[220px] w-full rounded-lg border border-border object-cover shadow-sm xl:h-[260px]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: hero_lease_default,
								alt: "Tenant reviewing lease",
								width: 1280,
								height: 720,
								loading: "lazy",
								className: "h-[150px] w-full rounded-lg border border-border object-cover shadow-sm xl:h-[180px]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: hero_law_default,
								alt: "Law library",
								width: 928,
								height: 720,
								loading: "lazy",
								className: "h-[150px] w-full rounded-lg border border-border object-cover shadow-sm xl:h-[180px]"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1440px] px-6 pb-12 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSearchSubmit,
						className: "grid grid-cols-1 items-end gap-4 border-b border-border py-7 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_160px_100px_88px_116px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-[11px] font-bold uppercase tracking-wider",
								htmlFor: "property-address",
								children: [t("Property address", "Dirección de la vivienda"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "property-address",
											required: true,
											list: "sample-addresses-list",
											value: address,
											onChange: (event) => handlePropertySelect(event.target.value),
											placeholder: "2100 Shattuck Ave, Berkeley, CA 94704",
											className: "field h-11 w-full rounded-md pl-10 pr-3 text-sm font-normal"
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
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] font-bold uppercase tracking-wider",
								children: [t("As of", "A fecha de"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
									open: calendarOpen,
									onOpenChange: setCalendarOpen,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "ghost",
											className: "field mt-2 h-11 w-full justify-between rounded-md px-3 font-normal hover:bg-card",
											"aria-label": t("Choose as-of date", "Elegir fecha"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-sans text-sm font-normal tabular-nums",
												children: format(date, "yyyy-MM-dd")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "text-muted-foreground" })]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
										className: "w-auto rounded-md border border-border p-0 shadow-lg",
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
											},
											className: "pointer-events-auto"
										})
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-[11px] font-bold uppercase tracking-wider",
								htmlFor: "year-built",
								children: [t("Year built", "Año constr."), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "field mt-2 flex h-11 items-center gap-2 rounded-md px-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "year-built",
										value: yearBuilt,
										onChange: (e) => setYearBuilt(e.target.value),
										className: "w-12 bg-transparent font-sans font-normal tabular-nums outline-none"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-[11px] font-bold uppercase tracking-wider",
								htmlFor: "units-count",
								children: [t("Units", "Unidades"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "field mt-2 flex h-11 items-center rounded-md px-3 text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "units-count",
										value: units,
										onChange: (e) => setUnits(e.target.value),
										className: "w-12 bg-transparent font-sans font-normal tabular-nums outline-none"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								variant: "neo",
								disabled: loading,
								className: "h-11",
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), t("Search", "Buscar")]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "status",
						className: "mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: searched ? t(`Results for ${address} as of ${format(date, "yyyy-MM-dd")}. Verified against statutory rules.`, `Resultados para ${address} a fecha de ${format(date, "yyyy-MM-dd")}. Verificado con leyes vigentes.`) : t("Search any address across Boston, Cambridge, LA, SF, Berkeley, Hoboken, Jersey City, or Newark.", "Busque cualquier dirección en Boston, Cambridge, LA, SF, Berkeley, Hoboken, Jersey City o Newark.") })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "pt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2 text-xs font-semibold sm:text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-muted-foreground" }), jurisdictionStack.map((j, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: idx === jurisdictionStack.length - 1 ? "font-bold" : "",
										children: j.name
									}), idx < jurisdictionStack.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-muted-foreground" })]
								}, j.name))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										className: "bg-applies text-chip-foreground",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }),
										text: t(`${appliesCount} apply`, `${appliesCount} aplican`)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										className: "bg-unknown text-chip-foreground",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-3.5" }),
										text: t(`${unknownCount} unknown`, `${unknownCount} sin determinar`)
									}),
									upcomingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										className: "bg-secondary text-foreground",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3.5" }),
										text: t(`${upcomingCount} upcoming`, `${upcomingCount} próximas`)
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_440px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4 flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-xl",
											children: t("Your rulebook", "Sus reglas")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: [
												currentRules.length,
												" ",
												t("rules evaluated", "reglas evaluadas")
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-1 rounded-lg border border-border bg-card p-1",
										children: [
											"all",
											"applies",
											"unknown"
										].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											"aria-pressed": filter === item,
											onClick: () => setFilter(item),
											className: `h-7 rounded-md px-3 text-xs font-semibold ${filter === item ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground" : "text-muted-foreground"}`,
											children: item === "all" ? t("All rules", "Todas") : item === "applies" ? t("Applies", "Aplican") : t("Unknown", "Sin determinar")
										}, item))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rule-list grid gap-3 xl:grid-cols-2",
									children: visibleRules.map((rule) => {
										const Icon = getCategoryIcon(rule.category || rule.icon);
										const isSelected = selected?.id === rule.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "neoOutline",
											"data-status": rule.status,
											"aria-pressed": isSelected,
											onClick: () => setSelected(rule),
											className: "group h-auto w-full justify-start gap-4 whitespace-normal rounded-lg px-5 py-4 text-left sm:gap-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary text-foreground",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5!" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-center justify-between gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "text-lg leading-tight",
															children: rule.title[es ? 1 : 0]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `chip ${rule.status === "applies" ? "bg-applies text-chip-foreground" : rule.status === "unknown" ? "bg-unknown text-chip-foreground" : "bg-secondary text-foreground"}`,
															children: rule.status === "applies" ? t("Applies", "Aplica") : rule.status === "unknown" ? t("Unknown", "Sin determinar") : rule.status
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mb-3 mt-1.5 max-w-[640px] text-[13px] font-normal leading-5 text-muted-foreground",
														children: rule.summary[es ? 1 : 0]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-center justify-between gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-1 font-mono text-[10px] font-medium text-foreground",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3!" }), rule.citation]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1 text-[11px] font-semibold text-foreground",
															children: [t("Read the source", "Leer la fuente"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5!" })]
														})]
													})
												]
											})]
										}, rule.id);
									})
								}, filter)]
							}), wide && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
								className: "sticky top-24",
								children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceShell, {
									t,
									heading: t("Behind the rule", "Detrás de la regla"),
									onClose: () => setSelected(null),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBody, {
										rule: selected,
										es,
										date,
										t
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SourceShell, {
									t,
									heading: t("Source panel", "Panel de fuente"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg",
											children: t("Nothing selected yet", "Aún no hay selección")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm leading-6 text-muted-foreground",
											children: t("Choose a rule on the left and this panel fills in with:", "Elija una regla a la izquierda y este panel mostrará:")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "mt-4 space-y-2.5 border-t border-border pt-4 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-start gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }), t("The code section and citation", "La sección y la cita del código")]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-start gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-applies" }), t("The conditions a rule depends on", "Las condiciones de la regla")]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-start gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "mt-0.5 size-4 shrink-0 text-muted-foreground" }), t("Exact verified quoted span from public legal text", "Fragmento citado exacto del texto legal")]
												})
											]
										})
									]
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10 rounded-lg border border-border bg-secondary px-5 py-6 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "flex items-center gap-2 text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-5 text-muted-foreground" }), t("Upcoming and pending", "Próximas y pendientes")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "chip border border-border bg-card text-muted-foreground",
									children: t("Change Tracking T1–T5", "Seguimiento de Cambios T1–T5")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:border-r sm:border-border sm:pr-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" }), t("Not yet in effect (T1 & T3)", "Aún no vigentes (T1 y T3)")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-base font-semibold",
											children: t("CA AB 325 & NJ FAIR Act Future Dates", "Fechas futuras de CA AB 325 y NJ FAIR Act")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs leading-5 text-muted-foreground",
											children: t("California antitrust amendments took effect 2026-01-01. New Jersey FAIR Act takes effect 2027-07-01 with preemption flags on local ordinances.", "Enmiendas de California en vigor 2026-01-01. Ley FAIR de Nueva Jersey en vigor 2027-07-01 con alertas de preempción sobre ordenanzas locales.")
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-unknown" }), t("Pending legislation (T4)", "Legislación propuesta (T4)")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-semibold",
										children: t("Massachusetts S.2983 & H.5222", "Proyectos de Massachusetts S.2983 y H.5222")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs leading-5 text-muted-foreground",
										children: t("Tracked as pending proposals for Boston and Cambridge addresses. Never reported as active law.", "Registrados como propuestas pendientes para Boston y Cambridge. Nunca reportados como ley activa.")
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "link",
								className: "mt-3 h-7 px-0 text-xs text-foreground",
								onClick: () => setExpanded(!expanded),
								"aria-expanded": expanded,
								children: [expanded ? t("Hide details", "Ocultar detalles") : t("More about change tracking tests", "Más sobre pruebas de cambios"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							}),
							expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-5 text-muted-foreground",
								children: t("Change tracking test cases T1 to T5 are generated in out/changes.json matching the benchmark evaluation requirements.", "Los casos de prueba T1 a T5 se generan en out/changes.json cumpliendo con los requisitos de evaluación del benchmark.")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-3.5" }), "Rental Housing Law Navigator"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Public sources. Verified legal text.", "Fuentes públicas. Texto legal verificado.") })]
					})
				]
			}),
			!wide && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: selected !== null,
				onOpenChange: (open) => {
					if (!open) setSelected(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-40 bg-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "source-panel fixed inset-y-0 right-0 z-50 w-full max-w-[440px] bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceShell, {
						t,
						heading: t("Behind the rule", "Detrás de la regla"),
						onClose: () => setSelected(null),
						sheet: true,
						children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBody, {
							rule: selected,
							es,
							date,
							t
						})
					})
				})] })
			})
		]
	});
}
function StatusPill({ className, icon, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `chip ${className}`,
		children: [icon, text]
	});
}
function SourceShell({ t, heading, onClose, children, sheet = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: sheet ? "flex h-full flex-col overflow-hidden bg-card" : "panel flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex shrink-0 items-center justify-between gap-3 border-b border-border bg-panel-header px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3.5 text-muted-foreground" }), heading]
			}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "size-7 text-muted-foreground",
				"aria-label": t("Close source panel", "Cerrar panel de fuente"),
				onClick: onClose,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto px-5 py-5",
			children
		})]
	});
}
function SourceBody({ rule, es, date, t }) {
	const applies = rule.status === "applies";
	const isUnknown = rule.status === "unknown";
	const isSuperseded = rule.status === "superseded";
	const isNotYetEffective = rule.status === "not_yet_effective";
	const statusLabel = applies ? t("Applies", "Aplica") : isUnknown ? t("Unknown", "Sin determinar") : isSuperseded ? t("Superseded", "Sustituida") : isNotYetEffective ? t("Not yet effective", "Aún no vigente") : t("Pending", "Pendiente");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `chip ${applies ? "bg-applies text-chip-foreground" : isUnknown ? "bg-unknown text-chip-foreground" : isSuperseded ? "bg-purple-600 text-white" : "bg-secondary text-foreground"}`,
			children: statusLabel
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-3 text-xl leading-tight",
			children: rule.code || rule.title[es ? 1 : 0]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: [
				t("Source reference for", "Referencia de fuente para"),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-foreground",
					children: rule.title[es ? 1 : 0].toLowerCase()
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-y border-border py-3 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted-foreground",
					children: t("As of", "A fecha de")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-right font-semibold tabular-nums",
					children: format(date, "yyyy-MM-dd")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted-foreground",
					children: t("Citation", "Cita legal")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-right font-semibold font-mono",
					children: rule.citation
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "excerpt mt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-3" }), t("Quoted span (verbatim text)", "Fragmento citado (texto original)")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[13px] text-foreground font-serif italic bg-secondary/50 p-3 rounded border border-border",
					children: [
						"“",
						rule.quotedSpan || t("Quoted span in source text.", "Fragmento citado en el texto."),
						"”"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-5 text-muted-foreground",
					children: t("Verified exact substring located in official legal text.", "Subcadena exacta verificada en el texto legal oficial.")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			className: "mb-3 mt-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
			children: t("Evaluation analysis", "Análisis de aplicación")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2.5 text-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start gap-2",
				children: [applies ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-applies" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "mt-0.5 size-4 shrink-0 text-unknown" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rule.explanation || t("Rule conditions evaluated against property facts.", "Condiciones evaluadas contra datos de la vivienda.") })]
			})
		}),
		rule.conflictFlag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-5 flex items-start gap-2 rounded-md border border-amber-500/50 bg-amber-500/10 p-3 text-xs leading-5 font-medium text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: rule.conflictNote || t("Conflict flag: potential state preemption or overlapping local rule detected for human review.", "Alerta de conflicto: posible preempción estatal o regla superpuesta detectada.") })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "neo",
			className: "mt-5 h-11 w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: rule.source,
				target: "_blank",
				rel: "noopener noreferrer",
				children: [t("Open official source", "Abrir fuente oficial"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-center text-xs text-muted-foreground",
			children: t("Always check the original text. Not legal advice.", "Consulte siempre el texto original. No es asesoría legal.")
		})
	] });
}
//#endregion
export { Index as component };

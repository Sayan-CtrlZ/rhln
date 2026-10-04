import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { F as ExternalLink, G as CircleCheck, L as Download, R as Database, V as CodeXml, b as Lock, c as Terminal, g as RefreshCw, o as TriangleAlert, st as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { C as useLang, _ as fetchMeta, h as fetchHealth, i as EXPORT_URLS, n as API_BASE, o as SERVER_ROOT, u as fetchAuditEvents, w as verifyAuditChain } from "../__root-rZh34U2U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DSjwpfZ-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ApiPage() {
	const { t } = useLang();
	const [serverHealth, setServerHealth] = (0, import_react.useState)(null);
	const [metaInfo, setMetaInfo] = (0, import_react.useState)(null);
	const [auditEvents, setAuditEvents] = (0, import_react.useState)([]);
	const [auditResult, setAuditResult] = (0, import_react.useState)(null);
	const [verifying, setVerifying] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		fetchHealth().then(setServerHealth).catch(() => setServerHealth({ status: "offline" }));
		fetchMeta().then(setMetaInfo).catch(() => null);
		fetchAuditEvents().then(setAuditEvents).catch(() => null);
		verifyAuditChain().then(setAuditResult).catch(() => null);
	}, []);
	const handleVerifyChain = async () => {
		setVerifying(true);
		try {
			const res = await verifyAuditChain();
			setAuditResult(res);
			const evts = await fetchAuditEvents();
			setAuditEvents(evts);
		} finally {
			setVerifying(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-[1600px] w-full px-4 py-8 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6 flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold text-muted-foreground mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-3.5 text-primary" }), t("FastAPI Production Endpoints & Documentation Hub", "Documentación y Endpoints de Producción FastAPI")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl sm:text-3xl font-bold font-display",
						children: t("API Reference & Regulatory Exports Hub", "Referencia de API y Exportación de Datos")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground max-w-3xl",
						children: t("Explore the 23+ fully operational endpoints in interactive Swagger UI or download official platform compliance datasets.", "Explore los más de 23 endpoints en Swagger UI interactivo o descargue los conjuntos de datos oficiales.")
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `${SERVER_ROOT}/docs`,
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 text-white text-xs font-semibold shadow-xs hover:bg-emerald-700",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "size-4" }),
							t("Open Interactive Swagger UI", "Abrir Swagger UI"),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6 shadow-xs flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: t("Swagger OpenAPI UI", "Swagger UI Interactivo")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground leading-relaxed",
								children: t("Try out live endpoints with pre-populated schemas, request bodies, and headers directly in your browser.", "Pruebe todos los endpoints con esquemas y respuestas estructuradas directamente en el navegador.")
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `${SERVER_ROOT}/docs`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Launch /docs", "Abrir /docs") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `${SERVER_ROOT}/redoc`,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Launch ReDoc /redoc", "Abrir ReDoc") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6 shadow-xs flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: t("Regulatory Platform Exports (out/)", "Exportaciones de la Plataforma (out/)")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground leading-relaxed",
								children: t("Direct download links for official regulatory rule registries, batch evaluations, and statutory change datasets.", "Descarga directa para los registros oficiales de reglas, evaluaciones por lotes y conjuntos de cambios estatutarios.")
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: EXPORT_URLS.rulesJson,
									download: "rules.json",
									className: "inline-flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs font-mono hover:bg-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "out/rules.json" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: EXPORT_URLS.lookupsJson,
									download: "lookups.json",
									className: "inline-flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs font-mono hover:bg-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "out/lookups.json (500 addrs)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: EXPORT_URLS.changesJson,
									download: "changes.json",
									className: "inline-flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-xs font-mono hover:bg-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "out/changes.json (T1–T6)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3 text-muted-foreground" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `${API_BASE}/exports/bundle/download`,
									download: "rhln_deliverables.zip",
									className: "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Download All (.ZIP Bundle)", "Descargar Todo (.ZIP)") })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-6 shadow-xs flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: t("Engine Diagnostics", "Diagnóstico del Motor")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between py-1 border-b border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: t("API Status:", "Estado API:")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-emerald-600 dark:text-emerald-400",
											children: serverHealth?.status || "Active"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between py-1 border-b border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: t("Default As-Of:", "Fecha Base:")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-foreground",
											children: metaInfo?.default_as_of || "2026-10-01"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between py-1 border-b border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: t("Extraction Engine:", "Motor de Extracción:")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-foreground",
											children: "Lexi Regulatory Parser v1.0"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between py-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: t("Logic Standard:", "Estándar Lógico:")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-foreground",
											children: "Kleene 3-Valued Logic"
										})]
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-mono text-muted-foreground block truncate",
								children: "X-Disclaimer: Not legal advice. Summarizes public law."
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-2xl border border-border bg-card p-6 shadow-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-lg font-bold text-foreground font-display flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Cryptographic Audit Log & Tamper-Proof Chain", "Registro Criptográfico Inmutable") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
									children: "SHA-256"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t("Append-only cryptographic hash chain maintaining an auditable log of sources, model outputs, and changes.", "Cadena de bloques criptográfica que mantiene un registro auditable de fuentes, extracciones y cambios.")
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: handleVerifyChain,
							disabled: verifying,
							className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs self-start sm:self-auto disabled:opacity-50 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${verifying ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: verifying ? t("Verifying Chain...", "Verificando...") : t("Verify Chain Integrity", "Verificar Integridad") })]
						})]
					}),
					auditResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `mt-4 rounded-xl border p-4 text-xs flex items-start gap-3 ${auditResult.verified ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200" : "border-red-500/30 bg-red-500/10 text-red-900 dark:text-red-200"}`,
						children: [auditResult.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold block",
								children: auditResult.verified ? t("Audit Chain Cryptographically Verified Intact", "Cadena de Auditoría Verificada Intacta") : t("Integrity Warning: Chain Mismatch Detected", "Advertencia de Integridad Detectada")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "opacity-90",
								children: auditResult.message
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 sm:grid-cols-3 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-secondary/30 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-[11px]",
									children: t("Total Events Logged", "Eventos Registrados")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lg font-bold font-mono text-foreground",
									children: auditEvents.length || auditResult?.total_events || 0
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-secondary/30 p-3 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-[11px]",
									children: t("Genesis Hash", "Hash Génesis")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] text-foreground block truncate",
									title: auditResult?.genesis_hash,
									children: auditResult?.genesis_hash ? `${auditResult.genesis_hash.slice(0, 16)}...` : "0000000000000000..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-secondary/30 p-3 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground block text-[11px]",
									children: t("Tip Hash (Latest Block)", "Hash del Último Bloque")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[11px] text-primary font-semibold block truncate",
									title: auditResult?.tip_hash,
									children: auditResult?.tip_hash ? `${auditResult.tip_hash.slice(0, 16)}...` : "Calculating..."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 overflow-x-auto rounded-xl border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border bg-secondary/60 text-muted-foreground uppercase text-[11px] font-bold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5",
										children: "Block #"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5",
										children: t("Timestamp", "Fecha/Hora")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5",
										children: t("Actor", "Actor")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5",
										children: t("Action", "Acción")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5",
										children: t("Entity", "Entidad")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2.5 font-mono",
										children: "SHA-256 Hash"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border bg-card font-mono text-[11px]",
								children: auditEvents.slice(-6).map((evt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2 font-bold text-foreground",
											children: ["#", evt.id]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-muted-foreground",
											children: evt.ts.slice(0, 19).replace("T", " ")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-primary font-sans font-semibold",
											children: evt.actor
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-foreground",
											children: evt.action
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 text-muted-foreground",
											children: evt.entity_id || evt.entity_type || "system"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2 text-muted-foreground font-mono",
											title: evt.hash,
											children: [evt.hash.slice(0, 12), "..."]
										})
									]
								}, evt.id))
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold mb-4",
					children: t("All Registered Endpoints (TRD v1.0 Compliance)", "Endpoints Registrados")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-lg border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-secondary/60 text-muted-foreground uppercase text-[11px] font-bold",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: t("Method", "Método")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: t("Path", "Ruta")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: t("Description", "Descripción")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: t("TRD Section", "Sección TRD")
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-border bg-card font-mono text-[11px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold text-blue-500",
											children: "POST"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold",
											children: "/api/v1/lookup"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-sans text-muted-foreground",
											children: "Deterministic rulebook lookup for address & facts"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5",
											children: "TRD 8.3 (P0)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold text-emerald-500",
											children: "GET"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold",
											children: "/api/v1/properties"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-sans text-muted-foreground",
											children: "List 500 benchmark sample addresses with assessor facts"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5",
											children: "TRD 8.3 (P0)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold text-blue-500",
											children: "POST"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold",
											children: "/api/v1/resolve"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-sans text-muted-foreground",
											children: "Resolve spatial jurisdiction hierarchy (State/County/City)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5",
											children: "TRD 8.3 (P0)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold text-emerald-500",
											children: "GET"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold",
											children: "/api/v1/jurisdictions"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-sans text-muted-foreground",
											children: "List all 13 supported legal jurisdiction entities"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5",
											children: "TRD 8.3 (P0)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold text-emerald-500",
											children: "GET"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold",
											children: "/api/v1/changes/cases"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-sans text-muted-foreground",
											children: "List benchmark statutory change cases T1 through T6"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5",
											children: "TRD 8.3 (P0)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold text-emerald-500",
											children: "GET"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold",
											children: "/api/v1/documents/:id/text"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-sans text-muted-foreground",
											children: "Raw source statutory text for verbatim quote inspection"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5",
											children: "TRD 8.3 (P0)"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-secondary/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold text-emerald-500",
											children: "GET"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-bold",
											children: "/api/v1/exports/bundle/download"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5 font-sans text-muted-foreground",
											children: "Download all 3 validated export files as rhln_exports.zip"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-2.5",
											children: "Platform Exports"
										})
									]
								})
							]
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { ApiPage as component };

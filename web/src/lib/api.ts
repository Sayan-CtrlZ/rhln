/**
 * Comprehensive API client connecting the React UI to the RHLN FastAPI backend.
 * Adheres strictly to the RHLN Technical Requirements Document (TRD v1.0).
 */

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
export const SERVER_ROOT = import.meta.env.VITE_SERVER_ROOT || 'http://localhost:8000';

export interface MetaResponse {
  project: string;
  version: string;
  default_as_of: string;
  jurisdictions_supported: string[];
  categories_supported: string[];
  prompt_versions: Record<string, string>;
}

export interface DisclaimerResponse {
  disclaimer: string;
  lang: string;
  as_of: string;
  source_of_law_note: string;
}

export interface BackendJurisdictionNode {
  id: string;
  level: string;
  name: string;
  state: string;
  in_scope?: boolean;
  rule_count?: number;
}

export interface BackendRuleEvaluation {
  team_rule_id: string;
  result: 'applies' | 'unknown' | 'superseded' | 'not_yet_effective' | 'pending';
  explanation: string;
  conflict_flag: boolean;
  citation?: string;
  category?: string;
  title?: string;
  document_id?: string;
  source_quote?: string;
  effective_date?: string;
  sunset_date?: string | null;
  supersedes_rule_id?: string | null;
  parameters?: Record<string, any>;
  key_value?: string;
  requirement?: string;
  exemptions?: string;
}

export interface BackendLookupResponse {
  lookup_id: string;
  as_of: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    property_id?: string | null;
  };
  geocode: {
    status: string;
    legal_city: string;
    county: string;
  };
  facts: {
    year_built?: number | null;
    units?: number | null;
    use_code?: string | null;
  };
  stack: BackendJurisdictionNode[];
  results: BackendRuleEvaluation[];
  confidence: number;
}

export interface SamplePropertyItem {
  address_id: string;
  street_address: string;
  postal_city: string;
  state: string;
  zip: string;
  year_built?: number | null;
  units?: number | null;
  use_code?: string | null;
  use_description?: string | null;
}

export interface ChangeCaseItem {
  case_id: string;
  title: string;
  description: string;
  as_of_before?: string;
  as_of_after?: string;
  target_jurisdiction: string;
  affected_address_count: number;
  conflict_count?: number;
  address_ids?: string[];
  diffs?: Array<{
    address_id: string;
    rule_id: string;
    before_status: string;
    after_status: string;
    explanation: string;
  }>;
}

export interface DocumentItem {
  id: string;
  doc_id: string;
  document_title: string;
  jurisdiction: string;
  jurisdiction_name: string;
  jurisdiction_level: string;
  state: string;
  category: string;
  url: string;
  source_type: string;
  capture: string;
  retrieved_at?: string | null;
  has_text: boolean;
  character_count: number;
}

export interface RuleDetailItem {
  team_rule_id: string;
  source_doc_id: string;
  jurisdiction: string;
  category?: string;
  topic_category?: string;
  title?: string;
  rule_title?: string;
  citation?: string;
  statutory_citation?: string;
  effective_date?: string | null;
  sunset_date?: string | null;
  coverage_criteria?: Record<string, any>;
  supersedes_rule_id?: string | null;
  source_quote?: string;
  quoted_span?: string;
  quote_verified?: boolean;
  requirement?: string;
  key_value?: string;
  exemptions?: string;
  source_url?: string;
}

/* ========================================================================= */
/* System & Meta API                                                         */
/* ========================================================================= */

export async function fetchHealth(): Promise<{ status: string; database?: string }> {
  const res = await fetch(`${SERVER_ROOT}/health`);
  const json = await res.json();
  return json.data;
}

export async function fetchMeta(): Promise<MetaResponse> {
  const res = await fetch(`${API_BASE}/meta`);
  const json = await res.json();
  return json.data;
}

export async function fetchDisclaimer(lang = 'en'): Promise<DisclaimerResponse> {
  const res = await fetch(`${API_BASE}/disclaimer?lang=${lang}`);
  const json = await res.json();
  return json.data;
}

/* ========================================================================= */
/* Jurisdictions & Spatial API                                               */
/* ========================================================================= */

export async function fetchJurisdictions(params?: {
  state?: string;
  level?: string;
}): Promise<BackendJurisdictionNode[]> {
  const url = new URL(`${API_BASE}/jurisdictions`);
  if (params?.state) url.searchParams.set('state', params.state);
  if (params?.level) url.searchParams.set('level', params.level);

  const res = await fetch(url.toString());
  const json = await res.json();
  return json.data || [];
}

export async function fetchJurisdiction(id: string): Promise<BackendJurisdictionNode> {
  const res = await fetch(`${API_BASE}/jurisdictions/${id}`);
  const json = await res.json();
  return json.data;
}

export async function resolveAddress(addr: {
  street: string;
  city: string;
  state: string;
  zip: string;
}): Promise<{ address: any; geocode: any; stack: BackendJurisdictionNode[] }> {
  const res = await fetch(`${API_BASE}/resolve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(addr),
  });
  const json = await res.json();
  return json.data;
}

/* ========================================================================= */
/* Corpus Documents API                                                      */
/* ========================================================================= */

export async function fetchDocuments(params?: {
  jurisdiction_id?: string;
  category?: string;
  limit?: number;
}): Promise<DocumentItem[]> {
  const url = new URL(`${API_BASE}/documents`);
  if (params?.jurisdiction_id) url.searchParams.set('jurisdiction_id', params.jurisdiction_id);
  if (params?.category) url.searchParams.set('category', params.category);
  if (params?.limit) url.searchParams.set('limit', String(params.limit));

  const res = await fetch(url.toString());
  const json = await res.json();
  return json.data || [];
}

export async function fetchDocument(docId: string): Promise<DocumentItem> {
  const res = await fetch(`${API_BASE}/documents/${docId}`);
  const json = await res.json();
  return json.data;
}

export async function fetchDocumentText(docId: string): Promise<{
  id: string;
  doc_id: string;
  title: string;
  text: string;
  text_slice: string;
  char_count: number;
  character_count: number;
  start: number;
  end: number;
}> {
  const res = await fetch(`${API_BASE}/documents/${docId}/text`);
  const json = await res.json();
  const d = json.data;
  // Normalise: backend exposes text_slice, alias as text too
  if (d && !d.text) d.text = d.text_slice || '';
  return d;
}

/* ========================================================================= */
/* Rules Registry API                                                        */
/* ========================================================================= */

export async function fetchRules(params?: {
  jurisdiction?: string;
  category?: string;
  as_of?: string;
}): Promise<RuleDetailItem[]> {
  const url = new URL(`${API_BASE}/rules`);
  if (params?.jurisdiction) url.searchParams.set('jurisdiction', params.jurisdiction);
  if (params?.category) url.searchParams.set('category', params.category);
  if (params?.as_of) url.searchParams.set('as_of', params.as_of);

  const res = await fetch(url.toString());
  const json = await res.json();
  return json.data || [];
}

export async function fetchRule(ruleId: string): Promise<RuleDetailItem> {
  const res = await fetch(`${API_BASE}/rules/${ruleId}`);
  const json = await res.json();
  return json.data;
}

export interface RuleSourceHighlight {
  rule_id: string;
  doc_id?: string;
  citation: string;
  source_url: string;
  quote: string;
  text_before: string;
  text_after: string;
  retrieval_date?: string;
  document_title?: string;
}

export async function fetchRuleSource(ruleId: string): Promise<RuleSourceHighlight> {
  const res = await fetch(`${API_BASE}/rules/${ruleId}/source`);
  if (!res.ok) {
    throw new Error(`Failed to fetch source for rule ${ruleId}`);
  }
  const json = await res.json();
  return json.data;
}

/* ========================================================================= */
/* Address Lookup & Engine API                                               */
/* ========================================================================= */

export async function lookupAddress(params: {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  property_id?: string;
  year_built?: number;
  units?: number;
  as_of?: string;
}): Promise<BackendLookupResponse> {
  const payload: Record<string, any> = {
    as_of: params.as_of || '2026-10-01',
    facts: {},
  };

  if (params.property_id) {
    payload.property_id = params.property_id;
  } else if (params.street) {
    payload.address = {
      street: params.street,
      city: params.city || 'San Francisco',
      state: params.state || 'CA',
      zip: params.zip || '94110',
    };
  }

  if (params.year_built !== undefined && params.year_built !== null) {
    payload.facts.year_built = Number(params.year_built);
  }
  if (params.units !== undefined && params.units !== null) {
    payload.facts.units = Number(params.units);
  }

  const response = await fetch(`${API_BASE}/lookup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || `Lookup failed with status ${response.status}`);
  }

  const json = await response.json();
  return json.data;
}

export async function fetchSampleProperties(limit = 100): Promise<SamplePropertyItem[]> {
  try {
    const response = await fetch(`${API_BASE}/properties?limit=${limit}`);
    if (!response.ok) return [];
    const json = await response.json();
    return json.data || [];
  } catch (err) {
    console.warn('Backend unavailable, using local fallback:', err);
    return [];
  }
}

/* ========================================================================= */
/* Change Tracking Benchmark API                                             */
/* ========================================================================= */

export async function fetchChangeCases(): Promise<ChangeCaseItem[]> {
  try {
    const response = await fetch(`${API_BASE}/changes/cases`);
    if (!response.ok) return [];
    const json = await response.json();
    return json.data || [];
  } catch (err) {
    console.warn('Failed to fetch change cases from backend:', err);
    return [];
  }
}

export interface ChangeCaseDetail {
  affected_address_ids: string[];
  conflict_flag_address_ids?: string[];
  notes?: string;
}

export async function fetchChangeCaseDetail(caseId: string): Promise<ChangeCaseDetail | null> {
  try {
    const response = await fetch(`${API_BASE}/changes/cases/${caseId}`);
    if (!response.ok) return null;
    const json = await response.json();
    return json.data || null;
  } catch (err) {
    console.warn(`Failed to fetch change case detail ${caseId}:`, err);
    return null;
  }
}

export async function fetchChangeCase(caseId: string): Promise<ChangeCaseItem> {
  const response = await fetch(`${API_BASE}/changes/cases/${caseId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch case ${caseId}`);
  }
  const json = await response.json();
  return json.data;
}

/* ========================================================================= */
/* Lexi AI Legal Specialist & Plain-Language Explanation                     */
/* ========================================================================= */

export interface AIChatResult {
  answer: string;
  citations: string[];
  model_used: string;
  confidence: number;
  disclaimer: string;
}

export async function askAICopilot(params: {
  question: string;
  address?: string;
  as_of?: string;
  lang?: string;
  active_rules?: any[];
}): Promise<AIChatResult> {
  const res = await fetch(`${API_BASE}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    throw new Error(`AI query failed with status ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

export interface RuleAIExplanation {
  rule_id: string;
  citation: string;
  title: string;
  concise_explanation?: string;
  plain_summary: string;
  tenant_impact: string;
  landlord_compliance: string;
  key_takeaway: string;
}

export async function explainRuleWithAI(
  ruleId: string,
  lang = 'en',
  context?: { address?: string; year_built?: number | string; units?: number | string }
): Promise<RuleAIExplanation> {
  const res = await fetch(`${API_BASE}/ai/explain-rule`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rule_id: ruleId,
      lang,
      address: context?.address,
      year_built: context?.year_built ? Number(context.year_built) : undefined,
      units: context?.units ? Number(context.units) : undefined,
    }),
  });
  if (!res.ok) {
    throw new Error(`Rule explanation failed with status ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

/* ========================================================================= */
/* Exports & Deliverable URLs                                                */
/* ========================================================================= */

export const EXPORT_URLS = {
  rulesJson: `${API_BASE}/rules/export`,
  lookupsJson: `${API_BASE}/lookup/export`,
  changesJson: `${API_BASE}/changes/export`,
  bundleZip: `${API_BASE}/exports/bundle/latest`,
  swaggerDocs: `${SERVER_ROOT}/docs`,
  redocDocs: `${SERVER_ROOT}/redoc`,
  openapiJson: `${SERVER_ROOT}/openapi.json`,
  auditVerify: `${API_BASE}/audit/verify-chain`,
};

/* ========================================================================= */
/* Audit & System Provenance API (TRD Section 12)                            */
/* ========================================================================= */

export interface AuditEvent {
  id: number;
  ts: string;
  actor: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  run_id?: string;
  payload: Record<string, any>;
  prev_hash: string;
  hash: string;
}

export interface AuditVerifyResult {
  verified: boolean;
  total_events: number;
  genesis_hash: string;
  tip_hash: string;
  tamper_detected: boolean;
  first_mismatch_id?: number;
  message: string;
}

export async function fetchAuditEvents(): Promise<AuditEvent[]> {
  try {
    const res = await fetch(`${API_BASE}/audit/events`);
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Failed to fetch audit events:', err);
    return [];
  }
}

export async function verifyAuditChain(): Promise<AuditVerifyResult | null> {
  try {
    const res = await fetch(`${API_BASE}/audit/verify-chain`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Failed to verify audit chain:', err);
    return null;
  }
}

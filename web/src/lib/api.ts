/**
 * API client connecting the React UI to the RHLN FastAPI backend.
 */

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface BackendJurisdictionNode {
  id: string;
  level: string;
  name: string;
  state: string;
}

export interface BackendRuleEvaluation {
  team_rule_id: string;
  result: 'applies' | 'unknown' | 'superseded' | 'not_yet_effective' | 'pending';
  explanation: string;
  conflict_flag: boolean;
  citation?: string;
  category?: string;
  title?: string;
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
}

/**
 * Executes a deterministic address lookup against the backend engine.
 */
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

  if (params.year_built !== undefined) {
    payload.facts.year_built = params.year_built;
  }
  if (params.units !== undefined) {
    payload.facts.units = params.units;
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

/**
 * Fetches sample addresses for autocomplete and instant testing.
 */
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

/**
 * Fetches benchmark change tracking cases T1-T5.
 */
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

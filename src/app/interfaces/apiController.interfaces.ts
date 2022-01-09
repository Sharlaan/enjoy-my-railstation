export interface QueryParams {
  best?: string; // can be 'true' or 'anything' or ''(no value, just presence in query)
  gares?: string; // must contain stations names wrapped with "" and separated by ','
}

/**
 * url : endpoint url to be appended to API_URL
 *
 * field : field name used in request's query params
 */
export type Endpoint = Record<'field' | 'url', string>;

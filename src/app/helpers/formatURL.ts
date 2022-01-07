const API_URL = 'https://ressources.data.sncf.com/api/v2/';
const SERVICES_ENDPOINT = 'catalog/datasets/gares-pianos/records';

/**
 * Handles query params, if any
 */
export function formatURL(queryParams?: string) {
  const parameterizedUrl = new URL(API_URL + SERVICES_ENDPOINT);
  if (!queryParams) return parameterizedUrl.toString();
  const searchParams = new URLSearchParams(queryParams);
  for (const [key, value] of searchParams.entries()) {
    if (!value) continue;
    // Build query string compatible with target API
    parameterizedUrl.searchParams.set('where', `${key} IN (${value})`.replace(/\+/g, '%20'));
  }
  // /!\ searchParams.set encodes spaces as '+', but target API requires spaces as ASCII %20
  return parameterizedUrl.toString().replace(/\+/g, '%20');
}

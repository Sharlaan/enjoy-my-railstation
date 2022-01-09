import { Endpoint, QueryParams } from '../interfaces';

// TODO: Put these in config or .env
const API_URL = 'https://ressources.data.sncf.com/api/v2/catalog/datasets/';

/**
 * Builds the 'gare' search params, when stations are specified in request
 */
export function formatURL({ field, url }: Endpoint, queryParams?: QueryParams['gares']) {
  const parameterizedUrl = new URL(API_URL + url);
  if (!queryParams) return parameterizedUrl;

  // Build query string compatible with target API
  parameterizedUrl.searchParams.set('where', `${field} IN (${queryParams})`);

  // /!\ searchParams.set encodes spaces as '+', but target API requires spaces encoded as ASCII %20
  return new URL(parameterizedUrl.toString().replace(/\+/g, '%20'));
}

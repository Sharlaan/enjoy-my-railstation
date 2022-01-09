import fetch from 'node-fetch';
import { formatURL } from '../helpers';
import { ApiResponse, ApiTarget, QueryParams } from '../interfaces';

// TODO: Put these in config or .env
const SERVICES_ENDPOINT = { url: 'gares-pianos/records', field: 'gare' };
const FREQUENTATIONS_ENDPOINT = { url: 'frequentation-gares/records', field: 'nom_gare' };

// TODO: Implement a generic hook useFetch<ExpectedResponseType> and refactor ApiService
export class ApiService {
  static getStationsServices(gares?: QueryParams['gares']) {
    const url = formatURL(SERVICES_ENDPOINT, gares);
    return fetch(url).then((res) => res.json()) as Promise<ApiResponse<ApiTarget.SERVICES>>;
  }

  static getFrequentations(gares?: QueryParams['gares']) {
    const url = formatURL(FREQUENTATIONS_ENDPOINT, gares);
    return fetch(url).then((res) => res.json()) as Promise<ApiResponse<ApiTarget.FREQUENTATIONS>>;
  }
}

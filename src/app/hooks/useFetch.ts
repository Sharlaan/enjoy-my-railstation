// import { useStore } from 'vuex';
// import { AuthState } from '../modules/auth/auth.store';
// import { RootState } from '../store';
// import { FetchData, QueryParams } from './api.interfaces';

// const API_URL = 'insert server base api url';

// /**
//  * Notes : this is a base fetch implement to be used in services
//  * (It were copied from an old project, just to show how i would implement it)
//  */

// /**
//  * Native Fetch extended with
//  * auth, global loading, query params and generic typings
//  *
//  * check SWRV: more advanced alternative (caching, ...)
//  */
// export default async function useFetch<R>({
//   endpoint,
//   params,
//   options,
//   isPublic = false,
// }: FetchData) {
//   const url = appendQueryParams(API_URL + endpoint, params);
//   const store = useStore<RootState>();

//   store.commit('toggleLoading');

//   const response = await fetch(url, {
//     ...defaultHeaders(isPublic),
//     ...options,
//     // Nice idea to factorize 'JSON.stringify' out from requests,
//     // but too much trouble to type options.body as RequestInit.BodyInit
//     // ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
//   });

//   store.commit('toggleLoading');

//   // if (!response.ok) throw new Error(`ERROR ${response.status}: ${response.statusText}`);
//   if (!response.ok) throw response;
//   return (await response.json()) as R;
// }

// function defaultHeaders(isPublic: boolean): RequestInit {
//   const store = useStore<AuthState>();
//   const headers = new Headers();
//   headers.set('Content-Type', 'application/json'); // add charset if managing non-utf8 languages
//   if (!isPublic) {
//     const token = store.state.token;
//     if (!token) throw new Error('You are trying to reach a secured endpoint without token');
//     headers.set('Authorization', `Bearer ${token}`);
//     store.dispatch('');
//   }
//   return { headers };
// }

// function appendQueryParams(url: string, params: QueryParams = {}) {
//   if (!url) return '';
//   if (!Object.keys(params).length) return url;

//   const parameterizedUrl = new URL(url);
//   for (const [key, value] of Object.entries(params)) {
//     value && parameterizedUrl.searchParams.set(key, value);
//   }

//   return parameterizedUrl.toString();
// }

// // function appendQueryParams(url: string, params?: QueryParams) {
// //   if (!url) return '';
// //   if (!params || !Object.keys(params).length) return url;

// //   const queryString = Object.keys(params)
// //     .reduce<string[]>(
// //       (qs, key) =>
// //         params[key]
// //           ? qs.concat(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
// //           : qs,
// //       [],
// //     )
// //     .join('&');

// //   return `${url}?${queryString}`;
// // }

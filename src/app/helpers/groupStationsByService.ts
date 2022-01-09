import { ApiTarget, LinkedRecord, RailStationServices, ServiceName } from '../interfaces';

const serviceNames = Object.values(ServiceName);

/**
 * Note: when 'best' flag is used in query params,
 * the routine will add the 'bestStation' property
 * to hold the number of services and prevent
 * re-requesting this endpoint later for computeBestStation()
 */
export function groupStationsByService(
  records: LinkedRecord<ApiTarget.SERVICES>[],
  best?: string, // 'withBest',
) {
  const hasBest = best !== undefined;

  return records.reduce<RailStationServices<typeof best>>((results, { record: { fields } }) => {
    serviceNames.forEach((serviceName) => {
      if (fields[serviceName]) {
        // FIXME: Fix typing issue
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        results[serviceName] ||= { stations: [], ...(hasBest ? { bestStation: [] } : {}) };
        results[serviceName].stations.push(fields.gare);
        hasBest && (results[serviceName].bestStation as number[]).push(fields[serviceName]);
      }
    });
    return results;
  }, {});
}

// function groupBy<T, K extends keyof unknown>(list: T[], getKey: (item: T) => K) {
//   return list.reduce<Record<K, T[]>>((previous, currentItem) => {
//     const group = getKey(currentItem);
//     previous[group] ||= [];
//     previous[group].push(currentItem);
//     return previous;
//   }, {});
// }

// Note: could use the new Array.groupBy (currently at ES stage3)

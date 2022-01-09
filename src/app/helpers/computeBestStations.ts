import { ApiResponse, ApiTarget, RailStationServices } from '../interfaces';

/**
 * Extends services with property 'bestStation'
 *
 * Services should have 'bestStation' for each service, thanks to the flag 'hasBest',
 * containing the number of each service present in each station,
 * then the routine will transform those quantities into ratios, exploiting frequentations data.
 * And finally, replace bestStation value with the station name having highest ration.
 */
export function computeBestStations(
  services: RailStationServices<'withBest'>,
  frequentations: ApiResponse<ApiTarget.FREQUENTATIONS>,
) {
  const getFrequentationByStation = (stationName: string) =>
    frequentations.records.find(({ record }) => record.fields.nom_gare === stationName)?.record
      .fields.total_voyageurs_2020 || 1; // Assuming a station gets at worse one customer per year

  return Object.fromEntries(
    Object.entries({ ...services }).map(([serviceName, { stations, bestStation }]) => {
      // Make TS understand that 'bestStation' is of type number[]
      if (!Array.isArray(bestStation))
        throw '"bestStation" property should be a number[] at this point';
      // Calculate ratios in each station for the given service
      bestStation = bestStation.map(
        (num, index) => num / getFrequentationByStation(stations[index]),
      );
      const bestRatio = Math.max(...bestStation);
      bestStation = stations.find((_, index) => bestStation[index] === bestRatio) || '';

      return [serviceName, { stations, bestStation }];
    }),
  );
}

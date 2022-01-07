import { RailStationServices } from '../interfaces/railstationService.interfaces';
import { ApiResponse, ServiceName } from '../interfaces/sncf-resources.interfaces';

/**
 * Notes on implementations :
 * 1st version is more solid (if record.fields had variable fields),
   but trigger TS error when"Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'RailStationServices'.
  No index signature with a parameter of type 'string' was found on type 'RailStationServices'.
 * 2nd version is TS happy but record.fields must NOT have any optional field
 */

export function groupStationsByService(res: ApiResponse): RailStationServices {
  return res.records.reduce((results, { record }) => {
    // Object.entries(record.fields).forEach(([field, fieldValue]) => {
    //   if (field.toUpperCase() in ServiceName && fieldValue) {
    //     results[field] ||= { stations: [] };
    //     results[field].stations.push(record.fields.gare);
    //   }
    // });
    Object.values(ServiceName).forEach((serviceName) => {
      if (record.fields[serviceName]) {
        results[serviceName] ||= { stations: [] };
        results[serviceName].stations.push(record.fields.gare);
      }
    });
    return results;
  }, {} as RailStationServices);
}

// Note: could use the new Array.groupBy (currently at ES stage3)

import { ServiceName } from './sncf-resources.interfaces';

export type RailStationServices = {
  [N in ServiceName]: {
    stations: string[]; // Rail station names
    bestStation?: string; // One single rail station name
  };
};

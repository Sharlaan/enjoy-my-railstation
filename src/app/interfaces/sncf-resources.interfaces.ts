interface Link {} // not explicited since useless

export enum ServiceName {
  BABY_FOOT = 'baby_foot',
  DISTR_HISTOIRES_COURTES = 'distr_histoires_courtes',
  PIANO = 'piano',
  POWER_STATION = 'power_station',
}

// export enum ServiceName {
//   'baby_foot',
//   'distr_histoires_courtes',
//   'piano',
//   'power_station',
// }

// export type ServiceName = 'baby_foot' | 'distr_histoires_courtes' | 'piano' | 'power_station';

interface Record {
  fields: { [S in ServiceName]: number } & {
    gare: string;
    total: number;
    uic: string;
  };
  id: string;
  size: number;
  timestamp: Date;
}

interface LinkedRecord {
  links: Link[];
  record: Record;
}

export interface ApiResponse {
  links: Link[];
  records: LinkedRecord[];
  total_count: number;
}

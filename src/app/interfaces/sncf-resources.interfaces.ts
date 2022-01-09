type Link = unknown; // not explicited since useless

export enum ServiceName {
  BABY_FOOT = 'baby_foot',
  DISTR_HISTOIRES_COURTES = 'distr_histoires_courtes',
  PIANO = 'piano',
  POWER_STATION = 'power_station',
}
// export type ServiceName = 'baby_foot' | 'distr_histoires_courtes' | 'piano' | 'power_station';

export enum ApiTarget {
  FREQUENTATIONS = 'frequentations',
  SERVICES = 'services',
}

type Fields<T extends ApiTarget> = T extends ApiTarget.SERVICES
  ? { [S in ServiceName]: number } & {
      gare: string;
      total: number;
      uic: string;
    }
  : {
      code_postal: string;
      code_uic_complet: string;
      nom_gare: string;
      segmentation_drg_: string;
      total_voyageurs_2020: number;
      total_voyageurs_non_voyageurs_: number;
    };

interface Record<T extends ApiTarget> {
  fields: Fields<T>;
  id: string;
  size: number;
  timestamp: Date;
}

export interface LinkedRecord<T extends ApiTarget> {
  links: Link[];
  record: Record<T>;
}

export interface ApiResponse<T extends ApiTarget> {
  links: Link[];
  records: LinkedRecord<T>[];
  total_count: number;
}

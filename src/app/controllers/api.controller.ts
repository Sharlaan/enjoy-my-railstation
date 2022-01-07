import { Get, HttpResponseOK } from '@foal/core';
// import fetch from 'node-fetch';
import { RailStationService } from '../entities';

const API_URL = 'https://ressources.data.sncf.com/api/v2/catalog/datasets/gares-pianos/records';

export class ApiController {
  @Get('/services')
  async getServices() {
    // const services = await fetch(API_URL);
    const services: RailStationService[] = [
      {
        name: 'piano',
        stations: ['Nantes', 'Angers Saint-Laud'],
        bestStation: 'Angers Saint-Laud',
      },
      {
        name: 'distr_histoires_courtes',
        stations: ['Nantes', 'Angers Saint-Laud'],
        bestStation: 'Angers Saint-Laud',
      },
      {
        name: 'power_station',
        stations: ['Nantes'],
        bestStation: 'Nantes',
      },
    ];
    // TODO: reformat services array to match expected object
    // TODO: exploit query params if present, using URL.searchParams
    return new HttpResponseOK<RailStationService[]>(services);
  }
}

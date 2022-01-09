import {
  Context,
  Get,
  HttpResponseInternalServerError,
  HttpResponseOK,
  Log,
  ValidateQueryParam,
} from '@foal/core';
import { computeBestStations, groupStationsByService } from '../helpers';
import { QueryParams, RailStationServices } from '../interfaces';
import { ApiService } from '../services';

@Log('ApiController', { query: true })
export class ApiController {
  @Get('/services')
  @ValidateQueryParam('best', undefined, { required: false })
  @ValidateQueryParam('gares', { type: 'string' }, { required: false }) // ex '"Nantes","Angers Saint-Laud"'
  async getServices({ request }: Context) {
    const { best, gares } = request.query as QueryParams;

    try {
      const response = await ApiService.getStationsServices(gares);
      if (!response.total_count) throw 'No service found';
      const services = groupStationsByService(response.records, best);

      let extendedServices: RailStationServices<string> | undefined;
      if (best !== undefined) {
        try {
          const frequentations = await ApiService.getFrequentations(gares);
          extendedServices = computeBestStations(services, frequentations);
        } catch (error) {
          console.error(error);
          return new HttpResponseInternalServerError(
            '[API_CONTROLLER getServices] Failed to calculate best stations for each service',
          );
        }
      }

      return new HttpResponseOK<RailStationServices<string | undefined>>(
        extendedServices || services,
      );
    } catch (error) {
      console.error(error);
      // TODO: Implement ErrorService, depending on NODE_ENV: don't show stacktrace in production
      return new HttpResponseInternalServerError('[API_CONTROLLER getServices] An error occured');
    }
  }
}

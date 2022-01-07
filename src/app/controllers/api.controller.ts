import {
  Context,
  Get,
  HttpResponseInternalServerError,
  HttpResponseOK,
  ValidateQueryParam,
} from '@foal/core';
import fetch from 'node-fetch';
import { formatURL, groupStationsByService } from '../helpers';
import { ApiResponse, RailStationServices } from '../interfaces';

export class ApiController {
  @Get('/services')
  @ValidateQueryParam('gare', { type: 'string' }, { required: false }) // ex '"Nantes","Angers Saint-Laud"'
  async getServices({ request }: Context) {
    const url = formatURL(request.query);

    try {
      // TODO: Put this fetch into a static service
      // TODO: Implement a generic hook useFetch<ExpectedResponseType>
      const response = (await fetch(url).then((res) => res.json())) as ApiResponse;
      if (!response.total_count) throw 'No service found';
      const services = groupStationsByService(response);
      return new HttpResponseOK<RailStationServices>(services);
    } catch (error) {
      // TODO: Implement ErrorService, depending on NODE_ENV: don't show stacktraace in production
      return new HttpResponseInternalServerError('[API_CONTROLLER getServices] An error occured');
    }
  }
}

import { controller, IAppController } from '@foal/core';
import { ApiController } from './controllers';

export class AppController implements IAppController {
  subControllers = [controller('/api', ApiController)];

  async init() {
    // No need for database here
    // await createConnection();
  }
}

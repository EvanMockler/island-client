import { inject } from 'aurelia-framework';
import { IslandLogger } from '../services/island-logger';

@inject(IslandLogger)
export class Logout {
  constructor(private ds: IslandLogger) {}

  attached() {
    this.ds.logout();
  }
}

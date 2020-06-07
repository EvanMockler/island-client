import { inject } from 'aurelia-framework';
import { IslandLogger } from '../services/island-logger';

@inject(IslandLogger)
export class Login {
  email = 'homer@simpson.com';
  password = 'Secret99';
  prompt = '';

  constructor(private ds: IslandLogger) {}

  async login(e) {
    console.log(`Trying to log in ${this.email}`);
    const success = await this.ds.login(this.email, this.password);
    if (!success) {
      this.prompt = "Oops! Try again...";
    }
  }
}

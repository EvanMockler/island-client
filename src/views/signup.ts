import { inject } from 'aurelia-framework';
import { IslandLogger } from '../services/island-logger';

@inject(IslandLogger)
export class Signup {
  firstName = 'Marge';
  lastName = 'Simpson';
  email = 'marge@simpson.com';
  password = 'secret';
  prompt = '';

  constructor(private ds: IslandLogger) {}

  signup(e) {
    console.log(`Trying to sign up ${this.email}`);
    const success = this.ds.signup(this.firstName, this.lastName, this.email, this.password);
    if (!success) {
      this.prompt = 'Oops! Try again...';
    }
  }
}

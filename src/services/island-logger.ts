import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Category, Island, RawIsland, User} from './island-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';


@inject(HttpClient, EventAggregator, Aurelia, Router)
export class IslandLogger {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  categories: Category[] = [];
  islands: Island[] = [];


  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure((http) => {
      http.withBaseUrl('http://LAPTOP-H3TFJSOQ:3000');
    });
  }

  async getCategories() {
    const response = await this.httpClient.get('/api/categories');
    this.categories = await response.content;
    console.log (this.categories);
  }

  async createCategory(category: string) {
    const cat = {
      category: category,
    };
    const response = await this.httpClient.post('/api/categories', cat);
    const newCategory = await response.content;
    this.categories.push(newCategory);
  }

  //async getUsers() {
  //  const response = await this.httpClient.get('/api/users');
  //  const users = await response.content;
  //  users.forEach(user => {
  //    this.users.set(user.email, user);
  //    this.usersById.set(user._id, user);
  //  });
  //}


  //Adding an island
  async isle(name: string, description: string, category: Category) {
    const island = {
      name: name,
      description: description,
      category: category
    };
    const response = await this.httpClient.post('/api/categories/' + category._id + '/islands', island);
    this.islands.push(island);
  }


  async getIslands() {
    this.islands=[];
    const response = await this.httpClient.get('/api/islands');
    const rawIslands: RawIsland[] = await response.content;
    console.log (this.islands);
    rawIslands.forEach(rawIsland => {
      const island = {
        name: rawIsland.name,
        description : rawIsland.description,
        category :this.categories.find(category => rawIsland.category === category._id),
        //member: this.usersById.get(rawIsland.member)
      }
      this.islands.push(island);
    });
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    await this.login(email, password);
    //await this.getCategories();
    //await this.getIslands();
    //this.changeRouter(PLATFORM.moduleName('app'));
    //return false;
  }

  async login(email: string, password: string) {
    let success = false;
    try {
      const response = await this.httpClient.post('/api/users/authenticate', { email: email, password: password });
      console.log(response.content);
      const status = await response.content;
      if (status.success) {
        this.httpClient.configure(configuration => {
          configuration.withHeader('Authorization', 'bearer ' + status.token);
        });
        localStorage.island = JSON.stringify(response.content);
        await this.getCategories();
        await this.getIslands();
        this.changeRouter(PLATFORM.moduleName('app'));
        success = status.success;
      }
    } catch (e) {
      success = false;
    }
    return success;
  }

  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.island !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.island);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }

  logout() {
    localStorage.island = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}

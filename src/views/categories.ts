import { inject } from 'aurelia-framework';
import { Category } from "../services/island-types";
import { IslandLogger } from '../services/island-logger';

@inject(IslandLogger)
export class Categories {
  categories: Category[];

  constructor(private ds: IslandLogger) {
    this.categories = ds.categories;
  }
}

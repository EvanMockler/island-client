import { inject } from 'aurelia-framework';
import { Island, Category } from "../services/island-types";
import { IslandLogger } from '../services/island-logger';

@inject(IslandLogger)
export class Isle {
  islands: Island[];
  //islandDescriptions: string[];
  //descriptions: string[];
  categories: Category[];

  constructor(private il: IslandLogger) {
    //this.il.getIslands();
    this.categories = il.categories;
    this.islands = il.islands;
    //this.islandDescriptions = ds.islandDescriptions;
  }
}

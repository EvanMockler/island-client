import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Category, Island } from '../../services/island-types';
import {IslandLogger} from "../../services/island-logger";

@inject(IslandLogger)
export class IslandForm {
  @bindable
  descriptions: string;
  @bindable
  categories: Category[] = [];

  name: "";
  description: "";
  //selectedDescription = '';
  selectedCategory : Category = null;

  constructor (private ds: IslandLogger) {}
  //constructor() {
  //  this.categories.push({ category: 'West'});
 //   this.categories.push({ category: 'East'});
 // }

  addIsland() {
        this.ds.isle(this.name, this.description, this.selectedCategory);
      }
}

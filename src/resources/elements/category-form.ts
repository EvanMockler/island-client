import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Category } from '../../services/island-types';
import { IslandLogger } from '../../services/island-logger';


@inject(IslandLogger)
export class CategoryForm {
  category: string;
  @bindable categories: Category[];


  constructor(private ds: IslandLogger) {}

  addCategory() {
    this.ds.createCategory(this.category);
  }
}

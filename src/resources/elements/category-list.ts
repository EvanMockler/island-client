import { bindable } from 'aurelia-framework';
import { Category } from '../../services/island-types';

export class CategoryList {
  @bindable
  categories: Category[];
}

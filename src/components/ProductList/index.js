import { actions } from 'sdk';
import ProductList from './ProductList';

let components = [
  {
    name: 'ProductList@pilateslovers.product-list',
    constructor: ProductList
  }
];

actions.ComponentActions.register(components);

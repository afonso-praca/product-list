import { actions } from 'sdk';
import ProductList from './ProductList/ProductList';

let components = [
  {
    name: 'ProductList@vtex.product-list',
    constructor: ProductList
  }
];

actions.ComponentActions.register(components);

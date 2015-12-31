import { actions } from 'sdk';
import Pagination from './Pagination';

let components = [
  {
    name: 'Pagination@vtex.product-list',
    constructor: Pagination
  }
];

actions.ComponentActions.register(components);

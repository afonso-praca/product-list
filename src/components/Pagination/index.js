import { actions } from 'sdk';
import Pagination from './Pagination';

let components = [
  {
    name: 'Pagination@pilateslovers.product-list',
    constructor: Pagination
  }
];

actions.ComponentActions.register(components);

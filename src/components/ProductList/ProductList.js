import React from 'react';
import { stores, utils } from 'sdk';
import GridLayout from './GridLayout/GridLayout';
import ListLayout from './ListLayout/ListLayout';
import Pagination from './Pagination/Pagination';

@utils.connectToStores()
class ProductList extends React.Component {
  static getStores() {
    return [
      stores.ContextStore,
      stores.SearchStore,
      stores.ProductStore
    ];
  }

  static getPropsFromStores() {
    let path = window.location.pathname + window.location.search;
    let searchStoreKey = [path, 'category/product-list', 'results'];

    return {
      productsIds: stores.SearchStore.getState().getIn(searchStoreKey)
    };
  }

  shouldComponentUpdate({ productsIds }) {
    if (!productsIds) {
      return false;
    }

    return true;
  }

  render() {
    let products = stores.ProductStore.getProducts(this.props.productsIds);
    let pagination = null;

    if (this.props.productsIds.length < this.props.qty) {
      pagination = (
        <Pagination
          location={this.props.location}
          skipPageRender={this.props.skipPageRender}
        />
      );
    }

    let layout = this.props.grid ?
      ( <GridLayout products={products} /> ) :
      ( <ListLayout products={products} /> );

    return (
      <div>
        { layout }
        <br />
        { pagination }
        <br />
        <br />
      </div>
    );
  }
}

export default ProductList;

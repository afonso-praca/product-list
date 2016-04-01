import React from 'react';
import { stores, connectToStores } from 'sdk';
import GridLayout from './GridLayout/GridLayout';
import ListLayout from './ListLayout/ListLayout';
import './ProductList.less';
import './ProductListCustom.less';

const Placeholder = stores.ComponentStore.getState().getIn(['Placeholder@vtex.storefront-sdk', 'constructor']);

@connectToStores()
class ProductList extends React.Component {
  static getStores() {
    return [
      stores.ContextStore,
      stores.SearchStore
    ];
  }

  static getPropsFromStores = (props) => {
    let path = props.location.pathname + props.location.search;
    let searchStoreKey = [path, props.id];
    let search = stores.SearchStore.getState().getIn(searchStoreKey);
    let productsIds = search ? search.get('results') : undefined;

    return {
      productsIds
    };
  }

  shouldComponentUpdate({ productsIds }) {
    return productsIds !== undefined;
  }

  render() {
    if (!this.props.productsIds) {
      return null;
    }

    let productsIds = this.props.productsIds;
    let products = stores.ProductStore.getProducts(productsIds);
    let layout = this.props.grid ?
      ( <GridLayout products={products} /> ) :
      ( <ListLayout products={products} /> );

    return (
      <div className="ProductList">
        <div className="ProductList__inner">
          {
            productsIds.length > 0 ?
              layout :
              <h2 className="h2">
                Não encontramos nenhum produto ):
              </h2>
          }
        </div>
        <div className="ProductList__pagination">
          <Placeholder
            id="pagination"
            location={this.props.location}
            productsLength={productsIds.length}
          />
        </div>
      </div>
    );
  }
}

export default ProductList;

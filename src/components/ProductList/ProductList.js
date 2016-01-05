import React from 'react';
import { stores, connectToStores } from 'sdk';
import GridLayout from './GridLayout/GridLayout';
import ListLayout from './ListLayout/ListLayout';

const Area = stores.ComponentStore.getState().getIn(['Area@vtex.storefront-sdk', 'constructor']);

@connectToStores()
class ProductList extends React.Component {
  static getStores() {
    return [
      stores.ContextStore,
      stores.SearchStore
    ];
  }

  static getPropsFromStores = () => {
    return {
      SearchStore: stores.SearchStore.getState()
    };
  }

  shouldComponentUpdate({ location, areaPath, SearchStore }) {
    let path = location.pathname + location.search;
    let searchStoreKey = [path, `${areaPath}/product-list`, 'results'];
    let productsIds = SearchStore.getIn(searchStoreKey);

    return productsIds !== undefined;
  }

  render() {
    let path = this.props.location.pathname + this.props.location.search;
    let searchStoreKey = [path, `${this.props.areaPath}/product-list`, 'results'];
    let productsIds = this.props.SearchStore.getIn(searchStoreKey);
    let products = stores.ProductStore.getProducts(productsIds);
    let layout = this.props.grid ?
      ( <GridLayout products={products} /> ) :
      ( <ListLayout products={products} /> );

    return (
      <div>
        {
          productsIds.length > 0 ?
            layout :
            <h2 className="h2">
              Não encontramos nenhum produto ):
            </h2>
        }
        <br />
        <Area
          id={`${this.props.areaPath}/product-list/pagination`}
          areaPath={this.props.areaPath}
          location={this.props.location}
          productsLength={productsIds.length}
        />
        <br />
        <br />
      </div>
    );
  }
}

export default ProductList;

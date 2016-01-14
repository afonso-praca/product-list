import React from 'react';
import { stores, connectToStores } from 'sdk';
import GridLayout from './GridLayout/GridLayout';
import ListLayout from './ListLayout/ListLayout';
import './ProductList.less';

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

  getProductsIds = (location, areaPath, SearchStore) => {
    let path = location.pathname + location.search;
    let searchStoreKey = [path, `${areaPath}/product-list`, 'results'];

    return SearchStore.getIn(searchStoreKey) || undefined;
  }

  shouldComponentUpdate({ location, areaPath, SearchStore }) {
    let productsIds = this.getProductsIds(location, areaPath, SearchStore);

    return productsIds !== undefined;
  }

  render() {
    let productsIds = this.getProductsIds(this.props.location, this.props.areaPath, this.props.SearchStore) || [];
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
          <Area
            id={`${this.props.areaPath}/product-list/pagination`}
            areaPath={this.props.areaPath}
            location={this.props.location}
            productsLength={productsIds.length}
          />
        </div>
      </div>
    );
  }
}

export default ProductList;

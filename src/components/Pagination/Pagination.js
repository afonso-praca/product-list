import React from 'react';
import { stores, connectToStores } from 'sdk';
import LoadMore from './LoadMore/LoadMore';

@connectToStores()
class Pagination extends React.Component {
  static getStores() {
    return [
      stores.ContextStore,
      stores.FacetsStore
    ];
  }

  static getPropsFromStores() {
    return {
      FacetsStore: stores.FacetsStore.getState()
    };
  }

  getQty = (location, areaPath, FacetsStore) => {
    let path = location.pathname + location.search;
    let facets = FacetsStore.getIn([path, `${areaPath}/product-list/pagination`]);
    let category = facets ? facets.getIn(['filters', 'category']).first() : undefined;

    return category ? category.get('productQuantity') : undefined;
  }

  shouldComponentUpdate({ location, areaPath, FacetsStore }) {
    let qty = this.getQty(location, areaPath, FacetsStore);

    return qty !== undefined;
  }

  render() {
    let qty = this.getQty(this.props.location, this.props.areaPath, this.props.FacetsStore) || 0;

    return (
      <div>
        {
          this.props.productsLength < qty ?
            <LoadMore location={this.props.location} /> : null
        }
      </div>
    );
  }
}

export default Pagination;

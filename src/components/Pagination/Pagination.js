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

  shouldComponentUpdate({ location, areaPath, FacetsStore }) {
    let path = location.pathname + location.search;
    let facets = FacetsStore.getIn([path, `${areaPath}/product-list/pagination`]);
    let qty = facets ?
      facets.getIn(['filters', 'category']).first().get('productQuantity') :
      undefined;

    return qty !== undefined;
  }

  render() {
    let path = this.props.location.pathname + this.props.location.search;
    let facets = this.props.FacetsStore.getIn([path, `${this.props.areaPath}/product-list/pagination`]);
    let qty = facets.getIn(['filters', 'category']).first() ?
      facets.get('productQuantity') : 0;

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

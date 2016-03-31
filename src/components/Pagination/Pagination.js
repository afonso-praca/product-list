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

  static getPropsFromStores(props) {
    let location = stores.ContextStore.getState().get('location');
    let path = location.pathname + location.search;
    let facetsStoreKey = [path, props.id];
    let facets = stores.FacetsStore.getState().getIn(facetsStoreKey);
    let category = facets ? facets.getIn(['filters', 'category']).first() : undefined;
    let prodQty = category ? category.get('productQuantity') : undefined;

    return {
      location,
      prodQty
    };
  }

  shouldComponentUpdate({ prodQty }) {
    return prodQty !== undefined;
  }

  render() {
    if (!this.props.prodQty) {
      return null;
    }

    return (
      <div className="Pagination col-md-4 col-sm-4">
        {
          this.props.productsLength < this.props.prodQty ?
            <LoadMore location={this.props.location} itemsPerPage="12" /> : null
        }
      </div>
    );
  }
}

export default Pagination;

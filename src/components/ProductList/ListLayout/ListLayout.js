import React from 'react';
import ListProduct from './ListProduct/ListProduct';
import map from 'lodash-compat/collection/map';
import './ListLayout.less';

class ListLayout extends React.Component {
  render() {
    let products = this.props.products ?
      map(this.props.products, function(product) {
        return (
          <div key={product.slug} className="list-product-wrapper">
            <ListProduct {...product} />
            <hr className="product-separator" />
          </div>
        );
      }) :
      ( <div>Carregando</div> );

    return (
      <div className="ListLayout clearfix">
        { products }
      </div>
    );
  }
}

export default ListLayout;

import React from 'react';
import ListProduct from './ListProduct/ListProduct';
import map from 'lodash-compat/collection/map';

class ListLayout extends React.Component {
  render() {
    let products = this.props.products ?
      map(this.props.products, function(product) {
        return (
          <div key={product.slug} className="ListLayout__product">
            <ListProduct {...product} />
          </div>
        );
      }) :
      ( <div>Carregando</div> );

    return (
      <div className="ListLayout">
        { products }
      </div>
    );
  }
}

export default ListLayout;

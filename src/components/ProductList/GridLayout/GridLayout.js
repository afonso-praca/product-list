import React from 'react';
import GridProduct from './GridProduct/GridProduct';
import map from 'lodash-compat/collection/map';
import './GridLayout.less';

class GridLayout extends React.Component {
  render() {
    let products = this.props.products ?
      map(this.props.products, function(product) {
        return (
          <div
            key={product.slug}
            className="grid-product-wrapper col-xs-6 col-sm-6"
          >
            <GridProduct {...product} />
          </div>
        );
      }) :
      ( <div>Carregando</div> );

    return (
      <div className="GridLayout row-fluid clearfix">
        { products }
      </div>
    );
  }
}

export default GridLayout;

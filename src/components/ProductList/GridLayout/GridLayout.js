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
            className="GridLayout col-xs-6 col-sm-4 col-md-4 col-lg-4"
          >
            <GridProduct {...product} />
          </div>
        );
      }) :
      ( <div>Carregando</div> );

    return (
      <div className="GridLayout__wrapper row clearfix">
        { products }
      </div>
    );
  }
}

export default GridLayout;

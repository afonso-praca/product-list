import React from 'react';
import GridProduct from './GridProduct/GridProduct';
import './GridLayout.less';
import './GridLayoutCustom.less';

class GridLayout extends React.Component {
  render() {
    let products = this.props.products ?
      this.props.products.map((product) => {
        return (
          <div className="GridLayout__clear" key={product.slug}>
            <div className="GridLayout__clear-left col-xs-6 col-sm-4 col-md-4 col-lg-4">
              <GridProduct {...product} />
            </div>
            <div className="clear"></div>
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

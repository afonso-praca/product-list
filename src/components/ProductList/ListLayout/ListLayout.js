import React from 'react';
import ListProduct from './ListProduct/ListProduct';

class ListLayout extends React.Component {
  render() {
    let products = this.props.products ?
      this.props.products.map((product) => {
        return (
          <div key={product.slug} className="ListLayout__product">
            <ListProduct {...product} />
          </div>
        );
      }) :( <div>Carregando</div> );
      
    return (
      <div className="ListLayout">
        { products }
      </div>
    );
  }
}

export default ListLayout;

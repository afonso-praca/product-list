import React from 'react';
import './GridProduct.less';
import { stores } from 'sdk';
import { Link } from 'react-router';

const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);

class GridProduct extends React.Component {
  render() {
    let defaultSku = this.props.skus[0];
    let imageUrl = defaultSku.images[0].src.replace(/(#width#|#height#)/g, '80');
    let listPrice = defaultSku.offers[0].listPrice;
    let price = defaultSku.offers[0].price;

    return (
      <div className="GridProduct">
        <div className="GridProduct__item clearfix">
          <div className="GridProduct__image-wrapper">
            <img className="GridProduct__image" src={imageUrl} />
          </div>
          <div className="GridProduct__content">
            <h4 className="GridProduct__name theme__font-family--main">
              <Link className="theme__hover-color--main theme__color--black" to={`/${this.props.slug}/p`}>
                { this.props.name }
              </Link>
            </h4>
            <div className="GridProduct__price-from">
              <span>de</span> <span className="GridProduct__price-strike"><Price value={listPrice}/></span>
            </div>
            <div className="GridProduct__price-by">
              <span>por</span> <span className="GridProduct__price"><Price value={price}/></span>
            </div>
          </div>
            <Link to={`/${this.props.slug}/p`}>
              <button className="GridProduct__button theme__background-color--secondary theme__font-family--main">
                Adicionar ao Carrinho
              </button>
            </Link>
        </div>
      </div>
    );
  }
}

export default GridProduct;

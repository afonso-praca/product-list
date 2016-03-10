import React from 'react';
import './GridProduct.less';
import { stores } from 'sdk';

const Link = stores.ComponentStore.state.getIn(['Link@vtex.storefront-sdk', 'constructor']);
const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);

class GridProduct extends React.Component {
  render() {
    let defaultSku = this.props.skus[0];
    let imageUrl = defaultSku.images[0].src.replace(/(#width#|#height#)/g, '320');
    let listPrice = defaultSku.offers[0].listPrice;
    let price = defaultSku.offers[0].price;

    return (
      <div className="GridProduct">
        <div className="GridProduct__item clearfix">
          <div className="GridProduct__image-wrapper">
            <Link className="GridProduct__price-by" to={`/${this.props.slug}/p`}>
              <img className="GridProduct__image" src={imageUrl} />
            </Link>
          </div>
          <div className="GridProduct__content">
            <h4 className="GridProduct__name theme__font-family--main">
              <Link className="theme__color--dark theme__hover-color--dark" to={`/${this.props.slug}/p`}>
                { this.props.name }
              </Link>
            </h4>
            <div className="GridProduct__price-from theme__color--dark">
              <span>de </span>
              <span className="GridProduct__price-strike"><Price value={listPrice}/></span>
            </div>
            <Link className="GridProduct__price-by" to={`/${this.props.slug}/p`}>
              <div className="theme__color--accent theme__hover-color--accent">
                <span>por </span>
                <span className="GridProduct__price"><Price value={price}/></span>
              </div>
            </Link>
          </div>
            <Link to={`/${this.props.slug}/p`}>
              <button className="GridProduct__button theme__background-color--secondary theme__font-family--main theme__background-hover-color--secondary">
                Ver Mais
              </button>
            </Link>
        </div>
      </div>
    );
  }
}

export default GridProduct;

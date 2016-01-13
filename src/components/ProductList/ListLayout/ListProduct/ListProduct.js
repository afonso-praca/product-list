import React from 'react';
import './ListProduct.less';
import { stores } from 'sdk';
import { Link } from 'react-router';

const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);

class ListProduct extends React.Component {
  render() {
    let defaultSku = this.props.skus[0];
    let imageUrl = defaultSku.images[0].src.replace(/(#width#|#height#)/g, '80');
    let listPrice = defaultSku.offers[0].listPrice;
    let price = defaultSku.offers[0].price;

    return (
      <div className="ListProduct__parent">
        <div className="ListProduct">
          <Link to={`/${this.props.slug}/p`}>
            <div className="ListProduct__image-wrapper col-xs-4 col-sm-4 col-md-3 col-lg-3">
              <img className="ListProduct__image" src={imageUrl} />
            </div>
          </Link>
          <div className="ListProduct__content col-xs-8 col-sm-8 col-md-9 col-lg-9">
            <div>
              <h4 className="ListProduct__name theme__font-family--main">
                <Link to={`/${this.props.slug}/p`} className="theme__color--dark theme__hover-color--dark">
                  { this.props.name }
                </Link>
              </h4>
              <div className="ListProduct__price-from theme__color--dark">
                <span>de </span>
                <span className="ListProduct__price-strike">
                  <Price value={listPrice} />
                </span>
              </div>
              <Link className="ListProduct__price-by" to={`/${this.props.slug}/p`}>
                <div className="theme__color--accent theme__hover-color--accent">
                  <span>por </span>
                  <span className="ListProduct__price">
                    <Price value={price} />
                  </span>
                </div>
              </Link>
            </div>
            <Link to={`/${this.props.slug}/p`}>
              <button className="
                ListProduct__button
                theme__background-color--secondary
                theme__background-hover-color--secondary
                theme__font-family--main">
                Ver Mais
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <hr className="ListProduct__ruler" />
          </div>
        </div>
      </div>
    );
  }
}

export default ListProduct;

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
      <div className="ListProduct">
        <div className="product-grid-item row-fluid clearfix">
          <img
            className="product-image col-xs-4"
            src={imageUrl}
            width={96}
            height={96}
          />
          <div className="col-xs-8">
            <div className="row-fluid">
              <h4 className="product-name">{ this.props.name }</h4>
              <div className="product-price-from">
                <span>de</span>
                <span className="product-price-strike">
                  <Price value={listPrice} />
                </span>
              </div>
              <div className="product-price-by">
                <span>por</span>
                <span className="product-price">
                  <Price value={price} />
                </span>
              </div>
            </div>
            <div className="row-fluid">
              <Link
                to={`/${this.props.slug}/p`}
                className="product-button btn"
              >
                Comprar
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListProduct;

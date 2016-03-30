import React from 'react';
import '../../theme-variables.less';
import './ListProduct.less';
import './ListProductCustom.less';
import { stores } from 'sdk';

const Link = stores.ComponentStore.state.getIn(['Link@vtex.storefront-sdk', 'constructor']);
const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);

class ListProduct extends React.Component {
  render() {
    let defaultSku = this.props.skus[0];
    let imageUrl = defaultSku.images[0].src.replace(/(#width#|#height#)/g, '320');
    let listPrice = defaultSku.offers[0].listPrice;
    let price = defaultSku.offers[0].price;

    return (
      <div className="ListProduct__parent">
        <div className="ListProduct">
          <Link to={`/${this.props.slug}/p`}>
            <div className="ListProduct__image-wrapper col-xs-6 col-sm-4 col-md-3 col-lg-3">
              <img className="ListProduct__image" src={imageUrl} />
            </div>
          </Link>
          <div className="ListProduct__content col-xs-6 col-sm-8 col-md-9 col-lg-9">
            <div>
              <h4 className="ListProduct__name">
                <Link to={`/${this.props.slug}/p`}>
                  { this.props.name }
                </Link>
              </h4>
              <div className="ListProduct__price-from">
                <span className="ListProduct__price-strike">
                  <Price value={listPrice} />
                </span>
              </div>
              <Link className="ListProduct__price-by" to={`/${this.props.slug}/p`}>
                <div className="">
                  <span className="ListProduct__price">
                    <Price value={price} />
                  </span>
                </div>
              </Link>
            </div>
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

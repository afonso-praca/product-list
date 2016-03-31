import React from 'react';
import _ from 'underscore';
import './GridProduct.less';
import './GridProductCustom.less';
import { stores } from 'sdk';

const Link = stores.ComponentStore.state.getIn(['Link@vtex.storefront-sdk', 'constructor']);
const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);

class GridProduct extends React.Component {
  render() {
    let product = this.props;
    let defaultSku = this.props.skus[0];
    let imageUrl = defaultSku.images[0].src.replace(/(#width#|#height#)/g, '320');
    let offers = [];
    let isAvailable = false;

    _.each(product.skus, function(sku){
      _.each(sku.offers, function(offer){
        if (offer.availability > 0 && offer.price > 0){
          isAvailable = true;
        }
        offers.push(offer);
      });
    });

    var currentOffer = _.chain(offers).filter(function(offer){
      return offer.price > 0;
    }).min(function(offer){
      return offer.price;
    }).value();

    let listPrice = currentOffer.listPrice;
    let price = currentOffer.price;

    return (
      <div className={'GridProduct' + (isAvailable ? '' : ' unavailable')}>
        <div className="GridProduct__item clearfix">
          <div className="GridProduct__image-wrapper">
            <Link className="GridProduct__price-by" to={`/${this.props.slug}/p`}>
              <img className="GridProduct__image" src={imageUrl} />
            </Link>
          </div>
          <div className="GridProduct__content">
            <h4 className="GridProduct__name">
              <Link to={`/${this.props.slug}/p`}>
                { this.props.name }
              </Link>
            </h4>
            <div className={'label label-default label-unavailable' + (isAvailable ? ' hide' : '')}>esgotado</div>
            <div className="GridProduct__price-from">
              <span className="GridProduct__price-strike"><Price value={listPrice}/></span>
            </div>
            <Link className="GridProduct__price-by" to={`/${this.props.slug}/p`}>
              <div className="">
                <span className="GridProduct__price"><Price value={price}/></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default GridProduct;

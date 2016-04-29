import React from 'react';
import _ from 'underscore';
import '../../theme-variables.less';
import './ListProduct.less';
import './ListProductCustom.less';
import { stores } from 'sdk';

const Link = stores.ComponentStore.state.getIn(['Link@vtex.storefront-sdk', 'constructor']);
const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);
const Img = stores.ComponentStore.state.getIn(['Img@vtex.storefront-sdk', 'constructor']);

class ListProduct extends React.Component {
  componentWillMount() {
    this.setState({ imageSize: null });
  }

  componentDidMount() {
    this.setState({ imageSize: this.imageWrapper.clientHeight });

    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate() {
    if (this.imageWrapper.clientWidth < this.imageWrapper.scrollWidth) {
      this.setState({ imageSize: this.imageWrapper.clientWidth });
    }
  }

  componentWillUnmount() {
    this.clearResizeTimeout();
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.clearResizeTimeout();

    this.resizeTimeout = setTimeout(() => {
      this.setState({ imageSize: this.imageWrapper.clientHeight });
    }, 200);
  }

  clearResizeTimeout = () => {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
  }

  render() {
    const { imageSize } = this.state;
    const product = this.props;
    const defaultSku = this.props.skus[0];
    const imageUrl = defaultSku.images[0].src;
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

    const listPrice = currentOffer.listPrice;
    const price = currentOffer.price;

    return (
      <div className="ListProduct__parent">
          <Link to={`/${this.props.slug}/p`}>
            <div
              className="ListProduct__image-wrapper col-xs-4 col-sm-4 col-md-3 col-lg-3"
              ref={(imageWrapper) => this.imageWrapper = imageWrapper}
            >
              {
                imageSize ?
                  <Img
                    className="ListProduct__image"
                    src={imageUrl}
                    width={imageSize}
                    height={imageSize}
                  /> : null
              }
            </div>
          </Link>
          <div className="ListProduct__content col-xs-6 col-sm-8 col-md-9 col-lg-9">
            <div>
              <h4 className="ListProduct__name">
                <Link to={`/${this.props.slug}/p`}>
                  { this.props.name }
                </Link>
              </h4>
              <div className={'label label-default label-unavailable' + (isAvailable ? ' hide' : '')}>esgotado</div>
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

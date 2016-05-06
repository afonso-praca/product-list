import React from 'react';
import './GridProduct.less';
import './GridProductCustom.less';
import { stores } from 'sdk';

const Link = stores.ComponentStore.state.getIn(['Link@vtex.storefront-sdk', 'constructor']);
const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);
const Img = stores.ComponentStore.state.getIn(['Img@vtex.storefront-sdk', 'constructor']);

const getOfferPrice = (offers) => {
  var currentOffer = offers.map((offer) => {
    if (offer.price > 0) {
      return offer;
    }
  });

  for (let i = 0; i < currentOffer.length; i++) {
    if (currentOffer[i]) {
      return {
        listPrice: currentOffer[i].listPrice,
        price: currentOffer[i].price
      }
    }
  }
}

class GridProduct extends React.Component {
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
    let isAvailable = false;

    let offers = [];
    for (var sku of product.skus) {
      for (var offer of sku.offers) {
        if (offer.availability > 0 && offer.price > 0) {
          isAvailable = true;
        }
        offers.push(offer);
      }
    }
    const offerPrice = getOfferPrice(offers);

    return (
        <div className="GridProduct__item clearfix">
          <div
            className="GridProduct__image-wrapper"
            ref={(imageWrapper) => this.imageWrapper = imageWrapper}
          >
            <Link className="GridProduct__price-by" to={`/${this.props.slug}/p`}>
              {
                imageSize ?
                  <Img
                    className="GridProduct__image"
                    src={imageUrl}
                    width={imageSize}
                    height={imageSize}
                  /> : null
              }
            </Link>
          </div>
          <div className="GridProduct__content">
            <h4 className="GridProduct__name">
              <Link to={`/${this.props.slug}/p`}>
                { this.props.name }
              </Link>
            </h4>
            {
              isAvailable ?
                <div>
                  <div className="GridProduct__price-from">
                    <span className="GridProduct__price-strike"><Price value={offerPrice.listPrice}/></span>
                  </div>
                  <Link className="GridProduct__price-by" to={`/${this.props.slug}/p`}>
                    <div className="">
                      <span className="GridProduct__price"><Price value={offerPrice.price}/></span>
                    </div>
                  </Link>
                </div> :
                <span className="label label-default label-unavailable">esgotado</span>
            }
          </div>
        </div>
    );
  }
}

export default GridProduct;

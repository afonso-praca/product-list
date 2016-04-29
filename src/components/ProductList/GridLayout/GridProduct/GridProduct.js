import React from 'react';
import './GridProduct.less';
import { stores } from 'sdk';

const Link = stores.ComponentStore.state.getIn(['Link@vtex.storefront-sdk', 'constructor']);
const Price = stores.ComponentStore.state.getIn(['Price@vtex.storefront-sdk', 'constructor']);
const Img = stores.ComponentStore.state.getIn(['Img@vtex.storefront-sdk', 'constructor']);

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
    const defaultSku = this.props.skus[0];
    const imageUrl = defaultSku.images[0].src;
    const listPrice = defaultSku.offers[0].listPrice;
    const price = defaultSku.offers[0].price;

    return (
      <div className="GridProduct">
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

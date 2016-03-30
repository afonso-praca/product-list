import React from 'react';
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
    const defaultSku = this.props.skus[0];
    const imageUrl = defaultSku.images[0].src;
    const listPrice = defaultSku.offers[0].listPrice;
    const price = defaultSku.offers[0].price;

    return (
      <div className="ListProduct__parent">
        <div className="ListProduct">
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

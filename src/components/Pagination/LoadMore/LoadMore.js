import React from 'react';
import { history } from 'sdk';
import './LoadMore.less';

class LoadMore extends React.Component {
  handleTouchTap = () => {
    let queries = {...this.props.location.query};
    let pageSize = parseInt(queries.pageSize, 10) || 10;
    queries.pageSize = pageSize + 5;

    history.replaceState(null, this.props.location.pathname, queries);
  }

  render() {
    return (
      <button className="
        LoadMore
        theme__background-color--primary
        theme__background-hover-color--primary
        theme__font-family--main"
        onTouchTap={this.handleTouchTap}
      >
        <span>Mais Produtos</span>
      </button>
    );
  }
}

export default LoadMore;

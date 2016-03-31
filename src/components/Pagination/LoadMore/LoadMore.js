import React from 'react';
import { history } from 'sdk';
import './LoadMore.less';

class LoadMore extends React.Component {
  handleTouchTap = () => {
    let queries = {...this.props.location.query};
    let pageSize = parseInt(queries.pageSize, 10) || 10;
    queries.pageSize = pageSize + parseInt(this.props.itemsPerPage, 10);
    history.replaceState(null, this.props.location.pathname, queries);
  };

  render() {
    return (
      <button className="
        LoadMore
        theme__background-color--primary
        theme__background-hover-color--primary"
        onTouchTap={this.handleTouchTap}
      >
        <span>Mais Produtos</span>
      </button>
    );
  }
}

export default LoadMore;

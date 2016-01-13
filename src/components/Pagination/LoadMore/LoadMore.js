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
      <div className="container">
        <button className="LoadMore" onTouchTap={this.handleTouchTap}>
          <span>Ver mais</span>
        </button>
      </div>
    );
  }
}

export default LoadMore;

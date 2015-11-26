import React from 'react';
import LoadMore from './LoadMore/LoadMore';

class Pagination extends React.Component {
  render() {
    return (
      <div>
        <LoadMore
          location={this.props.location}
          skipPageRender={this.props.skipPageRender}
        />
      </div>
    );
  }
}

export default Pagination;

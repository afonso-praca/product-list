import React from 'react';
import './NumberedPagination.less';

class NumberedPagination extends React.Component {
  render() {
    return (
      <nav className="NumberedPagination container">
        <div className="NumberedPagination-inner">
          <button className="NumberedPagination-button" data-is-active="false">
            Próximo
          </button>
          <div className="NumberedPagination-dot" />
          <button className="NumberedPagination-button" data-is-active="true">
            Anterior
          </button>
        </div>
      </nav>
    );
  }
}

export default NumberedPagination;

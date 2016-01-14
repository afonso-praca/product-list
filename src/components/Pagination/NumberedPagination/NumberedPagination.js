import React from 'react';
import './NumberedPagination.less';

class NumberedPagination extends React.Component {
  render() {
    return (
      <nav className="NumberedPagination">
        <div className="NumberedPagination__inner">
          <button className="NumberedPagination__button" data-is-active="false">
            Próximo
          </button>
          <div className="NumberedPagination__dot" />
          <button className="NumberedPagination__button" data-is-active="true">
            Anterior
          </button>
        </div>
      </nav>
    );
  }
}

export default NumberedPagination;

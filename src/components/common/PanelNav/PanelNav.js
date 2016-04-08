import React from 'react';
import './PanelNav.less';

class PanelNav extends React.Component {
  handleClick = () => {
    this.props.closePanel();
  }

  render() {
    return (
      <nav
        className="PanelNav"
        data-nav-type={this.props.navType}
      >
        <button
          className="header-button"
          onClick={this.handleClick}
        />
      </nav>
    );
  }
}

export default PanelNav;

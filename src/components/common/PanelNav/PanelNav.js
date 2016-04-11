import React from 'react';
import './PanelNav.less';

class PanelNav extends React.Component {
  handleTouchTap = () => {
    this.props.closePanel();
  }

  render() {
    return (
      <nav className="PanelNav" data-nav-type={this.props.navType}>
        <button className="header-button" onClick={this.handleTouchTap}/>
      </nav>
    );
  }
}

export default PanelNav;

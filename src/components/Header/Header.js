import React from 'react';

import './Header.scss';

export class Header extends React.Component {
  render() {
    const { language, dateRange, updateSettings } = this.props;
    return (
      <div className="Header">
        <div>
          <h1 className="Header__Title">
            <i className="fab fa-github" />
            <span>Trending</span>
          </h1>
          <div className="Header__Tabs">
            <a href="#" className="active">
              Discover
            </a>
            <a href="#">Dashboard</a>
          </div>
        </div>
      </div>
    );
  }
}

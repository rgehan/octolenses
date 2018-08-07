import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import './Header.scss';

const LINKS = [
  { name: 'dashboard', label: 'Dashboard' },
  { name: 'discover', label: 'Discover' },
];

const _Header = ({ page, navigateTo }) => (
  <div className="Header">
    <div>
      <h1 className="Header__Title">
        <i className="fab fa-github" />
        <span>Trending</span>
      </h1>
      <div className="Header__Tabs">
        {LINKS.map(({ name, label }) => (
          <a
            href="#"
            key={name}
            className={cx(page === name && 'active')}
            onClick={() => navigateTo(name)}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  </div>
);

export const Header = connect(
  ({ navigation }) => ({ page: navigation.page }),
  ({ navigation }) => ({ navigateTo: navigation.navigateTo })
)(_Header);

import React from 'react';
import Link from 'gatsby-link';
import avatar from './darren.jpg';
import cursorWorld from './cursorWorld';

const computedCursor = cursorWorld();

const Header = props => (
  <header>
    <img src={avatar} className={'avatar' + ` ${computedCursor}`} />
    <h1>
      I'm {props.name}, a software engineer currently living in San Francisco.
    </h1>
    <p>
      <a href="mailto:dmjenn02@gmail.com" target="_blank">
        email
      </a>
      <a href="https://twitter.com/darrenjennings/" target="_blank">
        twitter
      </a>
      <a href="https://github.com/darrenjennings" target="_blank">
        github
      </a>
      <a href="https://www.medium.com/@darrenjennings" target="_blank">
        medium
      </a>
    </p>
  </header>
);

export default Header;

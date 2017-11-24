import React from 'react'
import avatar from './darren.jpg'

const Header = props => (
  <header>
    <img src={avatar} className="avatar" />
    <h1>
      I'm {props.name}, a software engineer currently living in San Francisco.
    </h1>
    <p>
      <a href="mailto:dmjenn02@gmail.com" target="_blank">email</a>
      <a href="https://twitter.com/darrenjennings/" target="_blank">twitter</a>
      <a href="https://github.com/darrenjennings" target="_blank">github</a>
      <a href="https://www.medium.com/@darrenjennings" target="_blank">medium</a>
    </p>
  </header>
)

export default Header

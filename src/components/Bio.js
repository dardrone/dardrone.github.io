import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './avatar.jpg'
import { rhythm } from '../utils/typography'

const name = 'Darren Jennings'

class Bio extends React.Component {
  render() {
    return (
      <p
        style={{
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={name}
          className="avatar"
          style={{
            float: 'left',
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        Hello, my name is <strong>{name}</strong>. I live and work in San
        Francisco. &nbsp;<a
          target="_blank"
          href="https://twitter.com/darrenjennings"
        >
          You should follow me on Twitter!
        </a>
      </p>
    )
  }
}

export default Bio

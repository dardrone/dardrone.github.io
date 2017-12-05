import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import underline from '../components/underline.svg'
import { rhythm, scale } from '../utils/typography'
import '../scss/index.scss'
import '../scss/cursorWorld.scss'

const title = 'darren jennings'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname !== rootPath) {
      header = (
        <h1
          style={{
            ...scale(0.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            margin: '0 auto',
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Assistant, monospace',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        />
      )
    }
    return (
      <Container>
        {header}
        {children()}
      </Container>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template

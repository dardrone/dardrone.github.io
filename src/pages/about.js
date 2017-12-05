import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { Container } from 'react-responsive-grid'
import { rhythm } from '../utils/typography'
import Header from '../components/Header'

class About extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')} />
        <section id="wrapper" className="home">
          <Container
            style={{
              maxWidth: rhythm(40),
            }}
          >
            <h1>Hello, my name is darren.</h1>
            <p>I'm a software engineer. Here is some of my work:</p>
          </Container>
        </section>
      </div>
    )
  }
}

About.propTypes = {
  route: React.PropTypes.object,
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

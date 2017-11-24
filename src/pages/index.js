import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { Container } from 'react-responsive-grid'
import { rhythm } from '../utils/typography'

import Header from '../components/Header'

const name = 'Darren Jennings'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title={get(this, 'props.data.site.siteMetadata.title')}/>
        <section id="wrapper" className="home">
          <Header name={name} style={{marginBottom: '50px'}}/>
          <Container
            style={{
              maxWidth: rhythm(40),
            }}
          >
          <em style={{color:'#616161'}}>Recent posts:</em>
            {posts.map(post => {
              if (post.node.path !== '/404/') {
                const title =
                  get(post, 'node.frontmatter.title') || post.node.path
                return (
                  <div key={post.node.frontmatter.path}>
                    <h3>
                      <Link
                        style={{ boxShadow: 'none' }}
                        to={post.node.frontmatter.path}
                      >
                        {post.node.frontmatter.title}
                      </Link>
                    </h3>
                    <small>{post.node.frontmatter.date}</small>
                    <p
                      dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
                    />
                  </div>
                )
              }
            })}
          </Container>
        </section>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

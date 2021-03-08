import React from 'react'
import { Link, graphql } from 'gatsby'

// Utilities
import kebabCase from 'lodash/kebabCase'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Top" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Link
          to="/"
          style={{
            margin: rhythm(1),
            boxShadow: `none`,
          }}
        >
          TOP
        </Link>
        <Link
          to="/about"
          style={{
            margin: rhythm(1),
            boxShadow: `none`,
          }}
        >
          About
        </Link>
        <Link
          to="/tags"
          style={{
            margin: rhythm(1),
            boxShadow: `none`,
          }}
        >
          Tags
        </Link>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>{' '}
              {node.frontmatter.tags.map(tag => {
                return (
                  <small>
                    <Link
                      to={`/tags/${kebabCase(tag)}/`}
                      style={{ marginRight: 5 }}
                    >
                      #{tag}
                    </Link>
                  </small>
                )
              })}
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            tags
          }
        }
      }
    }
  }
`

import React from 'react'
import { Link, graphql } from 'gatsby'

// Utilities
import kebabCase from 'lodash/kebabCase'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Header from '../components/Header'
import { rhythm } from '../utils/typography'

const Paginate = ({ previousPagePath, nextPagePath }) => {
  return (
    <div
      style={{
        padding: rhythm(1 / 2),
        justifyContent: 'space-evenly',
        width: '100%',
        display: 'flex',
        fontWeight: 'bold',
        fontSize: rhythm(4 / 5),
      }}
    >
      {previousPagePath && (
        <Link to={previousPagePath} style={{ boxShadow: 'none' }}>
          ≪ New
        </Link>
      )}
      {nextPagePath && (
        <Link to={nextPagePath} style={{ boxShadow: 'none' }}>
          Old ≫
        </Link>
      )}
    </div>
  )
}

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Top" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
        <Header />
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
        <Paginate {...this.props.pageContext} />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
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

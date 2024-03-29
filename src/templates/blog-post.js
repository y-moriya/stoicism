import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

// Utilities
import kebabCase from 'lodash/kebabCase'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt}
          image={`${this.props.data.site.siteMetadata.siteUrl}${this.props.location.pathname}thumbnail.png`} />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(1),
          }}
        >
          {post.frontmatter.date}{' '}
          {post.frontmatter.tags.map((tag) => {
            return (
              <Link to={`/tags/${kebabCase(tag)}/`} style={{ marginRight: 5 }}>
                #{tag}
              </Link>
            )
          })}
        </p>
        <MDXRenderer>{post.body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
        <Link to="/">Return to Top</Link>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!, $path: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        tags
      }
      body
    }
    _: contextChangeNotInvalidingQueryWorkaround(path: $path)
  }
`

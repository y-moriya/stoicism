import Layout from '../components/Layout'
import React from 'react'
import { Link, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'

class PeriodSummary extends React.Component {
  render() {
    const { displayMonth, displayYear } = this.props.pageContext
    const siteTitle = this.props.data.site.siteMetadata.title
    const { edges, totalCount } = this.props.data.allMdx
    let displayMonthStr = ''
    if (displayMonth !== undefined) {
      displayMonthStr = `${displayMonth}月`
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <h1>
          {displayYear}年{displayMonthStr}の記事 ({totalCount})
        </h1>
        <ul>
          {edges.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.frontmatter
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>{' '}
                <small>({node.frontmatter.date})</small>
              </li>
            )
          })}
        </ul>
        <Link to="/archives">Return to Archives</Link>
        <hr
          style={{
            margin: rhythm(1),
          }}
        />
      </Layout>
    )
  }
}

export default PeriodSummary

export const query = graphql`
  query($periodStartDate: Date, $periodEndDate: Date) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 200
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { date: { gte: $periodStartDate, lt: $periodEndDate } }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
          }
        }
      }
    }
  }
`

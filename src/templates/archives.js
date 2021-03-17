import Layout from '../components/Layout'
import React from 'react'
import { Link, graphql } from 'gatsby'
import SEO from '../components/seo'

class Archives extends React.Component {
  render() {
    const { yearMonths } = this.props.pageContext
    const siteTitle = this.props.data.site.siteMetadata.title
    console.log(yearMonths)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Archives" />
        <h1>Archives</h1>
        <ul>
          {yearMonths.map((yearMonth) => {
            const [year, month] = yearMonth.split('/')
            return (
              <li key={yearMonth}>
                <Link to={`/${yearMonth}`}>
                  {year}年{month}月
                </Link>
              </li>
            )
          })}
        </ul>
      </Layout>
    )
  }
}

export default Archives

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

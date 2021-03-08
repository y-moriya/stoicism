import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Bio from '../components/Bio'

class About extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About" />
        <h1>About</h1>
        <h2>このサイトについて</h2>
        <p>主に阪神タイガースの試合観戦記を書こうと思ってます。</p>
      </Layout>
    )
  }
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

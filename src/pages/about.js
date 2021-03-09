import React from 'react'

import Layout from '../components/Layout'
import { Link, graphql } from 'gatsby'
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
        <h2>情報</h2>
        <p>このブログは Gatsby を使って Vercel にデプロイされています。</p>
        <p>ソースコードは <a href="https://github.com/y-moriya/stoicism" target="_blank" rel="noopener">https://github.com/y-moriya/stoicism</a> で公開されています。</p>
        <Bio />
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

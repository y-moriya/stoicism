import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

const isIndex = (path) => {
  const rootPath = `${__PATH_PREFIX__}/`
  if (path == rootPath) {
    return true
  } else if (path.match(/\/page\/\d+/)) {
    return true
  } else {
    return false
  }
}

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    let header

    if (isIndex(location.pathname)) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children}
        <footer>
          <h5>Page views this blog</h5>
          <iframe
            src="https://pixe.la/v1/users/euro/graphs/page-views.html?mode=simple-short"
            height="155"
            width="220"
            frameborder="0"
          ></iframe>
          <div>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org" target="_blank" rel="noopener">
              Gatsby
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout

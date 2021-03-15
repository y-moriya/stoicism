import React from 'react'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'

function Header() {
  return (
    <>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Link
        to="/"
        style={{
          margin: rhythm(0.3),
          boxShadow: `none`,
        }}
      >
        Top
      </Link>
      <Link
        to="/about"
        style={{
          margin: rhythm(0.3),
          boxShadow: `none`,
        }}
      >
        About
      </Link>
      <Link
        to="/tags"
        style={{
          margin: rhythm(0.3),
          boxShadow: `none`,
        }}
      >
        Tags
      </Link>
      <Link
        to="/archives"
        style={{
          margin: rhythm(0.3),
          boxShadow: `none`,
        }}
      >
        Archives
      </Link>
      <hr
        style={{
          marginTop: rhythm(1),
          marginBottom: rhythm(1),
        }}
      />
    </>
  )
}

export default Header

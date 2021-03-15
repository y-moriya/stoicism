const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve("src/templates/tags.js")
  const periodTemplate = path.resolve("src/templates/period-summary.js")
  const archiveTemplate = path.resolve("src/templates/archives.js")
  const indexTemplate = path.resolve("src/templates/index.js")

  const buildPaginate = posts => {
    paginate({
      createPage,
      items: posts,
      itemsPerPage: 10,
      pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
      component: indexTemplate
    })
  }
  return graphql(
    ` {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                tags
                year: date(formatString: "YYYY")
                month: date(formatString: "MM")
              }
              body
            }
          }
        }
        tagsGroup: allMdx(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges
    buildPaginate(posts)

    const years = new Set()
    const yearMonths = new Set()

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })

      const { year, month } = post.node.frontmatter
      years.add(year)
      yearMonths.add(`${year}/${month}`)
    })
    
    // Extract tag data from query
    const tags = result.data.tagsGroup.group
    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    })

    years.forEach(year => {
      createPage({
        path: `/${year}/`,
        component: periodTemplate,
        context: {
          displayYear: year,
          periodStartDate: `${year}-01-01T00:00:00.000Z`,
          periodEndDate: `${year}-12-31T23:59:59.999Z`
        }
      })
    })

    yearMonths.forEach(yearMonth => {
      const [year, month] = yearMonth.split('/')
      const startDate = `${year}-${month}-01T00:00:00.000Z`
      const newStartDate = new Date(startDate)
      const endDate = new Date(
        new Date(newStartDate.setMonth(newStartDate.getMonth() + 1)).getTime() - 1
      ).toISOString()

      createPage({
        path: `/${year}/${month}/`,
        component: periodTemplate,
        context: {
          displayYear: year,
          displayMonth: month,
          periodStartDate: startDate,
          periodEndDate: endDate
        }
      })
    })

    createPage({
      path: "/archives/",
      component: archiveTemplate,
      context: {
        yearMonths: Array.from(yearMonths)
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// plugins/gatsby-remark-og-image/index.js

const catchy = require('catchy-image')

module.exports = async ({ markdownNode }, pluginOptions) => {
  // gatsby-config.jsの設定情報とマークダウンのメタデータを画像生成ライブラリの引数に渡す
  let title = markdownNode.frontmatter.title
  let og_title = markdownNode.frontmatter.og_title
  if (markdownNode.frontmatter.tags.includes("野球")) {
    let tmp = title
    title = og_title
    og_title = tmp
  }
  const result = await catchy.generate({
    ...pluginOptions,
    output: {
      ...pluginOptions.output,
      directory: `./public${markdownNode.fields.slug}`,
      fileName: pluginOptions.output.fileName,
    },
    meta: {
      ...pluginOptions.meta,
      title: title,
      author: og_title
    }
  })

  console.info(`gatsby-remark-og-image: Successful generated: ${result}`)
}
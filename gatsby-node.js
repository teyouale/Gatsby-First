const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require(`path`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("src/templets/blog-templet.js");

  const result = await graphql(`
    {
      allMdx(filter: { fields: { slug: { regex: "/blogs/" } } }) {
        nodes {
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) reporter.panic(`Error loading posts`, JSON.stringify(result.errors));

  const posts = result.data.allMdx.nodes;

  posts.forEach((post) => {
    createPage({
      path: post.fields.slug,
      // component: postTemplate,
      component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        slug: post.fields.slug,
      },
    });
  });
};

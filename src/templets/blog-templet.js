import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";

const BlogTemplet = ({ data }) => {
  console.log(data);
  const { id, frontmatter, body } = data.mdx;
  const { title, date } = frontmatter;
  const components = {
    h1: (props) => <h1 className={`text-primary text-5xl mb-3 font-black font-serif `} {...props} />,
    h2: (props) => <h1 className={`text-secondary text-2xl mb-3 font-serif `} {...props} />,
    p: (props) => <p className='font-serif font-semibold leading-relaxed' {...props} />,
  };
  return (
    <div id={id}>
      <h1>{title}</h1>
      <h2>{date}</h2>
      <MDXProvider components={components}>{body}</MDXProvider>
    </div>
  );
};

export const query = graphql`
  query ($slug: String) {
    mdx(fields: { slug: { regex: $slug } }) {
      id
      frontmatter {
        date
        hero_image
        hero_image_alt
        title
      }
      body
    }
  }
`;

export default BlogTemplet;

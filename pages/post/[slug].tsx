import BlogArticleLayout from "layouts/blog/article";
import { GetStaticPropsResult } from "next";
import H1 from "components/elements/h1";
import Image from "next/image";
import { Post } from "types";
import React from "react";
import SEO from "components/blog/seo";
import { getMDXComponent } from "mdx-bundler/client";
import mdxComponents from "components/blog/components";
import postFromSlug from "utils/post-from-slug";
import { postSlugs } from "constants/posts";

type Props = {
  post: Post;
};

type Params = {
  params: {
    slug: string;
  };
};

function PostPage({ post }: Props) {
  const MDX = React.useMemo(
    () => getMDXComponent(post.content),
    [post.content]
  );

  const dateAdded = new Date(post.dateAdded);
  const dateUpdated = post.dateUpdated ? new Date(post.dateUpdated) : undefined;

  return (
    <>
      <SEO post={post} />
      <BlogArticleLayout>
        <header className="flex flex-col">
          <H1>{post.title}</H1>
          <p className="my-0  text-gray-700 dark:text-gray-300">
            {post.description}
          </p>

          <time
            dateTime={dateAdded.toISOString()}
            className={dateUpdated ? "text-md" : "text-lg"}
          >
            {dateAdded.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          {dateUpdated && (
            <time dateTime={dateUpdated?.toISOString()} className="text-lg">
              Edited:{" "}
              {dateUpdated.toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </header>

        {post.imageURL &&
          mdxComponents.img({
            src: post.imageURL,
            alt: post.title,
          })}
        <MDX components={mdxComponents} />
      </BlogArticleLayout>
    </>
  );
}

async function getStaticProps({
  params,
}: Params): Promise<GetStaticPropsResult<Props>> {
  return {
    props: {
      post: await postFromSlug(params.slug),
    },
  };
}

async function getStaticPaths() {
  const paths = postSlugs
    .map<string>((file) => file.replace(/\.mdx?$/, ""))
    .map<Params>((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export default PostPage;
export { getStaticProps, getStaticPaths };

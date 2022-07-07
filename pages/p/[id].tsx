import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from 'components/Layout';
import { PostProps } from 'components/Post';
import prisma from 'lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  console.log({ post });
  const serializedPost = JSON.parse(JSON.stringify(post));
  console.log({ serializedPost });
  /* LEFTOFF ok this works but seems stupid, and somehow it worked fine before...
  possibly create a util to just wrap everything
  
  convert the parse n stringify to use this superjson thing instead, as i am concerned about performance
  doing it this way for large arrays.
  https://github.com/blitz-js/superjson#using-with-nextjs
  */

  return {
    props: serializedPost,
  };
};

const Post: React.FC<PostProps> = (props) => {
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={props.content} />
      </div>
    </Layout>
  );
};

export default Post;

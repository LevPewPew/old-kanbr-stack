import React from 'react';
import { GetStaticProps } from 'next';
import Layout from 'components/Layout';
import Post, { PostProps } from 'components/Post';
import prisma from 'clients/prisma';
import { trpc } from 'utils/trpc';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return { props: { feed } };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const hello = trpc.useQuery(['hello', { text: 'Mr. Foo' }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <h2>{hello.data.greeting}</h2>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;

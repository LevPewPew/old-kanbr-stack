import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  createdAt: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author';
  const createdAt = new Date(post.createdAt).toDateString();

  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <p>{createdAt}</p>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;

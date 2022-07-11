import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id: postId } = req.query;

  if (typeof postId === 'object') {
    res.status(400).send('List of IDs not supported');
    return;
  }

  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: postId },
    });

    res.json(post);
  } else {
    throw new Error(`The HTTP request method ${req.method} is not supported at this route.`);
  }
}

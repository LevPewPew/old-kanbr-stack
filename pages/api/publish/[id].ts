import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'clients/prisma';

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id: postId } = req.query;

  if (typeof postId === 'object') {
    res.status(400).send('List of IDs not supported');
    return;
  }

  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });

  res.json(post);
}

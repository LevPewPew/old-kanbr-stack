// NEXT figure out next Request types
// import { Request } from 'next';
import prisma from 'lib/prisma';

// PUT /api/publish/:id
export default async function handle(req, res) {
  const { id } = req.query;
}

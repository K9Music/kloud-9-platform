import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const artType = searchParams.get('artType');
  const search = searchParams.get('search');
  const where = {};
  if (artType) where.artType = artType;
  if (search) {
    where.OR = [
      { username: { contains: search } },
      { name: { contains: search } },
      { bio: { contains: search } },
    ];
  }
  const profiles = await prisma.profile.findMany({
    where,
    select: {
      id: true,
      username: true,
      name: true,
      artType: true,
      bio: true,
      photoUrl: true,
      bannerUrl: true,
      genre: true,
      stageName: true,
      showcase: true,
    },
    orderBy: { name: 'asc' },
  });
  return new Response(JSON.stringify(profiles), { status: 200 });
}
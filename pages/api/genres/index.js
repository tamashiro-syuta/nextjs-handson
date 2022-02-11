import getConfig from 'next/config';
import { PrismaClient } from '@prisma/client';

// prismaからデータの一覧を取得
const getGenres = async () => {
  const prisma = new PrismaClient();
  const genres = await prisma.genres.findMany();

  return genres;
};

// prismaのgenresテーブルに新しくデータをセット
const createGenre = async ({ code, name }) => {
  const prisma = new PrismaClient();
  const genre = await prisma.genres.create({
    data: {
      code,
      name,
    },
  });

  return genre;
};

const genres = async (req, res) => {
  switch (req.method) {
    // GET通信の場合 --> getGenresで一覧を返す
    case 'GET':
      return res.status(200).json(await getGenres());
    // POST通信の場合 --> createGenresで新しくデータをセットし、返す
    case 'POST':
      return res.status(201).json(await createGenre(req.body));
    // どれでもない場合 --> 405ページを返す
    default:
      return res.status(405).end();
  }
};

export default genres;

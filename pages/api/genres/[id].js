// pages/api/genres/[id].js というファイルを作成すると
// api/genres/1 のようにアクセスでき、req.query.id で取り出すことができる

// 【PUTとPATCHの違い】
// PUT は(レコード全体の)置換
// PATCH は更新になる

// nameだけ受け取った場合に
// ・PATH -> nameだけ更新する
// ・PUT  -> nameを更新するが、codeは指定がないのでnullにする(元々値があればそれがnullになってしまう)
// など、システムによって解釈が変わるかもしれないことに注意
// 今回は指定ないカラムは操作しないという意味でPATCH(更新)にしている

import getConfig from 'next/config';
import { PrismaClient } from '@prisma/client';

const getGenre = async (id) => {
  const prisma = new PrismaClient();
  const genre = await prisma.genres.findUnique({
    where: {
      id,
    },
  });

  return genre;
};

// 値の更新
const updateGenre = async (id, { code, name }) => {
  const prisma = new PrismaClient();

  const data = {};
  if (code) data.code = code;
  if (name) data.name = name;

  const genre = await prisma.genres.update({
    where: {
      id,
    },
    data,
  });

  return genre;
};

const deleteGenre = async (id) => {
  const prisma = new PrismaClient();
  await prisma.genres.delete({
    where: {
      id,
    },
  });
};

const genre = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return res.status(200).json(await getGenre(parseInt(req.query.id, 10)));
      break;
    case 'PATCH':
      return res.status(200).json(await updateGenre(parseInt(req.query.id, 10), req.body));
      break;
    case 'DELETE':
      await deleteGenre(parseInt(req.query.id, 10));
      return res.status(204).end();
      break;

    default:
      res.status(405).end();
      break;
  }
};

export default genre;

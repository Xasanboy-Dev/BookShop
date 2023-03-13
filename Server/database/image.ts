import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function editImageURL(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  const editedUser = await prisma.user.update({
    where: { id },
    data: { imageURL: `http://localhost:8080/${id}.png` },
  });
  return editedUser;
}

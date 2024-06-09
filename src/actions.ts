"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prisma from "./lib/db";

export async function createPost(formdata: FormData) {
  try {
    await prisma.post.create({
      data: {
        title: formdata.get("title") as string,
        slug: (formdata.get("title") as string)
          .replace(/\s+/g, "-")
          .toLowerCase(),
        content: formdata.get("content") as string,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log('"Unique constraint failed on the {constraint}"');
      }
    }
  }

  revalidatePath("/");
}

export async function editPost(formdata: FormData, id: string) {
  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title: formdata.get("title") as string,
      slug: (formdata.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formdata.get("content") as string,
    },
  });

  revalidatePath("/");
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}

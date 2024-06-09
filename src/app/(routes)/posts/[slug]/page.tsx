import prisma from "@/lib/db";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}

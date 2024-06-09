import { createPost } from "@/actions";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const postCount = await prisma.post.count();

  const posts = await prisma.post.findMany({});
  return (
    <main className="flex h-full w-full flex-col items-center gap-y-5 bg-gray-100 pt-24">
      <h1 className="text-3xl font-semibold">All posts ({postCount})</h1>
      <ul className="border-b border-t border-black/10 py-5 leading-8">
        {posts &&
          posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between px-5"
            >
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
      </ul>

      <form action={createPost} className="flex w-[300px] flex-col gap-y-2">
        <input
          type="text"
          name="title"
          placeholder="title"
          className="rounded-md px-2 py-1"
        />
        <textarea
          name="content"
          rows={5}
          placeholder="Content"
          className="px-2 py-1"
        />
        <button
          type="submit"
          className="rounded-sm bg-blue-500 py-2 text-white"
        >
          Create post
        </button>
      </form>
    </main>
  );
}

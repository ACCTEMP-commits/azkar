import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Author,
  BlogMdxFrontmatter,
  getAllBlogsFrontmatter,
} from "@/lib/markdown";
import { formatDate2, stringToDate } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AriaDocs - Blog",
};

export default async function BlogIndexPage() {
  const blogs = (await getAllBlogsFrontmatter()).sort(
    (a, b) => stringToDate(b.date).getTime() - stringToDate(a.date).getTime()
  );
  return (
    <div className="flex flex-col gap-1 sm:min-h-[91vh] min-h-[88vh] pt-2">
      <div className="mb-7 flex flex-col gap-2">
        <h1 className="sm:text-3xl text-2xl font-extrabold">
          درر علمية وفوائد مننقاة
        </h1>
        <p className="text-muted-foreground sm:text-[16.5px] text-[14.5px]">
          مقالات نافعة وفوائد مجمعة من المشايخ وطلاب العلم
        </p>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-4 mb-5">
        {blogs.map((blog) => (
          <BlogCard {...blog} slug={blog.slug} key={blog.slug} />
        ))}
      </div>
    </div>
  );
}

function BlogCard({
  date,
  title,
  description,
  slug,
  cover,
  authors,
}: BlogMdxFrontmatter & { slug: string }) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="flex flex-col gap-2 items-start border rounded-md py-5 px-3 min-h-[400px]"
    >
      <h3 className="text-md font-semibold -mt-1 pr-7">{title}</h3>
      <div className="w-full">
   <Image
  src={cover}
  alt={title}
  width={400}       // أو أي عرض تحبه
  height={220}      // احسبه على نفس النسبة
  className="object-contain rounded-md border"
/>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex items-center justify-between w-full mt-auto" dir="rtl">
        <p className="text-[13px] text-muted-foreground">
          نشر بتاريخ {formatDate2(date)}
        </p>
        <AvatarGroup users={authors} />
      </div>
    </Link>
  );
}

function AvatarGroup({ users, max = 4 }: { users: Author[]; max?: number }) {
  const displayUsers = users.slice(0, max);
  const remainingUsers = Math.max(users.length - max, 0);

  return (
    <div className="flex items-center">
      {displayUsers.map((user, index) => (
        <Avatar
          key={user.username}
          className={`inline-block border-2 w-9 h-9 border-background ${
            index !== 0 ? "-ml-3" : ""
          } `}
        >
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>
            {user.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingUsers > 0 && (
        <Avatar className="-ml-3 inline-block border-2 border-background hover:translate-y-1 transition-transform">
          <AvatarFallback>+{remainingUsers}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

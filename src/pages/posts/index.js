import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import img from "../../images/img.jpg";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const response = await data.json();
    console.log("ress", response);
    setPosts(response);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      Posts:{" "}
      <section class="bg-white dark:bg-gray-900">
        <div class="container px-6 py-10 mx-auto">
          <h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            From the blog
          </h1>

          <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            {posts.map((post) => (
              <div class="lg:flex" key={post.id}>
                <Image
                  class="object-cover w-full h-56 rounded-lg lg:w-64"
                  layout=""
                  width={300}
                  height={200}
                  src={img}
                  alt=""
                />

                <div class="flex flex-col justify-between py-6 lg:mx-6">
                  <Link
                    href={`/posts/${post.id}`}
                    class="text-xl font-semibold text-gray-800 hover:underline dark:text-white "
                  >
                    {post.title}
                  </Link>

                  <span class="text-sm text-gray-500 dark:text-gray-300">
                    On: 20 October 2019
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

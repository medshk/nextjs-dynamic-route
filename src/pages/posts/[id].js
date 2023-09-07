import React from "react";

export default function Post({ post, comments }) {
  console.log(comments);
  const filteredComments = comments.filter(
    (comment) => comment.postId === post.id
  );
  return (
    <div className="flex  justify-center w-screen h-screen">
      <div className="container w-fit">
        <div className="w-[50rem] h-96">
          <h2 className="text-4xl my-10 text-yellow-400"> {post.title}</h2>
          <p className="text-xl">body: {post.body}</p>
        </div>

        <div className="comments mt-10 w-[50rem] border border-yellow-200 h-96 rounded">
          {filteredComments.map((comment) => (
            <div
              key={comment.id}
              className="h-16 border border-yellow-200 mx-4 mt-6 rounded-lg p-4"
            >
              {comment.body}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  const res2 = await fetch("https://jsonplaceholder.typicode.com/comments");
  const comments = await res2.json();

  // Pass post data to the page via props
  return { props: { post, comments } };
}

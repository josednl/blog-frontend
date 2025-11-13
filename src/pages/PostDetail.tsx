import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { postsAPI } from "@/services/post/postAPI";
import type { Post } from "@/types/post";
import { CommentsSection } from "@/components/CommentsSection";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      setLoading(true);
      if (!id) throw new Error("Invalid post ID");
      const response = await postsAPI.getById(id);
      setPost(response);
    } catch {
      setError("Error loading post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-800 dark:text-gray-200">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">{error}</p>;
  if (!post)
    return <p className="text-center text-gray-500">Post not found.</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link
        to="/"
        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {post.title}
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Published on{" "}
          {new Date(post.createdAt).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {post.content.map((block) => {
          if (block.type === "paragraph") {
            return (
              <p key={block.id} className="text-gray-800 dark:text-gray-200 mb-4 leading-relaxed">
                {block.content}
              </p>
            );
          }

          if (block.type === "image") {
            const image = post.images.find((img) => img.id === block.id);
            return image ? (
              <img
                key={block.id}
                src={
                  image.url.startsWith("http")
                    ? image.url
                    : `${import.meta.env.VITE_API_URL}${image.url}`
                }
                alt={image.originalName}
                className="w-full h-auto my-4 rounded-lg"
              />
            ) : null;
          }

          return null;
        })}
      </article>
      {post && <CommentsSection postId={post.id} />}
    </main>
  );
};

export default PostDetail;

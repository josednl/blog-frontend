import { useEffect, useState } from "react";
import { postsAPI } from "@/services/post/postAPI";

interface Image {
  id: string;
  url: string;
  originalName: string;
  type: "POST" | "COMMENT" | "PROFILE";
}

interface ContentBlock {
  id?: string;
  type: "paragraph" | "image";
  content?: string;
}

interface Post {
  id: string;
  title: string;
  content: ContentBlock[];
  createdAt: string;
  images: Image[];
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await postsAPI.getAll();
      setPosts(response);
    } catch {
      setError("Error loading posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-800 dark:text-gray-200">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center md:text-left">
          Latest Posts
        </h1>
      </div>

      {posts.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center">There are no posts yet.</p>
      )}

      <div className="flex flex-col gap-8">
        {posts.map((post) => {
          const featuredImage = post.images?.length > 0 ? post.images[0] : undefined;
          const previewText =
            post.content?.find((b) => b.type === "paragraph")?.content ?? "No content";

          return (
            <article
              key={post.id}
              className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {featuredImage && (
                <div className="md:w-1/3 w-full h-48 md:h-auto">
                  <img
                    src={
                      featuredImage.url.startsWith("http")
                        ? featuredImage.url
                        : `${import.meta.env.VITE_API_URL}${featuredImage.url}`
                    }
                    alt={featuredImage.originalName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col justify-between md:w-2/3">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Publicado el{" "}
                    {new Date(post.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                    {previewText}
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href={`/posts/${post.id}`}
                    className="inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { commentsAPI } from "@/services/comment/commentAPI";
import type { Comment } from "@/types/comment";
import { showSuccessToast } from "@/utils/toasts/showSuccessToast";
import { showErrorToast } from "@/utils/toasts/showErrorToast";
import { useAuth } from "@/services/auth/authProvider";

const UserAvatar = ({
  username,
  profilePicUrl,
}: {
  username: string | null;
  profilePicUrl: string | undefined;
}) => {
  const initial = username ? username.charAt(0).toUpperCase() : "A";

  const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 overflow-hidden";

  let finalImageUrl: string | undefined;

  if (profilePicUrl) {
    if (profilePicUrl.startsWith("http") || profilePicUrl.startsWith("data:")) {
      finalImageUrl = profilePicUrl;
    } else {
      finalImageUrl = `${import.meta.env.VITE_API_URL}${profilePicUrl}`;
    }
  }

  if (finalImageUrl) {
    return (
      <div className={baseClasses}>
        <img
          src={finalImageUrl}
          alt={`Profile picture of ${username ?? "Anonymous"}`}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  const bgColor = username
    ? `bg-indigo-500`
    : `bg-gray-400`;

  return (
    <div className={`${baseClasses} ${bgColor}`}>
      {initial}
    </div>
  );
};

const CommentItem = ({ comment }: { comment: Comment }) => {
  const username = comment.user?.username ?? "Anonymous";
  const profilePicUrl = comment.user?.profilePic?.url;
  const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex space-x-3">
      <UserAvatar username={username} profilePicUrl={profilePicUrl} />

      <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start mb-1">
          <div>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 block">
              {username}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </span>
          </div>

          <button className="text-gray-400 hover:text-red-500 transition duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-800 dark:text-gray-200 mt-2 text-base leading-relaxed">
          {comment.content}
        </p>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 ml-0 pl-4 border-l-2 border-indigo-200 dark:border-indigo-600 space-y-3">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {comment.replies.length} Replies
            </p>
            {comment.replies.map((r) => (
              <div key={r.id} className="flex space-x-3">
                <UserAvatar username={r.user?.username ?? "Anonymous"} profilePicUrl={r.user?.profilePic?.url} />
                <div className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 block">
                    {r.user?.username ?? "Anonymous"}
                  </span>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                    {r.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CommentsSection = ({ postId }: { postId: string }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await commentsAPI.getByPost(postId);
      console.log(response);
      setComments(response);
    } catch (err: any) {
      showErrorToast(err.message || "Error loading comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You need to log in to comment.");
      return;
    }
    if (!newComment.trim()) return;

    try {
      setPosting(true);
      await commentsAPI.create({ postId, content: newComment, userId: user.id });
      setNewComment("");
      showSuccessToast("Comment posted!");
      fetchComments();
    } catch (err: any) {
      showErrorToast(err || "Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  return (
    <section className="mt-12 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-10 p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg bg-indigo-50 dark:bg-gray-800/50">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 rounded-lg border border-indigo-300 dark:border-indigo-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder-gray-500 dark:placeholder-gray-400 transition"
          rows={3}
          placeholder={user ? "Share your thoughts..." : "Log in to post a comment..."}
          disabled={!user}
        />
        <button
          type="submit"
          disabled={posting || !user || !newComment.trim()}
          className={`mt-3 w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-[1.01] ${posting || !user || !newComment.trim()
              ? "opacity-50 cursor-not-allowed shadow-none"
              : "shadow-indigo-500/50"
            }`}
        >
          {posting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          <p className="ml-3 text-lg text-gray-500 dark:text-gray-400">
            Loading comments...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 italic py-5">
              Be the first to comment!
            </p>
          ) : (
            comments.map((c) => <CommentItem key={c.id} comment={c} />)
          )}
        </div>
      )}
    </section>
  );
};

import { createClient } from '@/lib/supabase/server';
import { Post } from '@/types/index';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center text-red-600">
          An error occurred while loading the posts
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All posts</h1>
        <Link
          href="/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
        >
          Create new post
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No posts yet</p>
          <Link
            href="/posts/new"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create first post
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post: Post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {post.content.substring(0, 150)}...
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>📅 {formatDate(post.created_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import DeletePostButton from '@/components/delete-post-button';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { id } = await params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isAuthor = user?.id === post.author_id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          href="/posts"
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          ← Back to posts
        </Link>
      </div>

      <article className="bg-white p-8 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {post.title}
            </h1>
            <p className="text-gray-500 text-sm">
              📅 {formatDate(post.created_at)}
            </p>
            {post.updated_at !== post.created_at && (
              <p className="text-gray-400 text-xs mt-1">
                Updated: {formatDate(post.updated_at)}
              </p>
            )}
          </div>

          {isAuthor && (
            <div className="flex space-x-2">
              <Link
                href={`/posts/edit/${post.id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 text-sm font-medium"
              >
                Edit
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </div>

        <div className="prose max-w-none">
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}
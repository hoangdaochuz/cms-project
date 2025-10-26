'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Post } from '@/types';
import { toast } from 'sonner';
import PostForm from '@/components/post-form';
import PostsLoadingSkeleton from '@/components/posts-loading-skeleton';

export default function EditPostPage() {
  const [state, setState] = useState({
    title: '',
    content: '',
    submitting: false,
    fetchingPost: true,
    post: null as Post | null,
  });

  const router = useRouter();
  const params = useParams();
  const supabase = createClient();
  useEffect(() => {
    fetchPost();
  }, [params.id]);

  const fetchPost = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast.error('Please login');
        router.push('/auth/login');
        return;
      }

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      // Check if user is the author
      if (data.author_id !== user?.id) {
        toast.error('You do not have permission to edit this post');
        router.push('/posts');
        return;
      }

      setState(prev => ({
        ...prev,
        post: data,
        title: data.title,
        content: data.content,
      }));
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Post not found');
      router.push('/posts');
    } finally {
      setState(prev => ({ ...prev, fetchingPost: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, submitting: true }));

    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: state.title,
          content: state.content,
        })
        .eq('id', params.id);

      if (error) throw error;

      toast.success('Update post successfully!');
      router.push(`/posts/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Cannot update post');
    } finally {
      setState(prev => ({ ...prev, submitting: false }));
    }
  };

  if (state.fetchingPost) {
    return <PostsLoadingSkeleton />;
  }

  if (!state.post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Post not found</p>
      </div>
    );
  }

  return (
    <PostForm
      title={state.title}
      content={state.content}
      onTitleChange={(title) => setState(prev => ({ ...prev, title }))}
      onContentChange={(content) => setState(prev => ({ ...prev, content }))}
      onSubmit={handleSubmit}
      loading={state.submitting}
      formTitle="Edit post"
      submitText={state.submitting ? 'Updating...' : 'Update post'}
      backUrl={`/posts/${params.id}`}
    />
  );
}

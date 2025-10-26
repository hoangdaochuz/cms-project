'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import PostForm from '@/components/post-form';
import { useCurrentUserLoggedIn } from '@/utils/hooks';
import PostsLoadingSkeleton from '@/components/posts-loading-skeleton';

export default function NewPostPage() {
  const [state, setState] = useState({
    title: '',
    content: '',
    submitting: false,
  });
  const router = useRouter();
  const supabase = createClient();
  const { user: currentUser, loading: currentUserLoading } = useCurrentUserLoggedIn();
  useEffect(() => {
    if (!currentUser && !currentUserLoading) {
      router.push('/auth/login');
    }
  }, [currentUser, currentUserLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(prev => ({ ...prev, submitting: true }));

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            title: state.title,
            content: state.content,
            author_id: currentUser?.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success('Post created successfully!');
      router.push(`/posts/${data.id}`);
      router.refresh();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Cannot create post');
    } finally {
      setState(prev => ({ ...prev, submitting: false }));
    }
  };
  if (currentUserLoading) {
    return <PostsLoadingSkeleton />;
  }

  return (
    <PostForm
      title={state.title}
      content={state.content}
      onTitleChange={(title) => setState(prev => ({ ...prev, title }))}
      onContentChange={(content) => setState(prev => ({ ...prev, content }))}
      onSubmit={handleSubmit}
      loading={state.submitting}
      formTitle="Create new post"
      submitText={state.submitting ? 'Creating...' : 'Create post'}
      backUrl="/posts"
    />
  );
}

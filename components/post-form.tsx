'use client';

import Link from 'next/link';

interface PostFormProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  formTitle: string;
  submitText: string;
  backUrl: string;
}

export default function PostForm({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  loading,
  formTitle,
  submitText,
  backUrl,
}: PostFormProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          href={backUrl}
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          ← Back
        </Link>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{formTitle}</h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              required
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter content..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {submitText}
            </button>
            <Link
              href={backUrl}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-gray-700"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

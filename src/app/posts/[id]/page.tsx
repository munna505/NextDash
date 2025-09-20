'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useFetch } from '@/hooks/useFetch';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string;

  const { data: post, loading: postLoading, error: postError } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  const { data: user, loading: userLoading } = useFetch<User>(
    post ? `https://jsonplaceholder.typicode.com/users/${post.userId}` : ''
  );

  if (postLoading) return <Loading />;
  if (postError) return <Error message={postError} />;
  if (!post) return <Error message="Post not found" />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link 
          href="/posts"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Posts
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Post Details</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="mb-6">
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              Post #{post.id}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{post.body}</p>
        </Card>

        {userLoading ? (
          <Card>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </Card>
        ) : user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Author Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</label>
                  <p className="text-gray-900 dark:text-white">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Username</label>
                  <p className="text-gray-900 dark:text-white">@{user.username}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                  <p className="text-gray-900 dark:text-white">{user.email}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : null}
      </motion.div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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

export default function PostsPage() {
  const [useInvalidEndpoint, setUseInvalidEndpoint] = useState(false);
  const endpoint = useInvalidEndpoint 
    ? 'https://jsonplaceholder.typicode.com/invalid-posts' 
    : 'https://jsonplaceholder.typicode.com/posts';
  
  const { data: posts, loading, error } = useFetch<Post[]>(endpoint);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => setUseInvalidEndpoint(false)} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Posts</h1>
            <p className="text-gray-600 dark:text-gray-300">Browse all posts from our community</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setUseInvalidEndpoint(!useInvalidEndpoint)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                useInvalidEndpoint
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {useInvalidEndpoint ? 'Fix Error' : 'Simulate Error'}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {posts?.slice(0, 12).map((post, index) => (
          <motion.div key={post.id} variants={itemVariants}>
            <Link href={`/posts/${post.id}`}>
              <Card hover className="h-full">
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow line-clamp-3 mb-4">
                    {post.body}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>Post #{post.id}</span>
                    <span>User {post.userId}</span>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {posts && posts.length > 12 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 dark:text-gray-400">
            Showing 12 of {posts.length} posts
          </p>
        </motion.div>
      )}
    </div>
  );
}

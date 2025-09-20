'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn } from 'next-auth/react';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { useFetch } from '@/hooks/useFetch';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [useInvalidEndpoint, setUseInvalidEndpoint] = useState(false);

  // Debug logging
  console.log('Users Page - Session status:', status);
  console.log('Users Page - Session data:', session);
  
  const endpoint = useInvalidEndpoint 
    ? 'https://jsonplaceholder.typicode.com/invalid-users' 
    : 'https://jsonplaceholder.typicode.com/users';
  
  const { data: users, loading, error } = useFetch<User[]>(endpoint);

  // Show loading state while checking authentication
  if (status === 'loading') {
    return <Loading />;
  }

  // Show sign-in message if not authenticated
  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Sign in to see users
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You need to be signed in to view the users list.
            </p>
            <button
              onClick={() => signIn('google')}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign in with Google
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Users</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your team members and their information</p>
          </div>
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
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-white dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {users?.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    variants={itemVariants}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">{user.company.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Details</h2>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Name</label>
                        <p className="text-gray-900 dark:text-white">{selectedUser.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Email</label>
                        <p className="text-gray-900 dark:text-white">{selectedUser.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Phone</label>
                        <p className="text-gray-900 dark:text-white">{selectedUser.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Website</label>
                        <p className="text-gray-900 dark:text-white">{selectedUser.website}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Company Name</label>
                        <p className="text-gray-900 dark:text-white">{selectedUser.company.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Catch Phrase</label>
                        <p className="text-gray-900 dark:text-white italic">"{selectedUser.company.catchPhrase}"</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Business</label>
                        <p className="text-gray-900 dark:text-white">{selectedUser.company.bs}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Address</h3>
                    <div className="space-y-2">
                      <p className="text-gray-900 dark:text-white">
                        {selectedUser.address.street}, {selectedUser.address.suite}
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {selectedUser.address.city}, {selectedUser.address.zipcode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { useSession } from 'next-auth/react';

export default function DashboardHome() {
  const { data: session } = useSession();
  const router = useRouter();

  const stats = [
    { title: 'Total Posts', value: '100', change: '+12%', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-600', changeColor: 'text-blue-600' },
    { title: 'Active Users', value: '1,234', change: '+8%', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-600', changeColor: 'text-green-600' },
    { title: 'Page Views', value: '45.6K', change: '+23%', color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-600', changeColor: 'text-purple-600' },
    { title: 'Revenue', value: '$12.3K', change: '+15%', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-600', changeColor: 'text-orange-600' },
  ];

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to your Dashboard
        </h1>
        <p className="text-gray-200 text-lg">
          {session ? `Hello, ${session.user?.name || session.user?.email}!` : 'Please sign in to access your dashboard.'}
        </p>
      </motion.div>

      {/* Animated Chart Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Analytics Overview</h2>
              <p className="text-blue-100">Your dashboard performance metrics</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.title} variants={itemVariants}>
            <Card className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} ${stat.textColor} mb-4`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">{stat.title}</p>
              <div className="flex items-center justify-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 14l3-3 3 3 4-4" />
                </svg>
                <span className={`text-sm font-semibold ${stat.changeColor}`}>
                  {stat.change} from last month
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

 
    </div>
  );
}

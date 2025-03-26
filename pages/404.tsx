
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Cygint</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <h2 className="mt-4 text-2xl font-medium text-gray-700 dark:text-gray-300">Page Not Found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">The page you are looking for does not exist or has been moved.</p>
        <Link 
          href="/" 
          className="mt-6 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}

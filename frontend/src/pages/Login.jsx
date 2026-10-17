import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <LoginForm />
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        Don't have an account yet?{' '}
        <Link to="/register" className="font-semibold text-[var(--accent-tomato)] hover:underline">
          Create one now
        </Link>
      </p>
    </div>
  );
}

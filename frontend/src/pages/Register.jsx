import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <RegisterForm />
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-[var(--accent-tomato)] hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}

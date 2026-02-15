import React from 'react';
import Hero from '../components/Hero';
import Rules from '../components/Rules';
import RegistrationForm from '../components/RegistrationForm';
import { motion } from 'framer-motion';

const FormPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-10"
    >
      <Hero />
      <Rules />
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-3xl font-heading font-bold text-white mb-2">Register Your Squad</h2>
        <p className="text-gray-400">Join the battleground and prove your worth.</p>
      </div>
      <RegistrationForm />
      
      <footer className="text-center text-gray-600 py-10 text-sm">
        <p>© 2025 Thalta Championship. Organized by Mahatab.</p>
        <a href="#/admin" className="text-gray-800 hover:text-gray-600 mt-2 inline-block">Admin Login</a>
      </footer>
    </motion.div>
  );
};

export default FormPage;
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 relative overflow-hidden",
        isActive ? "ring-2 ring-brand-orange shadow-[0_0_20px_rgba(234,88,12,0.15)]" : "",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default Card;
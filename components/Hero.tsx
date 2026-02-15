import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Clock } from 'lucide-react';
import { TOURNAMENT_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Background FX */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/20 via-brand-dark to-brand-dark" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 z-10 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-4 bg-brand-red/20 border border-brand-red/50 rounded-full px-4 py-1"
        >
          <span className="text-brand-orange text-sm font-bold animate-pulse">LIVE</span>
          <span className="text-gray-300 text-xs font-mono tracking-widest uppercase">Registration Open</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2 tracking-tight"
        >
          CHAMPIONS <span className="text-brand-red animate-glitch block md:inline">LEAGUE</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-brand-orange font-gaming font-bold uppercase tracking-widest mb-12 flex items-center justify-center gap-2"
        >
          Free Fire Tournament <span className="text-2xl">🔥</span>
        </motion.p>

        {/* Stats Bar */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-lg flex items-center gap-4">
            <div className="bg-brand-red/20 p-3 rounded-md text-brand-red">
              <Trophy size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase font-mono">Prize Pool</p>
              <p className="text-lg font-bold font-heading text-brand-gold">Loading...</p>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-lg flex items-center gap-4">
            <div className="bg-brand-orange/20 p-3 rounded-md text-brand-orange">
              <Users size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase font-mono">Start Date</p>
              <p className="text-lg font-bold font-heading text-white">{TOURNAMENT_INFO.startDate}</p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-lg flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-md text-purple-400">
              <Clock size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase font-mono">Map Pool</p>
              <p className="text-lg font-bold font-heading text-white">5 Maps</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-brand-orange rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const { transactionId, teamName } = location.state || { transactionId: 'UNKNOWN', teamName: 'Your Team' };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md"
      >
        <Card className="text-center border-green-500/30 bg-green-900/10">
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="bg-green-500 text-black p-4 rounded-full"
            >
              <CheckCircle size={48} />
            </motion.div>
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Registration Complete!</h1>
          <p className="text-gray-300 mb-8">Welcome to the arena, <span className="text-brand-orange font-bold">{teamName}</span>.</p>
          
          <div className="bg-black/40 p-4 rounded-lg mb-8 text-left space-y-2 border border-white/10">
            <div>
              <p className="text-xs text-gray-500 uppercase">Transaction ID</p>
              <p className="font-mono text-lg text-white">{transactionId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Status</p>
              <p className="text-green-400 font-bold">Pending Verification</p>
            </div>
          </div>

          <div className="space-y-4">
            <a 
              href="https://wa.me/01755913070" 
              target="_blank" 
              rel="noreferrer"
              className="block w-full"
            >
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <MessageCircle className="mr-2" size={20} /> Join WhatsApp Group
              </Button>
            </a>
            
            <Link to="/" className="block w-full">
              <Button variant="outline" className="w-full">
                Register Another Team
              </Button>
            </Link>
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            Take a screenshot of this receipt for your records.
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOURNAMENT_INFO, BENGALI_TEXT } from '../constants';
import { Map, AlertTriangle, DollarSign, Info } from 'lucide-react';
import Card from './ui/Card';

const Rules: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General Info', icon: <Info size={16} /> },
    { id: 'maps', label: 'Maps', icon: <Map size={16} /> },
    { id: 'prize', label: 'Prize Pool', icon: <DollarSign size={16} /> },
    { id: 'rules', label: 'Rules', icon: <AlertTriangle size={16} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10" id="rules">
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-brand-red text-white shadow-lg shadow-brand-red/25'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <Card className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'general' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-heading text-white mb-4">Tournament Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs uppercase">Organizer</p>
                    <p className="text-xl font-bold">{TOURNAMENT_INFO.organizer}</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs uppercase">Entry Fee</p>
                    <p className="text-xl font-bold text-brand-orange">{TOURNAMENT_INFO.entryFee} <span className="text-sm text-gray-400">/ Squad</span></p>
                  </div>
                  <div className="col-span-1 md:col-span-2 bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-gray-400 text-xs uppercase mb-2">Contact (WhatsApp)</p>
                    <a 
                      href={`https://wa.me/88${TOURNAMENT_INFO.contact}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-mono text-lg font-bold"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                      {TOURNAMENT_INFO.contact}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'maps' && (
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-heading mb-6">Map Pool & Schedule</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {TOURNAMENT_INFO.maps.map((map) => (
                    <span key={map} className="px-4 py-2 bg-gray-700 rounded-lg text-sm font-bold tracking-wide border border-gray-600">
                      {map}
                    </span>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg inline-block">
                  <p className="text-yellow-500 font-bold flex items-center justify-center gap-2">
                    <AlertTriangle size={18} />
                    {BENGALI_TEXT.mapsNote}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'prize' && (
              <div className="text-center space-y-6">
                 <h3 className="text-2xl font-heading mb-6 text-brand-gold">Prize Distribution</h3>
                 <div className="p-6 bg-gradient-to-br from-brand-gold/10 to-transparent border border-brand-gold/30 rounded-xl">
                   <p className="text-2xl font-bold">{TOURNAMENT_INFO.prizePoolInfo}</p>
                   <p className="text-sm text-gray-400 mt-2">(*15% club fee deduction applicable)</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-brand-red font-bold text-3xl font-mono">{TOURNAMENT_INFO.points.kill}</p>
                      <p className="text-xs uppercase text-gray-400">Point Per Kill</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <p className="text-brand-orange font-bold text-3xl font-mono">{TOURNAMENT_INFO.points.booyah}</p>
                      <p className="text-xs uppercase text-gray-400">Booyah Points</p>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="space-y-4">
                 <h3 className="text-2xl font-heading mb-4 text-red-500">Strict Rules</h3>
                 <ul className="space-y-3">
                   {BENGALI_TEXT.rules.map((rule, idx) => (
                     <li key={idx} className="flex items-start gap-3 bg-red-900/10 p-3 rounded-md border border-red-900/30">
                       <AlertTriangle className="text-red-500 shrink-0 mt-1" size={16} />
                       <span className="text-gray-200">{rule}</span>
                     </li>
                   ))}
                 </ul>
                 <p className="text-center text-red-400 font-bold mt-4 text-sm bg-red-900/20 p-2 rounded">
                   {BENGALI_TEXT.feeWarning}
                 </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default Rules;
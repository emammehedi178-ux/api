import React, { useState } from 'react';
import { Lock, RefreshCw, Trash2, Copy, Download, Trash } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { getRegistrations, deleteRegistration, clearRegistrations, copyForGoogleSheets, exportToCSV } from '../services/storageService';
import { RegistrationData } from '../types';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'mahatab') {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert('Invalid Password');
    }
  };

  const loadData = async () => {
    setLoading(true);
    const result = await getRegistrations();
    setData(result);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      const success = await deleteRegistration(id);
      if (success) {
        // Optimistic update
        setData(data.filter(d => d.id !== id));
        // loadData(); // No need to reload whole list if simple delete
      }
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("⚠️ WARNING: This will delete ALL registrations! This action cannot be undone. Are you sure?")) {
      if (window.confirm("Double check: Are you absolutely sure?")) {
        const success = await clearRegistrations();
        if (success) {
          setData([]);
          alert("All data cleared.");
        }
      }
    }
  };

  const handleCopy = () => {
    if (copyForGoogleSheets(data)) {
      alert("Copied to clipboard! You can paste this directly into Google Sheets.");
    }
  };

  const handleExport = () => {
    exportToCSV(data);
  };

  const filteredData = data.filter(item => 
    item.teamName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.leaderPhone.includes(searchTerm)
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4">
        <Card className="w-full max-w-md border-brand-red/20">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-brand-red/10 p-4 rounded-full text-brand-red mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-heading text-white">Admin Access</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center"
            />
            <Button type="submit" className="w-full">Unlock Dashboard</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <h1 className="text-3xl font-heading text-white">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadData} disabled={loading} className="py-2 px-4">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </Button>
            <Button variant="secondary" onClick={() => setIsAuthenticated(false)} className="py-2 px-4">Logout</Button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-xs uppercase">Total Teams</p>
            <p className="text-3xl font-mono font-bold text-white">{data.length}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-xs uppercase">Pending</p>
            <p className="text-3xl font-mono font-bold text-brand-orange">{data.length}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-xs uppercase">Today</p>
            <p className="text-3xl font-mono font-bold text-blue-400">
              {data.filter(d => d.timestamp && new Date(d.timestamp).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
           <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-xs uppercase">Prize Pool (Est)</p>
            <p className="text-3xl font-mono font-bold text-brand-gold">{data.length * 80} ৳</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <Input 
            placeholder="Search team, phone, or TRX ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:max-w-sm"
          />
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" onClick={handleCopy} className="text-sm py-2 bg-green-900/20 border-green-700 text-green-500 hover:bg-green-900/40">
              <Copy size={16} className="mr-2" /> Copy for Sheets
            </Button>
            <Button variant="outline" onClick={handleExport} className="text-sm py-2 bg-blue-900/20 border-blue-700 text-blue-500 hover:bg-blue-900/40">
              <Download size={16} className="mr-2" /> Download CSV
            </Button>
            <Button variant="danger" onClick={handleClearAll} className="text-sm py-2">
              <Trash size={16} className="mr-2" /> Clear All Data
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-900 text-gray-200 uppercase font-heading text-xs">
              <tr>
                <th className="px-6 py-3 cursor-pointer hover:text-white">Timestamp</th>
                <th className="px-6 py-3 cursor-pointer hover:text-white">Team Name</th>
                <th className="px-6 py-3">Game</th>
                <th className="px-6 py-3">Leader</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-gray-800/30">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center flex flex-col items-center justify-center">
                    <div className="bg-gray-700/50 p-4 rounded-full mb-4">
                      <RefreshCw size={24} className="opacity-50" />
                    </div>
                    <p className="text-lg text-gray-300">No teams registered yet.</p>
                    <p className="text-sm text-gray-500">Share the form link to get started!</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-gray-700/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs whitespace-nowrap">
                      {row.timestamp ? new Date(row.timestamp).toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{row.teamName}</td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-700 rounded text-xs">{row.gameName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-white">{row.leaderName}</span>
                        <a href={`tel:${row.leaderPhone}`} className="text-xs hover:text-brand-orange">{row.leaderPhone}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-brand-orange text-xs uppercase font-bold">{row.paymentMethod}</span>
                        <span className="font-mono text-xs text-gray-300">{row.transactionId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button 
                         onClick={() => handleDelete(row.id || '')} 
                         className="text-gray-500 hover:text-red-500 p-2 transition-colors rounded hover:bg-red-500/10"
                         title="Delete Registration"
                       >
                         <Trash2 size={18} />
                       </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center text-xs text-gray-600">
            Showing {filteredData.length} of {data.length} records
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
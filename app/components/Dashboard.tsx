'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { DashboardEntry, ApiResponse } from '../types';

export default function Dashboard() {
  const [data, setData] = useState<DashboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [aaveRank, setAaveRank] = useState<number | null>(null);
  const [totalEntries, setTotalEntries] = useState<number>(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/dashboard?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const result: ApiResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }
      
      const allEntries = Array.isArray(result.data) ? result.data : [result.data];
      
      // Find Aave's position
      const aaveIndex = allEntries.findIndex(entry => entry.isAave);
      const aaveRankValue = result.metadata?.aaveRank || null;
      
      // Show entries around Aave's position (±5 positions)
      const displayRange = 5;
      let displayEntries = allEntries;
      
      if (aaveIndex !== -1 && allEntries.length > 10) {
        const startIndex = Math.max(0, aaveIndex - displayRange);
        const endIndex = Math.min(allEntries.length, aaveIndex + displayRange + 1);
        displayEntries = allEntries.slice(startIndex, endIndex);
      }
      
      setData(displayEntries);
      setLastUpdated(result.metadata?.lastUpdated || new Date().toISOString());
      setAaveRank(aaveRankValue);
      setTotalEntries(result.metadata?.totalEntries || allEntries.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-purple flex items-center justify-center">
        <div className="text-white text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-purple flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-lg mb-4">Error: {error}</p>
          <button 
            onClick={fetchData}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-2 rounded-lg transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-purple p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-white mb-12 animate-slide-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Aave vs Banks
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-6">
            {aaveRank ? 
              `Aave ranks #${aaveRank} among U.S. banks by deposit size.` :
              'Aave compared with top U.S. banks by deposit size.'
            }
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-xs md:text-sm text-white/60 break-all">
              Source: https://www.federalreserve.gov/releases/lbr/current/
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs md:text-sm text-white/60">
                Last updated: {lastUpdated ? formatTime(lastUpdated) : 'N/A'}
              </div>
              <button 
                onClick={fetchData}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-all duration-200 hover:scale-105"
                title="Refresh data"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="glass-effect rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-white/80 font-medium py-4 md:py-6 px-4 md:px-8 text-base md:text-lg">
                    Rank
                  </th>
                  <th className="text-left text-white/80 font-medium py-4 md:py-6 px-4 md:px-8 text-base md:text-lg">
                    Name
                  </th>
                  <th className="text-right text-white/80 font-medium py-4 md:py-6 px-4 md:px-8 text-base md:text-lg">
                    Deposits
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr 
                    key={`${entry.rank}-${entry.name}`}
                    className={`border-b border-white/10 hover:bg-white/5 transition-all duration-200 animate-fade-in ${
                      entry.isAave ? 'bg-white/10 hover:bg-white/15' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <td className="py-4 md:py-6 px-4 md:px-8">
                      <div className="text-white text-lg md:text-xl font-medium">
                        {entry.rank}
                      </div>
                    </td>
                    <td className="py-4 md:py-6 px-4 md:px-8">
                      <div className="flex items-center gap-2 md:gap-4">
                        {entry.isAave && entry.logo && (
                          <img 
                            src={entry.logo} 
                            alt="Aave logo" 
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full animate-pulse-glow"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="text-white text-base md:text-xl font-medium truncate">
                            {entry.name}
                          </div>

                        </div>
                      </div>
                    </td>
                    <td className="py-4 md:py-6 px-4 md:px-8 text-right">
                      <div className="text-white text-lg md:text-xl font-medium">
                        {entry.deposits}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/60 text-sm space-y-2">
          <p>Aave data from DeFiLlama API.</p>
          <p>
            Made with{' '}
            <span className="text-red-400 animate-pulse">❤️</span>{' '}
            by{' '}
            <a 
              href="https://x.com/dada_pera" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline hover:no-underline transition-colors duration-200"
            >
              dadapera.eth
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

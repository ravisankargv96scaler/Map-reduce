import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, ArrowRight } from 'lucide-react';
import { KeyValuePair } from '../types';

// Hardcoded initial state based on the prompt example
const initialData: KeyValuePair[] = [
  { id: '1', key: 'apple', value: 1 },
  { id: '2', key: 'banana', value: 1 },
  { id: '3', key: 'apple', value: 1 },
  { id: '4', key: 'banana', value: 1 },
  { id: '5', key: 'orange', value: 1 },
  { id: '6', key: 'apple', value: 1 },
  { id: '7', key: 'orange', value: 1 },
  { id: '8', key: 'pineapple', value: 1 },
];

const uniqueKeys = Array.from(new Set(initialData.map(d => d.key))).sort();

const TabShuffle: React.FC = () => {
  const [isShuffled, setIsShuffled] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Shuffle className="text-purple-400" />
                Phase 2: Shuffle & Sort
                </h2>
                <p className="text-slate-300 mt-2">
                The "Magic Glue" that groups all values for the same key together.
                </p>
            </div>
            <button
                onClick={() => setIsShuffled(!isShuffled)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-lg shadow-purple-900/50 transition-all transform hover:scale-105 active:scale-95"
            >
                {isShuffled ? "Reset" : "Perform Shuffle & Sort"}
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 min-h-[400px]">
          {/* Left Side: Disorganized Output */}
          <div className="md:col-span-2 bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <h3 className="text-sm uppercase font-bold text-slate-500 mb-4 text-center">Mapper Outputs (Unsorted)</h3>
            <div className="flex flex-wrap content-start gap-2">
              {!isShuffled && initialData.map((item) => (
                <motion.div
                  layoutId={item.id}
                  key={item.id}
                  className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-3 py-2 rounded font-mono text-sm cursor-default"
                >
                  ({item.key}, {item.value})
                </motion.div>
              ))}
              {isShuffled && (
                 <div className="w-full h-full flex items-center justify-center text-slate-600 italic">
                    All data sent to reducers...
                 </div>
              )}
            </div>
          </div>

          {/* Center: Network Visual */}
          <div className="md:col-span-1 flex flex-col items-center justify-center">
             <div className="h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full border border-slate-600">
                    <ArrowRight className={`text-slate-400 ${isShuffled ? 'text-purple-400' : ''}`} />
                </div>
             </div>
          </div>

          {/* Right Side: Buckets */}
          <div className="md:col-span-2 space-y-4">
             <h3 className="text-sm uppercase font-bold text-slate-500 mb-4 text-center">Reducer Input (Sorted Buckets)</h3>
             {uniqueKeys.map((key) => (
                 <div key={key} className="bg-slate-900 border border-slate-700 rounded-lg p-3 min-h-[80px]">
                    <div className="text-xs font-bold text-purple-400 uppercase mb-2 border-b border-purple-500/20 pb-1 flex justify-between">
                        <span>Key: {key}</span>
                        <span>Bucket</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {/* We filter the same list, but render it here if shuffled is true */}
                        {isShuffled && initialData.filter(d => d.key === key).map(item => (
                            <motion.div
                                layoutId={item.id}
                                key={item.id}
                                className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-2 py-1 rounded font-mono text-xs"
                            >
                                {item.value}
                            </motion.div>
                        ))}
                    </div>
                 </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabShuffle;

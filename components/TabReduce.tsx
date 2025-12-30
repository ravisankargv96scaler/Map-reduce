import React, { useState } from 'react';
import { Calculator, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReduceGroup {
    key: string;
    values: number[];
    result: number | null;
}

const initialGroups: ReduceGroup[] = [
    { key: 'apple', values: [1, 1, 1], result: null },
    { key: 'banana', values: [1, 1], result: null },
    { key: 'orange', values: [1, 1], result: null },
    { key: 'pineapple', values: [1], result: null },
];

const TabReduce: React.FC = () => {
  const [groups, setGroups] = useState<ReduceGroup[]>(initialGroups);

  const handleReduce = () => {
      const newGroups = groups.map(g => ({
          ...g,
          result: g.values.reduce((a, b) => a + b, 0)
      }));
      setGroups(newGroups);
  };

  const reset = () => {
      setGroups(initialGroups);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
          <Calculator className="text-green-400" />
          Phase 3: The Reduce Step
        </h2>
        <p className="text-slate-300 mb-8">
          The Reducer takes a key and a list of values, then aggregates them into a final result.
          Here, we are summing the counts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {groups.map((group) => (
                <div key={group.key} className="flex flex-col items-center bg-slate-900 rounded-lg p-4 border border-slate-700">
                    {/* Input */}
                    <div className="w-full mb-4">
                        <div className="text-xs uppercase text-slate-500 font-bold mb-2">Input Group</div>
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded p-2 text-center text-purple-200 font-mono text-sm">
                            {group.key}: [{group.values.join(', ')}]
                        </div>
                    </div>

                    <ArrowDown className="text-slate-600 mb-4" />

                    {/* Reducer Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 ${group.result !== null ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' : 'bg-slate-700 text-slate-400'}`}>
                        <Calculator size={24} />
                    </div>

                    <ArrowDown className="text-slate-600 mb-4" />

                    {/* Output */}
                    <div className="w-full h-16 relative">
                         {group.result !== null ? (
                             <motion.div 
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute inset-0 flex items-center justify-center bg-green-600/20 border border-green-500/50 rounded text-green-400 font-bold font-mono text-lg"
                             >
                                 ({group.key}, {group.result})
                             </motion.div>
                         ) : (
                             <div className="absolute inset-0 flex items-center justify-center border border-dashed border-slate-700 rounded text-slate-600 text-sm">
                                 Waiting...
                             </div>
                         )}
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handleReduce}
            disabled={groups[0].result !== null}
            className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-green-900/50 transition-all flex items-center gap-2"
          >
            <Calculator size={20} />
            Run Reduce (Sum)
          </button>
          
          {groups[0].result !== null && (
               <button
               onClick={reset}
               className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-full transition-all"
             >
               Reset
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TabReduce;

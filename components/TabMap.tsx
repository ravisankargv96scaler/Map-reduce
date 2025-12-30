import React, { useState } from 'react';
import { Server, ArrowDown } from 'lucide-react';
import { KeyValuePair } from '../types';

const TabMap: React.FC = () => {
  const [splits, setSplits] = useState([
    "apple banana apple",
    "banana orange",
    "apple orange pineapple"
  ]);

  const [mappedData, setMappedData] = useState<KeyValuePair[][]>([[], [], []]);
  const [isMapped, setIsMapped] = useState(false);

  const handleMap = () => {
    const newMappedData = splits.map((text, splitIndex) => {
      if (!text.trim()) return [];
      return text.trim().split(/\s+/).map((word, wordIndex) => ({
        id: `s${splitIndex}-w${wordIndex}`,
        key: word.toLowerCase(),
        value: 1
      }));
    });
    setMappedData(newMappedData);
    setIsMapped(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
          <Server className="text-blue-400" />
          Phase 1: The Map Step
        </h2>
        <p className="text-slate-300 mb-6">
          The input data is split into chunks. A "Mapper" function processes each chunk in parallel.
          For Word Count, we simply emit <code>(word, 1)</code> for every word we see.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {splits.map((text, i) => (
            <div key={i} className="flex flex-col space-y-4">
              {/* Input Card */}
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 relative group">
                <div className="absolute -top-3 left-4 bg-slate-800 px-2 text-xs font-mono text-blue-400 border border-blue-500/30 rounded">
                  Split #{i + 1}
                </div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-1">Input Data</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => {
                    const newSplits = [...splits];
                    newSplits[i] = e.target.value;
                    setSplits(newSplits);
                    setIsMapped(false);
                  }}
                  className="w-full bg-slate-800 text-white border border-slate-600 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                />
              </div>

              <div className="flex justify-center">
                <ArrowDown className={`text-slate-600 ${isMapped ? 'text-blue-500 animate-bounce' : ''}`} />
              </div>

              {/* Output Card */}
              <div className={`bg-slate-900 border ${isMapped ? 'border-blue-500/50 bg-blue-900/10' : 'border-slate-800 bg-slate-800/50'} rounded-lg p-4 min-h-[120px] transition-all duration-300`}>
                 <div className="block text-xs uppercase text-slate-500 font-bold mb-2">Mapped Output</div>
                 {isMapped ? (
                   <div className="space-y-1">
                     {mappedData[i].map((kv) => (
                       <div key={kv.id} className="inline-block mr-2 mb-2 bg-blue-600/20 text-blue-300 border border-blue-500/30 px-2 py-1 rounded text-xs font-mono">
                         ({kv.key}, {kv.value})
                       </div>
                     ))}
                   </div>
                 ) : (
                   <span className="text-slate-600 text-sm italic">Waiting to map...</span>
                 )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleMap}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-900/50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Server size={20} />
            Run Map Function
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabMap;

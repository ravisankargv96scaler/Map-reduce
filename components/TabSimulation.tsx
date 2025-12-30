import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, FileText, Server, Shuffle, Database } from 'lucide-react';
import { motion } from 'framer-motion';

type Stage = 'idle' | 'split' | 'map' | 'shuffle' | 'reduce' | 'finished';

const TabSimulation: React.FC = () => {
  const [input, setInput] = useState("big data is big\ndata is power\npower to the people");
  const [stage, setStage] = useState<Stage>('idle');
  const [output, setOutput] = useState<string>("");

  const runSimulation = () => {
    setStage('split');
    setTimeout(() => setStage('map'), 1500);
    setTimeout(() => setStage('shuffle'), 3500);
    setTimeout(() => setStage('reduce'), 5500);
    setTimeout(() => {
        // Calculate logic
        const words = input.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w);
        const counts: Record<string, number> = {};
        words.forEach(w => counts[w] = (counts[w] || 0) + 1);
        const result = Object.entries(counts).map(([k,v]) => `(${k}, ${v})`).join('\n');
        setOutput(result);
        setStage('finished');
    }, 7500);
  };

  const reset = () => {
      setStage('idle');
      setOutput("");
  };

  // Helper to render nodes with active states
  const Node = ({ label, active, color, icon: Icon }: any) => (
      <div className={`
        flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-300
        ${active ? `border-${color}-500 bg-${color}-500/20 scale-110 shadow-[0_0_15px_rgba(var(--${color}-500),0.5)]` : 'border-slate-700 bg-slate-800 text-slate-500'}
      `}>
          <Icon size={24} className={active ? `text-${color}-400` : 'text-slate-600'} />
          <span className={`text-xs mt-1 font-bold ${active ? 'text-white' : ''}`}>{label}</span>
      </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
          <Play className="text-red-400" />
          End-to-End Simulator
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-1 space-y-4">
                <label className="block text-sm font-bold text-slate-400 uppercase">Input Text</label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={stage !== 'idle'}
                    className="w-full h-40 bg-slate-900 border border-slate-600 rounded p-3 text-slate-200 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    placeholder="Enter text to process..."
                />
                <div className="flex gap-2">
                    <button
                        onClick={runSimulation}
                        disabled={stage !== 'idle'}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-2 rounded transition-colors"
                    >
                        {stage === 'idle' ? 'Run Job' : 'Running...'}
                    </button>
                    {stage === 'finished' && (
                         <button onClick={reset} className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-white">
                             <RotateCcw size={20} />
                         </button>
                    )}
                </div>
            </div>

            {/* Visualizer */}
            <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-700 p-6 relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                
                {/* Connecting Lines (Background) */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                     {/* Horizontal lines would be complex to draw responsively in CSS alone, relying on grid layout visualization */}
                </div>

                {/* Layer 1: Input Splits */}
                <div className="flex justify-around items-center">
                    {[1, 2, 3].map(i => (
                        <Node 
                            key={i} 
                            label={`Split ${i}`} 
                            icon={FileText} 
                            active={stage === 'split' || stage === 'map'} 
                            color="slate" // Using slate, but active effect handled manually if needed
                        />
                    ))}
                </div>

                {/* Layer 2: Mappers */}
                <div className="flex justify-around items-center my-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`transition-all duration-500 ${stage === 'map' ? 'scale-110' : ''}`}>
                            <div className={`p-3 rounded border-2 flex flex-col items-center ${stage === 'map' ? 'border-blue-500 bg-blue-900/30 shadow-blue-500/50 shadow-lg' : 'border-slate-700 bg-slate-800'}`}>
                                <Server className={stage === 'map' ? 'text-blue-400' : 'text-slate-600'} />
                                <span className="text-xs font-bold mt-1 text-slate-400">Map {i}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Flying Packets Animation (Overlay) */}
                {stage === 'shuffle' && (
                    <div className="absolute inset-0 pointer-events-none">
                         {[1, 2, 3, 4, 5].map(i => (
                             <motion.div
                                key={i}
                                initial={{ top: '40%', left: `${15 + i * 15}%`, opacity: 1, scale: 1 }}
                                animate={{ top: '60%', left: '50%', opacity: 0, scale: 0.5 }}
                                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                className="absolute w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                             />
                         ))}
                    </div>
                )}

                {/* Layer 3: Reducers */}
                <div className="flex justify-center gap-12 items-center my-4">
                     {[1, 2].map(i => (
                        <div key={i} className={`transition-all duration-500 ${stage === 'reduce' ? 'scale-110' : ''}`}>
                             <div className={`p-4 rounded border-2 flex flex-col items-center ${stage === 'reduce' ? 'border-green-500 bg-green-900/30 shadow-green-500/50 shadow-lg' : 'border-slate-700 bg-slate-800'}`}>
                                <Database className={stage === 'reduce' ? 'text-green-400' : 'text-slate-600'} />
                                <span className="text-xs font-bold mt-1 text-slate-400">Reduce {i}</span>
                            </div>
                        </div>
                     ))}
                </div>

                {/* Final Output */}
                {stage === 'finished' && (
                     <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-4 left-0 right-0 mx-auto w-64 bg-slate-800 border border-slate-500 rounded shadow-xl p-4 z-10"
                    >
                        <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Final Output</h4>
                        <pre className="text-xs font-mono text-green-400 max-h-32 overflow-y-auto custom-scrollbar">
                            {output}
                        </pre>
                     </motion.div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TabSimulation;

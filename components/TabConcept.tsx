import React from 'react';
import { Database, FileText, Split, ArrowRight, Vote, Building } from 'lucide-react';

const TabConcept: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
          <Database className="text-blue-400" />
          The Big Data Problem
        </h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          Imagine you have a file so large (petabytes) that it cannot fit on a single hard drive, let alone be processed by a single CPU. 
          To solve this, we use a <strong>Divide & Conquer</strong> strategy known as MapReduce.
        </p>
        
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Vote className="text-yellow-400" />
            Analogy: The National Election
          </h3>
          <p className="text-slate-400 mb-8">
            Counting 300 million paper votes by a single person would take forever. Instead, we distribute the work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {/* Step 1: Local Count */}
            <div className="flex flex-col items-center space-y-3 relative">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500 text-blue-400">
                <FileText size={32} />
              </div>
              <h4 className="font-bold text-white">1. Map (Local Count)</h4>
              <p className="text-sm text-slate-400">
                Every polling station counts its own ballot box independently.
              </p>
              <ArrowRight className="hidden md:block absolute top-8 -right-6 text-slate-600" />
            </div>

            {/* Step 2: Shuffle */}
            <div className="flex flex-col items-center space-y-3 relative">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500 text-purple-400">
                <Split size={32} />
              </div>
              <h4 className="font-bold text-white">2. Shuffle & Sort</h4>
              <p className="text-sm text-slate-400">
                Votes for "Candidate A" are trucked to HQ A. Votes for "Candidate B" go to HQ B.
              </p>
              <ArrowRight className="hidden md:block absolute top-8 -right-6 text-slate-600" />
            </div>

            {/* Step 3: Reduce */}
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500 text-green-400">
                <Building size={32} />
              </div>
              <h4 className="font-bold text-white">3. Reduce (Final Sum)</h4>
              <p className="text-sm text-slate-400">
                Central offices sum up the local totals to declare the winner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabConcept;

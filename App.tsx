import React, { useState } from 'react';
import { Database, Server, Shuffle, Calculator, Play, BookOpen } from 'lucide-react';
import TabConcept from './components/TabConcept';
import TabMap from './components/TabMap';
import TabShuffle from './components/TabShuffle';
import TabReduce from './components/TabReduce';
import TabSimulation from './components/TabSimulation';
import TabQuiz from './components/TabQuiz';
import { Phase } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Phase>(Phase.Concept);

  const renderContent = () => {
    switch (activeTab) {
      case Phase.Concept: return <TabConcept />;
      case Phase.Map: return <TabMap />;
      case Phase.Shuffle: return <TabShuffle />;
      case Phase.Reduce: return <TabReduce />;
      case Phase.Simulation: return <TabSimulation />;
      case Phase.Quiz: return <TabQuiz />;
      default: return <TabConcept />;
    }
  };

  const navItems = [
    { id: Phase.Concept, label: 'Concept', icon: BookOpen, color: 'text-yellow-400' },
    { id: Phase.Map, label: 'Map', icon: Server, color: 'text-blue-400' },
    { id: Phase.Shuffle, label: 'Shuffle', icon: Shuffle, color: 'text-purple-400' },
    { id: Phase.Reduce, label: 'Reduce', icon: Calculator, color: 'text-green-400' },
    { id: Phase.Simulation, label: 'Simulation', icon: Play, color: 'text-red-400' },
    { id: Phase.Quiz, label: 'Quiz', icon: Database, color: 'text-slate-300' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col md:flex-row font-sans selection:bg-blue-500/30">
      
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex-shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
           <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
             <Database className="text-white" size={18} />
           </div>
           <h1 className="font-bold text-lg text-white tracking-tight">MapReduce <span className="text-blue-500">Viz</span></h1>
        </div>
        
        <div className="p-4 space-y-1 overflow-x-auto md:overflow-visible flex md:block scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap
                  ${isActive ? 'bg-slate-800 text-white shadow-md border border-slate-700' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'}
                `}
              >
                <Icon size={20} className={isActive ? item.color : 'opacity-70'} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 hidden md:block"></div>}
              </button>
            );
          })}
        </div>

        <div className="hidden md:block absolute bottom-0 left-0 p-6 w-64">
           <div className="text-xs text-slate-600 text-center">
             v1.0.0 • Interactive Learning
           </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header (Mobile only really needed, or purely decorative on desktop) */}
        <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center px-6 md:px-8 z-10">
           <h2 className="text-xl font-semibold text-white">
             {navItems.find(i => i.id === activeTab)?.label}
           </h2>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           <div className="max-w-5xl mx-auto pb-10">
              {renderContent()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;

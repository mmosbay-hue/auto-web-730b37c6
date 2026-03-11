import React from 'react';
import { Home, Compass, Radio, Library, PlusSquare, Search, Waves, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavItem = ({ icon, children, active = false }) => (
  <a href="#" className={`flex items-center space-x-4 px-4 py-2.5 rounded-lg transition-colors duration-200 group relative ${active ? 'bg-indigo-600/30 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
    {active && <motion.div layoutId="active-nav-indicator" className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-400 rounded-r-full" />}
    {icon}
    <span className="font-semibold text-sm tracking-wide">{children}</span>
  </a>
);

const PlaylistItem = ({ children, index }) => (
  <motion.a 
    href="#" 
    className="block px-4 py-1.5 text-sm text-slate-400 hover:text-white truncate transition-colors duration-200 rounded-md hover:bg-slate-800/60"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
  >
    {children}
  </motion.a>
);

const sidebarVariants = {
  open: {
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  closed: {
    x: '-100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  }
};

export default function Sidebar({ isOpen, toggleSidebar, isMobile }) {
  const playlists = [
    'Chill Mix', 'Lofi Beats', 'Indie Pop', 'Deep House', 'Acoustic Hits',
    'Focus Flow', '80s Throwback', 'RapCaviar', 'Rock Classics', 'Jazz Vibes',
    'Synthwave Dreams', 'Ambient Relaxation'
  ];

  const SidebarContent = () => (
    <div className="w-64 bg-black/30 backdrop-blur-2xl border-r border-white/5 flex flex-col p-4 space-y-8 h-full">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg shadow-lg shadow-indigo-500/20">
            <Waves size={24} className="text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-wider">Aura</span>
        </div>
        {isMobile && (
          <button onClick={toggleSidebar} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        )}
      </div>

      <nav className="space-y-2">
        <NavItem icon={<Home size={22} />} active>Home</NavItem>
        <NavItem icon={<Compass size={22} />}>Browse</NavItem>
        <NavItem icon={<Radio size={22} />}>Radio</NavItem>
      </nav>

      <div className="flex-grow flex flex-col space-y-4 overflow-hidden">
        <div className="px-4 flex justify-between items-center">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">My Library</h2>
          <button className="text-slate-500 hover:text-white transition-colors">
            <PlusSquare size={16} />
          </button>
        </div>
        <div className="relative px-2">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input type="text" placeholder="Filter..." className="w-full bg-slate-800/50 border border-slate-700 rounded-md py-1.5 pl-9 pr-3 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex-grow overflow-y-auto pr-1 -mr-4 space-y-1">
          {playlists.map((p, i) => <PlaylistItem key={p} index={i}>{p}</PlaylistItem>)}
        </div>
      </div>

      <motion.button 
        className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/30"
        whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.4)' }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-bold text-sm">Upgrade to Pro</span>
      </motion.button>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 h-full z-40"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    );
  }

  return (
    <aside className="hidden lg:block">
      <SidebarContent />
    </aside>
  );
}

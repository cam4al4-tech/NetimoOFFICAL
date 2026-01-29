import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { MessageCircle, Phone, User, Settings, PlusCircle, Menu } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: MessageCircle, label: 'Чаты' },
    { path: '/calls', icon: Phone, label: 'Звонки' },
    { path: '/profile', icon: User, label: 'Профиль' },
    { path: '/settings', icon: Settings, label: 'Настройки' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 bg-white border-r border-gray-200 h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-netimo-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
            N
          </div>
          <span className="font-bold text-2xl text-netimo-600 hidden lg:block tracking-tight">Netimo</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-netimo-50 text-netimo-600 shadow-sm" 
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn("font-medium hidden lg:block", isActive && "font-semibold")}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link to="/profile" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
             <div className="hidden lg:block overflow-hidden">
                <p className="text-sm font-semibold truncate">Алексей Петров</p>
                <p className="text-xs text-gray-400 truncate">@alex_petrov</p>
             </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-netimo-500 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">N</div>
              <span className="font-bold text-xl text-netimo-600">Netimo</span>
           </div>
           <button className="p-2 text-gray-600">
             <Menu className="w-6 h-6" />
           </button>
        </header>

        <div className="flex-1 overflow-y-auto scroll-smooth">
          <Outlet />
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden bg-white border-t border-gray-200 flex justify-around items-center px-2 py-3 pb-safe safe-area-bottom z-20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[64px]",
                  isActive ? "text-netimo-600" : "text-gray-400"
                )}
              >
                <Icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </main>
    </div>
  );
}

import React from 'react';
import { Bell, Lock, Moon, Globe, HelpCircle, LogOut, ChevronRight, Shield, Crown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Settings() {
  const settingsGroups = [
    {
      title: 'Аккаунт',
      items: [
        { icon: Bell, label: 'Уведомления и звуки', value: '' },
        { icon: Lock, label: 'Конфиденциальность', value: '' },
        { icon: Shield, label: 'Безопасность', value: '' },
      ]
    },
    {
      title: 'Внешний вид',
      items: [
        { icon: Moon, label: 'Тема', value: 'Светлая' },
        { icon: Globe, label: 'Язык', value: 'Русский' },
      ]
    },
    {
      title: 'Помощь',
      items: [
        { icon: HelpCircle, label: 'Задать вопрос', value: '' },
        { icon: HelpCircle, label: 'О приложении Netimo', value: 'v1.0.0' },
      ]
    }
  ];

  return (
    <div className="max-w-2xl mx-auto w-full h-full bg-gray-50 overflow-y-auto">
      <div className="p-6 pb-2">
         <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
      </div>

      <div className="p-4 space-y-6">
         {/* Premium Banner */}
         <Link to="/premium" className="block group">
            <div className="bg-gradient-to-r from-netimo-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg shadow-netimo-200 relative overflow-hidden">
               <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Crown className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <h3 className="font-bold text-lg">Netimo Premium</h3>
                        <p className="text-netimo-100 text-sm">Эксклюзивные функции</p>
                     </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-netimo-100 group-hover:translate-x-1 transition-transform" />
               </div>
            </div>
         </Link>

         {settingsGroups.map((group, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
               <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{group.title}</h2>
               </div>
               <div className="divide-y divide-gray-50">
                  {group.items.map((item, i) => {
                     const Icon = item.icon;
                     return (
                        <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
                           <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-netimo-50 text-netimo-600">
                                 <Icon className="w-5 h-5" />
                              </div>
                              <span className="font-medium text-gray-700">{item.label}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              {item.value && <span className="text-sm text-gray-400">{item.value}</span>}
                              <ChevronRight className="w-4 h-4 text-gray-300" />
                           </div>
                        </button>
                     );
                  })}
               </div>
            </div>
         ))}

         <button className="w-full p-4 bg-white rounded-2xl shadow-sm border border-red-100 text-red-500 font-medium flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            Выйти из аккаунта
         </button>
      </div>
    </div>
  );
}

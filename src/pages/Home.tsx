import React, { useState } from 'react';
import { Search, Edit, Plus } from 'lucide-react';
import { stories } from '../data/mock';
import { useChat } from '../context/ChatContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'groups'>('all');
  const { chats } = useChat();

  const filteredChats = chats
    .filter(c => activeTab === 'all' || (activeTab === 'groups' && c.isGroup))
    .sort((a, b) => {
      const lastMsgA = a.messages[a.messages.length - 1];
      const lastMsgB = b.messages[b.messages.length - 1];
      return (lastMsgB?.timestamp.getTime() || 0) - (lastMsgA?.timestamp.getTime() || 0);
    });

  return (
    <div className="flex h-full">
      {/* Chat List Section */}
      <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto w-full">
        
        {/* Stories - Mobile Only */}
        <div className="md:hidden p-4 pb-2 overflow-x-auto flex gap-4 scrollbar-hide border-b border-gray-100">
          <div className="flex flex-col items-center gap-1 min-w-[64px]">
             <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 text-netimo-500">
                <Plus className="w-6 h-6" />
             </div>
             <span className="text-xs text-gray-600 truncate w-full text-center">Ваша история</span>
          </div>
          {stories.map(story => (
            <div key={story.id} className="flex flex-col items-center gap-1 min-w-[64px]">
               <div className={`w-16 h-16 rounded-full p-[2px] ${story.viewed ? 'bg-gray-200' : 'bg-gradient-to-tr from-netimo-400 to-purple-500'}`}>
                 <img src={story.image} alt={story.user} className="w-full h-full rounded-full object-cover border-2 border-white" />
               </div>
               <span className="text-xs text-gray-700 truncate w-full text-center">{story.user}</span>
            </div>
          ))}
        </div>

        {/* Search & Header */}
        <div className="p-4 sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
             <input 
               type="text" 
               placeholder="Поиск чатов и людей..." 
               className="w-full pl-10 pr-4 py-2.5 bg-white border-none rounded-2xl shadow-sm focus:ring-2 focus:ring-netimo-500/20 outline-none text-gray-800 placeholder:text-gray-400"
             />
           </div>
           
           <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1 bg-gray-200/50 p-1 rounded-xl">
                 <button 
                   onClick={() => setActiveTab('all')}
                   className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Все чаты
                 </button>
                 <button 
                   onClick={() => setActiveTab('groups')}
                   className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'groups' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                 >
                   Группы
                 </button>
              </div>
              <Link to="/group/create" className="p-2 text-netimo-600 hover:bg-netimo-50 rounded-full transition-colors">
                <Edit className="w-5 h-5" />
              </Link>
           </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 pb-20 md:pb-0">
          {filteredChats.map((chat) => {
            const lastMsg = chat.messages[chat.messages.length - 1];
            return (
              <Link to={`/chat/${chat.id}`} key={chat.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 hover:bg-white hover:shadow-sm rounded-2xl transition-all cursor-pointer group mb-1"
                >
                  <div className="relative">
                    <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover bg-gray-200" />
                    {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
                  </div>
                  
                  <div className="flex-1 min-w-0 border-b border-gray-100 pb-3 group-hover:border-transparent transition-colors">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <span className={`text-xs ${chat.unreadCount > 0 ? 'text-netimo-600 font-medium' : 'text-gray-400'}`}>
                        {lastMsg ? format(lastMsg.timestamp, 'HH:mm') : ''}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className={`text-sm truncate pr-2 max-w-[80%] ${chat.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                        {lastMsg?.senderId === 'me' && <span className="text-netimo-600">Вы: </span>}
                        {lastMsg?.text || 'Нет сообщений'}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-netimo-500 text-white text-[10px] font-bold flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stories Sidebar - Desktop Only */}
      <div className="hidden md:flex flex-col w-80 border-l border-gray-200 bg-white h-full p-6">
        <div className="flex items-center justify-between mb-6">
           <h2 className="font-bold text-lg text-gray-800">Истории</h2>
           <button className="text-netimo-600 text-sm font-medium hover:underline">Смотреть все</button>
        </div>

        <div className="space-y-4 overflow-y-auto">
           <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer border border-dashed border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-netimo-500">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900">Ваша история</p>
                <p className="text-xs text-gray-500">Нажмите чтобы добавить</p>
              </div>
           </div>

           {stories.map(story => (
             <div key={story.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <div className={`w-12 h-12 rounded-full p-[2px] ${story.viewed ? 'bg-gray-200' : 'bg-gradient-to-tr from-netimo-400 to-purple-500'}`}>
                   <img src={story.image} alt={story.user} className="w-full h-full rounded-full object-cover border-2 border-white" />
                </div>
                <div className="flex-1">
                   <p className="font-medium text-sm text-gray-900">{story.user}</p>
                   <p className="text-xs text-gray-500">1 час назад</p>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
           <div className="bg-gradient-to-br from-netimo-500 to-netimo-600 rounded-2xl p-4 text-white shadow-lg shadow-netimo-200">
              <h3 className="font-bold mb-1">Netimo Premium</h3>
              <p className="text-xs text-netimo-100 mb-3">Получите эксклюзивные функции и больше возможностей.</p>
              <Link to="/premium" className="block w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors text-center">
                Подробнее
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

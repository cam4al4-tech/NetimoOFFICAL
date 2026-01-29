import React from 'react';
import { currentUser } from '../data/mock';
import { Settings, Grid, Bookmark, UserPlus, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Cover / Header */}
      <div className="relative h-48 bg-gradient-to-r from-netimo-400 to-purple-400">
         <div className="absolute inset-0 bg-black/10"></div>
         <div className="absolute top-4 right-4 flex gap-2">
            <Link to="/settings" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">
               <Settings className="w-5 h-5" />
            </Link>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative pb-10">
         {/* Profile Info */}
         <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 mb-8">
            <div className="relative">
               <img 
                 src={currentUser.avatar} 
                 alt={currentUser.name} 
                 className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg object-cover bg-white"
               />
               <button className="absolute bottom-2 right-2 p-2 bg-netimo-500 text-white rounded-full shadow-md hover:bg-netimo-600 transition-colors">
                  <Camera className="w-4 h-4" />
               </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left pt-2 sm:pt-20">
               <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
               <p className="text-netimo-600 font-medium mb-2">{currentUser.username}</p>
               <p className="text-gray-600 max-w-md mx-auto sm:mx-0">{currentUser.bio}</p>
               
               <div className="flex items-center justify-center sm:justify-start gap-6 mt-4 text-sm">
                  <div className="text-center sm:text-left">
                     <span className="font-bold text-gray-900 block text-lg">1,240</span>
                     <span className="text-gray-500">Подписчики</span>
                  </div>
                  <div className="text-center sm:text-left">
                     <span className="font-bold text-gray-900 block text-lg">458</span>
                     <span className="text-gray-500">Подписки</span>
                  </div>
                  <div className="text-center sm:text-left">
                     <span className="font-bold text-gray-900 block text-lg">{currentUser.posts.length}</span>
                     <span className="text-gray-500">Посты</span>
                  </div>
               </div>
            </div>

            <div className="pt-0 sm:pt-20">
               <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95">
                  Редактировать
               </button>
            </div>
         </div>

         {/* Content Tabs */}
         <div className="border-b border-gray-200 mb-6">
            <div className="flex justify-center sm:justify-start gap-8">
               <button className="flex items-center gap-2 pb-3 border-b-2 border-netimo-500 text-netimo-600 font-medium">
                  <Grid className="w-5 h-5" />
                  <span>Публикации</span>
               </button>
               <button className="flex items-center gap-2 pb-3 border-b-2 border-transparent text-gray-400 hover:text-gray-600 font-medium transition-colors">
                  <Bookmark className="w-5 h-5" />
                  <span>Сохраненное</span>
               </button>
            </div>
         </div>

         {/* Posts Grid */}
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-4">
            {currentUser.posts.map((post) => (
               <div key={post.id} className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative group cursor-pointer">
                  <img src={post.image} alt="Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
               </div>
            ))}
            {/* Add Post Placeholder */}
            <div className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-netimo-500 hover:border-netimo-300 hover:bg-netimo-50 transition-all cursor-pointer">
               <Camera className="w-8 h-8 mb-2" />
               <span className="text-sm font-medium">Добавить фото</span>
            </div>
         </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to create group would go here
    navigate('/');
  };

  return (
    <div className="max-w-lg mx-auto w-full h-full bg-white flex flex-col">
      <div className="p-4 flex items-center gap-4 border-b border-gray-100">
         <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
         </Link>
         <h1 className="text-xl font-bold text-gray-900">Новая группа</h1>
      </div>

      <form onSubmit={handleCreate} className="p-6 flex-1">
         <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-netimo-100 flex items-center justify-center text-netimo-500 mb-4 cursor-pointer hover:bg-netimo-200 transition-colors relative group">
               <Camera className="w-8 h-8" />
               <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            </div>
            <p className="text-sm text-netimo-600 font-medium">Загрузить фото группы</p>
         </div>

         <div className="space-y-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Название группы</label>
               <input 
                 type="text" 
                 value={groupName}
                 onChange={(e) => setGroupName(e.target.value)}
                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-netimo-500 focus:ring-2 focus:ring-netimo-200 outline-none transition-all"
                 placeholder="Введите название..."
                 required
               />
            </div>
            
            <div className="pt-4">
               <button 
                 type="submit"
                 className="w-full py-3 bg-netimo-500 text-white rounded-xl font-bold shadow-lg shadow-netimo-200 hover:bg-netimo-600 transition-all flex items-center justify-center gap-2"
               >
                 <Check className="w-5 h-5" />
                 Создать группу
               </button>
            </div>
         </div>
      </form>
    </div>
  );
}

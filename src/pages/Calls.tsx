import React from 'react';
import { calls } from '../data/mock';
import { Phone, Video, PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'lucide-react';

export default function Calls() {
  return (
    <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
         <h1 className="text-2xl font-bold text-gray-900">Звонки</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
         {calls.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
               <Phone className="w-12 h-12 mb-2 opacity-20" />
               <p>Нет недавних звонков</p>
            </div>
         ) : (
            calls.map((call) => (
               <div key={call.id} className="flex items-center gap-4 p-3 hover:bg-white hover:shadow-sm rounded-xl transition-all cursor-pointer group">
                  <img src={call.avatar} alt={call.name} className="w-12 h-12 rounded-full object-cover" />
                  
                  <div className="flex-1">
                     <h3 className={`font-semibold ${call.status === 'missed' ? 'text-red-500' : 'text-gray-900'}`}>
                        {call.name}
                     </h3>
                     <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        {call.type === 'incoming' && call.status === 'missed' && <PhoneMissed className="w-3.5 h-3.5 text-red-500" />}
                        {call.type === 'incoming' && call.status !== 'missed' && <PhoneIncoming className="w-3.5 h-3.5" />}
                        {call.type === 'outgoing' && <PhoneOutgoing className="w-3.5 h-3.5" />}
                        <span>{call.time}</span>
                     </div>
                  </div>

                  <button className="p-2 text-netimo-500 hover:bg-netimo-50 rounded-full transition-colors">
                     <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-netimo-500 hover:bg-netimo-50 rounded-full transition-colors">
                     <Video className="w-5 h-5" />
                  </button>
               </div>
            ))
         )}
      </div>
    </div>
  );
}

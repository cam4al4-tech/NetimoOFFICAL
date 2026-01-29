import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Mic, Smile } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { motion } from 'framer-motion';

export default function ChatDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getChat, sendMessage, markAsRead } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chat = getChat(id || '');

  useEffect(() => {
    if (id) {
      markAsRead(id);
    }
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  if (!chat) {
    return <div className="flex items-center justify-center h-full">Чат не найден</div>;
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(chat.id, inputValue);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full bg-[#efeae2] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      {/* Header */}
      <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-gray-200 shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <Link to="/" className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="ml-2">
            <h2 className="font-bold text-gray-900 leading-tight">{chat.name}</h2>
            <p className="text-xs text-netimo-600 font-medium">
              {chat.online ? 'в сети' : 'был(а) недавно'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-netimo-600">
          <button className="p-2 hover:bg-netimo-50 rounded-full transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-netimo-50 rounded-full transition-colors">
            <Video className="w-6 h-6" />
          </button>
          <button className="p-2 hover:bg-netimo-50 rounded-full transition-colors text-gray-500">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 z-0">
        {chat.messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm relative text-sm md:text-base ${
                  isMe 
                    ? 'bg-netimo-500 text-white rounded-tr-none' 
                    : 'bg-white text-gray-900 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed break-words">{msg.text}</p>
                <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-netimo-100' : 'text-gray-400'}`}>
                  {format(msg.timestamp, 'HH:mm')}
                  {isMe && (
                    <span>
                      {msg.status === 'read' ? '✓✓' : '✓'}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 border-t border-gray-200 z-10">
        <form onSubmit={handleSend} className="flex items-end gap-2 max-w-4xl mx-auto">
          <button type="button" className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip className="w-6 h-6" />
          </button>
          
          <div className="flex-1 bg-gray-100 rounded-2xl flex items-center px-4 py-2 min-h-[48px]">
            <input 
              type="text" 
              placeholder="Сообщение..." 
              className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="button" className="ml-2 text-gray-400 hover:text-gray-600">
              <Smile className="w-6 h-6" />
            </button>
          </div>

          {inputValue.trim() ? (
            <button 
              type="submit" 
              className="p-3 bg-netimo-500 text-white rounded-full shadow-lg hover:bg-netimo-600 transition-all active:scale-95"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          ) : (
            <button type="button" className="p-3 bg-netimo-50 text-netimo-600 rounded-full hover:bg-netimo-100 transition-colors">
              <Mic className="w-6 h-6" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

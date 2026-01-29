import React from 'react';
import { Check, Star, Zap, Shield, Crown, UploadCloud, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Premium() {
  const features = [
    {
      icon: UploadCloud,
      title: 'Загрузка 4 ГБ',
      desc: 'Отправляйте медиа и файлы размером до 4 ГБ каждый.'
    },
    {
      icon: Zap,
      title: 'Ускоренная загрузка',
      desc: 'Скачивайте медиа и документы на максимально возможной скорости.'
    },
    {
      icon: MessageSquare,
      title: 'Распознавание голоса',
      desc: 'Читайте расшифровку голосовых сообщений, когда неудобно слушать.'
    },
    {
      icon: Shield,
      title: 'Без рекламы',
      desc: 'Никакой рекламы в публичных каналах и группах.'
    },
    {
      icon: Star,
      title: 'Уникальные реакции',
      desc: 'Анимированные эмодзи и эксклюзивные реакции на сообщения.'
    },
    {
      icon: Crown,
      title: 'Значок в профиле',
      desc: 'Особый значок рядом с вашим именем, показывающий вашу поддержку.'
    }
  ];

  return (
    <div className="h-full overflow-y-auto bg-white relative">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-netimo-100 to-white pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
           <Link to="/settings" className="p-2 hover:bg-white/50 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
           </Link>
           <span className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Netimo Premium</span>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12">
           <motion.div 
             initial={{ scale: 0.5, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ type: "spring", duration: 0.8 }}
             className="w-24 h-24 rounded-3xl bg-gradient-to-br from-netimo-400 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-netimo-200 mb-6"
           >
              <Crown className="w-12 h-12" />
           </motion.div>
           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Netimo Premium</h1>
           <p className="text-gray-600 max-w-md text-lg">
             Оформите подписку, чтобы получить доступ к эксклюзивным функциям и расширить возможности общения.
           </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
           {features.map((feature, idx) => {
             const Icon = feature.icon;
             return (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-netimo-200 hover:bg-netimo-50/30 transition-colors"
               >
                  <div className="p-2.5 rounded-xl bg-white text-netimo-600 shadow-sm">
                     <Icon className="w-6 h-6" />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                     <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
               </motion.div>
             );
           })}
        </div>

        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white text-center shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-netimo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           
           <h2 className="text-2xl font-bold mb-2 relative z-10">Годовая подписка</h2>
           <p className="text-gray-400 mb-8 relative z-10">Сэкономьте 40% при оплате за год</p>
           
           <div className="flex items-baseline justify-center gap-2 mb-8 relative z-10">
              <span className="text-5xl font-bold">1990 ₽</span>
              <span className="text-gray-400">/ год</span>
           </div>

           <button className="w-full py-4 bg-netimo-500 hover:bg-netimo-400 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-netimo-900/50 relative z-10 active:scale-95">
              Подключить Premium
           </button>
           
           <p className="mt-4 text-xs text-gray-500 relative z-10">
              Подписка продлевается автоматически. Отменить можно в любой момент.
           </p>
        </div>
        
        <div className="h-10"></div>
      </div>
    </div>
  );
}

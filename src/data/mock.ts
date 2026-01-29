// Enhanced Mock Data with Messages
export interface Message {
  id: string;
  text: string;
  senderId: string; // 'me' or other userId
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  online: boolean;
  unreadCount: number;
  messages: Message[];
}

export const currentUser = {
  id: 'me',
  name: 'Алексей Петров',
  username: '@alex_petrov',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  bio: 'Frontend разработчик. Люблю кофе и React. 🚀',
  posts: [
    { id: 'p1', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&h=500&fit=crop' },
    { id: 'p2', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=500&fit=crop' },
    { id: 'p3', image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop' },
    { id: 'p4', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop' },
  ]
};

export const initialChats: Chat[] = [
  {
    id: 'c1',
    name: 'Мария Иванова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    isGroup: false,
    online: true,
    unreadCount: 2,
    messages: [
      { id: 'm1', text: 'Привет! Как прошел твой день?', senderId: 'c1', timestamp: new Date(Date.now() - 1000 * 60 * 60), status: 'read' },
      { id: 'm2', text: 'Слушай, ты не забыл про встречу завтра?', senderId: 'c1', timestamp: new Date(Date.now() - 1000 * 60 * 30), status: 'read' },
    ]
  },
  {
    id: 'c2',
    name: 'Дизайн Группа',
    avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop',
    isGroup: true,
    online: false,
    unreadCount: 0,
    messages: [
      { id: 'm1', text: 'Ребята, макеты готовы!', senderId: 'u2', timestamp: new Date(Date.now() - 1000 * 60 * 120), status: 'read' },
      { id: 'm2', text: 'Отлично, сейчас гляну.', senderId: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 115), status: 'read' },
    ]
  },
  {
    id: 'c3',
    name: 'Иван Смирнов',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    isGroup: false,
    online: false,
    unreadCount: 0,
    messages: [
      { id: 'm1', text: 'Договорились, до встречи!', senderId: 'c3', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), status: 'read' },
    ]
  },
  {
    id: 'c4',
    name: 'Семья ❤️',
    avatar: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=100&h=100&fit=crop',
    isGroup: true,
    online: true,
    unreadCount: 5,
    messages: [
      { id: 'm1', text: 'Купи хлеба по дороге', senderId: 'mom', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), status: 'read' },
    ]
  }
];

export const stories = [
  { id: 's1', user: 'Мария', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=300&fit=crop', viewed: false },
  { id: 's2', user: 'Иван', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=300&fit=crop', viewed: false },
  { id: 's3', user: 'Елена', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=300&fit=crop', viewed: true },
];

export const calls = [
  { id: 'cl1', name: 'Мария Иванова', type: 'incoming', status: 'missed', time: 'Сегодня, 10:00', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 'cl2', name: 'Иван Смирнов', type: 'outgoing', status: 'success', time: 'Вчера, 18:30', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
];

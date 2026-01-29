import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Chat, initialChats, Message } from '../data/mock';

interface ChatContextType {
  chats: Chat[];
  getChat: (id: string) => Chat | undefined;
  sendMessage: (chatId: string, text: string) => void;
  markAsRead: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(initialChats);

  const getChat = (id: string) => chats.find(c => c.id === id);

  const markAsRead = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
    ));
  };

  const sendMessage = (chatId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId: 'me',
      timestamp: new Date(),
      status: 'sent'
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    }));

    // Simulate Reply after 2 seconds
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Это автоматический ответ! Я получил твое сообщение: ' + text,
        senderId: chatId, // Sender is the chat partner
        timestamp: new Date(),
        status: 'read'
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, replyMessage],
            unreadCount: chat.unreadCount + 1 // Increment unread if not currently viewing (simplified logic)
          };
        }
        return chat;
      }));
    }, 2000);
  };

  return (
    <ChatContext.Provider value={{ chats, getChat, sendMessage, markAsRead }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

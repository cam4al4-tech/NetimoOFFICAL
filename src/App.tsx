import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Calls from './pages/Calls';
import Settings from './pages/Settings';
import CreateGroup from './pages/CreateGroup';
import Premium from './pages/Premium';
import ChatDetail from './pages/ChatDetail';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calls" element={<Calls />} />
            <Route path="settings" element={<Settings />} />
            <Route path="group/create" element={<CreateGroup />} />
            <Route path="premium" element={<Premium />} />
            <Route path="chat/:id" element={<ChatDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;

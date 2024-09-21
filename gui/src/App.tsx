import React from 'react';
import "./styles/global.css"
import { ConfigProvider } from 'antd';
import Toolbar from './components/toolbar/Toolbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateTaskPage from './pages/CreateTaskPage';
import ListTaskPage from './pages/ListTaskPage';
import UpdateTaskPage from './pages/UpdateTaskPage';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#00b96b',
        borderRadius: 2,

        // Alias Token
        colorBgContainer: '#ffffff',
      },
    }}
  >
    <BrowserRouter>
      <Toolbar />
      <Routes>
        <Route path="/" element={<ListTaskPage />} />
        <Route path="/liste" element={<ListTaskPage />} />
        <Route path="/task-ekle" element={<CreateTaskPage />} />
        <Route path="/task-guncelle" element={<UpdateTaskPage />} />
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);

export default App;
import React, { useEffect } from "react";
import "./styles/global.css";
import { ConfigProvider } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Toolbar from "./components/toolbar/Toolbar";
import CreateTaskPage from "./pages/CreateTaskPage";
import ListTaskPage from "./pages/ListTaskPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import { Layout, theme } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AppSettingActions from "./store/actions/AppSettingActions";
import LocalStorageManager from "./managers/LocalStorageManager";
import NotFoundPage from './pages/NotFoundPage';

const { Footer, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  overflowY: "auto",
  color: "#fff",
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  height: "100vh",
};

const App: React.FC = () => {
  const darkMode = useSelector(
    (state: RootState) => state.appSettingsReducer.darkMode
  );

  useEffect(() => {
    const localStorageDarkMode = LocalStorageManager.getDarkMode();
    const localStorageLanguage = LocalStorageManager.getLanguage();
    if (localStorageLanguage) {
      AppSettingActions.changeLanguage(localStorageLanguage);
    }
    AppSettingActions.changeMode(localStorageDarkMode);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: darkMode ? "#1F1F1F" : "#fff",
          colorBgMask: darkMode ? "#1F1F1F" : "#fff",
          colorBgBase: darkMode ? "#1F1F1F" : "#fff",
          colorBorderBg: "#F0F0F0",
          colorBgLayout: darkMode ? "#1F1F1F" : "#fff",
          colorText: darkMode ? "#fff" : "#1F1F1F",
          colorPrimary: darkMode ? "#1890ff" : "#1890ff",
        },
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={layoutStyle}>
        <BrowserRouter>
          <Toolbar />
          <Layout>
            <Content style={contentStyle}>
              <Routes>
                <Route path="/" element={<Navigate to="/liste" replace />} />
                <Route path="/liste" element={<ListTaskPage />} />
                <Route path="/task-ekle" element={<CreateTaskPage />} />
                <Route path="/task-guncelle" element={<UpdateTaskPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Content>
          </Layout>
          <Footer
            style={{
              textAlign: "center",
              borderTop: `0.5px solid ${darkMode ? "#313131" : "#F0F0F0"}`,
            }}
          >
            Melisa Gokce ©{new Date().getFullYear()} Created by M. GKE
          </Footer>
        </BrowserRouter>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

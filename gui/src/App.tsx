import React from "react";
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

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgLayout: darkMode ? "#141414" : "#fff", // Layout arka plan rengi
          colorText: darkMode ? "#fff" : "#141414", // Yazı rengi
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
              </Routes>
            </Content>
          </Layout>
          <Footer style={{ textAlign: "center" }}>
            Melisa Gokce ©{new Date().getFullYear()} Created by M. GKE
          </Footer>
        </BrowserRouter>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

import React from "react";
import { Menu, MenuProps, Layout } from "antd";
import {
  AppstoreAddOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import AppSettings from "./items/settings/AppSettings";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const customStyles = makeStyles({
  language: {
    maxWidth: "200px",
    padding: "0",
    height: "100%",
  },
});

const Toolbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const styles = customStyles();
  const darkMode = useSelector(
    (state: RootState) => state.appSettingsReducer.darkMode
  );

  const menu = [
    {
      text: t("toolbar.listTask", { defaultValue: "Task Listele" }),
      route: "/liste",
      icon: <UnorderedListOutlined />,
      style: { fontWeight: "bold" },
    },
    {
      text: t("toolbar.updateTask", { defaultValue: "Task Güncelle" }),
      route: "/task-guncelle",
      icon: <EditOutlined />,
      style: { fontWeight: "bold" },
    },
    {
      text: t("toolbar.addTask", { defaultValue: "Task Oluştur" }),
      route: "/task-ekle",
      icon: <AppstoreAddOutlined />,
      style: { fontWeight: "bold" },
    },
  ];

  const items1: MenuProps["items"] = menu.map((item, index) => ({
    key: index.toString(),
    label: `${item.text}`,
    icon: item.icon,
    style: item.style,
    onClick: () => navigate(item.route),
  }));

  const defaultSelectedKey = menu.findIndex(item => item.route === location.pathname).toString();

  return (
    <Header style={{ display: "flex", alignItems: "center", padding: "0" }}>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={[defaultSelectedKey]}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
      />
      <Layout
        className={styles.language}
        style={{
          borderBottom: `1px solid ${darkMode ? "#313131" : "#F0F0F0"}`,
        }}
      >
        <AppSettings />
      </Layout>
    </Header>
  );
};

export default Toolbar;

import { MenuProps, Space } from 'antd'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppstoreAddOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import SwitchLanguage from '../language/SwitchLanguage';

const { Header } = Layout;

const useStyles = makeStyles({
  root: {
    height: "100px",
    width: "100%",
    background: "silver"
  },
  header: {
    display: 'flex', alignItems: 'center'
  }
});

const Toolbar = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const menu = [
    { text: t("toolbar.listTask", { defaultValue: "Task Listele" }), route: "liste", icon: <UnorderedListOutlined />, style: { fontWeight: "bold" } },
    { text: t("toolbar.updateTask", { defaultValue: "Task Güncelle" }), route: "task-guncelle", icon: <EditOutlined />, style: { fontWeight: "bold" } },
    { text: t("toolbar.addTask", { defaultValue: "Task Oluştur" }), route: "task-ekle", icon: <AppstoreAddOutlined />, style: { fontWeight: "bold" } }
  ]

  const items1: MenuProps['items'] = menu.map((item, index) => ({
    key: index.toString(),
    label: `${item.text}`,
    icon: item.icon,
    style: item.style,
    onClick: () => navigate(item.route)
  }));

  return (
    <>
      <Header className={styles.header}>
        <Space>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Space>
        <Space>
          <SwitchLanguage/>
        </Space>
      </Header>
    </>
  )
}

export default Toolbar

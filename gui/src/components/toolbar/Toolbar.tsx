import { MenuProps } from 'antd'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppstoreAddOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';

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
  const menu = [
    { text: "Task Listele", route: "liste", icon: <UnorderedListOutlined />, style: { fontWeight: "bold" } },
    { text: "Task Güncelle", route: "task-guncelle", icon: <EditOutlined />, style: { fontWeight: "bold" } },
    { text: "Task Oluştur", route: "task-ekle", icon: <AppstoreAddOutlined />, style: { fontWeight: "bold" } }
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
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
    </>
  )
}

export default Toolbar

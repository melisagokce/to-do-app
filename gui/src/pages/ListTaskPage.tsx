import React from 'react';
import TaskList from '../components/taskList';
import { Layout } from 'antd';
import { makeStyles } from '@mui/styles';

const customStyles = makeStyles({
  root: {
    position: "relative",
    background:"#f5f5f5",
    width: "100%",
    flexWrap: "nowrap"
  }
});

const ListCardPage = () => {
const styles = customStyles();
  return (
    <Layout className={styles.root}>
      <TaskList/>
    </Layout>
  )
}

export default ListCardPage

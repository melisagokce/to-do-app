import React, { useEffect } from "react";
import TaskList from "../components/taskList";
import { Layout } from "antd";
import { makeStyles } from "@mui/styles";
import TaskManager from "../managers/TaskManager";

const customStyles = makeStyles({
  root: {
    position: "relative",
    width: "100%",
    flexWrap: "nowrap",
  },
});

const ListCardPage = () => {
  const styles = customStyles();

  useEffect(() => {
    const load = async() =>{
      await TaskManager.refresh();
    }

    load();
  }, []);
  return (
    <Layout className={styles.root}>
      <TaskList />
    </Layout>
  );
};

export default ListCardPage;

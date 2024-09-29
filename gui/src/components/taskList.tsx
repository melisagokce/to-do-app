import React, { useEffect } from "react";
import TaskCard from "./card/taskCard";
import ICardProps from "../models/ICardProps";
import { Space } from "antd";
import TaskManager from "../managers/TaskManager";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TaskActions from "../store/actions/TaskActions";
import { makeStyles } from "@mui/styles";

const customStyles = makeStyles({
  root: {
    display:"flex",
    padding: "1rem",
    flexWrap: "wrap",
  },
  "@keyframes myAnim": {
    "0%": {
      opacity: 0,
      transform: "scale(0)",
    },
    "50%": {
      opacity: 0.8,
      transform: "scale(1.05)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1)",
    }
  },
  "@keyframes cardChanging": {
    "0%":{
      opacity: 0
    },
    "100%":{
      opacity: 1
    }
  },
  "@keyframes scaleUp": {
    from: {
      transform: "scale(1)",
    },
    to: {
      transform: "scale(1.15)",
      zIndex:"9998"
    },
  },
  card: {
    animation: "$myAnim 1s ease forwards",
  },
});

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.taskReducer.tasks);
  const styles = customStyles();

  useEffect(() => {
    const getCards = async () => {
      const response = await TaskManager.getAllTask();
      TaskActions.storeTasks(response.data);
    };

    getCards();
  }, []);

  return (
    <>
      <Space className={styles.root}>
        {tasks.map((card: ICardProps, index: number) => (
          <TaskCard
          className={styles.card}
            id={card.taskId}
            title={card.title}
            description={card.description}
            status={card.checkStatus}
            images={card.images}
            key={index}
          />
        ))}
      </Space>
    </>
  );
};

export default TaskList;

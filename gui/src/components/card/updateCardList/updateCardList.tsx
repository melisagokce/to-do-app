/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Layout, List, Space, Image } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ICardProps from "../../../models/ICardProps";
import TaskImage from "../../../assets/task/task-image.png";
import { makeStyles } from "@mui/styles";
import { UnorderedListOutlined } from "@ant-design/icons";
import TaskActions from "../../../store/actions/TaskActions";
import { useTranslation } from "react-i18next";

const { Content, Header } = Layout;

const customStyles = makeStyles({
  list: {},
  listItem: {},
  listItemMeta: {
    display: "flex",
    cursor: "pointer",
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: "#B2DAFF",
      borderRadius:"10px",
    },
  },
});
const updateCardList = () => {
  const tasks = useSelector((state: RootState) => state.taskReducer.tasks);
  const styles = customStyles();
  const darkMode = useSelector(
    (state: RootState) => state.appSettingsReducer.darkMode
  );
  const [selectedTask, setSelectedTask] = useState<ICardProps>();
  const { t } = useTranslation();
  const [localTasks, setLocalTasks] = useState<any>([]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const updatedTasks = tasks.map((task: any, index: number) => ({
        ...task,
        selected: index === 0,
      }));
      setLocalTasks(updatedTasks);
      setSelectedTask(tasks[0]);
    }
  }, [tasks]);

  useEffect(() => {
    if(selectedTask){
      TaskActions.selectTask(selectedTask);
    }
  }, [selectedTask]);

  useEffect(()=>{
    
  },[])

  const handleSelectTask = (selectedTask: any) => {
    const updatedTasks = localTasks.map((task: any) => ({
      ...task,
      selected: task.taskId === selectedTask.taskId,
    }));

    setSelectedTask(selectedTask);
    setLocalTasks(updatedTasks);
  };

  return (
    <div
      style={{
        width: "calc(100%)",
        wordWrap: "break-word",
        overflow: "hidden",
        height: "calc(100vh - 164px)",
        border: `0.5px solid ${darkMode ? "#313131" : "#F0F0F0"}`,
      }}
    >
      <Layout
        style={{
          borderBottom: `1px solid ${darkMode ? "#313131" : "#F0F0F0"}`,
          padding: "0",
        }}
      >
        <Header
          style={{
            borderBottom: `1px solid ${darkMode ? "#313131" : "#F0F0F0"}`,
            backgroundColor: darkMode ? "#1F1F1F" : "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0 1rem",
            overflow: "hidden",
          }}
        >
          <h3>
          <UnorderedListOutlined />
          <Space
            style={{
              marginLeft: "5px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t("components.updateCardList.header",{defaultValue:"Task Listesi"})}
          </Space>
          </h3>
        </Header>
        <Content
          style={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}
        >
          <List
            itemLayout="horizontal"
            style={{ margin: "1rem" }}
            dataSource={localTasks}
            renderItem={(item: any, index: number) => (
              <List.Item
                className={styles.listItemMeta}
                key={index}
                style={{ backgroundColor: item.selected ? "#177DDC" : "", borderRadius: item.selected ? "10px" : ""}}
                onClick={() => {
                  handleSelectTask(item);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <Image
                    preview={false}
                    src={TaskImage}
                    style={{
                      width: "32px",
                      height: "32px",
                      filter: "drop-shadow(3px 3px 1px black)",
                      marginRight: "8px",
                    }}
                  />
                  <span>{item.title}</span>
                </div>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </div>
  );
};

export default updateCardList;

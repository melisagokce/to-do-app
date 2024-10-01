/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card, Carousel, Image } from "antd";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";
import { makeStyles } from "@mui/styles";
import TaskManager from "../../managers/TaskManager";
import TaskActions from "../../store/actions/TaskActions";
import NoImage from "../../assets/task/no-image.png";
import TaskImage from "../../assets/task/task-image.png";
import CompletedTask from "../../assets/task/completed-task.png";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import CompletedFace from "../completedFace";
import NotificationManager from "../../managers/NotificationManager";
import { useTranslation } from "react-i18next";

const { Meta } = Card;

const useStyles = makeStyles({
  root: {},
  statusCheckbox: {
    position: "absolute",
    right: "1px",
    top: "1px",
  },
});
const taskCard = ({
  className,
  id,
  title,
  description,
  images,
  status,
}: {
  className: string;
  id: string;
  title: string;
  description: string;
  images: any;
  status: boolean;
}) => {
  const styles = useStyles();
  const [completed, setCompleted] = React.useState<boolean>(status);
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();
  const darkMode = useSelector(
    (state: RootState) => state.appSettingsReducer.darkMode
  );

  const handleMouseOver = () => {
    setIsVisible(false);
  };

  const handleMouseLeave = () => {
    setIsVisible(true);
  };

  const onChange: CheckboxProps["onChange"] = async (e) => {
    const taskId = e.target.id;
    const checkStatus = e.target.checked;
    if (taskId) {
      const updatedTask: any = {
        taskId: id,
        title: title,
        description: description,
        checkStatus: checkStatus,
        imageFile: null,
      };
      const response = await TaskManager.updateTask(updatedTask);
      if (response) {
        TaskActions.updateTaskStatus(taskId, checkStatus);
        setCompleted(e.target.checked);
        NotificationManager.add("success",t("messages.updateCheckStatus.success",{defaultValue:"Task Durumu Başarıyla Güncellendi."}),"");
      }else{
        NotificationManager.add("error",t("messages.updateCheckStatus.error",{defaultValue:"Task Durumu Güncelleme Başarısız."}),"");
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const resultRemove = await TaskManager.deleteTask(taskId);
    if (resultRemove.status) {
      TaskActions.removeTask(taskId);
      NotificationManager.add("success",t("messages.removeTask.success",{defaultValue:"Task Başarıyla Silindi."}),"");
    }else{
      NotificationManager.add("error",t("messages.removeTask.error",{defaultValue:"Task Silme Başarısız."}),"");
    }
  };

  return (
    <Card
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseLeave}
      style={{
        maxWidth: "300px",
        margin: "1rem",
        filter: `drop-shadow(10px 15px 5px ${
          darkMode ? "#151515" : "#999999"
        })`,
        borderRadius:"9px"
      }}
      className={className}
      cover={
        <Carousel
          autoplay
          style={{
            maxHeight: "300px",
            minHeight: "300px",
            maxWidth: "300px",
            minWidth: "300px",
          }}
        >
          {images.map((image: string, index: number) => (
            <div key={index}>
              <Image
                src={`http://localhost:5220/${image}`}
                alt={`Slide ${index + 1}`}
                style={{ width: "300px", height: "300px", objectFit: "cover" }}
              />
            </div>
          ))}
          {images.length == 0 && (
            <img
              src={NoImage}
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                backdropFilter: "rgba(1,1,1,0.6)",
              }}
            />
          )}
        </Carousel>
      }
      actions={[
        <EditOutlined key="edit" />,
        <DeleteOutlined
          key="delete"
          onClick={() => {
            handleDeleteTask(id);
          }}
        />,
      ]}
    >
      {completed && isVisible && <CompletedFace source={CompletedTask} />}
      <Card style={{ position: "relative", width: "100%" }}>
        <Meta
          avatar={
            <Avatar
              src={TaskImage}
              size={64}
              style={{ filter: "drop-shadow(3px 3px 2px black)" }}
            />
          }
          title={
            <span
              style={
                
                completed
                  ? {
                      textDecoration: "line-through",
                      textDecorationThickness: "3px",
                    }
                  : {}
              }
            >
              {title}
            </span>
          }
          description={description}
        />
        <Checkbox
          defaultChecked={status}
          id={id}
          onChange={onChange}
          className={styles.statusCheckbox}
          style={{ marginTop: "5px", marginRight: "10px" }}
        />
      </Card>
    </Card>
  );
};

export default taskCard;

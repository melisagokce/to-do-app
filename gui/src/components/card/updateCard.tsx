/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Input,
  Carousel,
  Image,
  Avatar,
  // Checkbox,
  // CheckboxProps,
} from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Meta from "antd/es/card/Meta";
import TextArea from "antd/es/input/TextArea";
import NoImage from "../../assets/task/no-image.png";
import { makeStyles } from "@mui/styles";
// import CompletedFace from "../completedFace";
import TaskImage from "../../assets/task/task-image.png";
// import CompletedTask from "../../assets/task/completed-task.png";
import TaskManager from "../../managers/TaskManager";
// import TaskActions from "../../store/actions/TaskActions";
import ICardProps from "../../models/ICardProps";
import NotificationManager from "../../managers/NotificationManager";
import { useTranslation } from "react-i18next";

const customStyles = makeStyles({
  root: {
    display: "flex",
    padding: "1rem",
    flexWrap: "wrap",
  },
  statusCheckbox: {
    position: "absolute",
    right: "1px",
    top: "1px",
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
    },
  },
  "@keyframes cardChanging": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  "@keyframes scaleUp": {
    from: {
      transform: "scale(1)",
    },
    to: {
      transform: "scale(1.15)",
      zIndex: "9998",
    },
  },
  card: {
    animation: "$myAnim 1s ease forwards",
  },
});

const updateCard = () => {
  const styles = customStyles();
  const selectedTask = useSelector(
    (state: RootState) => state.taskReducer.selectedTask
  );
  const darkMode = useSelector(
    (state: RootState) => state.appSettingsReducer.darkMode
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [desc, setDesc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { t } = useTranslation();
  // const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (selectedTask) {
      setDesc(selectedTask?.description);
      setTitle(selectedTask?.title);
    }
  }, [selectedTask]);

  const handleUpdate = async () => {
    setLoading(true);
    if (selectedTask) {
      if (desc == "" || title == "") {
        NotificationManager.add(
          "error",
          t("messages.updateEmpty.error", {
            defaultValue: "Task başlığı ve/veya açıklama kısmı boş olamaz.",
          }),
          ""
        );
        setLoading(false);
        return;
      }
      const updatedTask: ICardProps = {
        taskId: selectedTask.taskId,
        title: title,
        description: desc,
        checkStatus: selectedTask.checkStatus,
        images: selectedTask.images,
        updatedAt: selectedTask.updatedAt,
        createdAt: selectedTask.createdAt,
        imageFile: null,
      };
      const updateResult = await TaskManager.updateTask(updatedTask);
      if (updateResult) {
        NotificationManager.add(
          "success",
          t("messages.updateTask.success", {
            defaultValue: "Task Başarıyla Güncellendi.",
          }),
          ""
        );
        await TaskManager.refresh();
      } else {
        NotificationManager.add(
          "error",
          t("messages.updateTask.error", {
            defaultValue: "Task Güncelleme Başarısız.",
          }),
          ""
        );
      }
    }
    setLoading(false);
  };

  const handleMouseOver = () => {
    // setIsVisible(false);
  };

  const handleMouseLeave = () => {
    // setIsVisible(true);
  };

  // const onChange: CheckboxProps["onChange"] = async (e) => {
  //   console.log(e.target.id);
  //   const taskId = e.target.id;
  //   const checkStatus = e.target.checked;
  //   if (taskId) {
  //     TaskActions.updateTaskStatus(taskId, checkStatus);
  //   }
  //   // if (taskId) {
  //   //   const response = await TaskManager.updateCheckStatus(taskId, checkStatus);
  //   //   if (response) {
  //   //     TaskActions.updateTaskStatus(taskId, checkStatus);
  //   //     setIsVisible(e.target.checked);
  //   //   }
  //   // }
  // };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selectedTask && (
        <Card
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseLeave}
          style={{
            maxWidth: "300px",
            margin: "1rem",
            filter: `drop-shadow(10px 15px 5px ${
              darkMode ? "#151515" : "#999999"
            })`,
            borderRadius: "9px",
          }}
          className={styles.card}
          cover={
            <Carousel
              arrows
              infinite={true}
              style={{
                maxHeight: "300px",
                minHeight: "300px",
                maxWidth: "300px",
                minWidth: "300px",
              }}
            >
              {selectedTask?.images.map((image: string, index: number) => (
                <div key={index}>
                  <Image
                    src={`http://localhost:5220/${image}`}
                    alt={`Slide ${index + 1}`}
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
              {selectedTask?.images.length == 0 && (
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
            <Button
              type="primary"
              loading={loading}
              onClick={() => handleUpdate()}
            >
              {t("components.updateCard.button", {
                defaultValue: "Değişiklikleri Kaydet",
              })}
            </Button>,
          ]}
        >
          {/* {selectedTask?.checkStatus && isVisible && (
            <CompletedFace source={CompletedTask} />
          )} */}
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
                <Input
                  placeholder={t("components.updateCard.titlePlaceholder", {
                    defaultValue: "Task başlığı...",
                  })}
                  defaultValue={selectedTask.title}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></Input>
              }
              description={
                <TextArea
                  showCount
                  maxLength={100}
                  defaultValue={selectedTask?.description}
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  placeholder={t("components.updateCard.descPlaceholder", {
                    defaultValue: "Açıklama ekleyin...",
                  })}
                  style={{ height: 120, resize: "none" }}
                />
              }
            />
            {/* <Checkbox
              value={selectedTask.checkStatus}
              id={selectedTask.taskId}
              onChange={onChange}
              className={styles.statusCheckbox}
              style={{ marginTop: "5px", marginRight: "10px" }}
            /> */}
          </Card>
        </Card>
      )}
    </div>
  );
};

export default updateCard;

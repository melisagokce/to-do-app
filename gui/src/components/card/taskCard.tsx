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

  const handleMouseEnter = () => {
    setIsVisible(false);
  };

  const handleMouseLeave = () => {
    setIsVisible(true);
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    setCompleted(e.target.checked);
  };

  const handleDeleteTask = async (taskId: string) => {
    const resultRemove = await TaskManager.deleteTask(taskId);
    if (resultRemove.status) {
      TaskActions.removeTask(taskId);
    }
  };

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 300,
        margin: "1rem",
        filter: "drop-shadow(10px 15px 5px #ccc)",
      }}
      className={className}
      cover={
        <Carousel autoplay>
          {images.map((image: string, index: number) => (
            <div key={index}>
              <img
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
      {completed && isVisible && (
        <div
          style={{
            position: "absolute",
            width: "calc(100% + 2px)",
            height: "calc(100% + 2px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            zIndex: "9998",
            background: "rgba(35,35,35,0.6)",
            backdropFilter: "blur(1.5px)",
            left: "0px",
            top: "0px",
          }}
        >
          <Image src={CompletedTask} width={64} preview={false} />
          <span style={{ color: "#65E965" }}>Tamamlandı!</span>
        </div>
      )}
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
          onChange={onChange}
          className={styles.statusCheckbox}
        />
      </Card>
    </Card>
  );
};

export default taskCard;

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Flex,
  Input,
  Layout,
  Image,
} from "antd";
import RequestManager from "../../managers/RequestManager";
import TextArea from "antd/es/input/TextArea";
import ImageUpload from "../../assets/task/Image-Upload.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import NotificationManager from "../../managers/NotificationManager";
import { useNavigate } from "react-router-dom";
import TaskManager from "../../managers/TaskManager";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import TaskImage from '../../assets/task/task-image.png';

const { Meta } = Card;

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

const taskCard = () => {
  const darkMode = useSelector(
    (state: RootState) => state.appSettingsReducer.darkMode
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<any[]>([]);
  const [desc, setDesc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const styles = customStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleImageChange = (event: any) => {
    const files = Array.from(event.target.files);
    addFiles(files);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const images: File[] = [];
    const files = Array.from(event.dataTransfer.files);
    files.map((file: any) => {
      if (file.type.startsWith("image")) {
        images.push(file);
      }
    });
    addFiles(images);
  };

  const addFiles = (files: any) => {
    const imageUrls = files.map((file: any) => URL.createObjectURL(file));
    setImagePreview((prevImages) => [...prevImages, ...imageUrls]);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleAddTask = async () => {
    setLoading(true);
    if (desc == "" || title == "") {
      NotificationManager.add(
        "error",
        t("messages.addEmpty.error", {
          defaultValue: "Task başlığı ve/veya açıklama kısmı boş olamaz.",
        }),
        ""
      );
      setLoading(false);
      return;
    }
    const formData = new FormData();

    if (selectedImages.length > 0) {
      selectedImages.forEach((file) => {
        formData.append("imageFile", file);
      });
    } else {
      formData.append("imageFile", new Blob());
    }

    formData.append("title", title);
    formData.append("description", desc);
    formData.append("checkStatus", String(false));

    const config = {
      url: `${window.MkeConfig.api.protocol}://${window.MkeConfig.api.url}/task-ekle`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await RequestManager.send(config);

    if (response.status) {
      NotificationManager.add(
        "success",
        t("messages.addTask.success", {
          defaultValue: "Yeni Task Başarıyla Oluşturuldu.",
        }),
        ""
      );
      await TaskManager.refresh();
      navigate("/liste");
    } else {
      NotificationManager.add(
        "error",
        t("messages.addTask.error", {
          defaultValue: "Yeni Task Oluşturma Başarısız.",
        }),
        ""
      );
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Flex
        wrap
        gap="large"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Card
          className={styles.card}
          style={{
            width: 300,
            margin: "1rem",
            filter: `drop-shadow(10px 15px 5px ${
              darkMode ? "#151515" : "#999999"
            })`,
          }}
          cover={
            <div
              style={{ position: "relative" }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/jpg.png"
                multiple
                onChange={handleImageChange}
                style={{
                  position: "absolute",
                  zIndex: "9997",
                  width: "100%",
                  height: "100%",
                  left: "0px",
                  opacity: 0,
                  cursor: "pointer",
                  pointerEvents: "none",
                }}
              />
              <Carousel arrows infinite={true}>
                {imagePreview.length == 0 && (
                  <img
                    src={ImageUpload}
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  ></img>
                )}
                {imagePreview.map((image: string, index: number) => (
                  <div key={index}>
                    <Image
                      src={image}
                      alt={`Slide ${index + 1}`}
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          }
          actions={[
            <Button
              type="primary"
              loading={loading}
              onClick={() => handleAddTask()}
            >
              {t("components.addCard.button", {
                defaultValue: "Taskı Oluştur",
              })}
            </Button>,
          ]}
        >
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
                  placeholder={t("components.addCard.titlePlaceholder", {
                    defaultValue: "Task başlığı...",
                  })}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></Input>
              }
              description={
                <TextArea
                  showCount
                  maxLength={100}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                  placeholder={t("components.addCard.descPlaceholder", {
                    defaultValue: "Açıklama ekleyin...",
                  })}
                  style={{ height: 120, resize: "none" }}
                />
              }
            />
          </Card>
        </Card>
      </Flex>
    </Layout>
  );
};

export default taskCard;

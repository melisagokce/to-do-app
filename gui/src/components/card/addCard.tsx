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
import NoImage from "../../assets/task/no-image.png";

const { Meta } = Card;

const taskCard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<any[]>([]);
  const [desc, setDesc] = useState<string>("");
  const [title, setTitle] = useState<string>("");

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

  const handleUpload = async () => {
    setLoading(true);
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
      console.log("task eklendi");
    } else {
      console.log("task eklenemedi");
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
          style={{ width: 300, margin: "1rem" }}
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
                    src={NoImage}
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
              onClick={() => handleUpload()}
            >
              Taskı Kaydet
            </Button>,
          ]}
        >
          <Card style={{ position: "relative", width: "100%" }}>
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title={
                <Input
                  placeholder="Task başlığı..."
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
                  placeholder="Açıklama ekleyin..."
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

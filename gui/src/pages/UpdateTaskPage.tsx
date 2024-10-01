import React, { useEffect } from "react";
import {
  Flex,
  Layout,
} from "antd";
import TaskManager from "../managers/TaskManager";
import UpdateCardList from "../components/card/updateCardList/updateCardList";
import UpdateCard from "../components/card/updateCard";

const { Content } = Layout;

const UpdateTaskPage = () => {
  useEffect(() => {
    TaskManager.refresh();
  }, []);

  return (
    <Layout
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Flex style={{ width: "300px" }}>
        <UpdateCardList />
      </Flex>
      <Layout>
        <Content style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Flex style={{ width: "calc(100% - 300px)" }}>
            <UpdateCard />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UpdateTaskPage;

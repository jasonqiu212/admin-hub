import { Layout, theme } from "antd";
import React from "react";
import { Outlet } from "react-router";

import { Sidebar } from "./Sidebar";
import { Header as HeaderLayout } from "./Header";

const { Header, Content } = Layout;
const { useToken } = theme;

export const DashboardLayout: React.FC = () => {
  const { token } = useToken();

  return (
    <Layout>
      <Header
        style={{
          backgroundColor: token.colorPrimary,
          paddingInline: "24px",
          height: "56px",
        }}
      >
        <HeaderLayout />
      </Header>
      <Layout style={{ height: "calc(100vh - 56px)" }}>
        <Sidebar />
        <Content
          style={{
            backgroundColor: "white",
            paddingBlock: "12px",
            paddingInline: "24px",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

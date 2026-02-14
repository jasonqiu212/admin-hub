import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { FileTextOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <FileTextOutlined />,
      label: "Purchase Orders",
    },
    // Add more menu items here as you create new routes
    // Example:
    // {
    //   key: "/users",
    //   icon: <UserOutlined />,
    //   label: "Users",
    // },
    // {
    //   key: "/settings",
    //   icon: <SettingOutlined />,
    //   label: "Settings",
    // },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={
        collapsed ? (
          <MenuUnfoldOutlined style={{ fontSize: "16px" }} />
        ) : (
          <MenuFoldOutlined style={{ fontSize: "16px" }} />
        )
      }
      width={240}
      style={{
        overflow: "auto",
        height: "100%",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

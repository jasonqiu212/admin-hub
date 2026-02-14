import React from "react";
import { Space, Dropdown, Avatar, Typography } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined, BellOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Text } = Typography;

export const Header: React.FC = () => {
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      console.log("Logout clicked");
      // Add logout logic here
    } else if (key === "profile") {
      console.log("Profile clicked");
      // Navigate to profile
    } else if (key === "settings") {
      console.log("Settings clicked");
      // Navigate to settings
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* Left side - Logo/Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Text
          strong
          style={{
            color: "white",
            fontSize: "18px",
            letterSpacing: "0.5px",
          }}
        >
          Admin Hub
        </Text>
      </div>

      {/* Right side - Actions */}
      <Space size="large">
        <BellOutlined
          style={{
            fontSize: "20px",
            color: "white",
            cursor: "pointer",
          }}
        />
        <Dropdown
          menu={{ items: userMenuItems, onClick: handleMenuClick }}
          placement="bottomRight"
          arrow
        >
          <Space style={{ cursor: "pointer" }}>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#1890ff" }} />
            <Text style={{ color: "white" }}>Admin User</Text>
          </Space>
        </Dropdown>
      </Space>
    </div>
  );
};

import React from "react";
import { Dropdown, Avatar, Typography, Button, Flex, Layout } from "antd";
import { LogoutOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { PAGE_TITLES } from "./constants";
import { blue } from "@ant-design/colors";
import { useAuth } from "../../features/auth/hooks/useAuth";
import Logo from "../../assets/logo.png";

const { Title } = Typography;

export interface HeaderProps {
  isMobile: boolean;
  onMobileMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobile, onMobileMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getPageTitle = () => {
    const path = location.pathname;
    return PAGE_TITLES[path] || "";
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getDisplayName = () => {
    return user?.name || user?.email || "User";
  };

  return (
    <Layout.Header
      style={{
        background: isMobile ? "#f6f6f6" : "#fafafa",
        padding: "16px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        ...(isMobile && { borderBottom: "1px solid #f0f0f0" }),
      }}
    >
      <Flex align="center" gap="middle">
        {isMobile ? (
          <>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={onMobileMenuToggle}
              aria-label="Open menu"
            />
            <img
              src={Logo}
              alt="Five Star Console"
              height={32}
              style={{ display: "block", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </>
        ) : (
          <Title level={1} style={{ margin: 0, fontSize: 22 }}>
            {getPageTitle()}
          </Title>
        )}
      </Flex>

      <Flex align="center" gap="middle">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate("/new-order")}>
          New Order
        </Button>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Flex align="center" gap="small">
            <Avatar style={{ backgroundColor: blue[6], cursor: "pointer" }}>
              {getUserInitial()}
            </Avatar>
            {!isMobile && <Typography.Text>{getDisplayName()}</Typography.Text>}
          </Flex>
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
};

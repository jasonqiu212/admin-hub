import { ConfigProvider, ThemeConfig, theme } from "antd";
import React from "react";
import { BrowserRouter } from "react-router";

import { AppRouter } from "./AppRouter";

const { useToken } = theme;

export const App: React.FC = () => {
  const { token } = useToken();

  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: "#2673dd",
    },
    components: {
      Breadcrumb: {
        fontSize: 12,
      },
      Button: {
        borderRadius: 2,
      },
      Card: {
        actionsLiMargin: "6px 0",
      },
      Menu: {
        activeBarBorderWidth: 0,
        activeBarWidth: 2,
        subMenuItemBg: "white",
        subMenuItemSelectedColor: "black",
        subMenuItemBorderRadius: 0,
        itemColor: "rgb(0,0,0,0.6)",
        itemSelectedBg: "#f5f9ff",
        itemSelectedColor: token.colorPrimary,
        itemMarginBlock: 0,
        itemMarginInline: 0,
        itemBorderRadius: 0,
      },
      Popover: {
        borderRadiusLG: 4,
        borderRadiusXS: 4,
      },
      Typography: {
        titleMarginBottom: 0,
        titleMarginTop: 0,
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ConfigProvider>
  );
};

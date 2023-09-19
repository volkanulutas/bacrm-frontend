import {
  CompassOutlined,
  DashboardOutlined,
  FormOutlined,
  HomeOutlined,
  LayoutOutlined,
  LineChartOutlined,
  TableOutlined,
  UserOutlined,
  BlockOutlined,
} from "@ant-design/icons";

export const navigationItems = {
  sidebar: [
    {
      name: "Dashboard ",
      to: "/dashboard",
      text: "dashboard",
    },
    {
      name: "Tabs Demo ",
      to: "/tabs",
      text: "tabsdemo",
    },
    {
      name: "Dynamic Form ",
      to: "/dynamic-form",
      text: "dynamicform",
    },
    {
      name: "Timesheet ",
      to: "/timesheet",
      text: "timesheet",
    },
    {
      name: "Users ",
      to: "/users",
      text: "users",
    },
    {
      name: "Example ",
      to: "/example",
      text: "example",
    },
    {
      name: "Proposal Form ",
      to: "/proposal-form-list",
      text: "proposalformlist",
    },
  ],
  footer: [],
};
export default navigationItems;

import { appRoute } from "src/config/routeMgt/routePaths";
import { SidebarLink } from "src/types";

export const sidebarLinks: SidebarLink[] = [
    {
      to: appRoute.home,
      title: "Dashboard",
      icon: "mingcute:grid-fill",
    },
    {
      to: appRoute.applications,
      title: "Applications",
      icon: "mdi:application-edit",
    },
    {
      to: "/payments",
      title: "Payments",
      icon: "fluent:payment-32-filled",
    },
    {
      to: "/reports",
      title: "Report",
      icon: "bi:pie-chart-fill",
    },
    {
      to: appRoute.settings,
      title: "Settings",
      icon: "material-symbols:settings",
    },
  ];
  
  
import { appRoute } from "src/config/routeMgt/routePaths";
import { settingsLinkProps } from "../types";

export const settingsLink: settingsLinkProps[] = [
  {
    name: "Define Eligible  Dependents",
    link: appRoute.dependents,
  },
  {
    name: "Define Document Requirements",
    link: appRoute.dependents,
  },
  {
    name: "Define Investment Routes",
    link: appRoute.dependents,
  },
  {
    name: "Application Template",
    link: appRoute.dependents,
  },
  {
    name: "Country, Milestones and Program types Configuration",
    link: appRoute.dependents,
  },
  {
    name: "Define Fees & Authorized Persons",
    link: appRoute.dependents,
  },
  {
    name: "Escalation",
    link: appRoute.escalation,
  },
  {
    name: "Contract & Email Templates",
    link: appRoute.dependents,
  },
];

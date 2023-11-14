import { appRoute } from "src/config/routeMgt/routePaths";
import { settingsLinkProps } from "../types";

export const settingsLink: settingsLinkProps[] = [
  {
    name: "Define Eligible  Dependents",
    link: appRoute.dependents,
  },
  {
    name: "Define Document Requirements",
    link: appRoute.documentRequirements,
  },
  {
    name: "Define Investment Routes",
    link: appRoute.dependents,
  },

  {
    name: "Application Template",
    link: appRoute.applicationTemplate,
  },
  {
    name: "Country, Milestones and Program types Configuration",
    link: appRoute.countryMilestonesProgram,
  },
  {
    name: "Define Fees & Authorized Persons",
    link: appRoute.defineFeesAndAuthorizedPersons,
  },
  {
    name: "Escalation & Delegation",
    link: appRoute.dependents,
  },
];

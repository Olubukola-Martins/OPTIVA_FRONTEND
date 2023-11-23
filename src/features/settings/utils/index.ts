import { appRoute } from "src/config/routeMgt/routePaths";
import { settingsLinkProps } from "../types";

export const settingsLink: settingsLinkProps[] = [
  {
    name: "Branches",
    link: appRoute.branches,
  },
  {
    name: "Departments",
    link: appRoute.department,
  },
  {
    name: "Employees",
    link: appRoute.employees,
  },
  {
    name: "Roles & Permissions",
    link: appRoute.roles,
  },
  {
    name: "Define Eligible Dependents",
    link: appRoute.dependents,
  },
  {
    name: "Define Document Requirements",
    link: appRoute.documentRequirements,
  },
  {
    name: "Define Investment Routes",
    link: appRoute.investment_route,
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
    name: "Escalation",
    link: appRoute.escalation,
  },
  {
    name: "Contract & Email Templates",
    link: appRoute.contractsEmailTemplates,
  },
];

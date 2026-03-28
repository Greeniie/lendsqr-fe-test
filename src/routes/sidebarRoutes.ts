// sidebarSections.ts
import brief from "../assets/icons/briefcase 1.svg";
import dash from "../assets/icons/dash.svg";
import users from "../assets/icons/user-friends 1.svg";
import guarantors from "../assets/icons/users 1.svg";
import loans from "../assets/icons/sack 1.svg";
import decision from "../assets/icons/handshake-regular 1.svg";
import savings from "../assets/icons/piggy-bank 1.svg";
import loanrequests from "../assets/icons/Group 104.svg";
import usercheck from "../assets/icons/user-check 1.svg";
import usertimes from "../assets/icons/user-times 1.svg";
import bank from "../assets/icons/bank.svg";
import fees from "../assets/icons/coins-solid 1.svg";
import transactions from "../assets/icons/icon.svg";
import sliders from "../assets/icons/sliders-h 1.svg";
import services from "../assets/icons/galaxy 1.svg";
import serviceacc from "../assets/icons/user-cog 1.svg";
import settlements from "../assets/icons/scroll 1.svg";
import reports from "../assets/icons/chart-bar 2.svg";
import feespricing from "../assets/icons/badge-percent 1.svg";
import logs from "../assets/icons/clipboard-list 1.svg";

export const sidebarSections = [
  {
    title: "",
    items: [
      { label: "Switch Organization", icon: brief, hasDropdown: true },
      { label: "Dashboard", icon: dash, path: "/dashboard" },
    ],
  },
  {
    title: "CUSTOMERS",
    items: [
      { label: "Users", icon: users, path: "/users" },
      { label: "Guarantors", icon: guarantors, path: "/guarantors" },
      { label: "Loans", icon: loans, path: "/loans" },
      { label: "Decision Models", icon: decision, path: "/decision" },
      { label: "Savings", icon: savings, path: "/" },
      { label: "Loan Requests", icon: loanrequests, path: "/analytics" },
      { label: "Whitelist", icon: usercheck, path: "/feedback" },
      { label: "Karma", icon: usertimes, path: "/activity" },
    ],
  },
  {
    title: "BUSINESSES",
    items: [
      { label: "Organization", icon: brief, path: "/organization" },
      { label: "Loan Products", icon: loanrequests, path: "/loanproducts" },
      { label: "Savings Products", icon: bank, path: "/savings-products" },
      { label: "Fees and Charges", icon: fees, path: "/decision" },
      { label: "Transactions", icon: transactions, path: "/transactions" },
      { label: "Services", icon: services, path: "/services" },
      { label: "Service Account", icon: serviceacc, path: "/service-acc" },
      { label: "Settlements", icon: settlements, path: "/settlements" },
      { label: "Reports", icon: reports, path: "/reports" },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { label: "Preferences", icon: sliders, path: "/settings-1" },
      { label: "Fees and Pricing", icon: feespricing, path: "/settings-2" },
      { label: "Audit Logs", icon: logs, path: "/settings-3" },
    ],
  },
];

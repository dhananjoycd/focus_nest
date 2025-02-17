import BasicInfo from "../pages/MoneyTrack/BasicInfo";
import CurrentStatus from "../pages/MoneyTrack/CurrentStatus";
import Details from "../pages/MoneyTrack/Details";
import Earnings from "../pages/MoneyTrack/Earnings";
import Expenses from "../pages/MoneyTrack/Expenses";

const sidebarLinks = [
  {
    url: "status",
    pathName: "Current Status ",
    component: <CurrentStatus></CurrentStatus>,
  },
  {
    url: "earnings",
    pathName: "Earnings",
    component: <Earnings></Earnings>,
  },

  {
    url: "expenses",
    pathName: "Expenses",
    component: <Expenses></Expenses>,
  },
  {
    url: "details",
    pathName: "Details",
    component: <Details></Details>,
  },
  {
    url: "Learn",
    pathName: "Basic Theory",
    component: <BasicInfo></BasicInfo>,
  },
];

export default sidebarLinks;

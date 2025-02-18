import CurrentStatus from "../pages/MoneyTrack/CurrentStatus/CurrentStatus";
import Details from "../pages/MoneyTrack/Details/Details";
import Earnings from "../pages/MoneyTrack/Earnings/Earnings";
import Expenses from "../pages/MoneyTrack/Expenses/Expenses";
import BasicInfo from "../pages/MoneyTrack/Theory/BasicInfo";

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

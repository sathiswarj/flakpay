import DashboardIcon from "@mui/icons-material/Dashboard";
import TransactionIcon from "@mui/icons-material/MoneyTwoTone";
import CodeIcon from '@mui/icons-material/Code';
import LockResetIcon from '@mui/icons-material/LockReset';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import UserIcon from '@mui/icons-material/SupervisedUserCircle';

export const adminSideBarData = [
  {
    id: 0,
    icon: <DashboardIcon />,
    text: "Dashboard",
    link: "/",
  },
  {
    id: 1,
    icon: <MiscellaneousServicesIcon />,
    text: "Service Providers",
    link: "/ServiceProviders",
  },
  {
    id: 2,
    icon: <UserIcon />,
    text: "User",
    link: "/user",
  },
  {
    id: 3,
    icon: <Diversity3Icon />,
    text: "Client",
    link: "/client",
  },
  // {
  //   id: 4,
  //   icon: <TransactionIcon />,
  //   text: "Payin Transactions",
  //   link: "/payin-transactions",
  // },
  // {
  //   id: 5,
  //   icon: <TransactionIcon />,
  //   text: "Payin Settlement",
  //   link: "/settlement-transactions",
  // },
  {
    id: 4,
    icon: <TransactionIcon />,
    text: "Payin",
    // link: "/PayinTransaction",
    children: [
      {
        id: 41,
        icon: <TransactionIcon />,
        text: "Payin Txns",
        link: "/PayinTransaction",
      },
      {
        id: 42,
        icon: <TransactionIcon />,
        text: "Payin Settlement",
        link: "/SettlementTransaction",
      },
    ],
  },
   
  {
    id: 5,
    icon: <TransactionIcon />,
    text: "Payout",
    // link: "/PayinTransaction",
    children: [
      {
        id: 51,
        icon: <TransactionIcon />,
        text: "Prefund Txns",
        link: "/PrefundTransactions",
      },
      {
        id: 52,
        icon: <TransactionIcon />,
        text: "Payout Txns",
        link: "/Payouttransactions",
      },
      {
        id: 53,
        icon: <TransactionIcon />,
        text: "Fund Transfer",
         link: "/Fund Transfer",
      },
      {
        id: 54,
        icon: <TransactionIcon />,
        text: "Wallet Txns",
         link: "/WalletTransactions",
      },
    ],
  },
  // {
  //   id: 5,
  //   icon: <TransactionIcon />,
  //   text: "Prefund Transactions",
  //   link: "/PrefundTransactions",
  // },
  // {
  //   id: 6,
  //   icon: <TransactionIcon />,
  //   text: "Payout Transactions",
  //   link: "/Payouttransactions",
  // },
  // {
  //   id: 7,
  //   icon: <TransactionIcon />,
  //   text: "Fund Transfer",
  //   link: "/Fund Transfer",
  // },
  {
    id: 8,
    icon: <CodeIcon />,
    text: "Developer Page",
    link: "/Developers",
  },
  {
    id: 9,
    icon: <LockResetIcon />,
    text: "Change Password",
    link: "/ChangePassword",
  },
];

export const clientSideBarData = [
  {
    id: 0,
    icon: <DashboardIcon />,
    text: "Dashboard",
    link: "/",
  },
  {
    id: 1,
    icon: <TransactionIcon />,
    text: "Payin",
    // link: "/PayinTransaction",
    children: [
      {
        id: 41,
        icon: <TransactionIcon />,
        text: "Payin Txns",
        link: "/PayinTransaction",
      },
      {
        id: 42,
        icon: <TransactionIcon />,
        text: "Payin Settlement",
        link: "/SettlementTransaction",
      },
    ],
  },

  {
    id: 2,
    icon: <TransactionIcon />,
    text: "Payout",
    // link: "/PayinTransaction",
    children: [
      {
        id: 51,
        icon: <TransactionIcon />,
        text: "Prefund Transactions",
        link: "/PrefundTransactions",
      },
      {
        id: 52,
        icon: <TransactionIcon />,
        text: "Payout Transactions",
        link: "/Payouttransactions",
      }
    ],
  },
  {
    id: 3,
    icon: <CodeIcon />,
    text: "Developer Page",
    link: "/Developers",
  },
  {
    id: 4,
    icon: <ManageAccountsIcon />,
    text: "Profile",
    link: "/ProfileSection",
  },
  {
    id: 5,
    icon: <LockResetIcon />,
    text: "Change Password",
    link: "/ChangePassword",
  },
];


export const onboardingSideBarData = [
  {
    id: 0,
    icon: <Diversity3Icon />,
    text: "Client",
    link: "/Client",
  },
  {
    id: 1,
    icon: <MiscellaneousServicesIcon />,
    text: "Service Providers",
    link: "/ServiceProviders",
  },
  {
    id: 2,
    icon: <ManageAccountsIcon />,
    text: "Profile",
    link: "/ProfileSection",
  },
  {
    id: 3,
    icon: <LockResetIcon />,
    text: "Change Password",
    link: "/ChangePassword",
  },
];


export const settlementSideBarData = [
  {
    id: 0,
    icon: <DashboardIcon />,
    text: "Dashboard",
    link: "/",
  },
  {
    id: 1,
    icon: <TransactionIcon />,
    text: "Payin",
    // link: "/PayinTransaction",
    children: [
      {
        id: 41,
        icon: <TransactionIcon />,
        text: "Payin Txns",
        link: "/PayinTransaction",
      },
      {
        id: 42,
        icon: <TransactionIcon />,
        text: "Payin Settlement",
        link: "/SettlementTransaction",
      },
    ],
  },
  {
    id: 2,
    icon: <TransactionIcon />,
    text: "Payout",
    // link: "/PayinTransaction",
    children: [
      {
        id: 51,
        icon: <TransactionIcon />,
        text: "Prefund Transactions",
        link: "/PrefundTransactions",
      },
      {
        id: 52,
        icon: <TransactionIcon />,
        text: "Payout Transactions",
        link: "/Payouttransactions",
      }
    ],
  },
  {
    id: 3,
    icon: <TransactionIcon />,
    text: "Payout Txns",
    link: "/PayoutTransaction",
  },
  {
    id: 4,
    icon: <ReceiptLongIcon />,
    text: "Revenue Txns",
    link: "/RevenueTransaction",
  },
  {
    id: 5,
    icon: <ManageAccountsIcon />,
    text: "Profile",
    link: "/ProfileSection",
  },
  {
    id: 6,
    icon: <LockResetIcon />,
    text: "Change Password",
    link: "/ChangePassword",
  },
];
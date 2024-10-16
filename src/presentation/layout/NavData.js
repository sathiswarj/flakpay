import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export const adminSideBarData = [
  {
    id: 0,
    icon: <SpaceDashboardOutlinedIcon />,
    text: "Dashboard",
    link: "/",
  },
  {
    id: 1,
    icon: <SettingsSuggestOutlinedIcon />,
    text: "Service Providers",
    link: "/ServiceProviders",
  },
  {
    id: 2,
    icon: <PersonOutlineOutlinedIcon />,
    text: "User",
    link: "/user",
  },
  {
    id: 3,
    icon: <Diversity1OutlinedIcon />,
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
    icon: <PaidOutlinedIcon />,
    text: "Payin",
    // link: "/PayinTransaction",
    children: [
      {
        id: 41,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Payin Txns",
        link: "/PayinTransaction",
      },
      {
        id: 42,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Payin Settlement",
        link: "/SettlementTransaction",
      },
    ],
  },

  {
    id: 5,
    icon: <PaidOutlinedIcon />,
    text: "Payout",
    // link: "/PayinTransaction",
    children: [
      {
        id: 51,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Prefund Txns",
        link: "/PrefundTransactions",
      },
      {
        id: 52,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Payout Txns",
        link: "/Payouttransactions",
      },
      {
        id: 53,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Fund Transfer",
        link: "/Fund Transfer",
      },
      {
        id: 54,
        icon: <AttachMoneyOutlinedIcon />,
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
    icon: <IntegrationInstructionsOutlinedIcon />,
    text: "Developer Page",
    link: "/Developers",
  },
  {
    id: 9,
    icon: <PasswordOutlinedIcon />,
    text: "Change Password",
    link: "/ChangePassword",
  },
];

export const clientSideBarData = [
  {
    id: 0,
    icon: <SpaceDashboardOutlinedIcon />,
    text: "Dashboard",
    link: "/",
  },
  {
    id: 1,
    icon: <PaidOutlinedIcon />,
    text: "Payin",
    // link: "/PayinTransaction",
    children: [
      {
        id: 41,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Payin Txns",
        link: "/PayinTransaction",
      },
      {
        id: 42,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Payin Settlement",
        link: "/SettlementTransaction",
      },
    ],
  },

  {
    id: 2,
    icon: <PaidOutlinedIcon />,
    text: "Payout",
    // link: "/PayinTransaction",
    children: [
      {
        id: 51,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Prefund Transactions",
        link: "/PrefundTransactions",
      },
      {
        id: 52,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Payout Transactions",
        link: "/Payouttransactions",
      },
    ],
  },
  {
    id: 3,
    icon: <IntegrationInstructionsOutlinedIcon />,
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
    icon: <PasswordOutlinedIcon />,
    text: "Change Password",
    link: "/ChangePassword",
  },
];

export const onboardingSideBarData = [
  {
    id: 0,
    icon: <Diversity1OutlinedIcon />,
    text: "Client",
    link: "/Client",
  },
  {
    id: 1,
    icon: <SettingsSuggestOutlinedIcon />,
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
    icon: <PasswordOutlinedIcon />,
    text: "Change Password",
    link: "/ChangePassword",
  },
];

export const settlementSideBarData = [
  {
    id: 0,
    icon: <SpaceDashboardOutlinedIcon />,
    text: "Dashboard",
    link: "/",
  },
  {
    id: 1,
    icon: <PaidOutlinedIcon />,
    text: "Payin",
    // link: "/PayinTransaction",
    children: [
      {
        id: 41,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Payin Txns",
        link: "/PayinTransaction",
      },
      {
        id: 42,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Payin Settlement",
        link: "/SettlementTransaction",
      },
    ],
  },
  {
    id: 2,
    icon: <PaidOutlinedIcon />,
    text: "Payout",
    // link: "/PayinTransaction",
    children: [
      {
        id: 51,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Prefund Transactions",
        link: "/PrefundTransactions",
      },
      {
        id: 52,
        icon: <AttachMoneyOutlinedIcon />,
        text: "Payout Transactions",
        link: "/Payouttransactions",
      },
    ],
  },
  {
    id: 3,
    icon: <PaidOutlinedIcon />,
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
    icon: <PasswordOutlinedIcon />,
    text: "Change Password",
    link: "/ChangePassword",
  },
];

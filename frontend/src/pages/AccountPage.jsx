import { useState } from "react";

import { IconUser, IconKey, IconBell } from "@tabler/icons-react";

import MyNavbar from "../components/MyNavbar";
import Account from "../components/Account";

const Password = () => {};
const Notifications = () => {};

const data = [
  {
    label: "Account",
    icon: <IconUser stroke={1.5} />,
    element: <Account />,
  },
  {
    label: "Password",
    icon: <IconKey stroke={1.5} />,
    element: <Password />,
  },
  {
    label: "Notifications",
    icon: <IconBell stroke={1.5} />,
    element: <Notifications />,
  },
];

const AccountPage = () => {
  const [active, setActive] = useState(0);

  return (
    <>
      <MyNavbar active={active} setActive={setActive} data={data} />
      {data[active].element}
    </>
  );
};

export default AccountPage;

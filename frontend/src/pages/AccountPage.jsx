import { useState, useEffect, useContext } from "react";

import { IconUser, IconKey, IconBell, IconHome } from "@tabler/icons-react";

import AuthContext from "../context/AuthProvider";
import MyNavbar from "../components/Account/MyNavbar";
import Account from "../components/Account/Account";
import Address from "../components/Account/Address";
import ChangePassword from "../components/Account/ChangePassword";

const AccountPage = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const { getUserData } = useContext(AuthContext);

  const data = [
    {
      label: "Account",
      icon: <IconUser stroke={1.5} />,
      element: <Account user={user} />,
    },
    {
      label: "Address",
      icon: <IconHome stroke={1.5} />,
      element: <Address user={user} />,
    },
    {
      label: "Password",
      icon: <IconKey stroke={1.5} />,
      element: <ChangePassword user={user} />,
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUser(data);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  return (
    <>
      <MyNavbar active={active} setActive={setActive} data={data} />
      {loading ? null : data[active].element}
    </>
  );
};

export default AccountPage;

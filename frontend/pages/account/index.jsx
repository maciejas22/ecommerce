import { useState, useEffect, useContext } from "react";

import { IconUser, IconKey, IconBell, IconHome } from "@tabler/icons-react";

import AuthContext from "@/context/AuthProvider";
import MyNavbar from "@/components/Account/MyNavbar";
import Account from "@/components/Account/Account";
import Address from "@/components/Account/Address";
import ChangePassword from "@/components/Account/ChangePassword";

const home = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const { authTokens, getUserData } = useContext(AuthContext);

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
      getUserData().then((data) => {
        setUser(data);
        setLoading(false);
      });
    };
    if (authTokens !== null) {
      fetchUserData();
    }
  }, [authTokens]);

  return (
    <>
      <MyNavbar active={active} setActive={setActive} data={data} />
      {loading ? null : data[active].element}
    </>
  );
};

export default home;

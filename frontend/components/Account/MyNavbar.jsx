import { useContext } from "react";

import { Navbar, Button, Tooltip } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

import AuthContext from "@/context/AuthProvider";

const MyNavbar = ({ active, setActive, data }) => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <Navbar p="xs" width={{ base: 80 }}>
      <Navbar.Section grow>
        {data.map((item, index) => {
          return (
            <Tooltip key={index} label={item.label} position="right">
              <Button
                variant={index === active ? "filled" : "subtle"}
                fullWidth
                onClick={() => {
                  setActive(index);
                }}
              >
                {item.icon}
              </Button>
            </Tooltip>
          );
        })}
      </Navbar.Section>

      <Navbar.Section>
        <Tooltip label="Logout" position="right">
          <Button variant="subtle" fullWidth onClick={() => logoutUser()}>
            <IconLogout stroke={1.5} />
          </Button>
        </Tooltip>
      </Navbar.Section>
    </Navbar>
  );
};

export default MyNavbar;

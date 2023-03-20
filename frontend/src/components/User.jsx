import { useState, useContext } from "react";

import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Group,
  Text,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconLogout,
  IconSettings,
  IconChevronDown,
  IconMoon,
  IconSunFilled,
  IconLogin,
  IconPencil,
  IconUser,
} from "@tabler/icons-react";
import jwt_decode from "jwt-decode";

import AuthContext from "../context/AuthProvider";

const User = ({ width }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { authTokens } = useContext(AuthContext);

  const user = authTokens ? jwt_decode(authTokens.access) : null;

  return (
    <Menu
      width={260}
      transition="pop-top-right"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target>
        <Button variant="outline">
          <Group spacing={7}>
            {user ? LoggedUserAvatar(user, width) : AnonymousUserAvatar(width)}
          </Group>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          onClick={() => toggleColorScheme()}
          icon={
            colorScheme === "dark" ? (
              <IconSunFilled size={14} stroke={1.5} />
            ) : (
              <IconMoon size={14} stroke={1.5} />
            )
          }
        >
          {colorScheme === "dark" ? "Light mode" : "Dark mode"}
        </Menu.Item>
        {user ? LoggedUserDropdown() : AnonymousUserDropdown()}
      </Menu.Dropdown>
    </Menu>
  );
};

const LoggedUserAvatar = (user, width) => {
  return (
    <>
      <Avatar src={null} alt={user.username} radius="xl" size={20} />
      {width > 768 ? (
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
          {user.username}
        </Text>
      ) : null}
      <IconChevronDown size={12} stroke={1.5} />
    </>
  );
};

const AnonymousUserAvatar = (width) => {
  return (
    <>
      <IconUser size={15} stroke={1.5} />
      {width > 768 ? (
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
          Guest
        </Text>
      ) : null}
      <IconChevronDown size={12} stroke={1.5} />
    </>
  );
};

const LoggedUserDropdown = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <>
      <Link to="/account">
        <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
          Account settings
        </Menu.Item>
      </Link>
      <Menu.Item
        icon={<IconLogout size={14} stroke={1.5} />}
        onClick={logoutUser}
      >
        Logout
      </Menu.Item>
    </>
  );
};

const AnonymousUserDropdown = () => {
  return (
    <>
      <Link to="/login">
        <Menu.Item icon={<IconLogin size={14} stroke={1.5} />}>Login</Menu.Item>
      </Link>
      <Link to="/register">
        <Menu.Item icon={<IconPencil size={14} stroke={1.5} />}>
          Register
        </Menu.Item>
      </Link>
    </>
  );
};

export default User;

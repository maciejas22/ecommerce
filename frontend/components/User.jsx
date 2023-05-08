import {useContext, useState} from "react";

import Link from "next/link";

import {Avatar, Button, Group, Menu, Text, useMantineColorScheme} from "@mantine/core";

import {
    IconChevronDown,
    IconLogin,
    IconLogout,
    IconMoon,
    IconPencil,
    IconSettings,
    IconSunFilled,
    IconUser,
} from "@tabler/icons-react";

import AuthContext from "@/context/AuthProvider";

const User = ({width}) => {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const {userName, logoutUser} = useContext(AuthContext);

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
                        {userName ? LoggedUserAvatar(userName, width) : AnonymousUserAvatar(width)}
                    </Group>
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                    onClick={() => toggleColorScheme()}
                    icon={
                        colorScheme === "dark" ? (
                            <IconSunFilled size={14} stroke={1.5}/>
                        ) : (
                            <IconMoon size={14} stroke={1.5}/>
                        )
                    }
                >
                    {colorScheme === "dark" ? "Light mode" : "Dark mode"}
                </Menu.Item>
                {userName ? LoggedUserDropdown(logoutUser) : AnonymousUserDropdown()}
            </Menu.Dropdown>
        </Menu>
    );
};

const LoggedUserAvatar = (user, width) => {
    return (
        <>
            <Avatar src={null} alt={user} radius="xl" size={20}/>
            {width > 768 ? (
                <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3}>
                    {user}
                </Text>
            ) : null}
            <IconChevronDown size={12} stroke={1.5}/>
        </>
    );
};

const AnonymousUserAvatar = (width) => {
    return (
        <>
            <IconUser size={15} stroke={1.5}/>
            {width > 768 ? (
                <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3}>
                    Guest
                </Text>
            ) : null}
            <IconChevronDown size={12} stroke={1.5}/>
        </>
    );
};

const LoggedUserDropdown = (logoutUser) => {
    return (
        <>
            <Link href="/account">
                <Menu.Item icon={<IconSettings size={14} stroke={1.5}/>}>
                    Account settings
                </Menu.Item>
            </Link>

            <Menu.Item
                onClick={() => logoutUser()}
                icon={<IconLogout size={14} stroke={1.5}/>}
            >
                Logout
            </Menu.Item>
        </>
    );
};

const AnonymousUserDropdown = () => {
    return (
        <>
            <Link href="/account/login">
                <Menu.Item icon={<IconLogin size={14} stroke={1.5}/>}>Login</Menu.Item>
            </Link>
            <Link href="/account/register">
                <Menu.Item icon={<IconPencil size={14} stroke={1.5}/>}>
                    Register
                </Menu.Item>
            </Link>
        </>
    );
};

export default User;

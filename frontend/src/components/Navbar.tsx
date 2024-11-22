import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@ui/navigation-menu';

//TODO: Remove this mock user
const user = {
  id: '101',
  username: 'Alice Green',
  avatar: '/images/avatars/avatar1.svg',
};

const Navbar = () => {
  const TABS_AUTHORIZED = [
    { label: 'Threads', href: '/threads' },
    { label: `Hi, ${user.username}`, href: `/profile/${user.id}` },
    { label: <IoMdNotificationsOutline />, href: '/notifications' },
    { label: 'Logout', href: '/' },
  ];

  const TABS_UNAUTHORIZED = [
    { label: 'Login', href: '/login' },
    { label: 'Sign up', href: '/signup' },
  ];

  const TABS = user ? TABS_AUTHORIZED : TABS_UNAUTHORIZED;

  //TODO replace with correct user
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {TABS.map(({ label, href }) => (
          <NavigationMenuItem key={label as string}>
            <NavigationMenuLink asChild>
              <Link to={href}>{label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;

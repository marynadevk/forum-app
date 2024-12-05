import { Link, useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@ui/navigation-menu';
import useUserStore from '../store/authorized-user.store';
import { useEffect, useState } from 'react';
import useTokenStore from 'src/store/token.store';

const Navbar = () => {
  const { user, setUser } = useUserStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const { removeToken } = useTokenStore();

  const handleLogout = () => {
    removeToken();
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    setIsAuthorized(!!user);
  }, [user]);

  const TABS_AUTHORIZED = [
    { label: 'Threads', href: '/threads' },
    {
      label: `Hi, ${user?.username || ''}`,
      href: `/profile/${user?.id || ''}`,
    },
    { label: <IoMdNotificationsOutline />, href: '/notifications' },
    { label: 'Logout', href: '/', action: handleLogout },
  ];

  const TABS_UNAUTHORIZED = [
    { label: 'Login', href: '/login', action: undefined },
    { label: 'Sign up', href: '/signup', action: undefined },
  ];

  const TABS = isAuthorized ? TABS_AUTHORIZED : TABS_UNAUTHORIZED;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {TABS.map(({ label, href, action }) => (
          <NavigationMenuItem key={label as string}>
            <NavigationMenuLink asChild>
              <Link
                to={href}
                onClick={(e) => {
                  if (action) {
                    e.preventDefault();
                    action();
                  }
                }}
              >{label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;

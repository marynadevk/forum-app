import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdNotificationsOutline } from 'react-icons/io';
import useTokenStore from 'src/store/token.store';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@ui/navigation-menu';
import useUserStore from '../store/authorized-user.store';

const Navbar = () => {
  const { user, setUser, notificationsCount } = useUserStore();
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
    {
      label: (
        <div className="flex items-center">
          <IoMdNotificationsOutline />
          {notificationsCount > 0 && (
            <span className="ml-2 text-sm text-red-500">
              {notificationsCount}
            </span>
          )}
        </div>
      ),
      href: '/notifications',
    },
    { label: 'Logout', href: '/', action: handleLogout },
  ];

  const TABS_UNAUTHORIZED = [
    { label: 'Threads', href: '/threads' },
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
                onClick={e => {
                  if (action) {
                    e.preventDefault();
                    action();
                  }
                }}
              >
                {label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;

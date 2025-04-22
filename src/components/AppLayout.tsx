import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { cn } from '../helpers/utils';
import {
  LayoutDashboard,
  Settings as SettingsIcon,
  CreditCard,
  PieChart,
  Users,
  Wallet,
  Building2,
  Wrench,
  Menu,
  X,
} from 'lucide-react';
import { Header } from './AppHeader';
import { profileImageState } from '../store/atoms';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const profileImage = useRecoilValue(profileImageState);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: Wallet },
    { name: 'Accounts', href: '/accounts', icon: Users },
    { name: 'Investments', href: '/investments', icon: Building2 },
    { name: 'Credit Cards', href: '/cards', icon: CreditCard },
    { name: 'Loans', href: '/loans', icon: PieChart },
    { name: 'Services', href: '/services', icon: Wrench },
    { name: 'My Privileges', href: '/privileges', icon: Users },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  const getPageTitle = () => {
    const route = navigation.find(item => item.href === location.pathname);
    return route ? route.name : 'Dashboard';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfileClick = () => {
    navigate('/settings');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white md:hidden transform transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Soar Task</h1>
              <button
                type="button"
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex-1 px-6 py-4 overflow-y-auto">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium',
                      isActive
                        ? 'bg-gray-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        'h-5 w-5 shrink-0',
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 border-r border-gray-200">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-2xl font-bold">Soar Task</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={cn(
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6',
                            isActive
                              ? 'bg-gray-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          )}
                        >
                          <item.icon
                            className={cn(
                              'h-6 w-6 shrink-0',
                              isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 md:hidden">
          <div className="flex h-16 items-center gap-x-4 px-4 shadow-sm">
            <button
              type="button"
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-lg font-semibold text-gray-900">{getPageTitle()}</h1>
              <button
                onClick={handleProfileClick}
                className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </button>
            </div>
          </div>
        </header>

        {/* Desktop header */}
        <div className="hidden md:block sticky top-0 z-40">
          <Header title={getPageTitle()} onProfileClick={handleProfileClick} />
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
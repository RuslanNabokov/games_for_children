import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';

/**
 * Navigation – строгий бар, возвращены минималистичные emoji‑иконки для ссылок
 */

interface NavItem {
  to: string;
  label: string;
  icon: string; // emoji HTML
}

const navLinks: NavItem[] = [
  { to: '/home',     label: 'Главная',   icon: '🏡' },
  { to: '/games',    label: 'Игры',      icon: '🎮' },
  // { to: '/progress', label: 'Прогресс',  icon: '📊' },
  { to: '/about-me', label: 'Обо мне',      icon: '📝' },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const navigate     = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('loggedInUser');
    if (name) setUsername(name);
  }, []);

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn');
    navigate('/login', { replace: true });
  };

  const isActive = (path: string) => (
    pathname === path ? 'border-b-2 border-blue-500 text-blue-300' : 'hover:text-gray-300'
  );

  return (
    <header className="bg-slate-800 text-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* brand */}
        <Link to="/home" className="text-xl font-semibold tracking-wide select-none">
          Обучаемся и играем
        </Link>

        {/* links (desktop) */}
        <ul className="hidden md:flex gap-6 text-sm font-medium uppercase tracking-wide">
          {navLinks.map(link => (
            <li key={link.to} className="flex items-center">
              <Link to={link.to} className={`flex items-center gap-1 transition-colors ${isActive(link.to)}`}> 
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* user */}
        {username }
      </nav>
    </header>
  );
}
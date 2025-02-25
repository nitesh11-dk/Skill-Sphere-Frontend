import { useContext } from 'react';
import AppContext from '../context/AppContext';

const Header = ({ title, subtitle }) => {
  const { user } = useContext(AppContext);

  return (
    <header className="bg-gray-800 text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-gray-400">{subtitle}</p>
            )}
          </div>
          {user && (
            <div className="mt-4 sm:mt-0 text-center sm:text-right">
              <p className="text-lg">Welcome, {user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

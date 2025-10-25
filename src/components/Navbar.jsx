import ThemeToggle from './ThemeToogle';
import { Code2 } from 'lucide-react';

const Navbar = ({ onToggleTheme, currentTheme }) => {
  return (
    <nav className="w-full bg-indigo-50 dark:bg-gray-900 fixed transition-smooth">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-600 dark:to-violet-600 p-2 rounded-lg transition-transform group-hover:scale-110">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 dark:from-indigo-600 dark:to-violet-600 bg-clip-text text-transparent">
            Developer Dashboard
          </span>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <ThemeToggle onToggle={onToggleTheme} currentTheme={currentTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
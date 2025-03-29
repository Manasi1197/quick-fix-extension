
import React from 'react';
import { PenLine } from 'lucide-react';

interface HeaderProps {
  isExtension?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isExtension = false }) => {
  return (
    <header className={`${isExtension ? 'py-2 mb-2' : 'mb-6'} flex items-center justify-center`}>
      <div className="flex items-center gap-1 animate-slide-in">
        <div className={`${isExtension ? 'w-5 h-5' : 'w-8 h-8'} flex items-center justify-center rounded-md bg-primary text-white`}>
          <PenLine size={isExtension ? 12 : 18} />
        </div>
        <h1 className={`${isExtension ? 'text-sm' : 'text-xl'} font-medium`}>Minimal Notes</h1>
      </div>
    </header>
  );
};

export default Header;

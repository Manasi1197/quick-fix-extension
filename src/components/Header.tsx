
import React from 'react';
import { PenLine } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-6 flex items-center justify-center">
      <div className="flex items-center gap-2 animate-slide-in">
        <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white">
          <PenLine size={18} />
        </div>
        <h1 className="text-xl font-medium">Minimal Notes</h1>
      </div>
    </header>
  );
};

export default Header;

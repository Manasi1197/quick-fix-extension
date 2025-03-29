
import React from 'react';
import { PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddNote: () => void;
  isExtension?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNote, isExtension = false }) => {
  return (
    <div className={`flex-1 flex flex-col items-center justify-center text-center animate-fade-in ${isExtension ? 'py-12 px-4' : 'p-4'}`}>
      <div className={`${isExtension ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-primary/10 flex items-center justify-center mb-3`}>
        <PenLine className="text-primary" size={isExtension ? 18 : 24} />
      </div>
      <h3 className={`${isExtension ? 'text-sm' : 'text-lg'} font-medium mb-2`}>No notes yet</h3>
      {isExtension ? (
        <p className="text-muted-foreground mb-3 text-xs max-w-[220px]">
          Create your first note to get started
        </p>
      ) : (
        <p className="text-muted-foreground mb-6 max-w-sm">
          Start by creating your first note. Your notes are stored locally and never shared.
        </p>
      )}
      <Button onClick={onAddNote} className="animate-scale-in" size={isExtension ? "sm" : "default"}>
        Create Note
      </Button>
    </div>
  );
};

export default EmptyState;


import React from 'react';
import { PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddNote: () => void;
  isExtension?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNote, isExtension = false }) => {
  return (
    <div className={`flex-1 flex flex-col items-center justify-center text-center animate-fade-in ${isExtension ? 'extension-empty-state' : 'p-4'}`}>
      <div className={`${isExtension ? 'w-8 h-8' : 'w-12 h-12'} rounded-full bg-primary/10 flex items-center justify-center mb-2`}>
        <PenLine className="text-primary" size={isExtension ? 16 : 24} />
      </div>
      <h3 className={`${isExtension ? 'text-xs' : 'text-lg'} font-medium mb-1`}>No notes yet</h3>
      {isExtension ? (
        <p className="text-muted-foreground mb-3 text-xs max-w-[180px]">
          Notes are stored locally
        </p>
      ) : (
        <p className="text-muted-foreground mb-6 max-w-sm">
          Start by creating your first note. Your notes are stored locally and never shared.
        </p>
      )}
      <Button onClick={onAddNote} className={`animate-scale-in ${isExtension ? 'extension-button' : ''}`} size={isExtension ? "xs" : "default"}>
        Create Note
      </Button>
    </div>
  );
};

export default EmptyState;

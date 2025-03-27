
import React from 'react';
import { PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddNote: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNote }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <PenLine className="text-primary" size={24} />
      </div>
      <h3 className="text-lg font-medium mb-2">No notes yet</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Start by creating your first note. Your notes are stored locally and never shared.
      </p>
      <Button onClick={onAddNote} className="animate-scale-in">
        Create Your First Note
      </Button>
    </div>
  );
};

export default EmptyState;

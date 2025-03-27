
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Note as NoteType } from '@/hooks/useNotes';

interface NoteProps {
  note: NoteType;
  isActive: boolean;
  onClick: () => void;
}

const Note: React.FC<NoteProps> = ({ note, isActive, onClick }) => {
  const formattedDate = formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true });
  
  // Extract the first line as title, or use default if empty
  const displayTitle = note.title || 'Untitled Note';
  
  // Extract the first few words of content for preview
  const contentPreview = note.content 
    ? note.content.slice(0, 120) + (note.content.length > 120 ? '...' : '')
    : 'No content';

  return (
    <div 
      className={cn(
        "p-4 rounded-lg transition-all duration-200 cursor-pointer overflow-hidden mb-3",
        "border border-border hover:border-primary/20",
        "animate-fade-in group",
        isActive 
          ? "bg-accent border-primary/30 shadow-sm" 
          : "hover:bg-accent/50"
      )}
      onClick={onClick}
    >
      <h3 className="font-medium text-foreground/90 mb-1 truncate group-hover:text-foreground">
        {displayTitle}
      </h3>
      <p className="text-sm text-muted-foreground truncate mb-2">
        {contentPreview}
      </p>
      <p className="text-xs text-muted-foreground opacity-80">
        {formattedDate}
      </p>
    </div>
  );
};

export default Note;

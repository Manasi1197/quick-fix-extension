
import React from 'react';
import { Note as NoteType } from '@/hooks/useNotes';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface NoteProps {
  note: NoteType;
  isActive: boolean;
  onClick: () => void;
  isExtension?: boolean;
}

const Note: React.FC<NoteProps> = ({ note, isActive, onClick, isExtension = false }) => {
  // Format the created at date
  const formattedDate = formatDistanceToNow(new Date(note.createdAt), { 
    addSuffix: true,
    includeSeconds: true
  });
  
  // Get a truncated version of the content for preview
  const contentPreview = note.content.length > 60 
    ? `${note.content.substring(0, 60)}...` 
    : note.content;
    
  // Use a default title if none exists
  const displayTitle = note.title || 'Untitled Note';
  
  return (
    <div 
      className={cn(
        'rounded-md border border-border mb-2 cursor-pointer transition-colors extension-note',
        isActive ? 'border-primary bg-primary/5' : 'hover:bg-primary/5 hover:border-primary/30',
        isExtension ? 'p-1 mb-1' : 'p-2'
      )}
      onClick={onClick}
    >
      <h3 className={cn(
        'font-medium truncate extension-note-title',
        isExtension ? 'text-xs' : 'text-base mb-1'
      )}>
        {displayTitle}
      </h3>
      
      {!isExtension && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
          {contentPreview || 'No content yet'}
        </p>
      )}
      
      <p className={cn(
        'text-muted-foreground extension-note-date',
        isExtension ? 'text-xs' : 'text-sm'
      )}>
        {formattedDate}
      </p>
    </div>
  );
};

export default Note;

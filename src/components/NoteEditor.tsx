
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Note } from '@/hooks/useNotes';
import { Trash2, ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface NoteEditorProps {
  note: Note | null;
  onUpdate: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  onDelete: (id: string) => void;
  isExtension?: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdate, onDelete, isExtension = false }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Update local state when active note changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setImages(note.images || []);
    } else {
      setTitle('');
      setContent('');
      setImages([]);
    }
  }, [note]);

  useEffect(() => {
    // Auto-focus the title input when a new note is created
    if (note && !note.title && titleRef.current) {
      titleRef.current.focus();
    }
  }, [note]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (note) {
      onUpdate(note.id, { title: e.target.value });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (note) {
      onUpdate(note.id, { content: e.target.value });
    }
  };

  const handleDelete = () => {
    if (!note) return;
    
    onDelete(note.id);
    toast({
      description: "Note deleted",
      duration: 3000,
    });
  };

  const handleImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!note || !e.target.files?.length) return;
    
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        description: "Only image files are supported",
        duration: 3000,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const newImage = event.target.result.toString();
        const updatedImages = [...images, newImage];
        setImages(updatedImages);
        onUpdate(note.id, { images: updatedImages });
        
        toast({
          description: "Image added to note",
          duration: 3000,
        });
      }
    };
    reader.readAsDataURL(file);
    
    // Reset file input
    e.target.value = '';
  }, [note, images, onUpdate]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    if (!note) return;
    
    const items = e.clipboardData.items;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (!blob) continue;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newImage = event.target.result.toString();
            const updatedImages = [...images, newImage];
            setImages(updatedImages);
            onUpdate(note.id, { images: updatedImages });
            
            toast({
              description: "Image pasted to note",
              duration: 3000,
            });
          }
        };
        
        reader.readAsDataURL(blob);
        // Prevent the image from being inserted as text
        e.preventDefault();
        break;
      }
    }
  }, [note, images, onUpdate]);

  const removeImage = useCallback((index: number) => {
    if (!note) return;
    
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    onUpdate(note.id, { images: updatedImages });
    
    toast({
      description: "Image removed from note",
      duration: 3000,
    });
  }, [note, images, onUpdate]);

  if (!note) {
    return (
      <div className={`h-full flex items-center justify-center text-muted-foreground ${isExtension ? 'text-xs' : 'text-sm'}`}>
        <p>Select a note or create a new one</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-fade-in editor-container">
      <div className="flex justify-between items-center mb-3">
        <input
          ref={titleRef}
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled Note"
          className={`font-medium ${isExtension ? 'text-sm' : 'text-lg'} bg-transparent border-none outline-none w-full focus:ring-0 p-0`}
        />
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size={isExtension ? "xs" : "sm"} 
            onClick={handleImageUpload}
            className={`text-muted-foreground hover:text-primary ${isExtension ? 'p-1' : ''}`}
            title="Add image"
          >
            <ImagePlus size={isExtension ? 12 : 16} />
          </Button>
          <Button 
            variant="ghost" 
            size={isExtension ? "xs" : "sm"} 
            onClick={handleDelete}
            className={`text-muted-foreground hover:text-destructive ${isExtension ? 'p-1' : ''}`}
            title="Delete note"
          >
            <Trash2 size={isExtension ? 12 : 16} />
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
            accept="image/*" 
          />
        </div>
      </div>

      <div className="editor-content">
        <textarea
          value={content}
          onChange={handleContentChange}
          onPaste={handlePaste}
          placeholder="Start writing..."
          className={`editor-textarea w-full resize-none bg-transparent border-none outline-none focus:ring-0 p-0 text-foreground ${isExtension ? 'text-xs' : 'text-sm'}`}
          autoFocus={!title}
        />
        
        {images.length > 0 && (
          <div className={`mt-3 ${isExtension ? 'space-y-2' : 'space-y-3'}`}>
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={image} 
                  alt={`Note image ${index + 1}`} 
                  className="note-image"
                />
                <Button
                  variant="destructive"
                  size="xs"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 p-0"
                  onClick={() => removeImage(index)}
                >
                  <X size={12} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;

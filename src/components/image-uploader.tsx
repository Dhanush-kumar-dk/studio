
"use client";

import { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

type ImageUploaderProps = {
  children: React.ReactNode;
  onUploadComplete: (url: string) => void;
};

export default function ImageUploader({ children, onUploadComplete }: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cropperRef = useRef<React.FC<any>>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsOpen(true);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleUpload = async () => {
    if (typeof (cropperRef.current as any)?.cropper !== 'undefined') {
      setIsLoading(true);
      const croppedCanvas = (cropperRef.current as any)?.cropper.getCroppedCanvas({
        width: 256,
        height: 256,
      });

      if (!croppedCanvas) {
        setIsLoading(false);
        return;
      }
      const dataUrl = croppedCanvas.toDataURL('image/jpeg', 0.7);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Error', description: 'You must be logged in to upload an image.', variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      try {
        // Convert base64 dataUrl to Blob for Supabase Storage
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        
        const filePath = `${user.id}/${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, blob, {
            contentType: 'image/jpeg',
            upsert: true
          });
          
        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        
        await supabase.auth.updateUser({
            data: { avatar_url: publicUrl }
        });

        onUploadComplete(publicUrl);
        toast({ title: 'Success', description: 'Profile picture updated!' });
        setIsOpen(false);
        setImage(null);
      } catch (error) {
        console.error("Error uploading image: ", error);
        toast({ title: 'Upload Failed', description: 'Could not upload image. Please try again.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div onClick={() => fileInputRef.current?.click()}>
        {children}
        <Input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/png, image/jpeg"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crop your new profile picture</DialogTitle>
          </DialogHeader>
          {image && (
            <Cropper
              ref={cropperRef as any}
              style={{ height: 400, width: '100%' }}
              src={image}
              aspectRatio={1}
              viewMode={1}
              guides={false}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button onClick={handleUpload} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}


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
import { auth, storage } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
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
      const croppedCanvas = (cropperRef.current as any)?.cropper.getCroppedCanvas();
      if (!croppedCanvas) {
        setIsLoading(false);
        return;
      }
      const dataUrl = croppedCanvas.toDataURL();
      
      const user = auth.currentUser;
      if (!user) {
        toast({ title: 'Error', description: 'You must be logged in to upload an image.', variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      const storageRef = ref(storage, `avatars/${user.uid}`);

      try {
        await uploadString(storageRef, dataUrl, 'data_url');
        const downloadURL = await getDownloadURL(storageRef);
        
        await updateProfile(user, { photoURL: downloadURL });

        onUploadComplete(downloadURL);
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

"use client";

import { useState, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { updateProfile } from 'firebase/auth';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '@/lib/firebase';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';

export default function ImageUpload() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!user || !cropperRef.current) return;

    const cropper = cropperRef.current?.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();

    if (!croppedCanvas) {
        toast({ title: "Error", description: "Could not crop image.", variant: "destructive" });
        return;
    }
    
    const dataUrl = croppedCanvas.toDataURL();

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);
      await uploadString(storageRef, dataUrl, 'data_url');
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL });

      toast({
        title: 'Success!',
        description: 'Your profile picture has been updated.',
      });
      setImageSrc(null); // Close the dialog
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload failed',
        description: 'Could not upload your new profile picture. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
  };

  return (
    <div className="flex items-center space-x-6">
        <div className="relative h-24 w-24">
            <Image
                src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'A'}&background=random`}
                alt="Profile picture"
                className="h-24 w-24 rounded-full object-cover"
                width={96}
                height={96}
            />
        </div>

      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
      >
        <Upload className="mr-2 h-4 w-4" />
        Change Picture
      </Button>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <Dialog open={!!imageSrc} onOpenChange={(open) => !open && setImageSrc(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crop your new profile picture</DialogTitle>
          </DialogHeader>
          {imageSrc && (
            <Cropper
              ref={cropperRef}
              src={imageSrc}
              style={{ height: 400, width: '100%' }}
              aspectRatio={1}
              guides={false}
              viewMode={1}
              autoCropArea={1}
              background={false}
              responsive={true}
              checkOrientation={false}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setImageSrc(null)} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Save Picture'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

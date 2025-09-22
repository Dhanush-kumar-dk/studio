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
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

export default function ImageUpload() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPhotoUrl, setCurrentPhotoUrl] = useState(user?.photoURL || "https://picsum.photos/seed/gene-rodrig/200/200");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = ''; // Allow re-selecting the same file
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!cropperRef.current) return;

    const cropper = cropperRef.current?.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();

    if (!croppedCanvas) {
        toast({ title: "Error", description: "Could not crop image.", variant: "destructive" });
        return;
    }
    
    const dataUrl = croppedCanvas.toDataURL();
    setIsUploading(true);

    if (user) {
        try {
        const storageRef = ref(storage, `profile-pictures/${user.uid}`);
        await uploadString(storageRef, dataUrl, 'data_url');
        const photoURL = await getDownloadURL(storageRef);

        await updateProfile(user, { photoURL });
        
        setCurrentPhotoUrl(photoURL);
        toast({
            title: 'Success!',
            description: 'Your profile picture has been updated.',
        });
        } catch (error) {
        console.error('Error uploading image:', error);
        toast({
            title: 'Upload failed',
            description: 'Could not upload your new profile picture. Please try again.',
            variant: 'destructive',
        });
        }
    } else {
        // Handle non-logged in user case, just update UI
        setCurrentPhotoUrl(dataUrl);
        toast({
            title: 'Image Set',
            description: 'Your profile picture has been set for this session.',
        });
    }

    setIsUploading(false);
    setImageSrc(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
        <div className="relative h-40 w-40">
            <Image
                key={currentPhotoUrl} // Force re-render on change
                src={currentPhotoUrl}
                alt="Profile picture"
                className="rounded-lg object-cover"
                width={160}
                height={160}
            />
             <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                onClick={() => setCurrentPhotoUrl(`https://picsum.photos/seed/${user?.uid || 'placeholder'}/200/200`)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
        </div>

      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload Photo
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


"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ImageUploader from "./image-uploader";
import { Camera } from "lucide-react";

type UserProfileCardProps = {
    userData: {
        username: string;
        firstName: string;
        lastName: string;
        bio: string;
        avatarUrl: string;
    },
    isEditing: boolean;
    onAvatarChange: (newUrl: string) => void;
}

export default function UserProfileCard({ userData, isEditing, onAvatarChange }: UserProfileCardProps) {
    return (
        <Card>
            <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-8 sm:flex-row">
                <div className="relative flex-shrink-0">
                    <Avatar className="h-36 w-36 border-4 border-background shadow-md">
                        <AvatarImage src={userData.avatarUrl} alt={userData.username} />
                        <AvatarFallback>{userData.firstName.charAt(0)}{userData.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                     {isEditing && (
                       <ImageUploader onUploadComplete={onAvatarChange}>
                         <div className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
                           <Camera className="h-4 w-4" />
                           <span className="sr-only">Change photo</span>
                         </div>
                       </ImageUploader>
                    )}
                </div>
                <div className="flex-1 space-y-3">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <h2 className="text-2xl font-bold">{userData.username}</h2>
                </div>
                <p className="max-w-xl text-center text-muted-foreground sm:text-left">{userData.bio}</p>
                </div>
            </div>
            </CardContent>
        </Card>
    )
}

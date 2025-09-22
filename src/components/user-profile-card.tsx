
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserProfileCardProps = {
    userData: {
        username: string;
        firstName: string;
        lastName: string;
        bio: string;
        avatarUrl: string;
    }
}

export default function UserProfileCard({ userData }: UserProfileCardProps) {
    return (
        <Card>
            <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-8 sm:flex-row">
                <div className="flex-shrink-0">
                    <Avatar className="h-36 w-36 border-4 border-background shadow-md">
                        <AvatarImage src={userData.avatarUrl} alt={userData.username} />
                        <AvatarFallback>{userData.firstName.charAt(0)}{userData.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
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

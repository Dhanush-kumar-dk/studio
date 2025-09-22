import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
             <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>This is your profile page. You can manage your profile settings here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Profile settings will go here.</p>
                </CardContent>
            </Card>
        </div>
    )
}

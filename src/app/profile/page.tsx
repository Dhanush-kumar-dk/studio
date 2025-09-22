import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
             <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>This is your profile page. More settings will be available soon.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Welcome to your profile!</p>
                </CardContent>
            </Card>
        </div>
    )
}

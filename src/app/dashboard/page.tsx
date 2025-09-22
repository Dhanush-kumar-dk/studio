
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="mt-4">
        <Card>
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Welcome to your dashboard. This is where you can manage your application.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Dashboard content will go here.</p>
            </CardContent>
        </Card>
    </div>
  );
}

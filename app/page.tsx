import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>My Content Management System</Link>
              <Link href={"/posts"}>Posts</Link>
            </div>
            <AuthButton />
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 w-full p-5">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Welcome to My Content Management System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base mb-4">
                A modern, user-friendly content management system built with Next.js and Supabase. Easily create, edit, and manage your digital content with our intuitive interface and powerful features.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6 text-sm text-muted-foreground">
                <li>Secure authentication and user management</li>
                <li>Real-time content updates and collaboration</li>
                <li>Customizable content types and fields</li>
                <li>Built-in versioning and content scheduling</li>
                <li>Responsive design for all devices</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

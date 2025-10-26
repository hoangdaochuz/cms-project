import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import Link from "next/link";
import { isLoggedIn } from "@/utils/helper";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>My Content Management System</Link>
              <Link href={"/posts"}>Posts</Link>
            </div>
            <AuthButton />
          </div>
        </nav>
      </div>
      <div className="w-full p-8">
        {children}
      </div>
    </main>
  );
}
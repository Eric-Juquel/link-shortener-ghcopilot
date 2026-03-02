import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-10 py-32 px-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Link Shortener
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Shorten, share, and track your links in one place. Sign in to get
            started.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <SignUpButton mode="modal">
            <Button className="h-12 w-full rounded-full px-8 sm:w-auto">
              Get Started
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="h-12 w-full rounded-full px-8 sm:w-auto"
            >
              Sign In
            </Button>
          </SignInButton>
        </div>
      </main>
    </div>
  );
}

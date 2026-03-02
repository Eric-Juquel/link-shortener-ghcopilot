import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Link2,
  BarChart3,
  Shield,
  Zap,
  MousePointerClick,
  Globe,
  ArrowRight,
} from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center">
        <Badge variant="secondary" className="mb-6">
          🚀 Simple, fast & reliable
        </Badge>
        <h1 className="mb-6 max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Shorten links. <span className="text-primary">Track everything.</span>
        </h1>
        <p className="mb-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
          Create short, shareable links in seconds. Monitor clicks, analyse your
          audience, and manage all your URLs from a single dashboard.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg" className="h-12 rounded-full px-8 gap-2">
              Get Started for Free <ArrowRight className="size-4" />
            </Button>
          </SignUpButton>
          <SignInButton mode="modal" forceRedirectUrl="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="h-12 rounded-full px-8"
            >
              Sign In
            </Button>
          </SignInButton>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required · Free forever
        </p>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/40 px-6 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {[
            { value: "10M+", label: "Links shortened" },
            { value: "500M+", label: "Clicks tracked" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="mt-1 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage your links
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A complete toolkit for URL management, from creation to detailed
              analytics.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Zap className="size-5" />,
                title: "Instant shortening",
                description:
                  "Transform any long URL into a short, memorable link in one click.",
              },
              {
                icon: <BarChart3 className="size-5" />,
                title: "Click analytics",
                description:
                  "Track every click in real time. See when, where, and how your links are used.",
              },
              {
                icon: <MousePointerClick className="size-5" />,
                title: "Custom slugs",
                description:
                  "Choose a custom alias for your links to make them more recognisable.",
              },
              {
                icon: <Globe className="size-5" />,
                title: "Easy sharing",
                description:
                  "Copy and share your short links anywhere — social media, emails, messages.",
              },
              {
                icon: <Link2 className="size-5" />,
                title: "Link management",
                description:
                  "Organise, edit, and delete all your links from a centralised dashboard.",
              },
              {
                icon: <Shield className="size-5" />,
                title: "Secure & private",
                description:
                  "Your data is protected. Each link is tied to your account with full privacy control.",
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="border bg-card transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="border-t bg-muted/40 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">
              How it works
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Up and running in 3 steps
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create an account",
                description:
                  "Sign up for free in seconds. No credit card required.",
              },
              {
                step: "02",
                title: "Shorten your first link",
                description:
                  "Paste your long URL and get a short link instantly.",
              },
              {
                step: "03",
                title: "Share & track",
                description:
                  "Share your link and monitor clicks from your dashboard.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                <span className="mb-4 text-5xl font-black text-primary/20">
                  {item.step}
                </span>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-32 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-muted-foreground text-lg">
            Join thousands of users who trust our platform to manage their links
            every day.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" className="h-12 rounded-full px-10 gap-2">
              Create your free account <ArrowRight className="size-4" />
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Link Shortener. All rights reserved.</p>
      </footer>
    </div>
  );
}

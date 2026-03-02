import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getLinksByUserId } from "@/data/links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link2, ExternalLink, Calendar } from "lucide-react";
import { CreateLinkDialog } from "@/components/create-link-dialog";
import { LinkCardActions } from "@/components/link-card-actions";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const userLinks = await getLinksByUserId(userId);

  const headersList = await headers();
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return (
    <main className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your shortened links
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-sm">
            {userLinks.length} {userLinks.length === 1 ? "link" : "links"}
          </Badge>
          <CreateLinkDialog />
        </div>
      </div>

      {/* Empty state */}
      {userLinks.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
            <Link2 className="size-10 opacity-30" />
            <p className="text-lg font-medium">No links yet</p>
            <p className="text-sm">
              Create your first shortened link to get started.
            </p>
            <CreateLinkDialog />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userLinks.map((link) => (
            <Card
              key={link.id}
              className="group hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-start justify-between gap-2">
                  <a
                    href={`${baseUrl}/l/${link.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-primary hover:underline flex items-center gap-1 min-w-0"
                  >
                    <span className="truncate">/{link.shortCode}</span>
                    <ExternalLink className="size-3.5 shrink-0" />
                  </a>
                  <LinkCardActions link={link} />
                </CardTitle>
                <CardDescription className="truncate" title={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.url}
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3.5 shrink-0" />
                  {new Date(link.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}

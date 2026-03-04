import { getLinkByShortCode } from '@/data/links';
import { redirect, notFound } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;

  const link = await getLinkByShortCode(shortcode);

  if (!link) {
    notFound();
  }

  redirect(link.url);
}

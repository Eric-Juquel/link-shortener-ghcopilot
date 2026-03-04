import { db } from '@/db/db';
import { links, type Link, type NewLink } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

/**
 * Fetches all links belonging to the given user, sorted by most recent.
 * @param userId - The authenticated user's Clerk ID
 * @returns Array of Link objects owned by the user
 */
export async function getLinksByUserId(userId: string): Promise<Link[]> {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

/**
 * Inserts a new link into the database.
 * @param data - The link data to insert (url, shortCode, userId)
 * @returns The newly created Link object
 */
export async function insertLink(
  data: Pick<NewLink, 'url' | 'shortCode' | 'userId'>,
): Promise<Link> {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

/**
 * Fetches a single link by its ID.
 * @param id - The link's primary key
 * @returns The Link object or undefined if not found
 */
export async function getLinkById(id: number): Promise<Link | undefined> {
  const [link] = await db.select().from(links).where(eq(links.id, id));
  return link;
}

/**
 * Updates an existing link's URL and short code.
 * @param id - The link's primary key
 * @param data - The new url and shortCode values
 * @returns The updated Link object
 */
export async function updateLink(
  id: number,
  data: Pick<NewLink, 'url' | 'shortCode'>,
): Promise<Link> {
  const [link] = await db
    .update(links)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(links.id, id))
    .returning();
  return link;
}

/**
 * Permanently deletes a link by its ID.
 * @param id - The link's primary key
 */
export async function deleteLinkById(id: number): Promise<void> {
  await db.delete(links).where(eq(links.id, id));
}

/**
 * Fetches a single link by its short code.
 * @param shortCode - The unique short code identifying the link
 * @returns The Link object or undefined if not found
 */
export async function getLinkByShortCode(
  shortCode: string,
): Promise<Link | undefined> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode));
  return link;
}

'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import {
  insertLink,
  getLinkById,
  updateLink,
  deleteLinkById,
} from '@/data/links';

type CreateLinkInput = {
  url: string;
  shortCode: string;
};

type CreateLinkResult = { success: true } | { error: string };

const createLinkSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  shortCode: z
    .string()
    .min(1, 'Short code is required')
    .max(50, 'Short code must be 50 characters or less')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Short code can only contain letters, numbers, hyphens and underscores',
    ),
});

/**
 * Creates a new shortened link for the authenticated user.
 * @param input - The URL and short code for the new link
 * @returns { success: true } or { error: string }
 */
export async function createLink(
  input: CreateLinkInput,
): Promise<CreateLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: 'Unauthorized' };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await insertLink({ ...parsed.data, userId });
    return { success: true };
  } catch (err) {
    // Handle unique constraint violation on shortCode
    if (err instanceof Error && err.message.includes('unique')) {
      return {
        error: 'This short code is already taken. Please choose another.',
      };
    }
    return { error: 'Failed to create link. Please try again.' };
  }
}

// ---------------------------------------------------------------------------
// Edit Link
// ---------------------------------------------------------------------------

type EditLinkInput = {
  id: number;
  url: string;
  shortCode: string;
};

type EditLinkResult = { success: true } | { error: string };

const editLinkSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url('Please enter a valid URL'),
  shortCode: z
    .string()
    .min(1, 'Short code is required')
    .max(50, 'Short code must be 50 characters or less')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Short code can only contain letters, numbers, hyphens and underscores',
    ),
});

/**
 * Updates an existing link owned by the authenticated user.
 * @param input - The link id, new URL and new short code
 * @returns { success: true } or { error: string }
 */
export async function editLink(input: EditLinkInput): Promise<EditLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: 'Unauthorized' };

  const parsed = editLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const existing = await getLinkById(parsed.data.id);
  if (!existing || existing.userId !== userId) {
    return { error: 'Link not found.' };
  }

  try {
    await updateLink(parsed.data.id, {
      url: parsed.data.url,
      shortCode: parsed.data.shortCode,
    });
    return { success: true };
  } catch (err) {
    if (err instanceof Error && err.message.includes('unique')) {
      return {
        error: 'This short code is already taken. Please choose another.',
      };
    }
    return { error: 'Failed to update link. Please try again.' };
  }
}

// ---------------------------------------------------------------------------
// Delete Link
// ---------------------------------------------------------------------------

type DeleteLinkInput = { id: number };
type DeleteLinkResult = { success: true } | { error: string };

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

/**
 * Permanently deletes a link owned by the authenticated user.
 * @param input - The link id to delete
 * @returns { success: true } or { error: string }
 */
export async function deleteLink(
  input: DeleteLinkInput,
): Promise<DeleteLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: 'Unauthorized' };

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const existing = await getLinkById(parsed.data.id);
  if (!existing || existing.userId !== userId) {
    return { error: 'Link not found.' };
  }

  try {
    await deleteLinkById(parsed.data.id);
    return { success: true };
  } catch {
    return { error: 'Failed to delete link. Please try again.' };
  }
}

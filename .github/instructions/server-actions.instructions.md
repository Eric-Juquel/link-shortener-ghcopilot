---
description: Read this file before implementing or modifying server actions for data mutations in the project.
---

# Server Actions Instructions

## Overview

All data mutations must be performed via **Next.js Server Actions**. Never mutate data directly from client components or API routes.

## Rules

### File Naming & Colocation

- Server action files MUST be named `actions.ts`
- Place `actions.ts` in the **same directory** as the component that calls it

```
app/dashboard/
  page.tsx
  actions.ts       ✅ colocated
```

### Calling Server Actions

- Server actions MUST be called from **client components** (`"use client"`)
- Never call server actions from server components

### TypeScript Types

- ALL data passed to server actions MUST have explicit TypeScript types
- **NEVER** use the `FormData` type — define a proper typed object instead

```typescript
// ✅ Correct
type CreateLinkInput = {
  url: string;
  slug: string;
};

export async function createLink(input: CreateLinkInput) { ... }

// ❌ Wrong
export async function createLink(formData: FormData) { ... }
```

### Validation with Zod

- ALL inputs MUST be validated using **Zod** before any processing

```typescript
import { z } from "zod";

const createLinkSchema = z.object({
  url: z.string().url(),
  slug: z.string().min(1).max(50),
});

export async function createLink(input: CreateLinkInput) {
  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };
  // ...
}
```

### Authentication Check

- ALL server actions MUST verify a logged-in user **before** any database operation
- Use Clerk's `auth()` to retrieve the current user

```typescript
import { auth } from "@clerk/nextjs/server";

export async function createLink(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };
  // ...
}
```

### Return Values

- Server actions MUST **never throw errors**
- Always return a typed object with either a `success` or `error` property

```typescript
// ✅ Correct
export async function createLink(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  await insertLink({ ...parsed.data, userId });
  return { success: true };
}

// ❌ Wrong
export async function createLink(input: CreateLinkInput) {
  throw new Error("Unauthorized");
}
```

### Database Operations

- Server actions MUST NOT use Drizzle queries directly
- ALL database operations must go through **helper functions** located in the `/data` directory

```typescript
// ✅ Correct — using a helper from /data
import { insertLink } from "@/data/links";

export async function createLink(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  await insertLink({ ...parsed.data, userId });
  return { success: true };
}

// ❌ Wrong — direct Drizzle query in server action
import { db } from "@/db/db";
export async function createLink(...) {
  await db.insert(links).values(...);
}
```

## Checklist

Before submitting a server action, verify:

- [ ] File is named `actions.ts` and colocated with the calling component
- [ ] Called from a `"use client"` component
- [ ] Input uses a typed object (not `FormData`)
- [ ] Input is validated with Zod
- [ ] Auth check is the first operation
- [ ] Database calls use `/data` helper functions only
- [ ] Returns `{ success: true }` or `{ error: string }` — never throws

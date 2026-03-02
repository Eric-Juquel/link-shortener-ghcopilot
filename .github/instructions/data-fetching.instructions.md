---
description: Read this file to understand how to fetch data in the project.
---

# Data Fetching Guidelines

This document outlines the best practices for fetching data in our project. Follow these guidelines to ensure consistency and maintainability across the codebase.

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS using Server Components for data fetching is recommended. NEVER use Client Components for data fetching.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory for data fetching. NEVER fetch data directly in the components. This promotes separation of concerns and makes it easier to manage data fetching logic.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions. This ensures consistency and leverages the benefits of Drizzle ORM, such as type safety and query building.

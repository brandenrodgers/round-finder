# Round Finder

A Next.js app for searching golf tee times across ~15 courses in the Massachusetts area. It aggregates availability from two public booking platforms — **PHX/TeeItUp** and **Foreup Software** — by calling their unauthenticated APIs directly, then presents results with filtering and sorting.

## How it works

The user picks a date, hole count, number of players, and time range on the home page. On submit, the app hits `/api/tee-times`, which fans out requests to all configured courses in parallel, normalizes the responses into a shared `TeeTime` format, and returns them. Results are cached for 5 minutes per date. The client then lets the user filter and sort course cards, and click through to book on the course's own site.

## Course ranking

Each course has a `rank` field (integer 1–10) that expresses subjective quality — **higher is better** (10 = best). Rank drives two sort modes:

- **Quality** — sorts courses by rank descending (best first).
- **For Me** (default) — sorts by rank descending as the primary key, then by distance from the user's location as a tiebreaker.

Set rank when adding a course. There's no enforced scale, but the convention in this repo is roughly:

| Rank | Meaning |
|------|---------|
| 9–10 | Destination-worthy, well-maintained |
| 5–8  | Solid everyday course |
| 3–4  | Fine but unremarkable |
| 1–2  | Last resort |

## Adding a new course

Every course is a small handler file in `lib/courseHandlers/`. Two factory functions cover the supported booking platforms:

**PHX/TeeItUp** (`lib/phxApi.ts`):
```ts
// lib/courseHandlers/myCourse.ts
import { makePHXHandler } from "../phxApi";

export default makePHXHandler({
  id: "myCourse",
  name: "My Golf Course",
  image: "https://...",
  rank: 5,           // 1–10, lower = higher quality
  facilityId: 12345,
  facilityAlias: "my-golf-course",
});
```

**Foreup Software** (`lib/foreupsoftwareApi.ts`):
```ts
// lib/courseHandlers/myCourse.ts
import { makeForeupsoftwareHandler } from "../foreupsoftwareApi";

export default makeForeupsoftwareHandler({
  id: "myCourse",
  name: "My Golf Course",
  image: "https://...",
  rank: 5,
  bookingClass: 12345,
  bookingId: 67890,
  scheduleId: 11111,
});
```

Then register it in `lib/courseHandlers/index.ts`. That's it — the API route picks it up automatically.

To find the IDs, open the course's booking site and watch the network tab for API calls to `phx-api-be-east-1b.kenna.io` or `foreupsoftware.com`.

For courses on neither platform, add them to `ADDITIONAL_COURSES` in `lib/constants.ts` and they'll appear in the manual-link accordion.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Project structure

```
app/
  api/tee-times/route.ts   # API route — fetches & caches all courses
  page.tsx                 # Home / search form
  tee-times/
    layout.tsx             # Wraps course pages with header/footer
    page.tsx               # Course listings
    [courseId]/page.tsx    # Tee times for a specific course
components/                # React client components
lib/
  courseHandlers/          # One file per course
  phxApi.ts                # PHX handler factory
  foreupsoftwareApi.ts     # Foreup handler factory
  cache.ts                 # 5-min in-memory cache
  types.ts                 # Shared TypeScript types
  constants.ts             # Sort values, additional courses
store/                     # Redux slices, selectors, hooks
```

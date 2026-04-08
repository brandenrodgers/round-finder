---
name: add-course
description: Add a new golf course to the Round Finder app. Creates the handler file and registers it in the index.
argument-hint: "[course name] [booking link]"
disable-model-invocation: true
allowed-tools: Read Write Edit Glob Grep WebSearch WebFetch Bash
---

You are adding a new golf course to the Round Finder app. The user has provided:

**Arguments:** $ARGUMENTS

Parse the arguments: everything before a URL is the course name; if a URL is present, that is the booking link. The booking link is optional.

---

## Step 1: Identify the Booking Platform

Check the booking link (if provided) against these supported platforms:

| Platform | URL Pattern | Handler Type |
|----------|-------------|--------------|
| ForeUp | `foreupsoftware.com` | LIVE — `makeForeupsoftwareHandler` |
| TeeItUp / PHX | `*.book.teeitup.golf` or `kenna.io` | LIVE — `makePHXHandler` |
| CPS Golf | `*.cps.golf` | MANUAL — `makeManualHandler` |
| No link or other | anything else | MANUAL — `makeManualHandler` |

If no booking link is provided, or if the platform is unrecognized, use a manual handler and note this to the user.

**For ForeUp URLs**, try to extract `bookingClass`, `scheduleId`, and `bookingId` from the URL path/params (e.g. `foreupsoftware.com/index.php/booking/{bookingId}/{scheduleId}`). If you can't extract them, use a manual handler and tell the user what IDs they'll need to supply to convert it to a live handler later.

**For TeeItUp/PHX URLs**, try to extract `facilityId` and `facilityAlias` from the URL (e.g. `{facilityAlias}.book.teeitup.golf/?course={facilityId}`). If you can't extract them, use a manual handler.

---

## Step 2: Research the Course Online

Use WebSearch to find the following information about the course. Search for the course name + "golf course" if needed to disambiguate:

- **City and state** — where the course is located (format: "City, ST")
- **GPS coordinates** — latitude and longitude (search for the course on Google Maps or similar; use decimal degrees with 4 decimal places)
- **Quality rank** — a rating from 1–10 based on the course's reputation. Use golf review sites (Golf Advisor, Golf Pass, Golf Digest rankings, etc.) to inform this. Map to this scale:
  - 9–10: Top-tier, nationally recognized
  - 7–8: Great course, well-reviewed locally
  - 5–6: Good, solid course
  - 3–4: Fair, average course
  - 1–2: Below average
- **Image URL** — a high-quality, publicly accessible image URL. Prefer the course's official website, Golf Pass CDN (`golf-pass.brightspotcdn.com`), or other reliable CDNs. Avoid URLs that are likely to break.

If you can't find reliable info for any field, use a reasonable placeholder and flag it clearly to the user.

---

## Step 3: Generate the Handler ID

Convert the course name to camelCase for use as the handler ID. Drop generic suffixes like "Golf Course" or "Country Club" only if the name is still clearly identifiable without them — otherwise keep them. Examples:
- "Hickory Hill Golf Course" → `hickoryHill`
- "Black Swan Country Club" → `blackSwan`
- "George Wright Golf Course" → `georgeWright`

---

## Step 4: Create the Handler File

Create a new file at:
`/Users/brodgers/src/round-finder/lib/courseHandlers/{camelCaseId}.ts`

**For a MANUAL handler:**
```typescript
import { makeManualHandler } from "../manualApi";

export default makeManualHandler({
  id: "{camelCaseId}",
  name: "{Full Course Name}",
  bookLink: "{bookingLink}",
  image: "{imageUrl}",
  rank: {rank},
  coordinates: { lat: {lat}, lng: {lng} }, // {City, ST}
  location: "{City, ST}",
});
```

**For a ForeUp LIVE handler:**
```typescript
import { makeForeupsoftwareHandler } from "../foreupsoftwareApi";

const ID = "{camelCaseId}";
const NAME = "{Full Course Name}";
const IMAGE = "{imageUrl}";
const RANK = {rank};

const BOOKING_CLASS = {bookingClass};
const BOOKING_ID = {bookingId};
const SCHEDULE_ID = {scheduleId};

export default makeForeupsoftwareHandler({
  bookingClass: BOOKING_CLASS,
  bookingId: BOOKING_ID,
  image: IMAGE,
  id: ID,
  name: NAME,
  rank: RANK,
  scheduleId: SCHEDULE_ID,
  coordinates: { lat: {lat}, lng: {lng} }, // {City, ST}
  location: "{City, ST}",
});
```

**For a PHX/TeeItUp LIVE handler:**
```typescript
import { makePHXHandler } from "../phxApi";

const ID = "{camelCaseId}";
const NAME = "{Full Course Name}";
const IMAGE = "{imageUrl}";
const RANK = {rank};

const FACILITY_ID = {facilityId};
const FACILITY_ALIAS = "{facilityAlias}";

export default makePHXHandler({
  facilityAlias: FACILITY_ALIAS,
  facilityId: FACILITY_ID,
  id: ID,
  image: IMAGE,
  name: NAME,
  rank: RANK,
  coordinates: { lat: {lat}, lng: {lng} }, // {City, ST}
  location: "{City, ST}",
});
```

---

## Step 5: Register the Handler in the Index

Read and update `/Users/brodgers/src/round-finder/lib/courseHandlers/index.ts`:

1. Add an import at the top with the other imports of the same type (live vs manual), in alphabetical order
2. Add the handler to the appropriate export object:
   - Live handlers → `courseHandlers` (the default export object)
   - Manual handlers → `manualCourseHandlers`

The existing file structure:
- Lines 1–16: live handler imports
- Lines 18–22: manual handler imports
- Lines 24–41: `courseHandlers` object (live)
- Lines 43–49: `manualCourseHandlers` object (manual)

---

## Step 6: Report to the User

Summarize what was done:
- Course name, ID, and location
- Platform detected and handler type created
- Rank assigned and why
- Image URL found
- Any fields that need manual verification or follow-up (missing IDs, uncertain rank, etc.)
- Any next steps (e.g., "To make this a live ForeUp handler, supply bookingClass, bookingId, and scheduleId")

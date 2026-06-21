# Queue Runner Specification

Purpose: publish approved scheduled items with fewer failures and no duplicates.

## Source of truth

Use the dashboard as the source of truth:

- Pipeline
- Publishing Queue
- Published Library
- Publishing Log
- Automation Health
- Error Log

## Selection rule

At each scheduled run:

1. Determine current Europe/Warsaw time.
2. Read scheduled queue items for the current time window.
3. Pick only items with approved state and SCHEDULED status.
4. Skip items already marked PUBLISHED.
5. Skip items with existing platform URLs unless explicitly instructed to repair metadata.

## Required fields before publishing

Each item must have:

- content ID
- brand
- platform targets
- Drive video file ID
- title
- description or caption
- approved flag
- scheduled time
- manual fallback package

## FSR platform accounts

FactsAndStoriesFromReddit:

- YouTube account: youtube_bevel-atomy
- Instagram account: instagram_cheve-talbot

## Standard staging flow

Use this upload flow:

1. Google Drive download final MP4.
2. Convert to uploadable file object with name, mimetype, and s3key.
3. Upload to YouTube.
4. Create Instagram Reel container.
5. Publish Instagram media.
6. Verify permalink and caption.

## Duplicate protection

Before upload:

- Check Pipeline status.
- Check Published Library for the ID.
- Check YouTube URL and Instagram URL fields.

After a partial failure:

- Do not blindly retry.
- Determine whether YouTube or Instagram already succeeded.
- Only repair the missing platform.

## Backup requirement

Every scheduled item must have:

- copy of MP4 in 08_SCHEDULED_BACKUP
- manual instructions TXT
- dashboard note with fallback links

If backup is missing, do not auto-publish. Mark the item NEEDS_ATTENTION and report missing fallback.

## Post-publish update

After success:

- Update Pipeline to PUBLISHED.
- Update Published Library.
- Append Publishing Log.
- Verify Instagram hashtags show # not %23.
- Report final platform URLs.

## Failure states

Use clear states:

- NEEDS_ATTENTION: recoverable operational issue
- FAILED: confirmed failure after safe retries
- PARTIAL_PUBLISHED: one platform succeeded, one failed

## Safety rule

Never publish public content unless the item has explicit user approval or is in a pre-approved scheduled queue.

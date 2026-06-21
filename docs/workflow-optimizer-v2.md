# AI Content Factory Workflow Optimizer v2

Purpose: reduce manual decisions, reduce production failures, and make weekly batch production predictable while keeping public publishing approval-gated.

## Operating model

The system runs in weekly cycles:

1. Weekly scan
2. Performance summary
3. Batch plan
4. Topic and title approval
5. Script generation
6. Voice generation
7. Video render
8. Drive review
9. Schedule proposal
10. Scheduled backup package
11. Platform publishing
12. Stats snapshot

Public content is never published without explicit approval.

## Weekly scan inputs

Read these dashboard areas:

- Published Library
- Stats Snapshots
- Pipeline
- Publishing Log
- Video Requests
- Publishing Queue
- Automation Health
- Error Log

The weekly scan should identify:

- strongest topics
- weakest topics
- best posting slots
- queued items
- scheduled items without backup
- automation blockers
- render or upload failures

## FSR standard

FactsAndStoriesFromReddit uses:

- original transformed stories, never copied Reddit posts
- Brian voice
- RS-003 / Batch 003 pacing
- cropped.mp4 vertical gameplay master
- top-center logo and channel name overlay for the full video
- no subtitles or burned-in narration text
- description order: title, hashtags, credit line
- final credit line: Video by GameplaysForFree

## Approval gates

Required approval points:

1. Weekly production plan
2. Topic list
3. Final titles
4. Script batch
5. Review MP4s
6. Schedule queue
7. Publish command or pre-approved schedule

## Speed rules

To make production faster:

- Generate topics in batches of 3 to 5.
- Approve titles before voice generation.
- Use one document per batch for scripts.
- Use the same render profile for all FSR videos.
- Create scheduled backup immediately after scheduling.
- Do not retry failed publishing blindly; check duplicate protection first.

## Scheduled backup rule

Every scheduled item must have:

- MP4 copy in 08_SCHEDULED_BACKUP
- plain text manual upload instructions
- title
- description
- platform accounts
- fallback links in dashboard notes

## Duplicate protection

Before upload, check dashboard and platform links. Skip if the content ID is already marked PUBLISHED or has existing platform URLs.

## Instagram QA

After every Instagram publish, verify the caption uses # hashtags, not encoded %23.

## Failure handling

If automation fails:

1. Log the failure.
2. Do not publish a duplicate.
3. Report the fallback folder and manual package.
4. Mark item NEEDS_ATTENTION or keep SCHEDULED with failure note.

## Current blocker

The live Telegram webhook still depends on Vercel deployment health. Until that is fixed, weekly workflow runs through scheduled automations and dashboard-driven state.

# Instagram Publishing Runner

Purpose: replace fragile direct chat-session Instagram publishing with a backend-controlled publishing runner.

## Incident

FSR-RS-012 was published successfully to YouTube, but Instagram publishing failed after the Reel container was created. The final publish action was blocked by the chat/tool execution layer. After that, even read-only Instagram checks in the same session were blocked, so the session could not finish or verify Instagram publication.

Current status:

- YouTube: published
- YouTube URL: https://youtu.be/DvX83Qrozhg
- Instagram: not public yet
- Instagram container: 18118885660657128
- Review MP4: https://drive.google.com/file/d/1iJtm1vOo9CmrE2G1YrPUUAN3gg4puEuk/view

Do not mark Instagram as PUBLISHED until there is a real Instagram permalink.

## Root cause assessment

This was not handled like a normal Instagram API error. A normal API error would usually appear as a platform response such as container not ready, permission error, limit error, or media validation failure. In this case, the tool execution layer blocked the publish step and later blocked neutral Instagram reads as well. Treat it as an automation-layer block, not confirmed Instagram account failure.

## Required durable design

Use a backend queue runner instead of direct chat-tool publication.

Flow:

```text
Approved dashboard item
  -> backend publish request
  -> verify internal authorization
  -> verify approved=true
  -> verify direct public MP4 URL
  -> create Reel container
  -> poll container status until ready
  -> publish container
  -> fetch permalink
  -> update dashboard
  -> notify Telegram
```

## Input requirements

The backend runner should require:

- pipeline_id
- brand
- Instagram business user id
- direct public HTTPS .mp4 URL
- caption
- approved=true
- internal authorization header

The video URL must be a direct public MP4 file. Google Drive preview links and redirect links are not acceptable as final Instagram ingestion URLs.

## State machine

```text
READY_FOR_REVIEW
APPROVED
CONTAINER_CREATED
CONTAINER_PROCESSING
CONTAINER_READY
PUBLISHED
VERIFIED_PERMALINK
```

Failure states:

```text
INVALID_VIDEO_URL
CONTAINER_ERROR
CONTAINER_EXPIRED
PUBLISH_BLOCKED
VERIFY_FAILED
NEEDS_MANUAL_FALLBACK
```

## Safety rules

- Never publish unless the dashboard item is approved.
- Never publish from a chat command alone without checking approved state.
- Never store or print platform credentials in chat, Sheets, Drive, GitHub docs, or Telegram.
- Never mark Instagram as published unless a permalink exists.
- If a container fails or expires, create a new one; do not reuse the old container.

## FSR-RS-012 recovery path

1. Move the corrected review MP4 to stable public object storage with a direct .mp4 URL.
2. Use the backend runner to publish the Reel.
3. Fetch the Instagram permalink.
4. Update Published Library and Publishing Log.
5. Start Instagram stats tracking for that media id.

## Manual fallback

If backend runner is unavailable, manually upload the approved Drive MP4 as a Reel from the Instagram mobile app, then paste the Reel permalink back into the dashboard.

Caption for FSR-RS-012:

```text
My Friend Texted Me One Word Before Her Wedding

#redditstories #storytime #redditstory #minecraftparkour #shorts #weddingdrama #friendstory #mysterystory

Video by GameplaysForFree
```

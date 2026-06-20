# Content Pilot TikTok Review Site

Static site prepared for TikTok Developer review.

Use after deployment:
- Web/Desktop URL: https://YOUR-VERCEL-URL.vercel.app
- Privacy Policy URL: https://YOUR-VERCEL-URL.vercel.app/privacy/
- Terms of Service URL: https://YOUR-VERCEL-URL.vercel.app/terms/

TikTok app review explanation:

This app is a private short-form content publishing tool used by the account owner.

Login Kit authenticates the TikTok account through OAuth 2.0.

user.info.basic, user.info.profile, and user.info.stats are used to identify the connected account and show basic profile/statistics in the dashboard.

video.upload is used to upload approved videos as drafts.

video.publish is used to directly publish approved videos to the authorized TikTok profile.

video.list is used to verify and track uploaded or published videos.

The workflow is: create video, review it, connect TikTok, upload or publish the approved video, then check publish status.

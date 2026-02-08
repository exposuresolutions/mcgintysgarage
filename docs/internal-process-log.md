# Internal Process Log & Training Manual

## 1. Subdomain Setup (GHL)
**Goal:** Connect a subdomain (e.g., `lavelles.exposuresolutions.me`) to a GHL funnel/website.

1.  **Cloudflare (DNS):**
    *   Log in to Cloudflare account for `exposuresolutions.me`.
    *   Go to **DNS** settings.
    *   Add a **CNAME** record.
    *   **Name:** `lavelles` (or whatever the subdomain is).
    *   **Target:** `flash.funnels.msgsndr.com` (Standard GHL target).
    *   **Proxy Status:** Proxied (Orange Cloud) usually works, but if SSL fails, try DNS Only (Grey Cloud) first then switch back.

2.  **GoHighLevel (GHL):**
    *   Go to **Settings** -> **Domains**.
    *   Click **Add New Domain**.
    *   Enter `lavelles.exposuresolutions.me`.
    *   GHL will verify the CNAME record.
    *   Once verified, link it to the specific Funnel/Website step (e.g., "Lavelle's Auto - Home").

## 2. Manual Code Transfer (The "Pain Point")
**Current Process:**
1.  Edit code in VS Code (local).
2.  Copy full HTML.
3.  Open GHL Page Editor -> Custom Code Element.
4.  Paste HTML -> Save -> Preview.

**Future Automation Ideas:**
*   **GHL API:** Use the GHL API to update the "Custom Code" field of a specific funnel step.
    *   *Challenge:* Finding the specific element ID via API is tricky.
*   **Headless Browser Script:** A Puppeteer/Playwright script that logs into GHL, navigates to the editor, and pastes the code.
    *   *Risk:* GHL UI changes break the script.
*   **Webhook Deployment:**
    *   Host the HTML files on a separate server (e.g., Netlify/Vercel) connected to GitHub.
    *   In GHL, use an `iframe` or a simple script to `fetch()` and inject the content from the external URL.
    *   *Benefit:* Instant updates via `git push`.
    *   *Drawback:* SEO might be slightly impacted if not server-side rendered, but GHL is already client-heavy.

## 3. "Jagmax" Setup Instructions
(User requested instructions for `jagmax` subdomain)
1.  Follow **Step 1** above using `jagmax` as the Name.
2.  In GHL, create a new Funnel/Website for Jagmax.
3.  Add the domain `jagmax.exposuresolutions.me` in Settings.
4.  Assign the domain to the Jagmax funnel.

## 4. Phone Agent Upsell Strategy
*   **Product:** AI Voice Agents (DDWL / Precision Nation tech).
*   **Pitch:** "Missed calls = Missed money. Our AI answers 24/7, books appointments, and filters spam."
*   **Implementation:**
    *   Buy a Twilio number.
    *   Configure VAPI or GHL Conversation AI.
    *   Train on client's FAQ (Pricing, Location, Services).
    *   Test with "angry customer" and "confused grandma" scenarios.

## 5. EE Process Report (Ethan's Everything)
**Project:** Lavelle's Auto
**Status:** Draft Deployment Achieved (Survey Live)
**Completed Actions:**
*   ? Full Website Build (Home, Services, Booking, Parts, Partners).
*   ? Branding: "Third Generation Mechanics" theme.
*   ? Strategic Roadmap: Business plan, growth stages, grant funding.
*   ? Feedback Loop: Interactive survey created & deployed.
*   ? Tech Stack: HTML/CSS (VS Code) -> GHL (Hosting).
*   ? Workflow: Webhook -> Wait (1 min) -> Create Contact -> Email Notification.

**Next Steps:**
1.  Send WhatsApp to Ethan with Survey Link.
2.  Monitor Survey Data.
3.  Finalize Domain based on votes.
4.  Launch Payment/Booking integrations.

## 6. Communication Drafts (WhatsApp)

**To Ethan (Client):**
> Ethan, big progress. The site draft is live. ??
>
> 1. **Main Site Draft:** https://lavelles.exposuresolutions.me/
> 2. **Strategic Roadmap:** https://lavelles.exposuresolutions.me/strategy
> 
> Before we finalize the domain and branding, I need your vote on the options.
> **Vote Here:** https://lavelles.exposuresolutions.me/feedback
> 
> Fill it out so I can lock in the next steps. Talk soon.

**To Contacts (Testing/Feedback):**
> Hey guys, quick favor. I'm launching a new site for a mechanic on Achill and need to stress-test the feedback form. ??
>
> Could you take 30 seconds to fill this out? You can put in fake info or real feedback on the design.
> Link: https://lavelles.exposuresolutions.me/feedback
>
> Thanks!

## 7. Final EE Process Report (Ethan's Everything)
**Date:** 2025-12-29
**Status:** LIVE (Draft Deployment)

**Review of Deliverables:**
1.  **Full Website:**
    *   **Status:** Complete & Hosted.
    *   **URL:** `https://lavelles.exposuresolutions.me/`
    *   **Notes:** Includes Home, Services, Booking, Parts, Partners pages. Mobile responsive.

2.  **Feedback Loop (Survey):**
    *   **Status:** Active & Integrated.
    *   **URL:** `https://lavelles.exposuresolutions.me/feedback`
    *   **Automation:** Webhook -> GHL -> Email Notification (with data formatting fixes).
    *   **UX:** "?? Sending..." fixed to spinner icon.

3.  **Strategic Roadmap:**
    *   **Status:** Published.
    *   **URL:** `https://lavelles.exposuresolutions.me/strategy`
    *   **Purpose:** Shows client the long-term vision (Apps, AI, Grants).

4.  **Portfolio Integration:**
    *   **Status:** Updated.
    *   **Location:** Exposure Solutions Main Site.
    *   **Action:** Link updated to new subdomain.

**Ready for Client Handover.**

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
**Status:** Ready for Client Review
**Completed Actions:**
*   ? Full Website Build (Home, Services, Booking, Parts, Partners).
*   ? Branding: "Third Generation Mechanics" theme.
*   ? Strategic Roadmap: Business plan, growth stages, grant funding.
*   ? Feedback Loop: Interactive survey created.
*   ? Tech Stack: HTML/CSS (VS Code) -> GHL (Hosting).

**Next Steps:**
1.  Send WhatsApp to Ethan.
2.  Get Survey Data.
3.  Finalize Domain.
4.  Launch Payment/Booking integrations.

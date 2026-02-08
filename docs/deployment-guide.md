# Deployment & Automation Guide

## 1. Current Status
We have updated the `feedback-survey.html` with:
*   **Floating Social Icons:** WhatsApp, Snapchat, Telegram, Facebook (Fixed right side).
*   **New "Upgrade Philosophy" Section:** Educating users about upgrading suspension/tyres for Achill roads.
*   **Expanded Share Options:** Added Snapchat and Telegram to the share buttons.

## 2. How to Deploy These Changes (Manual)
1.  Open `Agents/EthanLavelleMechanics/feedback-survey.html` in VS Code.
2.  Copy the entire code.
3.  Go to GoHighLevel -> Sites -> Funnels -> Lavelle's Auto -> Feedback Step.
4.  Edit the page -> Open the "Custom Code" element.
5.  Paste the new code -> Save -> Preview.

## 3. Future Automation: "The Fetch Method" (Smart Loader)
To avoid manually copying and pasting code every time we make a change, we use the **Smart Loader**.

### Why "Smart Loader"?
Simply pasting the HTML into GHL can cause errors because you end up with nested `<html>` and `<body>` tags. The Smart Loader fetches the code, strips out the conflicting tags, and injects just the content, styles, and scripts safely.

### Step-by-Step Setup

**Step A: Host the Code**
1.  Push this repository to GitHub.
2.  Enable **GitHub Pages** for the repository (Settings -> Pages -> Source: Main).
3.  Your file will be available at: `https://exposuresolutions.github.io/lavelles-auto/Agents/EthanLavelleMechanics/feedback-survey.html`

**Step B: The Loader Script (Put this in GHL)**
1.  Open `Agents/EthanLavelleMechanics/ghl-smart-loader.html` in VS Code.
2.  Copy the **entire content**.
3.  Go to GHL -> Page Editor -> Custom Code Element.
4.  Paste the code.
5.  **Important:** If you are loading a different page (like Strategy), change the `GITHUB_FILE_URL` variable in the script to point to that file.

### Benefits
*   **Instant Updates:** As soon as you `git push` to GitHub, the live site updates automatically.
*   **No Errors:** Handles scripts and styles correctly.
*   **No GHL Login Needed:** You don't need to open the GHL editor for code changes.

## 4. Making Data Work (The Webhook)
Currently, the survey is in "Simulation Mode". To save the answers:
1.  Go to GHL -> Automation -> Create Workflow -> Start from Scratch.
2.  Trigger: **Incoming Webhook**.
3.  Copy the **Webhook URL**.
4.  Open `Agents/EthanLavelleMechanics/feedback-survey.html`.
5.  Find the line `// const WEBHOOK_URL = ...` (around line 600).
6.  Uncomment it and paste your Webhook URL.
7.  `git push`.

## 5. Project Status Checklist
*   ? **Strategy Page:** Created & Live on GitHub.
*   ? **Feedback Survey:** Updated & Live on GitHub.
*   ? **Loyalty Page:** Updated & Live on GitHub.
*   ?? **Data Collection:** Needs Webhook (See Step 4).
*   ? **Client Review:** Ready to send once the Loader is in GHL.

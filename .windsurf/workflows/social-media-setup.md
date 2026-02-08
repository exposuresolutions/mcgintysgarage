---
description: Setup social media accounts for a new client
---

# Social Media Setup Workflow

Run this workflow when onboarding a new client who needs social media accounts set up.

## Step 1: Gather Client Information

Collect the following from the client:
- Business name
- Business type/category
- Location
- Phone number
- Email address
- Website URL
- Preferred username (check availability)
- Logo URL or file
- Brand colors (primary, accent)
- Tagline (short)
- Description (longer)
- Owner name and contact

## Step 2: Check Username Availability

// turbo
```bash
# Check if usernames are available (manual check required for most platforms)
echo "Check these URLs manually:"
echo "- facebook.com/{username}"
echo "- instagram.com/{username}"
echo "- tiktok.com/@{username}"
echo "- twitter.com/{username}"
echo "- snapchat.com/add/{username}"
```

## Step 3: Generate Bio Text

Create bios for each platform:

**Instagram (150 chars max):**
```
🔧 {tagline}
📞 Book 24/7
⬇️ {website}
```

**TikTok:**
```
🔧 {business_name}
📍 {location}
📞 {phone}
```

**Facebook:** Use full description

**Twitter (160 chars):** `{tagline} | {phone} | {website}`

## Step 4: Create Cover Photos

Use Canva or similar to create:
- Facebook cover: 1200x628px
- Twitter header: 1500x500px

Include:
- Logo
- Tagline
- Brand colors
- Contact info

## Step 5: Generate First 10 Posts

Create content for:
1. Introduction post
2. Service highlight
3. Customer tip
4. Behind the scenes
5. Special offer
6. FAQ answer
7. Team/owner intro
8. Location/area post
9. Review/testimonial request
10. Call to action

## Step 6: Setup WhatsApp Business Quick Replies

```
/hours - "We're open {hours}. Book online anytime at {website}"
/book - "Book at {website}/booking or tell me what you need!"
/location - "We're at {location}"
/prices - "Prices vary. What do you need? I can quote you!"
```

## Step 7: Update Website Social Links

Edit the website's social connect section with the actual account URLs.

## Step 8: Create GHL Automations

1. Social follower → CRM contact
2. Social DM → GHL Conversations
3. Post-service review request
4. Content calendar automation

## Step 9: Document and Deliver

Create client deliverables:
- Setup checklist PDF
- Bio text file
- Content calendar spreadsheet
- Quick replies document
- Hashtag list

## Step 10: Schedule Handover Call

Book a call to:
- Walk through all accounts
- Hand over login credentials
- Explain content calendar
- Set up ongoing management (if purchased)

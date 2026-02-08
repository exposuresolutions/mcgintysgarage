# Social Media Setup Agent

## Purpose
Automate the creation and setup of social media accounts for Exposure Solutions clients. This agent handles Facebook, Instagram, TikTok, Snapchat, and other platforms.

---

## Client Intake Form

Before running the agent, collect this information:

### Required Information
```yaml
business_name: "McGinty's Garage"
business_type: "Auto Repair / Mechanic"
location: "Achill Island, County Mayo, Ireland"
phone: "+353 85 102 6371"
email: "mcgintysgarage@gmail.com"
website: "https://mcgintysgarage.store"

# Preferred username (agent will check availability)
preferred_username: "mcgintysgarage"
backup_usernames:
  - "mcgintysgarageachill"
  - "mcgintysgarageie"
  - "mcgintysauto"

# Brand Assets
logo_url: "https://storage.googleapis.com/msgsndr/KbiucErIMNPbO1mY4qXL/media/6953c71188fd1a81b6091ec4.png"
brand_colors:
  primary: "#005A9C"
  accent: "#FDB813"

# Business Description (for bios)
tagline: "Your trusted local mechanic serving Achill Island & West Mayo"
description: "Third-generation mechanic offering honest repairs, NCT prep, and quality service. AI-powered booking available 24/7."

# Owner Details (for account recovery)
owner_name: "Ethan McGinty"
owner_email: "mcgintysgarage@gmail.com"
owner_phone: "+353 85 102 6371"
```

---

## Platform Setup Checklist

### 1. Facebook Business Page
**Manual Steps Required** (Facebook requires human verification):
- [ ] Go to https://www.facebook.com/pages/create
- [ ] Select "Local Business or Place"
- [ ] Enter business name: `{business_name}`
- [ ] Category: "Automotive Repair Shop"
- [ ] Add address, phone, website
- [ ] Upload logo as profile picture
- [ ] Create cover photo (1200x628px) with brand colors
- [ ] Complete "About" section with description
- [ ] Add business hours
- [ ] Enable Messenger for customer inquiries
- [ ] Connect to Instagram (if available)

**Automation Possible**:
- Generate cover photo template
- Pre-write all bio text
- Create content calendar
- Schedule first 10 posts

### 2. Instagram Business Account
**Manual Steps Required**:
- [ ] Download Instagram app
- [ ] Sign up with business email
- [ ] Username: `{preferred_username}`
- [ ] Convert to Business Account
- [ ] Connect to Facebook Page
- [ ] Add profile photo (logo)
- [ ] Write bio (150 chars max)
- [ ] Add website link
- [ ] Add contact button

**Bio Template** (150 chars):
```
🔧 Your local mechanic | Achill & West Mayo
📞 AI booking 24/7
🚗 NCT prep • Services • Repairs
⬇️ Book now
```

### 3. TikTok Business Account
**Manual Steps Required**:
- [ ] Download TikTok app
- [ ] Sign up with business email
- [ ] Username: `@{preferred_username}`
- [ ] Switch to Business Account
- [ ] Select category: "Automotive"
- [ ] Add profile photo
- [ ] Write bio
- [ ] Add website link

**Bio Template**:
```
🔧 McGinty's Garage
📍 Achill Island, Ireland
🚗 Car tips, repairs & behind the scenes
📞 085-102-6371
```

### 4. Snapchat Business
**Manual Steps Required**:
- [ ] Go to https://business.snapchat.com
- [ ] Create Business Account
- [ ] Username: `{preferred_username}`
- [ ] Add Bitmoji or logo
- [ ] Set up Public Profile

### 5. WhatsApp Business
**Manual Steps Required**:
- [ ] Download WhatsApp Business app
- [ ] Register with business phone number
- [ ] Add business profile:
  - Business name
  - Category: "Automotive"
  - Description
  - Address
  - Email
  - Website
- [ ] Set up Quick Replies
- [ ] Set up Away Messages
- [ ] Create Catalog (optional)

**Quick Replies to Setup**:
```
/hours - "We're open Mon-Fri 6pm-9pm, Sat 9am-2pm. Book online anytime at mcgintysgarage.store"
/book - "Book your service at mcgintysgarage.store/booking or tell me what you need!"
/location - "We're serving Achill Island & West Mayo. Drop-off available with Anseo bus service home!"
/prices - "Prices start from: Mini Service €80, Full Service €180, Pre-NCT €80. What do you need?"
```

---

## Automated Content Generation

### First 10 Posts (Ready to Schedule)

**Post 1 - Introduction**
```
🔧 McGinty's Garage is now online!

Third-generation mechanics serving Achill Island & West Mayo.

✅ Honest repairs
✅ NCT prep (95% pass rate!)
✅ AI booking 24/7

Book your service: mcgintysgarage.store

#AchillIsland #Mayo #Mechanic #CarRepair #LocalBusiness
```

**Post 2 - NCT Prep**
```
📋 NCT coming up? Don't stress!

Our Pre-NCT check covers everything:
• Lights & signals
• Brakes & tyres
• Emissions
• Suspension
• All the bits they check!

95% of our customers pass first time 💪

Book your Pre-NCT: mcgintysgarage.store

#NCT #PreNCT #CarService #Ireland
```

**Post 3 - AI Assistant**
```
🤖 Meet our AI assistant!

Ethan's busy fixing cars, so he built an AI clone to help you 24/7.

Ask it:
• "When's the next free slot?"
• "How much for brake pads?"
• "Is my car ready?"

Try it now: mcgintysgarage.store

#AI #CustomerService #Innovation
```

**Post 4 - Anseo Bus**
```
🚌 Dropping your car off? We've got you covered!

Book the TFI Anseo bus - they'll pick you up from the garage and drop you home.

Just €3 (free with Travel Pass!)

Can't book yourself? We'll do it for you! 📞

#Achill #PublicTransport #CustomerCare
```

**Post 5 - Reversing Camera**
```
📹 Gift idea for Mam or Dad?

A reversing camera could save their bumpers... and maybe more.

From just €149 fitted.

"A gift they'll never forget" 💝

Book: mcgintysgarage.store

#ReversingSafety #GiftIdea #CarUpgrade
```

---

## GHL Integration

### Automation Workflows to Create

1. **New Social Follower → CRM**
   - When someone follows on any platform
   - Add to GHL contact list
   - Tag: "social_follower"
   - Send welcome DM after 24 hours

2. **Social DM → Conversation**
   - Route all social DMs to GHL Conversations
   - AI responds with initial greeting
   - Escalate to human if needed

3. **Review Request Automation**
   - After service completion
   - Wait 2 hours
   - Send SMS: "How was your service? Leave us a review!"
   - Include Google/Facebook review links

4. **Content Calendar**
   - Schedule 3 posts per week
   - Mix of: Tips, Behind-scenes, Promotions, Customer stories
   - Auto-post to Facebook + Instagram

---

## Agent Execution Script

```python
# social_media_setup_agent.py
# Run this to generate all assets and instructions for a new client

import json
from datetime import datetime

def generate_client_setup(client_data):
    """
    Generate all social media setup materials for a client
    """
    
    # Generate bios for each platform
    bios = {
        "instagram": f"🔧 {client_data['tagline'][:100]}\n📞 Book 24/7\n⬇️ {client_data['website']}",
        "tiktok": f"🔧 {client_data['business_name']}\n📍 {client_data['location']}\n📞 {client_data['phone']}",
        "facebook": client_data['description'],
        "twitter": f"{client_data['tagline']} | {client_data['phone']} | {client_data['website']}"
    }
    
    # Generate username variations
    usernames = check_username_availability(client_data['preferred_username'])
    
    # Generate first 10 posts
    posts = generate_content_calendar(client_data)
    
    # Generate cover photo specs
    cover_specs = {
        "facebook": {"width": 1200, "height": 628, "text": client_data['tagline']},
        "twitter": {"width": 1500, "height": 500, "text": client_data['tagline']}
    }
    
    return {
        "bios": bios,
        "usernames": usernames,
        "posts": posts,
        "cover_specs": cover_specs,
        "quick_replies": generate_quick_replies(client_data),
        "generated_at": datetime.now().isoformat()
    }

def check_username_availability(username):
    """
    Check if username is available on each platform
    Returns dict of platform: available_username
    """
    # This would integrate with platform APIs or scraping
    # For now, returns the preferred username
    return {
        "facebook": f"facebook.com/{username}",
        "instagram": f"instagram.com/{username}",
        "tiktok": f"tiktok.com/@{username}",
        "snapchat": f"snapchat.com/add/{username}",
        "twitter": f"twitter.com/{username}"
    }

def generate_content_calendar(client_data):
    """
    Generate 30 days of social media content
    """
    # Content types rotation
    content_types = [
        "introduction",
        "service_highlight",
        "tip",
        "behind_scenes",
        "promotion",
        "customer_story",
        "faq"
    ]
    
    # Generate posts based on business type
    posts = []
    # ... post generation logic
    
    return posts

def generate_quick_replies(client_data):
    """
    Generate WhatsApp/Messenger quick replies
    """
    return {
        "/hours": f"We're open {client_data.get('hours', 'Mon-Fri 9am-6pm')}. Book online anytime at {client_data['website']}",
        "/book": f"Book your service at {client_data['website']}/booking or tell me what you need!",
        "/location": f"We're located at {client_data['location']}",
        "/prices": "Prices vary by service. What do you need done? I can give you a quote!"
    }

# Run for McGinty's Garage
if __name__ == "__main__":
    mcgintys = {
        "business_name": "McGinty's Garage",
        "business_type": "Auto Repair",
        "location": "Achill Island, County Mayo, Ireland",
        "phone": "+353 85 102 6371",
        "email": "mcgintysgarage@gmail.com",
        "website": "https://mcgintysgarage.store",
        "preferred_username": "mcgintysgarage",
        "tagline": "Your trusted local mechanic serving Achill Island & West Mayo",
        "description": "Third-generation mechanic offering honest repairs, NCT prep, and quality service.",
        "hours": "Mon-Fri 6pm-9pm, Sat 9am-2pm"
    }
    
    result = generate_client_setup(mcgintys)
    print(json.dumps(result, indent=2))
```

---

## Output Deliverables

After running the agent, deliver to client:

1. **Setup Checklist PDF** - Step-by-step for each platform
2. **Bio Text File** - Copy-paste ready bios
3. **Cover Photo Templates** - Canva links or PSD files
4. **Content Calendar** - 30 days of posts in spreadsheet
5. **Quick Replies** - For WhatsApp/Messenger
6. **Hashtag List** - Relevant hashtags for their industry
7. **GHL Workflow Imports** - Ready to import automations

---

## Pricing for Clients

| Service | Price | Includes |
|---------|-------|----------|
| Basic Setup | €199 | 3 platforms, 10 posts, basic bios |
| Full Setup | €399 | All platforms, 30 posts, cover photos, GHL integration |
| Managed | €149/mo | Weekly posting, engagement, monthly report |

---

## Notes

- Facebook and Instagram require manual account creation (no API for new accounts)
- TikTok Business API requires approval
- WhatsApp Business API requires Facebook Business verification
- Consider using Later.com or Buffer for scheduling across platforms

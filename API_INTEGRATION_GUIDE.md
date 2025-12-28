# ?? API INTEGRATION GUIDE
## Parts Ordering & External Services

**Date:** January 2025  
**For:** Lavelle's Auto Website  

---

## ?? PARTS ORDERING APIs

### Option 1: Euro Car Parts API (RECOMMENDED)
**Website:** https://www.eurocarparts.com/  
**API Access:** Business account required  

#### Setup Process:
1. **Register Business Account:**
   - Go to https://business.eurocarparts.com
   - Register as "Lavelle's Auto"
   - Request API access (usually 2-3 day approval)

2. **You'll Get:**
   - API Key
   - Client ID
   - Access to documentation

3. **What It Does:**
   - Lookup vehicle by registration (Irish plates)
   - Search parts by category
   - Get real-time prices
   - Place orders directly
   - Track delivery

#### Do You Need to Do It Manually? **NO**
Once you have the API key, I can integrate it directly into the `parts.html` page. The code will:
- Auto-lookup vehicle details
- Show available parts
- Display prices
- Let customers add to cart
- Submit order to Euro Car Parts

**Cost:** Usually free for business accounts, or small monthly fee (€20-50)

---

### Option 2: GSF Car Parts API
**Website:** https://www.gsfcarparts.com/  
**Better for:** Irish market specifically  

#### Setup:
- Similar process to Euro Car Parts
- May have better Irish stock
- Faster delivery to Achill

---

### Option 3: MANUAL FALLBACK (If APIs not available yet)
If you can't get API access immediately, we can build a **hybrid system:**

```javascript
// Simple form that sends request to Ethan
function orderParts() {
    const customerData = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('phone').value,
        registration: document.getElementById('reg').value,
        parts_needed: document.getElementById('parts').value
    };
    
    // Send to GHL webhook
    fetch('YOUR_GHL_WEBHOOK', {
        method: 'POST',
        body: JSON.stringify(customerData)
    });
    
    // Ethan gets SMS: "Parts request from John: Brake pads for 171-D-12345"
    // Ethan orders manually, customer gets update
}
```

**This way:**
- Customer fills form on website
- Request goes to Ethan via SMS/WhatsApp
- Ethan orders parts manually (for now)
- Customer gets confirmation
- **Later:** We upgrade to full API when approved

---

## ?? GHL CALENDAR INTEGRATION

### Do You Need to Do It Manually? **YES AND NO**

#### What You Need to Do:
1. **Set up GHL Calendar** (5 minutes):
   - Log into your GHL account
   - Go to "Calendars"
   - Create calendar: "Lavelle's Auto Bookings"
   - Set your available hours
   - Get the embed code

2. **Give Me:**
   - The calendar embed URL (looks like: `https://api.leadconnectorhq.com/widget/booking/[CALENDAR_ID]`)
   - Your GHL webhook URL (from "Workflows" section)

#### What I'll Do:
- Embed the calendar into `booking.html`
- Connect forms to your webhook
- Set up automation triggers
- Add service-specific booking flows

---

## ?? STRIPE CONNECT (For Partner Payments)

### Do You Need to Do It Manually? **PARTIALLY**

#### What You Need to Do:
1. **Create Stripe Account** (10 minutes):
   - Go to https://stripe.com
   - Sign up as "Lavelle's Auto"
   - Verify business details
   - Get API keys (Test & Live)

2. **For Eddie English Partnership:**
   - Eddie creates his Stripe account
   - You connect his account to yours (Stripe Connect)
   - Payments auto-split

#### What I'll Do:
- Build payment forms
- Set up auto-splitting logic
- Create payment confirmation pages
- Handle webhooks for successful payments

**Cost:** Stripe takes 1.4% + €0.25 per transaction (standard EU rate)

---

## ?? WHATSAPP BUSINESS API

### Do You Need to Do It Manually? **YES (Setup)**

#### What You Need to Do:
1. **WhatsApp Business Account:**
   - Download WhatsApp Business app
   - Register with your business number (087-123-4567)
   - Verify account

2. **For API Access (Optional - Advanced):**
   - Apply for WhatsApp Business API through Meta
   - Or use service like Twilio (€0.04 per message)

#### What I'll Do:
- Create WhatsApp quick links (no API needed for basic)
- Example: `https://wa.me/353871234567?text=Hi, I'd like to book a service`
- If you get API: Build automated booking confirmations via WhatsApp

**For Now:** We'll use simple WhatsApp links (no setup needed, works immediately)

---

## ?? WHAT YOU NEED TO DO RIGHT NOW

### Immediate (Do Today):
1. ? **Set up GHL Calendar** ? Give me embed URL
2. ? **Get GHL Webhook URL** ? From your workflows section

### This Week:
1. ? **Register with Euro Car Parts** ? Request API access
2. ? **Set up Stripe Account** ? Get API keys

### Next Week:
1. ? **WhatsApp Business** ? If you want advanced features
2. ? **Eddie English Partnership Agreement** ? Discuss commission rates

---

## ?? SUMMARY: WHAT'S AUTO vs MANUAL

| Feature | Automated? | Your Setup Needed? |
|---------|------------|-------------------|
| **Homepage** | ? Fully Auto | None - I build it |
| **Booking Calendar** | ? Fully Auto | Give me GHL embed URL |
| **Parts Ordering (Full API)** | ? Fully Auto | Register with Euro Car Parts |
| **Parts Ordering (Fallback)** | ?? Semi-Auto | None - requests go to you via SMS |
| **Payments** | ? Fully Auto | Set up Stripe account |
| **WhatsApp Links** | ? Fully Auto | None - just your number |
| **WhatsApp Auto-Messages** | ? Manual for now | Need WhatsApp Business API |
| **Eddie English Booking Relay** | ? Fully Auto | Eddie's WhatsApp number |
| **Service Reminders** | ? Fully Auto | GHL automation rules |

---

## ?? RECOMMENDED APPROACH

### Phase 1 (Launch - Week 1):
- ? Beautiful homepage (done!)
- ? GHL booking calendar (you provide embed)
- ? Simple parts request form (sends to you via SMS)
- ? WhatsApp quick links
- ? Basic payment links

### Phase 2 (Week 2-3):
- ? Full parts ordering API (once approved)
- ? Stripe integration for online payments
- ? Eddie English partnership automation

### Phase 3 (Week 4+):
- ? WhatsApp Business API
- ? Advanced automations
- ? Customer portal/dashboard

---

## ?? THE GOOD NEWS

**90% of the site can be fully automated with just:**
1. Your GHL calendar embed URL
2. Your GHL webhook URL

Everything else (parts API, Stripe, etc.) can be added later without breaking the site!

---

**Ready to proceed?**
1. Get your GHL calendar set up
2. Give me the URLs
3. I'll build all the pages with the integrations ready to go!

**Questions?** Just ask! ??

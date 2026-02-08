# ?? COUNCIL OF AI - AUTOMATION & INTEGRATION SYSTEMS REPORT
## LAVELLE'S AUTO DIAGNOSTICS & REPAIR

**Report Date:** January 2025  
**Prepared By:** Council of AI (Strategy, Operations, Technical, Revenue)  
**Client:** Ethan Lavelle - Lavelle's Auto, Achill Island  
**Project:** Complete Business Automation & Partner Ecosystem  
**Status:** ?? READY FOR IMPLEMENTATION  

---

## ?? EXECUTIVE SUMMARY

This report outlines a **complete ecosystem** of automation systems to make Ethan's life easier, increase customer satisfaction, and create new revenue streams through strategic partnerships (starting with Eddie English).

### Core Objectives:
1. ? **Eliminate Manual Work** - Automate bookings, reminders, parts ordering
2. ? **Increase Customer Convenience** - One-click everything
3. ? **Create Partner Network** - Reseller model with Eddie English & others
4. ? **Generate Recurring Revenue** - Subscriptions, commissions, service charges
5. ? **Scale Without Overhead** - AI and automation handle growth

---

## ?? PART 1: CUSTOMER CONVENIENCE SYSTEMS

### 1.1 SMART BOOKING SYSTEM ?????
**Problem:** Customers don't know when Ethan is available  
**Solution:** AI-powered calendar with dynamic availability

#### Features:
```javascript
// Smart Calendar System
const BOOKING_SYSTEM = {
    // Ethan's availability rules
    availability: {
        primaryJob: {
            monday: { start: '18:00', end: '21:00' },
            tuesday: { start: '18:00', end: '21:00' },
            wednesday: { start: '18:00', end: '21:00' },
            thursday: { start: '18:00', end: '21:00' },
            friday: { start: '18:00', end: '21:00' },
            saturday: { start: '09:00', end: '14:00' },
            sunday: 'closed'
        },
        
        // Block out existing bookings automatically
        blockedSlots: [], // Auto-populated from GHL calendar
        
        // Emergency call-out always available
        emergencyMode: true
    },
    
    // Service duration estimates
    serviceDurations: {
        'diagnostics': 60, // minutes
        'oil-change': 30,
        'brake-pads': 90,
        'nct-prep': 120,
        'timing-belt': 240
    },
    
    // Auto-suggest next available slot
    getNextAvailable(serviceType) {
        const duration = this.serviceDurations[serviceType];
        // Calculate next free slot based on existing bookings
        return nextSlot;
    }
};
```

#### Implementation:
- **GHL Calendar Integration:** Two-way sync
- **Real-time Availability:** Updates instantly when booking confirmed
- **Buffer Times:** Automatic 15-min buffer between jobs
- **Weekend Priority:** Saturdays fill up fast (show urgency badge)

#### Customer Experience:
1. Select service ? See available times (only free slots shown)
2. Pick time ? Instant confirmation
3. Gets added to Ethan's calendar automatically
4. SMS reminder 24hrs before + 2hrs before

---

### 1.2 MILEAGE/TIME-BASED AUTO-REMINDERS ??
**Problem:** Customers forget service intervals  
**Solution:** Proactive reminder system

#### System Logic:
```javascript
const REMINDER_SYSTEM = {
    // Track customer vehicle data
    customerVehicles: {
        registration: '171-D-12345',
        make: 'Ford',
        model: 'Focus',
        year: 2017,
        lastServiceDate: '2024-10-15',
        lastServiceMileage: 85000,
        serviceHistory: [
            { date: '2024-10-15', type: 'oil-change', mileage: 85000 },
            { date: '2024-03-20', type: 'brake-pads', mileage: 78000 }
        ]
    },
    
    // Service interval rules
    serviceIntervals: {
        'oil-change': { months: 12, km: 15000 },
        'brake-fluid': { months: 24, km: null },
        'timing-belt': { months: 60, km: 100000 },
        'nct': { months: 24, km: null } // Based on NCT expiry
    },
    
    // Calculate next service due
    calculateNextService(vehicle) {
        const oil = vehicle.lastServiceMileage + 15000; // Due at 100k km
        const months = this.monthsSince(vehicle.lastServiceDate);
        
        if (months >= 11) {
            return {
                type: 'oil-change',
                urgency: 'due-soon',
                message: 'Your oil change is due in 1 month or 1,000km'
            };
        }
    },
    
    // Auto-send reminders via GHL
    sendReminder(customer, serviceType) {
        // Send SMS via GHL
        // Send WhatsApp message
        // Send email with booking link
    }
};
```

#### Automation Workflow:
1. **Customer registers** ? Enter current mileage
2. **System tracks** ? Monitors service intervals
3. **11 months after oil change** ? SMS: "Your service is due soon! Book now"
4. **23 months after last NCT** ? SMS: "NCT expires next month. Book Pre-NCT check?"
5. **One-click booking** ? Link goes directly to calendar with service pre-selected

#### Data Collection:
- **Initial:** Capture mileage when customer books first service
- **Ongoing:** Ask for current mileage at each visit (simple form)
- **NCT Dates:** Auto-populate from registration lookup API

---

### 1.3 EXPRESS OIL CHANGE SYSTEM ??
**Problem:** Oil changes take too long  
**Solution:** Quick-service slot system

#### Features:
- **30-Minute Guarantee:** "In and out in 30 minutes or it's free"
- **Pre-scheduled Slots:** Every Saturday 9am-2pm, slots every 45 mins
- **Pre-payment Required:** Pay online when booking (€70 standard oil change)
- **Drive-in/Drive-out:** No waiting room needed

#### Customer Flow:
```
1. Book "Express Oil Change" ? Select Saturday slot
2. Pay online (€70) ? Get confirmation
3. Arrive at scheduled time ? Drive straight in
4. 25 minutes later ? Drive away
5. Auto-reminder in 12 months
```

#### Implementation:
- Separate calendar category: "EXPRESS-OIL-CHANGE"
- Limited to 6 slots per Saturday
- Pre-payment via Stripe (integrated with GHL)
- Parts pre-ordered based on vehicle type (customer selects when booking)

---

### 1.4 INSTANT PARTS ORDERING ??
**Problem:** Waiting for parts delays repairs  
**Solution:** Integrated parts lookup and ordering

#### Option A: Euro Car Parts API Integration
```javascript
const PARTS_SYSTEM = {
    apiKey: 'YOUR_ECP_API_KEY',
    
    async searchByReg(registration) {
        const response = await fetch('https://api.eurocarparts.com/v1/vehicle/lookup', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${this.apiKey}` },
            body: JSON.stringify({ registration })
        });
        
        const vehicleData = await response.json();
        return vehicleData; // Returns make, model, year, engine
    },
    
    async getPartsForService(vehicleId, serviceType) {
        // E.g., "brake-pads" returns front pads + rear pads + brake cleaner
        const response = await fetch('https://api.eurocarparts.com/v1/parts', {
            method: 'POST',
            body: JSON.stringify({ vehicleId, category: serviceType })
        });
        
        return await response.json(); // Parts list with prices
    },
    
    async orderParts(partIds, deliveryAddress) {
        // Place order through API
        // Choose delivery: Next-day to garage or customer pickup
    }
};
```

#### Customer Experience:
**Page: `parts.html`**

```html
<section class="parts-ordering">
    <h2>?? Order Parts for Your Vehicle</h2>
    
    <div class="reg-lookup">
        <input type="text" placeholder="Enter Car Registration (e.g., 171-D-12345)" id="reg-input">
        <button onclick="lookupVehicle()">Find My Car</button>
    </div>
    
    <div id="vehicle-info" style="display:none;">
        <h3>Your Vehicle: <span id="vehicle-name"></span></h3>
        <p>Select the parts you need:</p>
        
        <div class="parts-categories">
            <button onclick="loadParts('brakes')">?? Brake Parts</button>
            <button onclick="loadParts('filters')">??? Filters</button>
            <button onclick="loadParts('oil')">??? Oil & Fluids</button>
            <button onclick="loadParts('electrical')">? Electrical</button>
        </div>
        
        <div id="parts-list"></div>
        <button class="btn-primary">Add to Cart & Order</button>
    </div>
</section>
```

#### Revenue Model:
- **Option 1:** Ethan marks up parts 15-20%
- **Option 2:** Flat service fee (€10 per order)
- **Option 3:** Bundle with labor (discount on parts if booking service)

---

### 1.5 NCT AUTO-BOOKING SYSTEM ??
**Problem:** NCT centers are hard to book  
**Solution:** Automated NCT booking service

#### How It Works:
```javascript
const NCT_SYSTEM = {
    // Track customer NCT expiry dates
    async checkNctExpiry(registration) {
        // Option A: Scrape NCT.ie (unofficial)
        // Option B: Customer enters expiry date manually
        // Option C: Parse from uploaded NCT cert
    },
    
    // Auto-book NCT 2 months before expiry
    async autoBookNct(customer) {
        const expiryDate = customer.nctExpiry;
        const twoMonthsBefore = new Date(expiryDate);
        twoMonthsBefore.setMonth(twoMonthsBefore.getMonth() - 2);
        
        if (Date.now() >= twoMonthsBefore) {
            // Send SMS: "Your NCT is due soon. Want us to book it for you?"
            // Customer replies "YES" ? We book through NCT system
            // Or use NCT API (if available)
        }
    },
    
    // Concierge service
    services: {
        'nct-drop-off': {
            price: 30,
            description: 'We take your car to NCT and bring it back'
        },
        'pre-nct-check': {
            price: 45,
            description: 'Full inspection before official test'
        },
        'post-nct-fix': {
            price: 'varies',
            description: 'Fix failures and re-test'
        }
    }
};
```

#### Customer Flow:
1. **Register vehicle** ? Enter NCT expiry date
2. **60 days before** ? SMS: "NCT due in 2 months. Book Pre-NCT check?"
3. **Customer books** ? Pre-NCT check reveals potential failures
4. **Fix issues** ? Schedule repairs
5. **30 days before** ? SMS: "Ready for NCT? Want us to book and handle it?"
6. **Customer says yes** ? Pay €30, we book NCT slot
7. **NCT day** ? We collect car, take to test, return it
8. **Pass** ? Customer happy
9. **Fail** ? We quote repairs, fix, and re-test

---

## ?? PART 2: PARTNER RESELLER NETWORK

### 2.1 EDDIE ENGLISH PARTNERSHIP MODEL
**Concept:** Ethan resells Eddie's services as his own  
**Customer Perception:** "Lavelle's Auto does everything"  
**Reality:** Eddie fulfills, both businesses profit

#### Service Categories to Resell:
**Assuming Eddie English offers:**
1. ? Mobile Mechanic Services
2. ? Specialized Diagnostics
3. ? Bodywork/Panel Repair
4. ? Windscreen Replacement
5. ? Auto Electrical
6. ? Towing Services

#### Revenue Split Model:
```javascript
const RESELLER_MODEL = {
    commissionStructure: {
        // Ethan's commission on Eddie's services
        'mobile-mechanic': 0.15, // 15%
        'diagnostics': 0.20, // 20%
        'bodywork': 0.10, // 10%
        'windscreen': 0.12, // 12%
        'electrical': 0.18, // 18%
        'towing': 0.10 // 10%
    },
    
    serviceCharge: {
        // Optional: Exposure Solutions takes 3% platform fee
        platform: 0.03
    },
    
    // Example calculation
    calculateSplit(serviceType, totalPrice) {
        const ethanCommission = totalPrice * this.commissionStructure[serviceType];
        const platformFee = totalPrice * this.serviceCharge.platform;
        const eddieEarns = totalPrice - ethanCommission - platformFee;
        
        return {
            customer_pays: totalPrice,
            ethan_earns: ethanCommission,
            eddie_earns: eddieEarns,
            platform_earns: platformFee
        };
    }
};

// Example:
// Customer books "Mobile Mechanic" for €120
calculateSplit('mobile-mechanic', 120);
// Returns:
// {
//   customer_pays: 120,
//   ethan_earns: 18 (15%),
//   eddie_earns: 98.40,
//   platform_earns: 3.60 (3%)
// }
```

---

### 2.2 BOOKING FLOW: ETHAN ? EDDIE

#### Step-by-Step Automation:

**On Lavelle's Website:**
```html
<section class="services">
    <div class="service-card">
        <h3>?? Mobile Mechanic Call-Out</h3>
        <p>Breakdown? We come to you anywhere on Achill Island</p>
        <p class="price">From €60 + parts</p>
        <button onclick="bookService('mobile-mechanic')">Book Now</button>
        <span class="badge">Powered by our partner network</span>
    </div>
</section>
```

**Booking Form:**
```javascript
async function bookService(serviceType) {
    // Show booking modal
    const modal = `
        <div class="booking-modal">
            <h3>Book Mobile Mechanic</h3>
            <form id="reseller-booking">
                <input name="name" placeholder="Your Name" required>
                <input name="phone" placeholder="Phone Number" required>
                <input name="location" placeholder="Location" required>
                <textarea name="issue" placeholder="Describe the problem" required></textarea>
                <button type="submit">Request Service</button>
            </form>
        </div>
    `;
    
    document.getElementById('booking-area').innerHTML = modal;
    
    document.getElementById('reseller-booking').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Send to GHL webhook
        await submitResellerBooking(formData, serviceType);
    });
}

async function submitResellerBooking(formData, serviceType) {
    // 1. Create contact in Ethan's GHL
    // 2. Send notification to Ethan (SMS + Email)
    // 3. Forward booking details to Eddie via WhatsApp API
    // 4. Eddie confirms availability
    // 5. Customer gets confirmation SMS
    // 6. Payment link sent (customer pays Ethan/platform)
    // 7. After service completed, split payment
    
    const payload = {
        contact: {
            name: formData.get('name'),
            phone: formData.get('phone'),
            tags: ['reseller-booking', 'eddie-english', serviceType]
        },
        booking: {
            service_type: serviceType,
            location: formData.get('location'),
            issue: formData.get('issue'),
            requested_by: 'ethan-lavelle',
            fulfillment_partner: 'eddie-english',
            status: 'pending-confirmation'
        }
    };
    
    // Send to GHL
    await fetch('https://services.leadconnectorhq.com/hooks/[ETHAN_WEBHOOK]', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    // Send to Eddie via WhatsApp Business API
    await sendWhatsAppToEddie(payload);
    
    // Show success message
    alert('? Booking received! We\'ll confirm your time within 15 minutes.');
}

async function sendWhatsAppToEddie(booking) {
    // Use WhatsApp Business API or Twilio
    const message = `
?? NEW BOOKING FROM LAVELLE'S AUTO

Customer: ${booking.contact.name}
Phone: ${booking.contact.phone}
Service: ${booking.booking.service_type}
Location: ${booking.booking.location}
Issue: ${booking.booking.issue}

Reply YES to accept or call customer directly.
    `;
    
    await fetch('https://graph.facebook.com/v18.0/[PHONE_ID]/messages', {
        method: 'POST',
        headers: { 
            'Authorization': 'Bearer [WHATSAPP_TOKEN]',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '+353871234567', // Eddie's WhatsApp
            type: 'text',
            text: { body: message }
        })
    });
}
```

---

### 2.3 PAYMENT PROCESSING & SPLITS

#### Option A: Stripe Connect (Recommended)
```javascript
const PAYMENT_SYSTEM = {
    // Create connected accounts for Ethan & Eddie
    async setupStripeConnect() {
        // Ethan = Platform account (main)
        // Eddie = Connected account (sub-account)
        
        const eddieAccount = await stripe.accounts.create({
            type: 'express',
            country: 'IE',
            email: 'eddie@example.com',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true }
            }
        });
        
        return eddieAccount.id; // acct_xxxxx
    },
    
    // Customer pays Ethan, auto-split to Eddie
    async createPayment(amount, serviceType) {
        const splits = RESELLER_MODEL.calculateSplit(serviceType, amount);
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: 'eur',
            application_fee_amount: (splits.ethan_earns + splits.platform_earns) * 100,
            transfer_data: {
                destination: 'acct_eddie', // Eddie's Stripe account
            },
            metadata: {
                service_type: serviceType,
                ethan_commission: splits.ethan_earns,
                platform_fee: splits.platform_earns
            }
        });
        
        return paymentIntent;
    }
};
```

#### Customer Payment Flow:
1. **Customer books service** ? €120 total
2. **Payment page shows** ? "Pay Lavelle's Auto - €120"
3. **Customer pays via Stripe** ? Money goes to Ethan's account
4. **Automatic split:**
   - Eddie gets €98.40 (transferred within 2 days)
   - Ethan keeps €18
   - Platform gets €3.60

---

### 2.4 JOB COMPLETION & BEFORE/AFTER PHOTOS
**Inspired by Jagmax system**

#### Implementation:
```html
<!-- New page: job-complete.html -->
<section class="job-completion">
    <h2>?? Complete Your Job</h2>
    <p>Upload photos to confirm job completion and get paid</p>
    
    <form id="job-complete-form" enctype="multipart/form-data">
        <input type="hidden" name="booking_id" value="BK12345">
        
        <div class="photo-upload">
            <h4>Before Photos</h4>
            <input type="file" name="before_photos" accept="image/*" multiple capture="camera">
            <div id="before-preview"></div>
        </div>
        
        <div class="photo-upload">
            <h4>After Photos</h4>
            <input type="file" name="after_photos" accept="image/*" multiple capture="camera">
            <div id="after-preview"></div>
        </div>
        
        <textarea name="work_notes" placeholder="Work completed notes..."></textarea>
        <textarea name="parts_used" placeholder="Parts used..."></textarea>
        <input type="number" name="final_cost" placeholder="Final cost (€)">
        
        <button type="submit" class="btn-primary">Submit & Request Payment</button>
    </form>
</section>

<script>
document.getElementById('job-complete-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Upload to GHL or cloud storage
    const beforeUrls = await uploadPhotos(formData.getAll('before_photos'));
    const afterUrls = await uploadPhotos(formData.getAll('after_photos'));
    
    // Update booking in GHL
    await fetch('https://services.leadconnectorhq.com/hooks/job-complete', {
        method: 'POST',
        body: JSON.stringify({
            booking_id: formData.get('booking_id'),
            status: 'completed',
            before_photos: beforeUrls,
            after_photos: afterUrls,
            work_notes: formData.get('work_notes'),
            parts_used: formData.get('parts_used'),
            final_cost: formData.get('final_cost')
        })
    });
    
    // Notify customer
    sendCustomerConfirmation(formData.get('booking_id'));
    
    // Trigger payment release
    releasePaymentToEddie(formData.get('booking_id'));
    
    alert('? Job completed! Customer notified and payment released.');
});
</script>
```

#### Benefits:
- **Quality Control:** Photos prove work was done
- **Customer Transparency:** Customers see before/after
- **Portfolio Building:** Best photos go on website gallery
- **Dispute Protection:** Evidence of work completed
- **Payment Trigger:** Release funds only after photos uploaded

---

## ?? PART 3: RECURRING REVENUE MODELS

### 3.1 SUBSCRIPTION OPTIONS

#### **Option A: "Car Care Plus" Membership**
```javascript
const MEMBERSHIP_TIERS = {
    basic: {
        price: 15, // per month
        benefits: [
            'Priority booking',
            'Free vehicle health check (quarterly)',
            '10% off all services',
            'Free car wash voucher (monthly)',
            'Service reminders'
        ]
    },
    
    premium: {
        price: 30, // per month
        benefits: [
            'Everything in Basic',
            'Free oil change (annual)',
            '15% off all services',
            '20% off parts',
            'Free NCT pre-check',
            'Free emergency call-out (1 per year)'
        ]
    },
    
    fleet: {
        price: 150, // per vehicle per month
        benefits: [
            'Dedicated account manager',
            'Scheduled maintenance included',
            'Priority emergency response',
            'Fleet management dashboard',
            'Annual safety compliance reports'
        ]
    }
};
```

#### Revenue Projection:
- 50 customers × €15/mo = **€750/month** (€9,000/year)
- 20 customers × €30/mo = **€600/month** (€7,200/year)
- 3 fleet accounts × €150/mo = **€450/month** (€5,400/year)
- **Total: €1,800/month = €21,600/year recurring**

---

### 3.2 PLATFORM SERVICE CHARGE
**For reseller bookings:**
- 3% on all transactions through platform
- Example: €10,000/month in reseller bookings = **€300/month** to Exposure Solutions

---

### 3.3 LOYALTY PROGRAM UPSELLS
```javascript
const LOYALTY_UPSELLS = {
    // Customers redeem points for services
    // But pay small top-up fee
    redemptions: {
        '500pts-oil-change': {
            points: 500,
            cashTopUp: 20, // Customer pays €20, points cover rest
            serviceValue: 70
        },
        '1000pts-diagnostic': {
            points: 1000,
            cashTopUp: 30,
            serviceValue: 80
        }
    }
};
```

---

## ?? PART 4: IMPLEMENTATION PAGES

### Page Structure:
```
index.html              ? Main homepage (clean, fast, GHL integrated)
services.html           ? Full service list with booking buttons
booking.html            ? Booking calendar (GHL embed)
loyalty.html            ? Car Care Champions program
partners.html           ? Partner services (Eddie English, etc.)
parts.html              ? Parts ordering system
fleet.html              ? Business/fleet services
job-complete.html       ? For Eddie/partners to upload work photos
payment.html            ? Stripe payment processing
dashboard.html          ? Customer portal (view bookings, points, etc.)
```

### Why Separate Pages?
- ? Main page loads fast
- ? Complex features don't slow homepage
- ? Can work on pages independently
- ? Better SEO (targeted keywords per page)
- ? Easier maintenance

---

## ?? PART 5: IMPLEMENTATION PRIORITY

### Week 1: Core Homepage ?
- Inline CSS
- Working emojis
- Basic services
- GHL booking form
- Social media icons

### Week 2: Booking System ??
- `booking.html` with GHL calendar
- Service-specific booking flows
- SMS confirmations
- Reminder automations

### Week 3: Parts & Automation ??
- `parts.html` with Euro Car Parts API
- Mileage reminder system
- NCT auto-booking

### Week 4: Partner Network ??
- `partners.html` for reseller services
- Eddie English integration
- WhatsApp booking relay
- Payment splitting (Stripe Connect)

### Week 5: Advanced Features ??
- `loyalty.html` - Car Care Champions
- `job-complete.html` - Before/after uploads
- `dashboard.html` - Customer portal
- Membership subscriptions

---

## ?? REVENUE FORECAST (12 Months)

| Revenue Stream | Monthly | Annual |
|---------------|---------|--------|
| **Direct Services** | €8,000 | €96,000 |
| **Reseller Commissions** | €600 | €7,200 |
| **Membership Subscriptions** | €1,800 | €21,600 |
| **Parts Markup** | €400 | €4,800 |
| **Platform Fees (to Exposure)** | €300 | €3,600 |
| **TOTAL** | **€11,100** | **€133,200** |

**Increase over current:** +45% (estimated)

---

## ?? SUCCESS METRICS

### Customer Satisfaction:
- ?? Booking takes <2 minutes
- ?? Appointment reminders (95% show-up rate)
- ?? Before/after photos (transparency)
- ?? One-click payments

### Business Efficiency:
- ?? 80% of bookings automated (no phone calls)
- ?? Real-time calendar sync
- ?? Instant payment splits
- ?? Zero missed service intervals (auto-reminders)

### Partnership Growth:
- ?? Eddie English integrated (Month 1)
- ?? 2 more partners by Month 6
- ?? Network of 5+ partners by Year 1

---

## ?? NEXT STEPS

1. ? **Create separate pages** (don't overload homepage)
2. ? **Set up GHL webhooks** (booking automation)
3. ? **Integrate Stripe Connect** (payment splits)
4. ? **Build parts ordering API** (Euro Car Parts)
5. ? **Create Eddie partnership agreement** (commission splits)
6. ? **Launch "Car Care Plus" memberships** (recurring revenue)
7. ? **Deploy & test** (staging environment first)

---

**End of Council of AI Report**

**Prepared By:** Exposure Solutions Council of AI  
**Status:** Ready for Development ?  
**Expected Launch:** 6 weeks  

---

## ?? RELATED DOCUMENTS
- [Deep Dive Analysis Report](./DEEP_DIVE_ANALYSIS_REPORT.md)
- [Additional Services Recon](./ADDITIONAL_SERVICES_RECON.md)
- [Image Prompts for CapCut](./ADDITIONAL_SERVICES_RECON.md#image-prompts)

**Let's build something incredible! ??**

/* =============================================
   MCGINTY'S GARAGE REPAIR - CONSTANTS
   Centralized configuration and business info
   ============================================= */

const MCGINTYS = {
    // Business Info
    name: "McGinty's Garage Repair",
    tagline: "Expert Car Repairs on Achill Island",
    description: "Third-generation mechanic offering expert diagnostics, honest repairs, and quality service on Achill Island.",
    
    // Contact
    phone: {
        display: "085-102-6371",
        link: "0851026371",
        international: "+353851026371"
    },
    
    // Emergency Contact (Eddie)
    emergency: {
        name: "Eddie",
        phone: {
            display: "089-205-7388",
            link: "+353892057388"
        }
    },
    
    // WhatsApp
    whatsapp: {
        number: "353851026371",
        link: "https://wa.me/353851026371",
        bookingMessage: "Hi, I'd like to book a service at McGinty's Garage",
        emergencyMessage: "Hi, I need emergency assistance"
    },
    
    // Location
    location: {
        address: "Achill Sound, Co. Mayo, Ireland",
        region: "Achill Island",
        county: "Mayo",
        country: "Ireland",
        coordinates: {
            lat: 53.9167,
            lng: -9.9333
        }
    },
    
    // Social Media
    social: {
        facebook: "https://www.facebook.com/mcgintysgarage",
        instagram: "https://www.instagram.com/mcgintysgarage",
        google: "https://g.page/mcgintysgarage",
        youtube: "https://www.youtube.com/@mcgintysgarage"
    },
    
    // Website URLs
    urls: {
        base: "https://mcgintysgarage.store",
        home: "/home",
        services: "/services",
        booking: "/booking",
        loyalty: "/loyalty",
        parts: "/parts",
        partners: "/partners",
        payments: "/payments",
        strategy: "/strategy"
    },
    
    // Business Hours
    hours: {
        weekdays: "6pm - 9pm",
        saturday: "9am - 2pm",
        sunday: "Closed",
        emergency: "24/7 Call-outs available"
    },
    
    // Assets
    assets: {
        logo: "https://storage.googleapis.com/msgsndr/KbiucErIMNPbO1mY4qXL/media/6953c71188fd1a81b6091ec4.png",
        background: "https://storage.googleapis.com/msgsndr/KbiucErIMNPbO1mY4qXL/media/693c2f463165d92aa438ebc1.png"
    },
    
    // SEO
    seo: {
        title: "McGinty's Garage Repair | Expert Car Repairs on Achill Island",
        description: "Third-generation mechanic offering expert diagnostics, honest repairs, and quality service on Achill Island. Book online or call 085-102-6371",
        keywords: "car repair, mechanic, Achill Island, Mayo, diagnostics, NCT, oil change, brakes, garage"
    },
    
    // TFI Anseo Bus Service - Customer Transport
    anseo: {
        name: "TFI Anseo",
        description: "On-demand door-to-door minibus service covering Achill Island & Curraun Peninsula",
        coverage: "Achill Island, Curraun Peninsula (as far as Mulranny)",
        hours: "Daily 7:00 AM - 8:00 PM",
        bookingNotice: "Minimum 2 hours advance booking required",
        advanceBooking: "Up to 7 days in advance",
        phone: {
            display: "094 900 5150",
            link: "0949005150"
        },
        email: "TFIAnseo@nationaltransport.ie",
        app: {
            ios: "https://apps.apple.com/ie/app/tfi-anseo/id6467011498",
            android: "https://play.google.com/store/apps/details?id=com.ridewithvia.tfi.tfianseo"
        },
        fares: {
            adult: "€3.00",
            child: "Free (under 9)",
            youngAdult: "Discounted (19-25)",
            student: "Discounted",
            freeTravel: "Accepted"
        },
        features: [
            "Door-to-door pickup",
            "Wheelchair accessible",
            "Up to 4 additional passengers",
            "Free Travel Pass accepted",
            "Cash option available (contact Local Link)"
        ],
        tip: "Perfect for dropping off your car at McGinty's - book a bus to take you home and back!"
    },
    
    // Parts Ordering Partners
    partsSuppliers: {
        primary: [
            {
                name: "Micks Garage",
                url: "https://www.micksgarage.com",
                description: "Ireland's largest online car parts retailer",
                hasAPI: false
            },
            {
                name: "Euro Car Parts",
                url: "https://www.eurocarparts.com/ie",
                description: "Quality car parts with next-day delivery",
                hasAPI: false
            },
            {
                name: "Halfords",
                url: "https://www.halfords.ie",
                description: "Car parts, accessories and servicing",
                hasAPI: false
            }
        ],
        wholesale: [
            {
                name: "Parts Plus",
                description: "Trade parts supplier"
            },
            {
                name: "Motor Factors",
                description: "Local motor factors"
            }
        ],
        tyres: {
            name: "Duffy Tyres",
            description: "Mayo's leading tyre specialists - McGinty's partner",
            services: ["New Tyres", "3D Wheel Alignment", "Puncture Repairs", "Mobile Fitting"]
        }
    }
};

// Freeze to prevent accidental modification
Object.freeze(MCGINTYS);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MCGINTYS;
}

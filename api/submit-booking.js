// This is a serverless function for Vercel/Netlify.
// It handles form submissions from the Lavelle's Auto website and sends the data to GoHighLevel (GHL).

// GHL API Configuration
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_API_URL = 'https://rest.gohighlevel.com/v1';

// Main handler function
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const formData = req.body;

        // 1. Search for an existing contact in GHL by phone number
        const searchResponse = await fetch(`${GHL_API_URL}/contacts/lookup?phone=${encodeURIComponent(formData.phone)}`, {
            headers: { 'Authorization': `Bearer ${GHL_API_KEY}` }
        });

        let contactId;
        if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            if (searchData.contacts && searchData.contacts.length > 0) {
                contactId = searchData.contacts[0].id;
            }
        }

        // 2. Prepare the data for GHL (including custom fields)
        const contactData = {
            firstName: formData.name.split(' ')[0] || '',
            lastName: formData.name.split(' ').slice(1).join(' ') || '',
            phone: formData.phone,
            tags: ['Website Booking'],
            customField: {
                // IMPORTANT: Replace these IDs with the actual IDs from your GHL Custom Fields
                'car_registration': formData.reg,
                'car_make_model': formData.car,
                'repair_status': 'Booked In',
                'service_details': formData.issue,
                'service_type': formData.service_type,
                // 'nct_due_date': 'YYYY-MM-DD' // You would add this if you collect it
            }
        };

        let ghlResponse;

        // 3. If contact exists, update it. Otherwise, create a new one.
        if (contactId) {
            // Update existing contact
            ghlResponse = await fetch(`${GHL_API_URL}/contacts/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GHL_API_KEY}`
                },
                body: JSON.stringify(contactData)
            });
        } else {
            // Create new contact
            ghlResponse = await fetch(`${GHL_API_URL}/contacts/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GHL_API_KEY}`
                },
                body: JSON.stringify(contactData)
            });
        }

        if (!ghlResponse.ok) {
            const errorData = await ghlResponse.json();
            throw new Error(`GHL API Error: ${JSON.stringify(errorData)}`);
        }

        const responseData = await ghlResponse.json();

        // 4. (Optional) Add a note to the contact with the service details
        const noteContactId = contactId || responseData.contact.id;
        await fetch(`${GHL_API_URL}/contacts/${noteContactId}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GHL_API_KEY}`
            },
            body: JSON.stringify({
                body: `New Booking Request:\nService: ${formData.service_type}\nDetails: ${formData.issue}`
            })
        });

        return res.status(200).json({ message: 'Booking submitted successfully!', data: responseData });

    } catch (error) {
        console.error('Error submitting booking to GHL:', error);
        return res.status(500).json({ message: 'An error occurred while submitting the booking.' });
    }
}

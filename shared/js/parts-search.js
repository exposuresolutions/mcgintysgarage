/* =============================================
   MCGINTY'S GARAGE REPAIR - PARTS SEARCH
   Vehicle registration lookup and parts ordering
   ============================================= */

(function() {
    'use strict';

    // Irish Vehicle Registration Format: YY-CC-SSSSSS (e.g., 21-MO-1234)
    const REG_PATTERN = /^(\d{2})-?([A-Z]{1,2})-?(\d{1,6})$/i;

    // Parts search configuration
    const PARTS_CONFIG = {
        suppliers: [
            {
                name: "Micks Garage",
                searchUrl: "https://www.micksgarage.com/search?q=",
                logo: "🔧",
                description: "Ireland's largest online car parts retailer"
            },
            {
                name: "Euro Car Parts",
                searchUrl: "https://www.eurocarparts.com/ie/search?q=",
                logo: "🚗",
                description: "Quality parts with next-day delivery"
            },
            {
                name: "Halfords",
                searchUrl: "https://www.halfords.ie/search?q=",
                logo: "🛠️",
                description: "Parts, accessories and servicing"
            },
            {
                name: "PartsPlus",
                searchUrl: "https://www.partsplus.ie/search?q=",
                logo: "⚙️",
                description: "Trade parts supplier"
            }
        ],
        categories: [
            { id: "brakes", name: "Brakes", icon: "🛑", parts: ["Brake Pads", "Brake Discs", "Brake Fluid", "Calipers"] },
            { id: "filters", name: "Filters", icon: "🔄", parts: ["Oil Filter", "Air Filter", "Fuel Filter", "Cabin Filter"] },
            { id: "oil", name: "Oil & Fluids", icon: "🛢️", parts: ["Engine Oil", "Coolant", "Brake Fluid", "Power Steering Fluid"] },
            { id: "electrical", name: "Electrical", icon: "⚡", parts: ["Battery", "Alternator", "Starter Motor", "Spark Plugs"] },
            { id: "suspension", name: "Suspension", icon: "🚙", parts: ["Shock Absorbers", "Springs", "Ball Joints", "Track Rod Ends"] },
            { id: "exhaust", name: "Exhaust", icon: "💨", parts: ["Exhaust Pipe", "Catalytic Converter", "Silencer", "DPF"] },
            { id: "clutch", name: "Clutch", icon: "🦶", parts: ["Clutch Kit", "Flywheel", "Release Bearing", "Slave Cylinder"] },
            { id: "timing", name: "Timing", icon: "⛓️", parts: ["Timing Belt", "Timing Chain", "Tensioner", "Water Pump"] }
        ]
    };

    // Parse Irish vehicle registration
    function parseRegistration(reg) {
        const cleaned = reg.toUpperCase().replace(/\s/g, '');
        const match = cleaned.match(REG_PATTERN);
        
        if (!match) return null;
        
        const year = parseInt(match[1]);
        const county = match[2];
        const sequence = match[3];
        
        // Determine full year (00-30 = 2000s, 31-99 = 1900s for older cars)
        const fullYear = year <= 30 ? 2000 + year : 1900 + year;
        
        // County codes
        const counties = {
            'C': 'Cork', 'CE': 'Clare', 'CN': 'Cavan', 'CW': 'Carlow',
            'D': 'Dublin', 'DL': 'Donegal', 'G': 'Galway', 'KE': 'Kildare',
            'KK': 'Kilkenny', 'KY': 'Kerry', 'L': 'Limerick', 'LD': 'Longford',
            'LH': 'Louth', 'LK': 'Limerick', 'LM': 'Leitrim', 'LS': 'Laois',
            'MH': 'Meath', 'MN': 'Monaghan', 'MO': 'Mayo', 'OY': 'Offaly',
            'RN': 'Roscommon', 'SO': 'Sligo', 'T': 'Tipperary', 'TN': 'Tipperary North',
            'TS': 'Tipperary South', 'W': 'Waterford', 'WD': 'Waterford',
            'WH': 'Westmeath', 'WW': 'Wicklow', 'WX': 'Wexford'
        };
        
        return {
            original: reg,
            formatted: `${match[1]}-${county}-${sequence}`,
            year: fullYear,
            county: counties[county] || county,
            countyCode: county,
            sequence: sequence
        };
    }

    // Generate search URLs for all suppliers
    function generateSearchUrls(query) {
        return PARTS_CONFIG.suppliers.map(supplier => ({
            ...supplier,
            url: supplier.searchUrl + encodeURIComponent(query)
        }));
    }

    // Create parts request for mechanic
    function createPartsRequest(vehicleInfo, parts, notes) {
        return {
            timestamp: new Date().toISOString(),
            vehicle: vehicleInfo,
            parts: parts,
            notes: notes,
            status: 'pending'
        };
    }

    // Initialize parts search form
    function initPartsSearch() {
        const searchForm = document.getElementById('parts-search-form');
        const regInput = document.getElementById('vehicle-reg');
        const resultsContainer = document.getElementById('parts-results');
        
        if (!searchForm) return;

        // Real-time registration validation
        if (regInput) {
            regInput.addEventListener('input', function() {
                const parsed = parseRegistration(this.value);
                const feedback = document.getElementById('reg-feedback');
                
                if (this.value.length >= 5) {
                    if (parsed) {
                        if (feedback) {
                            feedback.innerHTML = `<span class="text-success">✅ ${parsed.year} vehicle from ${parsed.county}</span>`;
                        }
                        this.classList.remove('error');
                        this.classList.add('valid');
                    } else {
                        if (feedback) {
                            feedback.innerHTML = `<span class="text-error">❌ Invalid format. Use: 21-MO-1234</span>`;
                        }
                        this.classList.add('error');
                        this.classList.remove('valid');
                    }
                } else {
                    if (feedback) feedback.innerHTML = '';
                    this.classList.remove('error', 'valid');
                }
            });
        }

        // Form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reg = regInput ? regInput.value : '';
            const make = document.getElementById('vehicle-make')?.value || '';
            const model = document.getElementById('vehicle-model')?.value || '';
            const partType = document.getElementById('part-type')?.value || '';
            const partDescription = document.getElementById('part-description')?.value || '';
            
            const vehicleInfo = parseRegistration(reg);
            const searchQuery = `${make} ${model} ${partType} ${partDescription}`.trim();
            
            if (resultsContainer) {
                displaySearchResults(resultsContainer, searchQuery, vehicleInfo);
            }
        });
    }

    // Display search results with supplier links
    function displaySearchResults(container, query, vehicleInfo) {
        const searchUrls = generateSearchUrls(query);
        
        let html = `
            <div class="parts-results-header">
                <h3>🔍 Search Results for: "${query}"</h3>
                ${vehicleInfo ? `<p class="vehicle-info">Vehicle: ${vehicleInfo.formatted} (${vehicleInfo.year})</p>` : ''}
            </div>
            
            <div class="supplier-grid">
                ${searchUrls.map(supplier => `
                    <a href="${supplier.url}" target="_blank" rel="noopener noreferrer" class="supplier-card">
                        <div class="supplier-logo">${supplier.logo}</div>
                        <div class="supplier-info">
                            <h4>${supplier.name}</h4>
                            <p>${supplier.description}</p>
                        </div>
                        <span class="supplier-arrow">→</span>
                    </a>
                `).join('')}
            </div>
            
            <div class="parts-request-section">
                <h4>🔧 Can't find what you need?</h4>
                <p>Let us source it for you! We have access to trade suppliers and can often get better prices.</p>
                <button type="button" class="btn btn-primary" onclick="McGintysParts.showRequestForm()">
                    Request Part Quote
                </button>
            </div>
        `;
        
        container.innerHTML = html;
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Show part request form (for mechanic to source)
    function showRequestForm() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                <h3>📋 Request Part Quote</h3>
                <p>Fill in the details and we'll source the best price for you.</p>
                
                <form id="part-request-form" class="form-stack">
                    <div class="form-group">
                        <label class="form-label">Your Name *</label>
                        <input type="text" name="name" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone Number *</label>
                        <input type="tel" name="phone" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Vehicle Registration *</label>
                        <input type="text" name="reg" class="form-input" placeholder="e.g., 21-MO-1234" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Make & Model *</label>
                        <input type="text" name="vehicle" class="form-input" placeholder="e.g., Ford Focus 1.6 TDCi" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Part(s) Needed *</label>
                        <textarea name="parts" class="form-textarea" rows="3" placeholder="Describe the part(s) you need..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">New or Second-Hand?</label>
                        <select name="condition" class="form-select">
                            <option value="new">New Part</option>
                            <option value="used">Second-Hand (if available)</option>
                            <option value="either">Either - Best Price</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Urgency</label>
                        <select name="urgency" class="form-select">
                            <option value="normal">Normal (3-5 days)</option>
                            <option value="urgent">Urgent (1-2 days)</option>
                            <option value="asap">ASAP (same day if possible)</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-accent btn-full">Submit Request</button>
                </form>
                
                <div class="modal-footer">
                    <p>Or call us directly: <a href="tel:0851026371">085-102-6371</a></p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle form submission
        document.getElementById('part-request-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Send to GHL or show confirmation
            console.log('Part request:', data);
            
            modal.innerHTML = `
                <div class="modal-content text-center">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                    <h3>Request Submitted!</h3>
                    <p>We'll check availability and get back to you within 2 hours with pricing.</p>
                    <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">Close</button>
                </div>
            `;
            
            // Show notification
            if (window.McGintysForums) {
                window.McGintysForums.showNotification('Part request submitted! We\'ll call you shortly.', 'success');
            }
        });
    }

    // Initialize category quick-select
    function initCategorySelect() {
        const categoryGrid = document.getElementById('parts-categories');
        if (!categoryGrid) return;
        
        categoryGrid.innerHTML = PARTS_CONFIG.categories.map(cat => `
            <button type="button" class="category-btn" data-category="${cat.id}">
                <span class="category-icon">${cat.icon}</span>
                <span class="category-name">${cat.name}</span>
            </button>
        `).join('');
        
        categoryGrid.addEventListener('click', function(e) {
            const btn = e.target.closest('.category-btn');
            if (!btn) return;
            
            // Toggle active state
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update part type select
            const partTypeSelect = document.getElementById('part-type');
            if (partTypeSelect) {
                const category = PARTS_CONFIG.categories.find(c => c.id === btn.dataset.category);
                if (category) {
                    partTypeSelect.innerHTML = `
                        <option value="">Select specific part...</option>
                        ${category.parts.map(p => `<option value="${p}">${p}</option>`).join('')}
                    `;
                }
            }
        });
    }

    // Initialize on DOM ready
    function init() {
        initPartsSearch();
        initCategorySelect();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose public API
    window.McGintysParts = {
        parseRegistration,
        generateSearchUrls,
        showRequestForm,
        categories: PARTS_CONFIG.categories,
        suppliers: PARTS_CONFIG.suppliers
    };

})();

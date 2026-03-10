// dashboard.js - Complete version with real login support and multiple members

// Member database with ALL member data
const memberDatabase = {
    'JHARRINGTON': {
        personal: {
            name: 'Jonathan A. Harrington III',
            address: 'Via Privata Fiorita 12, 6900 Lugano, Switzerland',
            nextOfKin: 'Elizabeth Harrington-Windsor',
            depositDate: 'March 17, 2023',
            depositor: 'Harrington Family Trust',
            memberSince: '2019',
            riskProfile: 'Conservative'
        },
        assets: {
            metals: {
                gold: { quantity: 12.4, unit: 'kg', value: 744000 },
                silver: { quantity: 85.5, unit: 'kg', value: 68400 },
                platinum: { quantity: 3.2, unit: 'kg', value: 96000 }
            },
            gems: {
                diamonds: { quantity: 12, unit: 'pcs', value: 4200000 },
                rubies: { quantity: 8, unit: 'pcs', value: 1200000 },
                sapphires: { quantity: 5, unit: 'pcs', value: 750000 }
            },
            digital: {
                bitcoin: { quantity: 4.25, unit: 'BTC', value: 297500 },
                ethereum: { quantity: 42.8, unit: 'ETH', value: 85600 },
                usdc: { quantity: 250000, unit: 'USDC', value: 250000 }
            },
            documents: {
                zurichDeed: { type: 'Property Deed', location: 'Zurich', value: 3200000 },
                luganoDeed: { type: 'Property Deed', location: 'Lugano', value: 1850000 },
                bonds: { type: 'Corporate Bonds', value: 2500000 }
            }
        },
        financial: {
            demurrageRate: 0.003,
            paymentHistory: [
                { period: 'Q1 2025', amount: 9635.63, status: 'paid', date: 'Mar 15, 2025', transactionId: 'DEM-2025-0012' },
                { period: 'Q4 2024', amount: 9635.62, status: 'paid', date: 'Dec 18, 2024', transactionId: 'DEM-2024-0893' },
                { period: 'Q3 2024', amount: 9525.50, status: 'paid', date: 'Sep 22, 2024', transactionId: 'DEM-2024-0671' },
                { period: 'Q2 2025', amount: 9635.63, status: 'pending', date: '-', transactionId: '-' }
            ]
        }
    },
    
    'SMITHJ': {
        personal: {
            name: 'James T. Smith',
            address: '42 Bank Street, Canary Wharf, London E14 5NR, UK',
            nextOfKin: 'Sarah Smith',
            depositDate: 'September 8, 2024',
            depositor: 'Smith Holdings Ltd',
            memberSince: '2024',
            riskProfile: 'Moderate'
        },
        assets: {
            metals: {
                gold: { quantity: 5.2, unit: 'kg', value: 312000 },
                silver: { quantity: 120.5, unit: 'kg', value: 96400 },
                platinum: { quantity: 1.5, unit: 'kg', value: 45000 }
            },
            gems: {
                diamonds: { quantity: 3, unit: 'pcs', value: 850000 },
                rubies: { quantity: 0, unit: 'pcs', value: 0 },
                sapphires: { quantity: 2, unit: 'pcs', value: 180000 }
            },
            digital: {
                bitcoin: { quantity: 12.5, unit: 'BTC', value: 875000 },
                ethereum: { quantity: 150.2, unit: 'ETH', value: 300400 },
                usdc: { quantity: 500000, unit: 'USDC', value: 500000 }
            },
            documents: {
                londonDeed: { type: 'Property Deed', location: 'London', value: 2750000 },
                bonds: { type: 'Government Bonds', value: 1500000 }
            }
        },
        financial: {
            demurrageRate: 0.003,
            paymentHistory: [
                { period: 'Q1 2025', amount: 21450.75, status: 'paid', date: 'Mar 10, 2025', transactionId: 'DEM-2025-0087' },
                { period: 'Q4 2024', amount: 21450.75, status: 'paid', date: 'Dec 05, 2024', transactionId: 'DEM-2024-0921' },
                { period: 'Q2 2025', amount: 21450.75, status: 'pending', date: '-', transactionId: '-' }
            ]
        }
    },

    'RITA': {
        personal: {
            name: 'Rita Aryee',
            address: 'Accra, Ghana',
            nextOfKin: 'Sarah Smith',
            depositDate: 'September 8, 2024',
            depositor: 'Munj Holdings Ltd',
            memberSince: '2024',
            riskProfile: 'Moderate'
        },
        assets: {
            metals: {
                gold: { quantity: 5.2, unit: 'kg', value: 312000 },
                silver: { quantity: 120.5, unit: 'kg', value: 96400 },
                platinum: { quantity: 1.5, unit: 'kg', value: 45000 }
            },
            gems: {
                diamonds: { quantity: 3, unit: 'pcs', value: 850000 },
                rubies: { quantity: 0, unit: 'pcs', value: 0 },
                sapphires: { quantity: 2, unit: 'pcs', value: 180000 }
            },
            digital: {
                bitcoin: { quantity: 12.5, unit: 'BTC', value: 875000 },
                ethereum: { quantity: 150.2, unit: 'ETH', value: 300400 },
                usdc: { quantity: 500000, unit: 'USDC', value: 500000 }
            },
            documents: {
                londonDeed: { type: 'Property Deed', location: 'London', value: 2750000 },
                bonds: { type: 'Government Bonds', value: 1500000 }
            }
        },
        financial: {
            // MANUALLY SET THESE VALUES:
            demurrageRate: 0.003,           // 0.3% annual rate
            totalVaultValue: 15847200,       // MANUAL total (sum of all assets above)
            demurrageFee: 5000.00,           // MANUAL annual fee (total * 0.003)
            amountPaid: 23770.80,              // MANUAL amount paid so far
            outstandingBalance: 23770.80,      // MANUAL remaining balance
            
            // Payment history
            paymentHistory: [
                { 
                    period: 'Q1 2025', 
                    amount: 11885.40,           // MANUAL quarterly amount
                    status: 'paid', 
                    date: 'Mar 12, 2025', 
                    transactionId: 'DEM-2025-0234' 
                },
                { 
                    period: 'Q4 2024', 
                    amount: 11885.40, 
                    status: 'paid', 
                    date: 'Dec 08, 2024', 
                    transactionId: 'DEM-2024-1122' 
                },
                { 
                    period: 'Q2 2025', 
                    amount: 11885.40, 
                    status: 'pending', 
                    date: '-', 
                    transactionId: '-' 
                }
            ]
        }
    },
    
    'WONGL': {
        personal: {
            name: 'Li Wei Wong',
            address: '8 Marina View, #38-01, Asia Square Tower 1, Singapore 018960',
            nextOfKin: 'Mei Ling Wong',
            depositDate: 'December 3, 2022',
            depositor: 'Wong Family Office',
            memberSince: '2020',
            riskProfile: 'Aggressive'
        },
        assets: {
            metals: {
                gold: { quantity: 25.8, unit: 'kg', value: 1548000 },
                silver: { quantity: 0, unit: 'kg', value: 0 },
                platinum: { quantity: 8.4, unit: 'kg', value: 252000 }
            },
            gems: {
                diamonds: { quantity: 24, unit: 'pcs', value: 8900000 },
                rubies: { quantity: 15, unit: 'pcs', value: 2800000 },
                sapphires: { quantity: 12, unit: 'pcs', value: 1950000 }
            },
            digital: {
                bitcoin: { quantity: 32.8, unit: 'BTC', value: 2296000 },
                ethereum: { quantity: 450.5, unit: 'ETH', value: 901000 },
                usdc: { quantity: 1200000, unit: 'USDC', value: 1200000 }
            },
            documents: {
                singaporeDeed: { type: 'Property Deed', location: 'Singapore', value: 5200000 },
                hkDeed: { type: 'Property Deed', location: 'Hong Kong', value: 3800000 },
                bonds: { type: 'Corporate Bonds', value: 4500000 }
            }
        },
        financial: {
            demurrageRate: 0.003,
            paymentHistory: [
                { period: 'Q1 2025', amount: 72285.50, status: 'paid', date: 'Mar 05, 2025', transactionId: 'DEM-2025-0034' },
                { period: 'Q4 2024', amount: 72285.50, status: 'paid', date: 'Dec 12, 2024', transactionId: 'DEM-2024-0789' },
                { period: 'Q3 2024', amount: 71250.25, status: 'paid', date: 'Sep 18, 2024', transactionId: 'DEM-2024-0543' },
                { period: 'Q2 2025', amount: 72285.50, status: 'pending', date: '-', transactionId: '-' }
            ]
        }
    },
    
    'RODRIGUEZ': {
        personal: {
            name: 'Carlos Rodriguez Mendoza',
            address: 'Calle 87 #12-45, Bogotá, Colombia',
            nextOfKin: 'Elena Rodriguez',
            depositDate: 'January 15, 2025',
            depositor: 'Rodriguez Enterprises',
            memberSince: '2025',
            riskProfile: 'Conservative'
        },
        assets: {
            metals: {
                gold: { quantity: 8.7, unit: 'kg', value: 522000 },
                silver: { quantity: 45.2, unit: 'kg', value: 36160 },
                platinum: { quantity: 2.1, unit: 'kg', value: 63000 }
            },
            gems: {
                diamonds: { quantity: 6, unit: 'pcs', value: 1850000 },
                rubies: { quantity: 3, unit: 'pcs', value: 420000 },
                sapphires: { quantity: 0, unit: 'pcs', value: 0 }
            },
            digital: {
                bitcoin: { quantity: 2.8, unit: 'BTC', value: 196000 },
                ethereum: { quantity: 35.6, unit: 'ETH', value: 71200 },
                usdc: { quantity: 150000, unit: 'USDC', value: 150000 }
            },
            documents: {
                bogotaDeed: { type: 'Property Deed', location: 'Bogotá', value: 950000 },
                bonds: { type: 'Corporate Bonds', value: 500000 }
            }
        },
        financial: {
            demurrageRate: 0.003,
            paymentHistory: [
                { period: 'Q1 2025', amount: 14850.30, status: 'paid', date: 'Mar 20, 2025', transactionId: 'DEM-2025-0156' },
                { period: 'Q2 2025', amount: 14850.30, status: 'pending', date: '-', transactionId: '-' }
            ]
        }
    }
};

// Default member if ID not found
const defaultMember = {
    personal: {
        name: 'Guest Member',
        address: 'Please contact support to update your details',
        nextOfKin: 'Not specified',
        depositDate: 'Not available',
        depositor: 'Not specified',
        memberSince: 'N/A',
        riskProfile: 'Standard'
    },
    assets: {
        metals: {
            gold: { quantity: 0, unit: 'kg', value: 0 }
        },
        gems: {
            diamonds: { quantity: 0, unit: 'pcs', value: 0 }
        },
        digital: {
            bitcoin: { quantity: 0, unit: 'BTC', value: 0 }
        },
        documents: {}
    },
    financial: {
        demurrageRate: 0.003,
        paymentHistory: []
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Get member ID from localStorage (set during login)
    const memberId = localStorage.getItem('vaultMember');
    
    if (!memberId) {
        // If no member found, redirect to login
        window.location.href = 'login.html';
        return;
    }
    
    // Load member data
    const memberData = memberDatabase[memberId] || defaultMember;
    
    // Update dashboard with member data
    updateDashboard(memberData, memberId);
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'login.html';
        });
    }
    
    // Add animation to cards on scroll
    const cards = document.querySelectorAll('.asset-card, .detail-item, .overview-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s, border-color 0.2s';
        observer.observe(card);
    });
});

function updateDashboard(memberData, memberId) {
    // Update display name
    const displayName = document.getElementById('displayMemberId');
    if (displayName) {
        displayName.textContent = memberId;
    }
    
    // Update member details
    document.getElementById('memberName').textContent = memberData.personal.name;
    document.getElementById('memberAddress').textContent = memberData.personal.address;
    document.getElementById('memberNextOfKin').textContent = memberData.personal.nextOfKin;
    document.getElementById('memberDepositDate').textContent = memberData.personal.depositDate;
    document.getElementById('memberDepositor').textContent = memberData.personal.depositor;
    
    // Display last access time
    const lastAccess = document.getElementById('lastAccess');
    if (lastAccess) {
        const storedTime = localStorage.getItem('lastAccess');
        lastAccess.textContent = storedTime || 'Just now';
    }
    
    // Generate random session ID
    const sessionId = document.getElementById('sessionId');
    if (sessionId) {
        sessionId.textContent = generateSessionId();
    }
    
    // Calculate total value and update assets
    updateAssetValues(memberData.assets);
    
    // Calculate and update financial data
    updateFinancialData(memberData);
    
    // Update payment history
    updatePaymentHistory(memberData.financial.paymentHistory);
}

function updateAssetValues(assets) {
    let totalValue = 0;
    
    // Update metals
    if (assets.metals) {
        const metalsCard = document.querySelector('.asset-card:nth-child(1) .asset-content');
        if (metalsCard) {
            metalsCard.innerHTML = '';
            Object.entries(assets.metals).forEach(([key, metal]) => {
                if (metal.value > 0) {
                    const item = document.createElement('div');
                    item.className = 'asset-item';
                    item.innerHTML = `
                        <span>${capitalizeFirst(key)} (${metal.quantity} ${metal.unit})</span>
                        <span class="asset-value">$${metal.value.toLocaleString()}</span>
                    `;
                    metalsCard.appendChild(item);
                    totalValue += metal.value;
                }
            });
        }
    }
    
    // Update gems
    if (assets.gems) {
        const gemsCard = document.querySelector('.asset-card:nth-child(2) .asset-content');
        if (gemsCard) {
            gemsCard.innerHTML = '';
            Object.entries(assets.gems).forEach(([key, gem]) => {
                if (gem.value > 0) {
                    const item = document.createElement('div');
                    item.className = 'asset-item';
                    item.innerHTML = `
                        <span>${capitalizeFirst(key)} (${gem.quantity} ${gem.unit})</span>
                        <span class="asset-value">$${gem.value.toLocaleString()}</span>
                    `;
                    gemsCard.appendChild(item);
                    totalValue += gem.value;
                }
            });
        }
    }
    
    // Update digital
    if (assets.digital) {
        const digitalCard = document.querySelector('.asset-card:nth-child(3) .asset-content');
        if (digitalCard) {
            digitalCard.innerHTML = '';
            Object.entries(assets.digital).forEach(([key, digital]) => {
                if (digital.value > 0) {
                    const item = document.createElement('div');
                    item.className = 'asset-item';
                    item.innerHTML = `
                        <span>${key === 'usdc' ? 'USDC' : capitalizeFirst(key)} (${digital.quantity} ${digital.unit})</span>
                        <span class="asset-value">$${digital.value.toLocaleString()}</span>
                    `;
                    digitalCard.appendChild(item);
                    totalValue += digital.value;
                }
            });
        }
    }
    
    // Update documents
    if (assets.documents) {
        const docsCard = document.querySelector('.asset-card:nth-child(4) .asset-content');
        if (docsCard) {
            docsCard.innerHTML = '';
            Object.entries(assets.documents).forEach(([key, doc]) => {
                const item = document.createElement('div');
                item.className = 'asset-item';
                item.innerHTML = `
                    <span>${doc.type}${doc.location ? ' (' + doc.location + ')' : ''}</span>
                    <span class="asset-value">$${doc.value.toLocaleString()}</span>
                `;
                docsCard.appendChild(item);
                totalValue += doc.value;
            });
        }
    }
    
    // Update total value display
    const totalElement = document.getElementById('totalVaultValue');
    if (totalElement) {
        totalElement.textContent = '$' + totalValue.toLocaleString();
    }
}

function updateFinancialData(memberData) {
    // Use MANUAL values from memberData.financial
    const totalValue = memberData.financial.totalVaultValue || calculateTotalFromAssets(memberData.assets);
    const demurrageFee = memberData.financial.demurrageFee || (totalValue * memberData.financial.demurrageRate);
    const amountPaid = memberData.financial.amountPaid || 0;
    const outstandingBalance = memberData.financial.outstandingBalance || (demurrageFee - amountPaid);
    
    // Update total vault value display
    const totalElement = document.getElementById('totalVaultValue');
    if (totalElement) {
        totalElement.textContent = '$' + totalValue.toLocaleString();
    }
    
    // Update demurrage fee display
    const demurrageElement = document.getElementById('demurrageFee');
    if (demurrageElement) {
        demurrageElement.textContent = '$' + demurrageFee.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
    
    // Update amount paid display
    const paidElement = document.getElementById('amountPaid');
    if (paidElement) {
        paidElement.textContent = '$' + amountPaid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
    
    // Update outstanding balance display
    const outstandingElement = document.getElementById('outstandingBalance');
    if (outstandingElement) {
        outstandingElement.textContent = '$' + outstandingBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
}

// Helper function to calculate total from assets (if manual total not provided)
function calculateTotalFromAssets(assets) {
    let total = 0;
    
    // Sum all metals
    if (assets.metals) {
        Object.values(assets.metals).forEach(item => total += item.value || 0);
    }
    
    // Sum all gems
    if (assets.gems) {
        Object.values(assets.gems).forEach(item => total += item.value || 0);
    }
    
    // Sum all digital assets
    if (assets.digital) {
        Object.values(assets.digital).forEach(item => total += item.value || 0);
    }
    
    // Sum all documents
    if (assets.documents) {
        Object.values(assets.documents).forEach(item => total += item.value || 0);
    }
    
    return total;
}

function updatePaymentHistory(paymentHistory) {
    const tableBody = document.querySelector('.payment-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    paymentHistory.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.period}</td>
            <td>$${payment.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td><span class="status-${payment.status}">${payment.status === 'paid' ? 'Paid' : 'Pending'}</span></td>
            <td>${payment.date}</td>
            <td>${payment.transactionId}</td>
        `;
        tableBody.appendChild(row);
    });
}

function generateSessionId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        if (i < 3) result += '-';
    }
    return result + '-' + Math.floor(1000 + Math.random() * 9000);
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}





export const SHARE_DEMO = {
  shareId: 'demo',
  tag: 'AI OPTIMIZED',
  subtitle: '7 Days in Paradise',
  destination: 'Amalfi Coast, Italy',
  dateRange: 'Sept 12 — Sept 19, 2024',
  heroImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBf9kkhR2wMmUPiyqUtJcZb4xkFQcj4lzT3Oh4As4u5IbU9-BuMdLrUBYZftK97AxqLACaa3M6jr2R8neAz4ekEyfHz3C12pDmfMAddebp6RCoa7N2iCG_bYzghcybUOmsivzxe8zLAa3XqH3wpDUUO9dsa6az5Efb8nc5KI1mBVHZqfLUrjpCmS7I55Mi0DiY8nxF6LxaRmGWFF41nvssuEJ72H5AyjafVN2VCPR8dFVqqkEIFpsfP1F3anIV98rBT3yE9vi-2v8Eu',
  stopsCount: 7,
  activitiesCount: 12,
  overview: {
    weather: '24°C, Sunny',
    budget: '€2,400 Total',
    language: 'Italian',
    progress: 85,
  },
  mapImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCEHcMKXZbueAz01zUJcqjLFyvpqUehU1gAtu-OvTU1aT-FAF9UYDoGMbjdCL2IoEm9OIxCRa9qUUmA1qvcM7Ijt7Y8Q4fH35-xdN9rCRIUsL-rPAq5QWCmcCdIs2rv5xy-vrWPt7kBzKLFz1IQT_phusS7NZeTKJAiABZmXcEsfI-qiwHajWDNhqChUZZGc-1-STfT5mJcJnCU4J0M6-Enkh3ZGANFfMfmcGJxlwIt1zG0A-Y2P8lWp4t65Gs0r6ffBxpT1ppxI6CQ',
  packingList: [
    'Light linen clothing',
    'Comfortable hiking shoes',
    'Type L power adapter',
    'Sunscreen (SPF 50+)',
  ],
  days: [
    {
      dayNumber: 1,
      title: 'Arrival in Naples & Private Transfer',
      dateLabel: 'Thursday, September 12',
      isActive: true,
      activities: [
        {
          type: 'standard',
          icon: 'flight_land',
          iconBg: 'bg-tertiary-fixed',
          iconColor: 'text-on-tertiary-fixed-variant',
          title: 'Arrival at NAP International',
          time: '10:30 AM',
          description: 'Flight AZ1420 confirmed. Baggage claim area 4.',
        },
        {
          type: 'hotel',
          icon: 'hotel',
          iconBg: 'bg-secondary-fixed',
          iconColor: 'text-on-secondary-fixed-variant',
          title: 'Palazzo Avino (Check-in)',
          time: '2:00 PM',
          description: 'Ravello, SA. Junior Suite with Sea View. Reservation #VAI-8832.',
          badge: 'CONFIRMED',
        },
        {
          type: 'ai',
          icon: 'auto_awesome',
          iconBg: 'bg-primary-container',
          iconColor: 'text-on-primary-container',
          title: 'AI Suggestion: Dinner at Rossellinis',
          description:
            'Michelin-starred dining on the terrace. We recommend booking 24h in advance for a sunset table.',
          cta: 'Book Table',
        },
      ],
    },
    {
      dayNumber: 2,
      title: 'Ravello Exploration & Coastal Walk',
      dateLabel: 'Friday, September 13',
      isActive: false,
      activities: [
        {
          type: 'standard',
          icon: 'explore',
          iconBg: 'bg-tertiary-fixed',
          iconColor: 'text-on-tertiary-fixed-variant',
          title: 'Villa Cimbrone Gardens',
          time: '09:00 AM',
          description:
            'Famous "Terrace of Infinity" with panoramic views. Ticket included in your premium pass.',
          images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuArUcNyBcXK3hGvRfrb3oLJU7Jl8nKuo3jyBJfFec31XYTaA7KMGKV56qF7Ot3yC1qtwDnxkkBhvUT-5_Yv4OLwnmfHAOznSK1y2ocs5rEE53fcgaKeWeH2u8VMnqO_ITkrffPGl0UvrM-fhCD70j9mlpKOwq3GCSpAdioxO1zCqbz8WIdwUIUtqCU4A9E_Y2_4Iqf-Z_ZFo71bs5u4QavDMN8KWPo9jBX5A7XNbZkQAgw6EFUaFnF47eRRS_hKyLF3IsiZEMow6U0I',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCdM1SgYW7Hi48rnE3RxMggJn1OzB9GENTmNbw5K_HHtvQmcevhtQ__ko0__aGx9AMI83IeUICQC72pPQ1HR5BDGgwaMdIV2Xj0NmOy2xXclsYFkMCiyJ3xFqlbosaf0rfWCJIQbQx3rRa_mXhO1fo_YlYzRcC2DcTpdHf_U0imkUr1-O6vSybVeg_nMW8QevvVbRbpsXYZfZdXL6UDHOe5PVuRoOYmYk_LkyxblQeieGId5J8dX6iU8IFcj4ZlVXS2-DymQF61ai22',
          ],
        },
      ],
    },
  ],
}

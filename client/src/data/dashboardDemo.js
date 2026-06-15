export const DEMO_TRIPS = [
  {
    id: 'demo-1',
    title: 'Amalfi Coast Escape',
    destination: 'Positano, Italy',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYA9yHBHIgMtfm99FsAMD_wQxA0Xr822yaEetpPnmkx9uunKw7qjgknRbY918AOF6ZbG0YBkr_tSLMA4Tb04XDt6V0x3QotSVsyQrahL139uu_YCyrj8kkOBUb-d_nu92-YVougp6OvXoskSa6DQpaNZbbIvm6fsTQEabYdQU_WCtvUBIHO5gJOfZdIr2rMOj9diLcs4L0qCAtBiD36vAqLljpY78et-cPhpogTxuD41zev5KEiYLFSATdsM86zR9Cv0hjGDG-Nb1f',
    tag: 'AI Suggested',
    transportIcon: 'flight_takeoff',
    dateLabel: 'Oct 12 - 18',
    travelersLabel: '2 Travelers',
  },
  {
    id: 'demo-2',
    title: 'Cyber City Discovery',
    destination: 'Tokyo, Japan',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdGdzMUadN9tZ0EENapyB6VHYRlZaep9aHyPBbtPiV1c8Scao_b6x_QXt2xMolM4dzdEVDe2EV1xYlS0rO5YQ_GXsS5Zh5QK5qjDpaFdWNa99MZPPohSiRbKxQbyqytHjtidi4qNxGUheu3eBAY5jYz9sJ0npAZmb_l4RsVvkguu4MBt4-hp5YXyDc-Z1A_i-RSDOvNhp3LTZl0miWzs6UK5KhQXK3GaNiV_2gsxtecyZUivItlFeB4ZnsPW3MABz7ONOtxQmXWxb1',
    tag: null,
    transportIcon: 'train',
    dateLabel: 'Nov 05 - 15',
    travelersLabel: 'Solo',
  },
]

export const DEMO_UPLOADS = [
  {
    id: 'demo-u1',
    fileName: 'Flight_Confirmation.pdf',
    tripLabel: 'Amalfi Coast',
    fileSizeLabel: '2MB',
    icon: 'receipt_long',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-on-primary-fixed',
  },
  {
    id: 'demo-u2',
    fileName: 'Hotel_Lobby_Vibe.jpg',
    tripLabel: 'Tokyo',
    fileSizeLabel: '4.5MB',
    icon: 'image',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-on-tertiary-fixed',
  },
  {
    id: 'demo-u3',
    fileName: 'Itinerary_Draft_V2.docx',
    tripLabel: 'Unassigned',
    fileSizeLabel: '1.2MB',
    icon: 'description',
    iconBg: 'bg-secondary-fixed',
    iconColor: 'text-on-secondary-fixed-variant',
  },
]

export function formatDateRange(startDate, endDate) {
  const opts = { month: 'short', day: 'numeric' }
  const start = new Date(startDate).toLocaleDateString('en-US', opts)
  const end = new Date(endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  return `${start} - ${end.split(' ')[1]}`
}

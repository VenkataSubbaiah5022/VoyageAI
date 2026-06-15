export const DEMO_TRIP = {
  id: 'demo-1',
  title: 'Amalfi Coast Escape',
  destination: 'Positano, Italy',
  shareId: 'demo',
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAYA9yHBHIgMtfm99FsAMD_wQxA0Xr822yaEetpPnmkx9uunKw7qjgknRbY918AOF6ZbG0YBkr_tSLMA4Tb04XDt6V0x3QotSVsyQrahL139uu_YCyrj8kkOBUb-d_nu92-YVougp6OvXoskSa6DQpaNZbbIvm6fsTQEabYdQU_WCtvUBIHO5gJOfZdIr2rMOj9diLcs4L0qCAtBiD36vAqLljpY78et-cPhpogTxuD41zev5KEiYLFSATdsM86zR9Cv0hjGDG-Nb1f',
  tag: 'AI Suggested',
  transportIcon: 'flight_takeoff',
  dateLabel: 'Oct 12 - 18',
  travelersLabel: '2 Travelers',
}

export function formatDateRange(startDate, endDate) {
  const opts = { month: 'short', day: 'numeric' }
  const start = new Date(startDate).toLocaleDateString('en-US', opts)
  const end = new Date(endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  return `${start} - ${end.split(' ')[1]}`
}

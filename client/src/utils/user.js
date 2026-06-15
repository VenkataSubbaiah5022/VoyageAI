export function getUserInitials(user) {
  if (!user) return '?'
  const first = user.firstName?.trim()?.[0] || ''
  const last = user.lastName?.trim()?.[0] || ''
  if (first || last) return `${first}${last}`.toUpperCase()
  return user.email?.[0]?.toUpperCase() || '?'
}

export function getAvatarColor(seed = '') {
  const colors = [
    'bg-primary',
    'bg-primary-container',
    'bg-secondary',
    'bg-tertiary-container',
    'bg-on-tertiary-container',
  ]
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

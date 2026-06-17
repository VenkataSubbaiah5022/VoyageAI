const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '/api'

const getToken = () => localStorage.getItem('voyageai_token')

async function request(path, options = {}) {
  const isFormData = options.body instanceof FormData
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers,
  }

  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export const authApi = {
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getMe: () => request('/auth/me'),

  forgotPassword: (payload) =>
    request('/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) }),

  resetPassword: (payload) =>
    request('/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) }),
}

export const dashboardApi = {
  getDashboard: () => request('/dashboard'),
  getItineraries: (status = 'upcoming') =>
    request(`/dashboard/itineraries?status=${status}`),
  getUploads: () => request('/dashboard/uploads'),
}

export const exploreApi = {
  getDestinations: ({ q = '', category = 'all' } = {}) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category && category !== 'all') params.set('category', category)
    const query = params.toString()
    return request(`/explore${query ? `?${query}` : ''}`)
  },
}

export const profileApi = {
  getProfile: () => request('/profile'),
  updateProfile: (payload) =>
    request('/profile', { method: 'PATCH', body: JSON.stringify(payload) }),
  updatePassword: (payload) =>
    request('/profile/password', { method: 'PUT', body: JSON.stringify(payload) }),
  deleteAccount: (payload) =>
    request('/profile', { method: 'DELETE', body: JSON.stringify(payload) }),
}

export const notificationsApi = {
  getNotifications: () => request('/notifications'),

  markRead: (payload) =>
    request('/notifications/read', { method: 'PATCH', body: JSON.stringify(payload) }),
}

export const shareApi = {
  getShared: (shareId) => request(`/share/${shareId}`),
}

export const uploadApi = {
  listUploads: () => request('/uploads'),

  deleteUpload: (id) => request(`/uploads/${id}`, { method: 'DELETE' }),

  deleteAllUploads: () => request('/uploads/all', { method: 'DELETE' }),

  openFile: async (id, { download = false } = {}) => {
    const token = getToken()
    const response = await fetch(
      `${API_BASE}/uploads/${id}/file${download ? '?download=1' : ''}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    )

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.message || 'Could not open file')
    }

    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    if (download) {
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = 'document'
      link.click()
      URL.revokeObjectURL(objectUrl)
      return
    }

    window.open(objectUrl, '_blank', 'noopener,noreferrer')
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000)
  },

  uploadFiles: (files) => {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    return request('/uploads', { method: 'POST', body: formData })
  },

  processUploads: (uploadIds) =>
    request('/uploads/process', {
      method: 'POST',
      body: JSON.stringify({ uploadIds }),
    }),
}

export const itineraryApi = {
  list: (status) =>
    request(status ? `/itineraries?status=${status}` : '/itineraries'),

  get: (id) => request(`/itineraries/${id}`),

  update: (id, payload) =>
    request(`/itineraries/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),

  delete: (id) => request(`/itineraries/${id}`, { method: 'DELETE' }),

  generate: (payload) =>
    request('/itineraries/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}

export { getToken }

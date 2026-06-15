const API_BASE = '/api'

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
}

export const dashboardApi = {
  getDashboard: () => request('/dashboard'),
}

export const shareApi = {
  getShared: (shareId) => request(`/share/${shareId}`),
}

export const uploadApi = {
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
  generate: (payload) =>
    request('/itineraries/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}

export { getToken }

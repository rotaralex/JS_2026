const BASE_URL = import.meta.env.VITE_API_URL || 'https://dummyjson.com'

export async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('accessToken')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Переконуємося, що path починається зі слешу
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  let response = await fetch(`${BASE_URL}${cleanPath}`, {
    ...options,
    headers,
  })

  // Interceptor для оновлення токена
  if (
    response.status === 401 &&
    !cleanPath.includes('/auth/login') &&
    !cleanPath.includes('/user/login')
  ) {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
        })

        if (refreshRes.ok) {
          const data = await refreshRes.json()
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)

          headers['Authorization'] = `Bearer ${data.accessToken}`
          response = await fetch(`${BASE_URL}${cleanPath}`, {
            ...options,
            headers,
          })
        }
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }
    }
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}))
    throw new Error(errData.message || `HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

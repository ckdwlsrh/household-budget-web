export const handleResponse = (response) => {
  if (response.status == 200 && response.status < 300) {
    return response.data
  }
  throw new Error(`API Error: ${response.statusText}`)
}

export const handleError = (error) => {
  console.error('API Error:', error)
  throw error
}

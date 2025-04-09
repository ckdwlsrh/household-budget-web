import { handleError, handleResponse } from '../apiUtil'
import apiClient from '../apiClient'

const BASE = '/category'

const getCategories = async () => {
  try {
    const response = await apiClient.get(BASE)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

const getCategoryById = async (id) => {
  try {
    const response = await apiClient.get(BASE + `/${id}`)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export { getCategories, getCategoryById }

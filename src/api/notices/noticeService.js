import { handleError, handleResponse } from '../apiUtil'
import apiClient from '../apiClient'

const BASE = '/notices'

export const getNotices = async (query = {}) => {
  try {
    const response = await apiClient.get(BASE, { params: query })
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export const getNoticesById = async (id) => {
  try {
    const response = await apiClient.get(BASE + `/${id}`)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export const createNotices = async (body) => {
  try {
    const response = await apiClient.post(BASE, body)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export const editNotices = async (id, body) => {
  try {
    const response = await apiClient.put(BASE + `/${id}`, body)
    handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export const removeNotices = async (id) => {
  try {
    const response = await apiClient.delete(BASE + `/${id}`)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

import apiClient from '../apiClient'
import { handleError, handleResponse } from '../apiUtil'

const BASE = '/user'

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(BASE + `/${id}`)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export const getUserByUsernameAndEmail = async (username, email) => {
  try {
    const response = await apiClient.get(BASE + `?username=${username}&email=${email}`)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export const getUsers = async () => {
  try {
    const response = await apiClient.get(BASE)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export const createUser = async (body) => {
  try {
    const response = await apiClient.post(BASE, body)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export const editUserById = async (id, body) => {
  try {
    const response = await apiClient.put(BASE + `/${id}`, body)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

export const removeUserById = async (id) => {
  try {
    const response = await apiClient.delete(BASE + `/${id}`)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

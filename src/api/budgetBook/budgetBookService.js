import apiClient from '../apiClient'
import { handleError, handleResponse } from '../apiUtil'

const BASE = '/budgetBook'

const getBudgetBook = async (query = {}) => {
  try {
    const response = await apiClient.get(BASE, { params: query })
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

const getBudgetBookById = async (id) => {
  try {
    const response = await apiClient.get(BASE + `/${id}`)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

const postBudgetBook = async (body) => {
  try {
    const response = await apiClient.post(BASE, body)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

const editBudgetBook = async (id, body) => {
  try {
    const response = await apiClient.put(BASE + `/${id}`, body)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

const removeBudgetBookById = async (id) => {
  try {
    const response = await apiClient.delete(BASE + `/${id}`)
    return handleResponse(response)
  } catch (error) {
    handleError(error)
  }
}

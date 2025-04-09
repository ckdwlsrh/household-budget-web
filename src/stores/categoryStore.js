import { getCategories } from '@/api/category/categoryService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const category = ref([])

  const getCategory = async () => {
    const data = await getCategories()
    category.value = data
    return data
  }

  return { category, getCategory }
})

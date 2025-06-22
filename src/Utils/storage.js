// Storage utilities
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}
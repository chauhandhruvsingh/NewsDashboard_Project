// 'use client'
// import { createContext, useContext, useState, useEffect } from 'react'

// const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Check if user is logged in from localStorage
//     const savedUser = localStorage.getItem('newsapp_user')
//     if (savedUser) {
//       setUser(JSON.parse(savedUser))
//     }
//     setLoading(false)
//   }, [])

//   const login = async (email, password) => {
//     try {
//       // Simple validation - in real app, this would be API call
//       if (email && password) {
//         const userData = {
//           id: Date.now(),
//           email,
//           name: email.split('@')[0],
//           role: 'admin' // Default role
//         }
        
//         localStorage.setItem('newsapp_user', JSON.stringify(userData))
//         setUser(userData)
//         return { success: true }
//       }
//       return { success: false, error: 'Invalid credentials' }
//     } catch (error) {
//       return { success: false, error: 'Login failed' }
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem('newsapp_user')
//     setUser(null)
//   }

//   const value = {
//     user,
//     login,
//     logout,
//     loading,
//     isAuthenticated: !!user
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }


// src/context/AuthContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('newsapp_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simple validation - in real app, this would be API call
      if (email && password) {
        const userData = {
          id: Date.now(),
          email,
          name: email.split('@')[0],
          role: 'admin' // Default role
        }
        
        localStorage.setItem('newsapp_user', JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      }
      return { success: false, error: 'Invalid credentials' }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('newsapp_user')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
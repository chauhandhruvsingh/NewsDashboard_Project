'use client'
import { useAuth } from '@/Context/AuthContext'
import { Sun, Moon, LogOut } from 'lucide-react'

export default function Header({ darkMode, toggleDarkMode }) {
  const { user, logout } = useAuth()

  return (
    <header className="bg-gray-800 shadow-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-white">
            News Dashboard
          </h1>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            <span className="text-sm text-gray-400">
              Welcome, {user?.name}
            </span>
            
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-800"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
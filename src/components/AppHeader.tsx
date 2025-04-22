import { Search, Bell, Settings } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import { Link } from 'react-router-dom'
import { profileImageState } from '../store/atoms'

interface HeaderProps {
  title: string
  onProfileClick: () => void
}

export function AppHeader({ title, onProfileClick }: HeaderProps) {
  const profileImage = useRecoilValue(profileImageState)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm backdrop-saturate-150 bg-white/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search for something"
              className="pl-9 pr-4 py-2 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search"
            />
          </div>
          <Link to="/settings" className="p-2 hover:bg-gray-100 rounded-full" aria-label="Settings">
            <Settings className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </Link>
          <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="View notifications">
            <Bell className="h-5 w-5 text-gray-600" aria-hidden="true" />
          </button>
          <button
            onClick={onProfileClick}
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <img
              src={profileImage}
              alt="Profile picture"
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  )
}

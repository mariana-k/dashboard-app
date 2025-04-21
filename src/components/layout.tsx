import { ReactNode } from 'react';


type LayoutProps = {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 border-r border-gray-200">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-2xl font-bold">Soar Task</h1>
          </div>

        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex justify-center items-center font-sans">
      <div className="w-full max-w-xl px-4 py-8">
        {children}
      </div>
    </div>
  )
}

export default function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-xl p-6 mx-auto w-full max-w-md">
      {children}
    </div>
  )
}

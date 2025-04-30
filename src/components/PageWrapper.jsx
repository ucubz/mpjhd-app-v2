export default function PageWrapper({ children, className = '', innerClassName = '' }) {
  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex justify-center items-center font-sans ${className}`}
    >
      <div className={`w-full max-w-xl px-4 py-8 ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}

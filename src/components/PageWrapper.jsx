import clsx from 'clsx';

export default function PageWrapper({ children, className = '', innerClassName = '' }) {
  return (
    <div
      className={clsx(
        'min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex justify-center items-center font-sans',
        className
      )}
    >
      <div
        className={clsx(
          'w-full max-w-xl px-4 py-8',
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

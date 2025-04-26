import { useLocation, useNavigate } from 'react-router-dom'

const Stepper = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getCurrentStep = () => {
    const match = location.pathname.match(/\/step\/(\d+)/)
    return match ? parseInt(match[1], 10) : 0
  }

  const currentStep = getCurrentStep()
  const totalSteps = 9

  const handleStepClick = (stepNumber) => {
    navigate(`/step/${stepNumber}`)
  }

  return (
    <div className="flex flex-col items-center mt-8 gap-2">
      {/* Container stepper bulat */}
      <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isActive = currentStep >= stepNumber

          return (
            <div
              key={stepNumber}
              role="button"            // ✅ properti biasa
              tabIndex={0}              // ✅ properti biasa
              onClick={() => handleStepClick(stepNumber)}
              className={`cursor-pointer rounded-full 
                ${isActive ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}
                w-4 h-4 md:w-5 md:h-5
                transition-transform duration-300 ease-in-out
                hover:scale-125
                focus:outline-none
              `}
              aria-label={`Pindah ke Step ${stepNumber}`}
            />
          )
        })}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Step {currentStep} dari {totalSteps}
      </p>
    </div>
  )
}

export default Stepper

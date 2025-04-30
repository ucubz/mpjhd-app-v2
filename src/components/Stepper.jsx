// src/components/Stepper.jsx
import { useLocation, useNavigate } from 'react-router-dom';

export default function Stepper({ totalSteps = 7 }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentStep = () => {
    const match = location.pathname.match(/\/step\/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const currentStep = getCurrentStep();

  const handleClick = (step) => {
    if (step < currentStep) {
      navigate(`/step/${step}`);
    }
  };

  return (
    <div className="flex justify-center mt-6 gap-3 flex-wrap">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step <= currentStep;
        const isClickable = step < currentStep;

        return (
          <div
            key={step}
            onClick={() => isClickable && handleClick(step)}
            className={`
              w-4 h-4 md:w-5 md:h-5 rounded-full transition-all
              ${isActive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
              ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
            `}
            title={`Langkah ${step}`}
          />
        );
      })}
    </div>
  );
}

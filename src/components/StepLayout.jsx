import PageWrapper from './PageWrapper';
import Card from './Card';
import BackButton from './BackButton';
import ResetButton from './ResetButton';
import Button from './Button';
import Stepper from './Stepper';

/**
 * Kerangka seragam semua halaman: tombol Kembali/Mulai Ulang, judul, isi,
 * tombol Lanjut (pilih dulu, lalu Lanjut), dan penanda langkah.
 */
export default function StepLayout({
  step,
  title,
  subtitle,
  children,
  onNext,
  nextDisabled = false,
  nextLabel = 'Lanjut',
  hideNext = false,
  hideBack = false,
  outside = null,
}) {
  return (
    <PageWrapper>
      {outside}
      <Card>
        <div className="mb-6 flex items-center justify-between">
          {hideBack ? <span /> : <BackButton />}
          <ResetButton />
        </div>

        <h2 className="text-center text-xl font-bold">{title}</h2>
        {subtitle && (
          <p className="mt-1 mb-6 text-center text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-6" />}

        {children}

        {!hideNext && (
          <div className="mt-6">
            <Button onClick={onNext} disabled={nextDisabled}>
              {nextLabel}
            </Button>
          </div>
        )}

        <Stepper step={step} />
      </Card>
    </PageWrapper>
  );
}

import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { Button } from '@/shared/components/ui/button'
import { ThemeToggle } from '@/shared/components/ui/ThemeToggle'
import { Modal } from '@/shared/components/ui/Modal'
import { MainLayout } from './layout/MainLayout'

// ─── Dev Showcase (remove when building real features) ─────────────────────── للتست مش اكتر حاجات جلوبال الل هنستخدمها فى كل حتة يا امبيسا 

function DevShowcase() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      {/* ── Top bar ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 dark:border-surface-highlight bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md px-6 py-3">
        <span className="text-sm font-bold tracking-tight text-primary-600 dark:text-primary-400">
          insightO
        </span>
        <ThemeToggle />
      </header>

      {/* ── Content ────────────────────────────────────────────── */}
      <main className="mx-auto max-w-3xl space-y-12 px-6 py-16">
        <section>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary-500">
            Design System
          </p>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Core UI Components
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Button variants · Theme Toggle · Global Modal · Toast Engine
          </p>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Button Variants
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary"  onClick={() => toast.success('Primary action!')}>Primary</Button>
            <Button variant="gradient" onClick={() => toast.success('✨ AI report generated!')}>Generate AI</Button>
            <Button variant="outline"  onClick={() => toast.info('Outline clicked')}>Outline</Button>
            <Button variant="ghost"    onClick={() => toast.info('Ghost clicked')}>Ghost</Button>
            <Button variant="danger"   onClick={() => toast.error('Danger! Irreversible.')}>Danger</Button>
          </div>

          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 pt-2">
            Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Modal */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Global Modal
          </h2>
          <Button variant="outline" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm AI Analysis"
            footer={
              <>
                <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={() => {
                    setModalOpen(false)
                    toast.success('Analysis started!')
                  }}
                >
                  Confirm &amp; Generate
                </Button>
              </>
            }
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              This will run a full AI analysis across <strong>3,842 feedback entries</strong>.
              Depending on volume, this may take a few minutes and consume API credits.
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to continue?
            </p>
          </Modal>
        </section>

        {/* Toasts */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Toast Engine (Sonner)
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={() => toast.success('Saved successfully')}>Success</Button>
            <Button variant="outline" size="sm" onClick={() => toast.error('Something went wrong')}>Error</Button>
            <Button variant="outline" size="sm" onClick={() => toast.warning('Quota at 80%')}>Warning</Button>
            <Button variant="outline" size="sm" onClick={() => toast.info('3 new responses')}>Info</Button>
            <Button variant="outline" size="sm" onClick={() => toast.loading('Generating report…')}>Loading</Button>
          </div>
        </section>
      </main>
    </div>
  )
}

// ─── App ─────────────

function App() {
  return (
    <>
      {/* <DevShowcase /> */}

      {/* ── Sonner Toaster ─────────────────────────────────────── */}
      {/* <Toaster
        position="top-right"
        richColors
        theme="dark"
        toastOptions={{
          style: {
            fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
          },
        }}
      /> */}
      <MainLayout />
    </>
  )
}

export default App

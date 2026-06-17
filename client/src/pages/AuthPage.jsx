import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthVisual from '../components/auth/AuthVisual'
import SignInForm from '../components/auth/SignInForm'
import SignUpForm from '../components/auth/SignUpForm'
import TrustSeal from '../components/auth/TrustSeal'

const toggleActive =
  'bg-surface-container-lowest text-primary shadow-sm ring-1 ring-black/5'
const toggleInactive = 'text-on-surface-variant hover:text-primary'

export default function AuthPage({ initialTab = 'signin' }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const visualRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    document.documentElement.classList.add('auth-route')
    document.body.classList.add('auth-route')

    return () => {
      document.documentElement.classList.remove('auth-route')
      document.body.classList.remove('auth-route')
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!visualRef.current || window.innerWidth < 1024) return
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      visualRef.current.style.backgroundPosition = `${x * 10}% ${y * 10}%`
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const showSignIn = () => {
    setActiveTab('signin')
    navigate('/auth', { replace: true })
  }

  const showSignUp = () => {
    setActiveTab('signup')
    navigate('/auth/signup', { replace: true })
  }

  return (
    <main className="flex h-svh max-h-svh w-full overflow-hidden bg-surface text-on-surface">
      <AuthVisual sectionRef={visualRef} />

      <section className="flex h-full w-full items-center justify-center overflow-hidden bg-surface-container-lowest px-[var(--spacing-margin-mobile)] py-5 md:px-[var(--spacing-margin-desktop)] md:py-6 lg:w-1/2">
        <div className="flex w-full max-w-md flex-col justify-center">
          <div className="mb-5 flex items-center gap-2 lg:hidden">
            <span
              className="material-symbols-outlined filled text-3xl text-secondary"
              aria-hidden="true"
            >
              explore
            </span>
            <h1 className="font-headline-md text-title-lg font-bold tracking-tight text-primary">
              VoyageAI
            </h1>
          </div>

          <div className="mb-6 flex rounded-xl bg-surface-container-low p-1">
            <button
              type="button"
              onClick={showSignIn}
              className={`flex-1 rounded-lg py-2 font-label-md text-label-md transition-all ${
                activeTab === 'signin' ? toggleActive : toggleInactive
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={showSignUp}
              className={`flex-1 rounded-lg py-2 font-label-md text-label-md transition-all ${
                activeTab === 'signup' ? toggleActive : toggleInactive
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="relative shrink-0">
            <SignInForm visible={activeTab === 'signin'} />
            <SignUpForm visible={activeTab === 'signup'} />
            <TrustSeal />
          </div>
        </div>
      </section>
    </main>
  )
}

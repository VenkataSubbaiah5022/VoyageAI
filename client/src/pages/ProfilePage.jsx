import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { profileApi } from '../services/api'
import AppNavbar from '../components/layout/AppNavbar'
import SettingsSidebar from '../components/profile/SettingsSidebar'
import ProfileSection from '../components/profile/ProfileSection'
import SecuritySection from '../components/profile/SecuritySection'
import NotificationSettingsSection from '../components/profile/NotificationSettingsSection'
import DocumentsSection from '../components/profile/DocumentsSection'
import AccountsSection from '../components/profile/AccountsSection'
import SettingsFooter from '../components/profile/SettingsFooter'

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'profile'
  const setActiveTab = (tab) => setSearchParams({ tab })
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    profileApi
      .getProfile()
      .then(({ data }) => {
        setProfile(data.user)
        updateUser(data.user)
      })
      .catch(() => {
        if (user) setProfile(user)
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSaveProfile = async (payload) => {
    setSaving(true)
    try {
      const { data } = await profileApi.updateProfile(payload)
      setProfile(data.user)
      updateUser(data.user)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  const handleDeleteLogout = () => {
    logout()
    navigate('/')
  }

  if (loading || !profile) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <p className="font-label-md text-on-surface-variant">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-body-md text-body-md">
      <AppNavbar />
      <main className="mx-auto w-full max-w-[var(--spacing-container-max)] flex-grow px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
        <div className="grid grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-12">
          <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <section className="settings-card rounded-2xl bg-surface-container-lowest p-8 md:col-span-9">
            {activeTab === 'profile' && (
              <ProfileSection profile={profile} onSave={handleSaveProfile} saving={saving} />
            )}
            {activeTab === 'security' && (
              <SecuritySection
                profile={profile}
                onLogout={handleLogout}
                onAccountDeleted={handleDeleteLogout}
              />
            )}
            {activeTab === 'notifications' && (
              <NotificationSettingsSection
                settings={profile.notificationSettings}
                onSave={handleSaveProfile}
                saving={saving}
              />
            )}
            {activeTab === 'documents' && <DocumentsSection />}
            {activeTab === 'accounts' && <AccountsSection />}
          </section>
        </div>
      </main>
      <SettingsFooter />
    </div>
  )
}

import { useNavigate } from 'react-router-dom'

export default function NotificationCard({ notification, onMarkRead, onAction }) {
  const isRead = notification.status === 'read'

  return (
    <div
      className={`notification-card flex w-full items-start gap-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-6 text-left transition-all ${
        isRead ? 'opacity-80 grayscale-[0.5] hover:opacity-100 hover:grayscale-0' : 'group'
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${notification.iconBg} ${notification.iconColor}`}
      >
        <span className="material-symbols-outlined filled" aria-hidden="true">
          {notification.icon}
        </span>
      </div>

      <div className="grow">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="font-title-lg text-title-lg text-on-surface">{notification.title}</h3>
          <span
            className={`rounded-full px-2.5 py-0.5 font-label-sm text-label-sm ${
              isRead
                ? 'bg-outline-variant text-on-surface-variant'
                : 'bg-secondary text-on-secondary'
            }`}
          >
            {isRead ? 'Read' : 'New'}
          </span>
        </div>
        <p className="mb-3 font-body-md text-body-md text-on-surface-variant">{notification.message}</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 font-label-sm text-label-sm text-outline">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              schedule
            </span>
            {notification.time}
          </span>
          <button
            type="button"
            onClick={() => onAction(notification)}
            className="font-label-sm text-label-sm font-semibold text-primary hover:underline"
          >
            {notification.action}
          </button>
        </div>
      </div>

      {!isRead && (
        <button
          type="button"
          onClick={() => onMarkRead(notification.id)}
          className="sr-only"
          aria-label="Mark as read"
        />
      )}
    </div>
  )
}

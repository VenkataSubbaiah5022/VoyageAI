const DECORATIVE_IMAGES = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDOcGWDjD2FscZ6HHyLjTgsDIJKACLu_t8ii3NrD9QFZ4N3SQkjVc3tRo4oWunR4tnsJn5W-OvOAnkxM8kGPuEOAgSlP_6M7eOmugTlSoG8PWaxR6jjZ0-9ructB2msTrv3ZuJMD8USnNfIOpVm56uYdRJPClcBGMfA4ULe7LK8uRqolDO7jreCLlurebN-JEIDXuwYV-xABEiTWaxLcNU_5LsQgOLDXU5rjMotmiAsV0UeA9-41zr8EdNn3FpVe6WUedwRAfs3i4u',
    alt: 'Alpine lake at sunrise',
    className: '',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN95z8HMRm4Uz3_T82GaeOC1JDU8nJC4pDcRk-CKrb1z5bGBIADvbXyaq6pK8a8CbRHF2oE3sbpznA2jQ0XSEy3tDSkVERK7fiyqRUq_XjDQ-0rKFRS86x9Z1r606p5bdE68J9Q7YYjnCgLioZucpURNNIxAv0mSWNmB7qcaxFzli2euIp2531WdirYNUduwVpCJbjUrEC4J9BasgYgG7WWzzFjeQsc7xfFwTjqc5-D3q33hzJU4wcJ8yfytulBYG2Ir0s9XJDK8V-',
    alt: 'Tropical beach',
    className: 'translate-y-4',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNApjOi-IZ5olrjn2yf9VTV5a8qkVKqUd6mdEcXBS1swyZQezOg-TXUS0uOWNWqHCeAPjAANrc3gE5EgJgDAMSj4JupiaiqDp1KikKN10lRlbRA73fC-hKfO0bRmaiRbq6aV3x8UaJHQ8-t5sNHz1xaV0DEzUeoPXnoCZ1DvwbKO3YP7jRu0eDLZribQNkVc7XC9tAFXWgyCrXkrvUPYRYepvtaZ_6x8Q9-b8W_GugYMKcVo50OTXL9j66jhnZTmZLX9n7VLazoi1Z',
    alt: 'Modern city architecture',
    className: 'hidden md:block',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBawl8QF4brUw3aMkuB35GQP7tPAvlz3PpK7SrEMpNMf6zyhNtLrH3nEiTCvltGFBw_HjAEW3hbbNG9FDAK-g6bZuxplIqGVwvI7qGHQAePkiXshyO7OoDyRQjvy0lIwM3Fbw5mMJJ9SsCML0z2COAGhN-z4QdSVgp0vpioasSobIUCc71qQXS-E2PK8j12E8yVMlYMRxXJ1ZKGFLF_BO_VLs91cZKFANypEZhWXgVf1UtnuX_q1jm-pLR031ilgf-7Mb3sLMXkNRHH',
    alt: 'Traveler on cliff',
    className: 'hidden translate-y-4 md:block',
  },
]

export default function NotFoundFooter() {
  return (
    <footer className="border-t border-outline-variant bg-primary px-[var(--spacing-margin-mobile)] py-12 md:px-[var(--spacing-margin-desktop)]">
      <div className="mx-auto grid max-w-[var(--spacing-container-max)] grid-cols-1 gap-[var(--spacing-gutter)] text-on-primary md:grid-cols-4">
        <div className="space-y-4">
          <div className="font-headline-md text-headline-md font-extrabold text-on-primary">VoyageAI</div>
          <p className="font-body-md text-body-md text-on-primary/80">
            © {new Date().getFullYear()} VoyageAI. Travel with precision.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-md text-label-md font-bold text-on-primary">Company</h4>
          <div className="flex flex-col space-y-2">
            {['About Us', 'Contact', 'API'].map((item) => (
              <a
                key={item}
                href="#"
                className={`font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary ${
                  item === 'About Us' ? 'underline decoration-secondary-container underline-offset-4' : ''
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-md text-label-md font-bold text-on-primary">Support</h4>
          <div className="flex flex-col space-y-2">
            {['Help Center', 'Privacy Policy', 'Terms of Service'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-label-md text-label-md font-bold text-on-primary">Stay Connected</h4>
          <div className="flex gap-4">
            {['public', 'mail'].map((icon) => (
              <a key={icon} href="#" className="opacity-80 transition-opacity hover:opacity-100">
                <span className="material-symbols-outlined" aria-hidden="true">
                  {icon}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export function NotFoundDecorations() {
  return (
    <div className="mt-20 w-full max-w-[var(--spacing-container-max)]">
      <div className="grid grid-cols-2 gap-4 opacity-40 md:grid-cols-4">
        {DECORATIVE_IMAGES.map((img) => (
          <div
            key={img.src}
            className={`h-40 overflow-hidden rounded-2xl grayscale transition-all duration-700 hover:grayscale-0 ${img.className}`}
          >
            <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

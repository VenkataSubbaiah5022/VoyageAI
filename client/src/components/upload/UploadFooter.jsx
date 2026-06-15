export default function UploadFooter() {
  return (
    <footer className="border-t border-outline-variant bg-primary px-[var(--spacing-margin-mobile)] py-12 text-on-primary md:px-[var(--spacing-margin-desktop)]">
      <div className="mx-auto grid max-w-[var(--spacing-container-max)] grid-cols-1 gap-[var(--spacing-gutter)] md:grid-cols-4">
        <div className="col-span-1">
          <div className="mb-4 font-headline-md text-headline-md font-extrabold text-on-primary">
            VoyageAI
          </div>
          <p className="font-label-sm text-label-sm text-on-primary/80">
            © {new Date().getFullYear()} VoyageAI. Travel with precision.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-label-md text-label-md font-bold">Product</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 underline decoration-secondary-container underline-offset-4 transition-colors hover:text-on-primary"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                API
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-label-md text-label-md font-bold">Support</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-label-sm text-label-sm text-on-primary/80 transition-colors hover:text-on-primary"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="rounded-lg bg-primary-container p-4">
            <p className="font-label-md text-label-md font-semibold text-on-primary-container">
              AI Status: Optimal
            </p>
            <p className="mt-1 font-label-sm text-label-sm text-on-primary/60">
              Processing documents with Llama-3 Vision
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

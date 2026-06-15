export default function TrustSeal() {
  return (
    <div className="mt-6 flex items-center justify-center gap-2 opacity-40 grayscale transition-all duration-500 hover:grayscale-0">
      <span className="material-symbols-outlined text-lg" aria-hidden="true">
        shield_lock
      </span>
      <span className="font-label-sm text-[10px] uppercase tracking-widest">
        Secured by 256-bit SSL Encryption
      </span>
    </div>
  )
}

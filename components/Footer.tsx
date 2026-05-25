import Link from 'next/link';
import { navigationData } from '@/data/navigation';

export function Footer() {
  return (
    <footer className="relative border-t border-vantor-blue/10">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vantor-blue/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="gradient-text font-display font-bold text-xl tracking-wider">
                VANTOR
              </span>
              <span className="text-vantor-silver ml-1 font-light text-xl">
                VENTURES
              </span>
            </Link>
            <p className="text-vantor-muted text-sm leading-relaxed max-w-xs">
              The Home for Sports & Entertainment&apos;s Largest and Most
              Engaged Communities.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {navigationData.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-vantor-blue/20 flex items-center justify-center text-vantor-muted hover:text-vantor-blue hover:border-vantor-blue/40 transition-all duration-300"
                  aria-label={social.platform}
                >
                  <span className="text-xs font-bold">
                    {social.platform.charAt(0)}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navigationData.footerNav.columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-vantor-white font-semibold text-sm tracking-wider uppercase mb-5">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-vantor-muted text-sm hover:text-vantor-blue transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-vantor-muted text-xs">
            © {new Date().getFullYear()} Vantor Ventures. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-vantor-muted text-xs hover:text-vantor-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-vantor-muted text-xs hover:text-vantor-blue transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

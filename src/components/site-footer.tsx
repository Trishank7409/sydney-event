import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Sydney Events. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer page-wrap">
      <div className="footer-top">
        <span className="mono">OPEN SOURCE / MIT / VOL. 001</span>
        <Link href="/docs/installation">
          START BUILDING <ArrowUpRight size={15} />
        </Link>
      </div>
      <p className="footer-word display">
        GOOD
        <br />
        INTERFACES
        <br />
        <span>MOVE.</span>
      </p>
      <div className="footer-bottom">
        <Link className="footer-brand" href="/">
          MOTIONLAB®
        </Link>
        <div className="footer-links">
          <Link href="/components">Components</Link>
          <Link href="/playground">Playground</Link>
          <Link href="/docs">Manual</Link>
          <Link href="/showcase">Showcase</Link>
        </div>
        <span>© {new Date().getFullYear()} MOTIONLAB — CODE UNDER MIT</span>
      </div>
    </footer>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "./language-provider";

export function SiteFooter() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleNavigate = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner page-wrap">
        <div className="footer-top">
          <span className="mono">{t.footer.license}</span>
          <a href="#installation" onClick={handleNavigate("/docs/installation")}>
            {t.footer.startBuilding} <ArrowUpRight size={15} />
          </a>
        </div>
        <p className="footer-word display">
          {t.footer.wordGood}
          <br />
          {t.footer.wordInterfaces}
          <br />
          <span>{t.footer.wordMove}</span>
        </p>
        <div className="footer-bottom">
          <a className="footer-brand" href="#" onClick={handleNavigate("/")}>
            MOTIONLAB®
          </a>
          <div className="footer-links">
            <a href="#components" onClick={handleNavigate("/components")}>{t.nav.components}</a>
            <a href="#playground" onClick={handleNavigate("/playground")}>{t.nav.playground}</a>
            <a href="#docs" onClick={handleNavigate("/docs")}>{t.nav.docs}</a>
            <a href="#showcase" onClick={handleNavigate("/showcase")}>{t.nav.showcase}</a>
          </div>
          <span>© {new Date().getFullYear()} {t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}

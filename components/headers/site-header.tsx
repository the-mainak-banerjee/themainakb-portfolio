import PrimaryLogo from "../primary-logo";
import SiteNavDesktop from "./site-nav-desktop";
import SiteNavMobile from "./site-nav-mobile";
import ThemeSwitcher from "./theme-switcher";

function SiteHeader() {
  return (
    <>
      <header className="bg-background supports-backdrop-filter:bg-background/60 z-50 backdrop-blur sticky top-0">
        <div className="container flex items-center justify-between py-2">
          <PrimaryLogo />
          <div className="divide-border flex items-center gap-4 divide-x-2">
            <SiteNavDesktop />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <SiteNavMobile />
    </>
  );
}

export default SiteHeader;

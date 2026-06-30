import PrimaryLogo from "../primary-logo";
import SiteNavDesktop from "./site-nav-desktop";
import SiteNavMobile from "./site-nav-mobile";
import ThemeSwitcher from "./theme-switcher";

function SiteHeader() {
  return (
    <header className="container my-4 flex items-center justify-between">
      <PrimaryLogo />
      <div className="divide-x-2 divide-muted-foreground/50 flex items-center gap-4">
        <SiteNavDesktop />
        <ThemeSwitcher />
      </div>
      <SiteNavMobile />
    </header>
  );
}

export default SiteHeader;

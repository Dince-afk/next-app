import { type HTMLProps } from "react";
import { cn } from "@/lib/utils";

import Logo from "@/components/ui/logo";
import NavigationLinks from "@/features/navigation/navigation-links";
import MobileNavigation from "@/features/navigation/mobile-navigation";
import { Separator } from "@/components/ui/separator";
import LanguageSelector from "@/features/i18n/language-selector";
import { ThemeSwitcher } from "@/features/theme/theme-switcher";
import LocalizedLink from "@/features/i18n/localized-link";

export default function Header(props: HTMLProps<HTMLElement>) {
  return (
    <header
      {...props}
      className={cn(
        "bg-background sticky top-0 z-10 border-b px-6 py-4",
        true && "show-on-scroll",
        props.className,
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-10">
        <LocalizedLink href="/">
          <Logo className="h-8" />
        </LocalizedLink>

        {/* Mobile */}
        <MobileNavigation className="md:hidden">
          <NavigationLinks variant="mobile" />
          <Separator />
          <div className="hover:text-foreground text-muted-foreground flex items-center justify-between py-3 pl-3">
            <span>Theme</span>
            <ThemeSwitcher />
          </div>
          <div className="hover:text-foreground text-muted-foreground flex items-center justify-between py-3 pl-3">
            <span>Language</span>
            <LanguageSelector />
          </div>
        </MobileNavigation>

        {/* Desktop */}
        <div className="hidden grow items-center justify-between md:flex">
          <NavigationLinks variant="desktop" />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}

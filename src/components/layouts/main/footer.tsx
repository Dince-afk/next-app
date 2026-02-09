import { cn } from "@/lib/utils";
import LocalizedLink from "@/features/i18n/localized-link";
import type { HTMLProps } from "react";
import { ThemeSwitcher } from "@/features/theme/theme-switcher";

export default function Footer(props: HTMLProps<HTMLElement>) {
  return (
    <footer {...props} className={cn("border-t", props.className)}>
      <div className="container mx-auto flex items-end justify-between px-4 py-8">
        <div className="text-muted-foreground flex flex-col gap-16 text-sm">
          <ul className="flex gap-8">
            <li>
              <LocalizedLink href="/impressum" className="hover:text-primary">
                Impressum
              </LocalizedLink>
            </li>
            <li>
              <LocalizedLink href="/privacy" className="hover:text-primary">
                Datenschutzerklärung
              </LocalizedLink>
            </li>
          </ul>
          <p>&copy; {new Date().getFullYear()} Dev</p>
        </div>
        <ThemeSwitcher className="" />
      </div>
    </footer>
  );
}

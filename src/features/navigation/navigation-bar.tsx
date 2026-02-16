"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLProps, useState } from "react";
import { ThemeSwitcher } from "@/features/theme/theme-switcher";
import LanguageSelector from "@/features/i18n/language-selector";
import { Separator } from "@/components/ui/separator";
import { navigationLinks } from "./config";

export default function NavigationBar(props: HTMLProps<HTMLElement>) {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  return (
    <nav
      {...props}
      className={cn("flex justify-between md:grow", props.className)}
      aria-label="Main navigation"
    >
      {/* Hamburger */}
      <button
        className="hover:border-input hover:bg-input/40 relative z-30 size-[32px] cursor-pointer space-y-1.25 rounded-full border md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={cn(
            "bg-foreground mx-auto h-[1.5px] w-[14px] transition-transform duration-200 ease-in-out",
            isOpen && "translate-y-[3.2px] rotate-45",
          )}
        />
        <div
          className={cn(
            "bg-foreground mx-auto h-[1.5px] w-[14px] transition-transform duration-200 ease-in-out",
            isOpen && "-translate-y-[3.2px] -rotate-45",
          )}
        />
      </button>

      {/* Mobile navigation menu is opened */}
      {isOpen && (
        <div className="bg-background absolute top-0 left-0 flex min-h-screen w-full flex-col gap-2 px-6 pt-20">
          <Separator />
          {navigationLinks.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "hover:text-foreground hover:bg-accent text-muted-foreground rounded-md px-3 py-3",
                  pathname === link.href && "text-foreground",
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <Separator />
          <div className="hover:text-foreground text-muted-foreground flex items-center justify-between py-3 pl-3">
            <span>Theme</span>
            <ThemeSwitcher />
          </div>
          <div className="hover:text-foreground text-muted-foreground flex items-center justify-between py-3 pl-3">
            <span>Language</span>
            <LanguageSelector
              languageData={[
                {
                  countryIsoCode: "DE",
                  languageIsoCode: "de",
                  languageNativeName: "Deutsch",
                },
                {
                  countryIsoCode: "BA",
                  languageIsoCode: "ba",
                  languageNativeName: "Bosanski",
                },
              ]}
            />
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden justify-between md:flex">
        <div className="flex gap-5">
          {navigationLinks.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "hover:text-foreground text-muted-foreground text-sm",
                  pathname === link.href && "text-foreground",
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <LanguageSelector
          languageData={[
            {
              countryIsoCode: "DE",
              languageIsoCode: "de",
              languageNativeName: "Deutsch",
            },
            {
              countryIsoCode: "BA",
              languageIsoCode: "ba",
              languageNativeName: "Bosanski",
            },
          ]}
        />
      </div>
    </nav>
  );
}

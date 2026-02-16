"use client";

import { cn } from "@/lib/utils";
import { HTMLProps, useState } from "react";

type MobileNavigationProps = HTMLProps<HTMLElement>;

export default function MobileNavigation(props: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("", props.className)}>
      {/* Hamburger */}
      <button
        className="hover:border-input hover:bg-input/40 relative z-30 size-[32px] cursor-pointer space-y-1.25 rounded-full border"
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
          {props.children}
        </div>
      )}
    </div>
  );
}

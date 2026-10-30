"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/empresas", label: "Empresas" },
  { href: "/hogares", label: "Hogares" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo-icon.png"
            alt="INGECAR LTDA. — Ingeniería del Caribe"
            width={40}
            height={40}
            className="size-9"
            priority
          />
          <span className="font-heading text-lg font-bold text-foreground">INGECAR</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative pb-1 text-sm font-medium transition-colors hover:text-primary",
                  active ? "text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute inset-x-0 -bottom-[21px] h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="cta" size="lg" className="rounded-lg px-5 h-10 text-[15px]">
            <Link href="/cotizar">Solicitar cotización</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menú"
            aria-expanded={open}
            className="size-10 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <SheetContent side="right" className="flex w-4/5 flex-col gap-0 p-0">
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo-icon.png"
                  alt="INGECAR LTDA. — Ingeniería del Caribe"
                  width={36}
                  height={36}
                  className="size-8"
                />
                <span className="font-heading text-base font-bold text-foreground">INGECAR</span>
              </div>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-4">
              {navLinks.map((link, i) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.035, duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors",
                          active ? "bg-secondary text-primary" : "text-foreground/85 hover:bg-muted"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  </motion.div>
                );
              })}
            </nav>
            <div className="mt-auto p-4">
              <SheetClose asChild>
                <Button asChild variant="cta" size="lg" className="w-full rounded-lg h-11">
                  <Link href="/cotizar">Solicitar cotización</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

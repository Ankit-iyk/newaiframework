"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Shield, FileText, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: null },
  { name: "FairScore", href: "/fairscore", icon: CreditCard, description: "AI-powered credit scoring" },
  { name: "LoanGuard", href: "/loanguard", icon: Shield, description: "Loan protection & analysis" },
  { name: "Scheme", href: "/scheme", icon: FileText, description: "Fairness analysis for schemes" },
  { name: "Finance360", href: "/finance360", icon: MessageSquare, description: "SMS financial intelligence" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI FairStake
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                  >
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}


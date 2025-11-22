import Link from "next/link";
import { CreditCard, Shield, FileText, MessageSquare, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";

const modules = [
  {
    name: "FairScore",
    href: "/fairscore",
    icon: CreditCard,
    description: "AI-powered credit scoring with SHAP explanations and improvement tips",
    color: "from-blue-500 to-cyan-500",
    features: ["Credit Score Analysis", "SHAP Explanations", "Score Insights", "Improvement Tips"],
  },
  {
    name: "LoanGuard",
    href: "/loanguard",
    icon: Shield,
    description: "Comprehensive loan protection and analysis to detect traps and fraud",
    color: "from-green-500 to-emerald-500",
    features: ["Loan Trap Detection", "EMI Stress Analysis", "APR Calculator", "Fraud Detection"],
  },
  {
    name: "Scheme",
    href: "/scheme",
    icon: FileText,
    description: "Fairness analysis for government schemes with bias detection",
    color: "from-purple-500 to-pink-500",
    features: ["Bias Detection", "Clause Rewrite", "Fairness Scoring", "Insights"],
  },
  {
    name: "Finance360",
    href: "/finance360",
    icon: MessageSquare,
    description: "SMS-based financial behavior intelligence and spending analysis",
    color: "from-orange-500 to-red-500",
    features: ["Volatility Analysis", "Impulsive Spending", "Category Breakdown", "Savings Nudges"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AI FairStake
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Unified Financial Intelligence Platform
          </p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            Comprehensive suite of AI-powered tools for credit scoring, loan protection, 
            scheme fairness analysis, and financial behavior intelligence.
          </p>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card key={module.name} className="hover:shadow-elevated transition-smooth group">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${module.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl">{module.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={module.href}>
                    <Button className="w-full group-hover:bg-primary/90">
                      Explore {module.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why AI FairStake?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Empowering individuals with transparent, fair, and intelligent financial tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advanced machine learning models provide accurate insights and predictions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Transparent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                SHAP explanations and detailed analysis help you understand every decision
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fair & Ethical</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Bias detection and fairness scoring ensure equitable financial services
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 AI FairStake. All rights reserved.
            </div>
            <div className="text-sm text-muted-foreground">
              Unified Financial Intelligence Platform v1.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

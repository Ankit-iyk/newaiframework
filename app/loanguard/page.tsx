"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertOctagon, Shield, TrendingUp, Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

export default function LoanGuardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanned, setScanned] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleScan = () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setScanned(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const fraudPhrases = [
    {
      phrase: "Pre-approved. No credit check required.",
      risk: "high",
      explanation: "Legitimate lenders always perform credit checks. This phrase is a red flag for predatory lending.",
    },
    {
      phrase: "Guaranteed approval regardless of credit score",
      risk: "high",
      explanation: "No legitimate lender can guarantee approval without assessing creditworthiness first.",
    },
    {
      phrase: "Act now! Limited time offer expires today",
      risk: "medium",
      explanation: "High-pressure tactics are commonly used in loan scams to prevent careful consideration.",
    },
  ];

  const loanTrapScore = 68; // Example score
  const emiStressLevel = 45; // Example percentage

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Protect Yourself from Loan Traps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered analysis to detect hidden charges, fraud indicators, and predatory lending practices
          </p>
        </div>

        {/* Document Upload */}
        <div id="document-upload" className="mb-8">
          <Card className="shadow-card hover:shadow-elevated transition-smooth">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Upload className="w-6 h-6 text-primary" />
                Loan Document Upload
              </CardTitle>
              <CardDescription>Upload your loan agreement PDF for comprehensive analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setFile(e.dataTransfer.files[0]);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary hover:bg-secondary/30 transition-smooth cursor-pointer"
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Drop your PDF here or click to browse</p>
                      <p className="text-sm text-muted-foreground mt-1">Supports PDF files up to 10MB</p>
                    </div>
                  </div>
                </label>
              </div>

              {file && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    {progress === 100 && <CheckCircle className="w-5 h-5 text-success" />}
                  </div>

                  {uploading && (
                    <div className="space-y-2">
                      <Progress value={progress} className="h-2" />
                      <p className="text-sm text-muted-foreground text-center">Scanning document... {progress}%</p>
                    </div>
                  )}

                  <Button
                    onClick={handleScan}
                    disabled={uploading || progress === 100}
                    className="w-full gradient-primary"
                    size="lg"
                  >
                    {progress === 100 ? "Document Scanned" : "Scan Loan Document"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {scanned && (
          <>
            {/* Loan Trap Meter & EMI Stress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div id="loan-trap-meter">
                <Card className="shadow-card hover:shadow-elevated transition-smooth">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Shield className="w-6 h-6 text-warning" />
                      Loan Trap Meter
                    </CardTitle>
                    <CardDescription>Risk assessment of your loan agreement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2 text-warning">{loanTrapScore}%</div>
                      <p className="text-muted-foreground">Trap Risk Score</p>
                    </div>
                    <Progress value={loanTrapScore} className="h-3" />
                    <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <p className="text-sm text-muted-foreground">
                        Your loan agreement shows moderate risk indicators. Review hidden charges and terms carefully.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div id="emi-stress">
                <Card className="shadow-card hover:shadow-elevated transition-smooth">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <TrendingUp className="w-6 h-6 text-destructive" />
                      EMI Stress Indicator
                    </CardTitle>
                    <CardDescription>Assess your loan repayment capacity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2 text-destructive">{emiStressLevel}%</div>
                      <p className="text-muted-foreground">EMI to Income Ratio</p>
                    </div>
                    <Progress value={emiStressLevel} className="h-3" />
                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <p className="text-sm text-muted-foreground">
                        Your EMI represents {emiStressLevel}% of your income. Consider reducing loan amount or extending tenure.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Fraud Detector */}
            <div id="fraud-detector" className="mb-8">
              <Card className="shadow-card hover:shadow-elevated transition-smooth">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <AlertOctagon className="w-6 h-6 text-destructive" />
                    Fraud Phrase Detector
                  </CardTitle>
                  <CardDescription>AI-powered detection of suspicious language and scam indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertOctagon className="w-5 h-5 text-destructive" />
                      <p className="font-semibold text-destructive">
                        {fraudPhrases.length} Suspicious Phrases Detected
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The document contains language commonly associated with fraudulent loan schemes. Review each phrase carefully.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {fraudPhrases.map((item, index) => (
                      <div key={index} className="border border-destructive/30 rounded-lg p-4 hover:border-destructive/50 transition-smooth">
                        <div className="flex items-start gap-3">
                          <AlertOctagon
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${item.risk === "high" ? "text-destructive" : "text-warning"}`}
                          />
                          <div className="flex-1">
                            <p className="font-medium mb-1">"{item.phrase}"</p>
                            <p className="text-sm text-muted-foreground">{item.explanation}</p>
                            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${item.risk === "high" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"}`}>
                              {item.risk === "high" ? "High Risk" : "Medium Risk"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-success/10 rounded-lg border border-success/20 mt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <p className="font-semibold text-success mb-1">Recommendation</p>
                        <p className="text-sm text-muted-foreground">
                          Given the number of red flags, we strongly advise against proceeding with this loan. Consider alternative lenders with transparent terms and verified credentials.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* APR Calculator */}
            <div id="apr-calculator" className="mb-8">
              <Card className="shadow-card hover:shadow-elevated transition-smooth">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calculator className="w-6 h-6 text-primary" />
                    APR Calculator
                  </CardTitle>
                  <CardDescription>Calculate the true Annual Percentage Rate of your loan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Principal Amount</p>
                      <p className="text-2xl font-bold">₹5,00,000</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                      <p className="text-2xl font-bold">12.5%</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Effective APR</p>
                      <p className="text-2xl font-bold text-primary">15.8%</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    The effective APR includes all fees and charges, giving you the true cost of borrowing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}


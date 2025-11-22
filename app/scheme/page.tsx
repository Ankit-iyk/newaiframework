"use client";

import { useState } from "react";
import { Upload, FileText, AlertCircle, AlertTriangle, Info, TrendingUp, TrendingDown, Minus, FileEdit } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

export default function SchemePage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleFileUpload = (file: File) => {
    setFile(file);
    setTimeout(() => {
      setAnalysisComplete(true);
    }, 2000);
  };

  const biasResults = [
    {
      type: "Unfair Eligibility",
      severity: "high",
      clause: "Only applicants with permanent residence for 10+ years are eligible",
      page: 3,
      issue: "Excludes recent migrants and mobile populations",
    },
    {
      type: "Exclusion Risk",
      severity: "high",
      clause: "Requires bank account in applicant's name with minimum balance",
      page: 5,
      issue: "Excludes financially vulnerable and unbanked populations",
    },
    {
      type: "Hidden Bias",
      severity: "medium",
      clause: "Application must be submitted during business hours only",
      page: 7,
      issue: "Disadvantages working-class applicants",
    },
    {
      type: "Unclear Rules",
      severity: "medium",
      clause: "Income proof must be 'sufficient' as per officer discretion",
      page: 9,
      issue: "Subjective criteria open to bias",
    },
    {
      type: "Missing Beneficiaries",
      severity: "low",
      clause: "No mention of support for persons with disabilities",
      page: 12,
      issue: "Lacks inclusive provisions",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-danger/10 text-danger border-danger/20";
      case "medium":
        return "bg-warning/10 text-warning border-warning/20";
      case "low":
        return "bg-info/10 text-info border-info/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="h-5 w-5" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5" />;
      case "low":
        return <Info className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const overallScore = 62;
  const categories = [
    { name: "Language Clarity", score: 75, change: "up" },
    { name: "Eligibility Fairness", score: 45, change: "down" },
    { name: "Process Accessibility", score: 58, change: "down" },
    { name: "Inclusivity", score: 52, change: "down" },
    { name: "Transparency", score: 80, change: "up" },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-danger";
  };

  const getProgressColor = (score: number) => {
    if (score >= 75) return "bg-success";
    if (score >= 50) return "bg-warning";
    return "bg-danger";
  };

  const getTrendIcon = (change: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-danger" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Upload Section */}
        <section id="upload" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Scheme Fairness Analysis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload a government scheme document to analyze fairness, detect bias, and get improvement recommendations
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Upload className="w-6 h-6 text-primary" />
                Upload Scheme Document
              </CardTitle>
              <CardDescription>Upload a PDF document of the scheme for analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleFileUpload(e.dataTransfer.files[0]);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary hover:bg-secondary/30 transition-smooth cursor-pointer"
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
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
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="flex-1 text-sm font-medium">{file.name}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {analysisComplete && (
          <>
            {/* Bias Detection */}
            <section id="bias-detection" className="scroll-mt-20">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Bias Detection Results</CardTitle>
                  <CardDescription>Analyzing: {file?.name || "Document"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {biasResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${getSeverityColor(result.severity)}`}
                      >
                        <div className="flex items-start gap-3">
                          {getSeverityIcon(result.severity)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{result.type}</h4>
                              <span className="text-xs px-2 py-1 rounded bg-current/20">
                                Page {result.page}
                              </span>
                            </div>
                            <p className="text-sm mb-2 font-medium">"{result.clause}"</p>
                            <p className="text-sm opacity-90">{result.issue}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Clause Rewrite */}
            <section id="clause-rewrite" className="scroll-mt-20">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <FileEdit className="w-6 h-6 text-primary" />
                    Suggested Clause Rewrites
                  </CardTitle>
                  <CardDescription>AI-generated fairer alternatives to biased clauses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2 text-muted-foreground">Original Clause</p>
                      <p className="mb-4">
                        "Only applicants with permanent residence for 10+ years are eligible"
                      </p>
                      <p className="text-sm font-medium mb-2 text-success">Suggested Rewrite</p>
                      <p className="text-success">
                        "Applicants must demonstrate stable residence for a minimum of 1 year, with provisions for mobile populations and recent migrants to provide alternative documentation"
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2 text-muted-foreground">Original Clause</p>
                      <p className="mb-4">
                        "Requires bank account in applicant's name with minimum balance"
                      </p>
                      <p className="text-sm font-medium mb-2 text-success">Suggested Rewrite</p>
                      <p className="text-success">
                        "Financial documentation may include bank statements, post office accounts, or alternative financial instruments. No minimum balance requirement for eligibility"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Fairness Score */}
            <section id="fairness-score" className="scroll-mt-20">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Fairness Score</CardTitle>
                  <CardDescription>Overall scheme fairness assessment based on multiple factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-4 border-primary/30">
                        <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                          {overallScore}
                        </span>
                      </div>
                      <p className="text-muted-foreground">Overall Fairness Score</p>
                    </div>

                    <div className="space-y-4">
                      {categories.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{category.name}</span>
                              {getTrendIcon(category.change)}
                            </div>
                            <span className={`font-semibold ${getScoreColor(category.score)}`}>
                              {category.score}%
                            </span>
                          </div>
                          <Progress value={category.score} className={`h-2 ${getProgressColor(category.score)}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Insights */}
            <section id="insights" className="scroll-mt-20">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Key Insights & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-danger/10 rounded-lg border border-danger/20">
                      <h4 className="font-semibold text-danger mb-2">Most Biased Sections</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Eligibility Criteria (Page 3-5): Contains 3 high-severity exclusionary clauses</li>
                        <li>• Application Process (Page 7-9): Lacks accessibility provisions</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <h4 className="font-semibold text-warning mb-2">High-Risk Exclusions</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Recent migrants and mobile populations</li>
                        <li>• Unbanked and financially vulnerable groups</li>
                        <li>• Working-class applicants</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <h4 className="font-semibold text-success mb-2">Key Recommendations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Reduce residence requirement from 10 years to 1 year</li>
                        <li>• Accept alternative financial documentation</li>
                        <li>• Implement online application portal with 24/7 access</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2">Potential Impact</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Implementing recommendations could increase fairness score by 28 points</li>
                        <li>• Estimated 35% increase in eligible beneficiary population</li>
                        <li>• Reduced risk of discrimination complaints</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </main>
    </div>
  );
}


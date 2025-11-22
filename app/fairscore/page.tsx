"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2, TrendingUp, TrendingDown, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

export default function FairScorePage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDataProcessed, setIsDataProcessed] = useState(false);

  const currentScore = 742;
  const previousScore = 698;
  const scoreChange = currentScore - previousScore;
  const scorePercentage = (currentScore / 1000) * 100;

  const getScoreCategory = (score: number) => {
    if (score >= 800) return { label: "Excellent", gradient: "from-green-500 to-emerald-500" };
    if (score >= 700) return { label: "Good", gradient: "from-blue-500 to-cyan-500" };
    if (score >= 600) return { label: "Fair", gradient: "from-yellow-500 to-orange-500" };
    return { label: "Needs Improvement", gradient: "from-red-500 to-pink-500" };
  };

  const category = getScoreCategory(currentScore);

  const historyData = [
    { month: "Sep", score: 650 },
    { month: "Oct", score: 675 },
    { month: "Nov", score: 698 },
    { month: "Dec", score: 720 },
    { month: "Jan", score: 742 },
  ];

  const shapData = [
    { feature: "Regular UPI Payments", impact: 45, positive: true },
    { feature: "Timely Bill Payments", impact: 38, positive: true },
    { feature: "Diverse Merchants", impact: 25, positive: true },
    { feature: "Stable Income Pattern", impact: 22, positive: true },
    { feature: "Late Night Transactions", impact: -15, positive: false },
    { feature: "High-Risk Merchants", impact: -12, positive: false },
    { feature: "Irregular Deposits", impact: -8, positive: false },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const mockData = [
        { date: "2025-01-15", type: "UPI", amount: "₹250", merchant: "Grocery Store" },
        { date: "2025-01-14", type: "SMS", amount: "₹1200", merchant: "Rent Payment" },
        { date: "2025-01-13", type: "Bank", amount: "₹450", merchant: "Utility Bill" },
        { date: "2025-01-12", type: "UPI", amount: "₹80", merchant: "Coffee Shop" },
      ];
      setPreviewData(mockData);
    }
  };

  const processData = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDataProcessed(true);
      setTimeout(() => {
        document.getElementById("fairscore")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Upload Section */}
        <section className="py-16 scroll-mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Upload Your Data</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Upload your SMS, bank transactions, or UPI statements to calculate your FairScore
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="p-8 shadow-lg">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-muted-foreground">CSV or TXT files (SMS, Bank, UPI statements)</p>
                  </label>
                </div>

                {file && (
                  <div className="mt-6 flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="flex-1 text-sm font-medium">{file.name}</span>
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                )}
              </Card>

              {previewData.length > 0 && (
                <Card className="p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Data Preview</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Date</th>
                          <th className="text-left py-3 px-4 font-semibold">Type</th>
                          <th className="text-left py-3 px-4 font-semibold">Amount</th>
                          <th className="text-left py-3 px-4 font-semibold">Merchant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, idx) => (
                          <tr key={idx} className="border-b border-border/50">
                            <td className="py-3 px-4 text-sm">{row.date}</td>
                            <td className="py-3 px-4 text-sm">{row.type}</td>
                            <td className="py-3 px-4 text-sm font-medium">{row.amount}</td>
                            <td className="py-3 px-4 text-sm">{row.merchant}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      size="lg"
                      onClick={processData}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      {isProcessing ? "Processing..." : "Calculate FairScore"}
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </section>

        {isDataProcessed && (
          <>
            {/* FairScore Display */}
            <section id="fairscore" className="py-16 bg-muted/30 scroll-mt-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Your FairScore</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    A comprehensive credit score based on your financial behavior
                  </p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
                  <Card className="p-8 shadow-xl relative overflow-hidden">
                    <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${category.gradient}`}></div>
                    <div className="relative z-10">
                      <div className="text-center mb-6">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Current Score</p>
                        <div className="relative inline-block">
                          <svg className="w-48 h-48 mx-auto" viewBox="0 0 200 200">
                            <circle
                              cx="100"
                              cy="100"
                              r="85"
                              stroke="hsl(var(--muted))"
                              strokeWidth="12"
                              fill="none"
                            />
                            <circle
                              cx="100"
                              cy="100"
                              r="85"
                              stroke="url(#scoreGradient)"
                              strokeWidth="12"
                              fill="none"
                              strokeDasharray={`${scorePercentage * 5.34} 534`}
                              strokeLinecap="round"
                              transform="rotate(-90 100 100)"
                              className="transition-all duration-1000"
                            />
                            <defs>
                              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="hsl(var(--primary))" />
                                <stop offset="100%" stopColor="hsl(var(--secondary))" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                              {currentScore}
                            </span>
                            <span className="text-sm text-muted-foreground mt-1">out of 1000</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                          <span className="text-lg font-semibold">{category.label}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm">
                          {scoreChange > 0 ? (
                            <>
                              <TrendingUp className="h-4 w-4 text-accent" />
                              <span className="text-accent font-medium">+{scoreChange} points this month</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="h-4 w-4 text-destructive" />
                              <span className="text-destructive font-medium">{scoreChange} points this month</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 shadow-xl">
                    <h3 className="text-xl font-semibold mb-6">Score History</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <LineChart data={historyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                        <YAxis domain={[600, 800]} stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--primary))", r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </div>
              </div>
            </section>

            {/* SHAP Explanations */}
            <section id="shap" className="py-16 scroll-mt-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold">SHAP Explanations</h2>
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Understand what factors are driving your FairScore
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <Card className="p-8 shadow-xl">
                    <h3 className="text-lg font-semibold mb-6">Feature Impact Analysis</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={shapData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                        <YAxis dataKey="feature" type="category" stroke="hsl(var(--muted-foreground))" width={150} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="impact" radius={[0, 4, 4, 0]}>
                          {shapData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.positive ? "hsl(var(--accent))" : "hsl(var(--destructive))"} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}


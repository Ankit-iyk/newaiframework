"use client";

import { useState } from "react";
import { Upload, FileText, Activity, TrendingUp, Zap, PieChart, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

export default function Finance360Page() {
  const [activeTab, setActiveTab] = useState("upload");
  const [smsData, setSmsData] = useState<any[]>([]);

  const handleSmsUpload = (data: any[]) => {
    setSmsData(data);
    setActiveTab("health-score");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const mockData = [
        { date: "2025-01-15", type: "UPI", amount: 250, merchant: "Grocery Store", category: "Food" },
        { date: "2025-01-14", type: "SMS", amount: 1200, merchant: "Rent Payment", category: "Housing" },
        { date: "2025-01-13", type: "Bank", amount: 450, merchant: "Utility Bill", category: "Utilities" },
        { date: "2025-01-12", type: "UPI", amount: 80, merchant: "Coffee Shop", category: "Food" },
        { date: "2025-01-11", type: "UPI", amount: 500, merchant: "Restaurant", category: "Food" },
      ];
      handleSmsUpload(mockData);
    }
  };

  const healthScore = 72;
  const trendData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 68 },
    { month: "Mar", score: 70 },
    { month: "Apr", score: 69 },
    { month: "May", score: 72 },
  ];

  const volatilityData = [
    { date: "Week 1", spending: 8500, avgSpending: 7000 },
    { date: "Week 2", spending: 12000, avgSpending: 7000 },
    { date: "Week 3", spending: 5500, avgSpending: 7000 },
    { date: "Week 4", spending: 9800, avgSpending: 7000 },
    { date: "Week 5", spending: 15000, avgSpending: 7000 },
  ];

  const categoryData = [
    { name: "Food", value: 35, color: "#3b82f6" },
    { name: "Housing", value: 25, color: "#10b981" },
    { name: "Transport", value: 20, color: "#f59e0b" },
    { name: "Utilities", value: 15, color: "#ef4444" },
    { name: "Other", value: 5, color: "#8b5cf6" },
  ];

  const impulsiveSpending = 45;
  const highIncomeWaste = 18;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Finance360
          </h1>
          <p className="text-xl text-muted-foreground mb-8">SMS-Based Financial Behaviour Intelligence</p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Upload your banking SMS messages to unlock powerful insights about your spending patterns, impulsive behaviors, and financial health.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="health-score">Health</TabsTrigger>
            <TabsTrigger value="volatility">Volatility</TabsTrigger>
            <TabsTrigger value="impulsive">Impulsive</TabsTrigger>
            <TabsTrigger value="category">Categories</TabsTrigger>
            <TabsTrigger value="waste">Waste</TabsTrigger>
            <TabsTrigger value="nudges">Nudges</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" id="upload">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Upload className="w-6 h-6 text-primary" />
                  Upload SMS Data
                </CardTitle>
                <CardDescription>Upload your banking SMS messages for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload({ target: { files: [e.dataTransfer.files[0]] } } as any);
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary hover:bg-secondary/30 transition-smooth cursor-pointer"
                >
                  <input
                    type="file"
                    accept=".txt,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold">Drop your SMS file here or click to browse</p>
                        <p className="text-sm text-muted-foreground mt-1">Supports TXT and CSV files</p>
                      </div>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health-score" id="health-score">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Overall Financial Health Score
                </CardTitle>
                <CardDescription>Based on your spending patterns, volatility, and savings behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-4 border-primary/30 mb-4">
                    <span className="text-4xl font-bold text-primary">{healthScore}</span>
                  </div>
                  <p className="text-muted-foreground">Overall Health Score</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: "hsl(var(--primary))" }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volatility" id="volatility">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Spending Volatility Analysis
                </CardTitle>
                <CardDescription>Track your spending consistency over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={volatilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Area type="monotone" dataKey="spending" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="avgSpending" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-muted-foreground">
                    Your spending shows moderate volatility. Consider setting a monthly budget to stabilize your expenses.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impulsive" id="impulsive">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Impulsive Spending Analysis
                </CardTitle>
                <CardDescription>Identify patterns of unplanned purchases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2 text-warning">{impulsiveSpending}%</div>
                  <p className="text-muted-foreground">Impulsive Spending Ratio</p>
                </div>
                <Progress value={impulsiveSpending} className="h-3" />
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-muted-foreground">
                    You have a moderate level of impulsive spending. Consider implementing a 24-hour waiting period before making non-essential purchases.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="category" id="category">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Category Breakdown
                </CardTitle>
                <CardDescription>See how your spending is distributed across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsPieChart>
                    <Tooltip />
                    <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={120} fill="#8884d8" dataKey="value">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="waste" id="waste">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  High Income Waste Analysis
                </CardTitle>
                <CardDescription>Identify areas where you might be overspending</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2 text-warning">{highIncomeWaste}%</div>
                  <p className="text-muted-foreground">Waste Percentage</p>
                </div>
                <Progress value={highIncomeWaste} className="h-3" />
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-muted-foreground">
                    You're spending {highIncomeWaste}% of your income on potentially unnecessary items. Review your subscriptions and recurring expenses.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nudges" id="nudges">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Personalized Savings Nudges
                </CardTitle>
                <CardDescription>Actionable recommendations to improve your financial health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <p className="font-semibold text-success mb-1">Set Up Auto-Savings</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically transfer 20% of your income to savings each month. This could help you save ₹12,000 monthly.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-semibold text-primary mb-1">Reduce Food Spending</p>
                        <p className="text-sm text-muted-foreground">
                          You're spending 35% of your income on food. Consider meal planning to reduce this to 25% and save ₹3,000 monthly.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-semibold text-accent mb-1">Build Emergency Fund</p>
                        <p className="text-sm text-muted-foreground">
                          Aim to save 3-6 months of expenses. Based on your current spending, target ₹1,50,000 in emergency savings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


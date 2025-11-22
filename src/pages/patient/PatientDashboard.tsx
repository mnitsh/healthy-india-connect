import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Droplets, Flame, Moon, User, LogOut, Stethoscope } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Badge } from "@/components/ui/badge";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [waterIntake] = useState(6); // out of 8 glasses
  const [calories] = useState(1850); // out of 2000
  const [sleep] = useState(7.5); // hours

  const weeklyWaterData = [
    { day: "Mon", glasses: 7 },
    { day: "Tue", glasses: 6 },
    { day: "Wed", glasses: 8 },
    { day: "Thu", glasses: 5 },
    { day: "Fri", glasses: 7 },
    { day: "Sat", glasses: 8 },
    { day: "Sun", glasses: 6 },
  ];

  const weeklyCaloriesData = [
    { day: "Mon", calories: 2100 },
    { day: "Tue", calories: 1950 },
    { day: "Wed", calories: 1800 },
    { day: "Thu", calories: 2200 },
    { day: "Fri", calories: 1900 },
    { day: "Sat", calories: 2000 },
    { day: "Sun", calories: 1850 },
  ];

  const weeklySleepData = [
    { day: "Mon", hours: 7 },
    { day: "Tue", hours: 6.5 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 6 },
    { day: "Fri", hours: 7.5 },
    { day: "Sat", hours: 8.5 },
    { day: "Sun", hours: 7.5 },
  ];

  const doctorRecommendations = [
    {
      id: 1,
      doctorName: "Dr. Sharma",
      date: "2024-11-20",
      recommendation: "Increase water intake to 10 glasses per day. Stay hydrated, especially during physical activities.",
      priority: "high",
    },
    {
      id: 2,
      doctorName: "Dr. Patel",
      date: "2024-11-18",
      recommendation: "Aim for 8 hours of sleep daily. Maintain a consistent sleep schedule for better recovery.",
      priority: "medium",
    },
    {
      id: 3,
      doctorName: "Dr. Sharma",
      date: "2024-11-15",
      recommendation: "Add 30 minutes of light exercise daily. Walking or yoga would be beneficial for your health goals.",
      priority: "medium",
    },
  ];

  const handleLogout = () => {
    navigate("/patient/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <h1 className="text-xl font-bold text-primary">Healthy India</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/patient/profile")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Here's your health summary for today</p>
        </div>

        {/* Today's Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
              <Droplets className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{waterIntake}/8</div>
              <p className="text-xs text-muted-foreground mt-1">glasses today</p>
              <Progress value={(waterIntake / 8) * 100} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Calories</CardTitle>
              <Flame className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{calories}</div>
              <p className="text-xs text-muted-foreground mt-1">of 2000 kcal goal</p>
              <Progress value={(calories / 2000) * 100} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sleep</CardTitle>
              <Moon className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{sleep}h</div>
              <p className="text-xs text-muted-foreground mt-1">last night</p>
              <Progress value={(sleep / 8) * 100} className="mt-3" />
            </CardContent>
          </Card>
        </div>

        {/* Weekly Analytics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Weekly Water Intake</CardTitle>
              <CardDescription>Daily glasses of water consumed</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyWaterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="glasses"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Weekly Calorie Intake</CardTitle>
              <CardDescription>Daily calorie consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyCaloriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Bar dataKey="calories" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md md:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Sleep Pattern</CardTitle>
              <CardDescription>Hours of sleep per night</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklySleepData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--success))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Doctor Recommendations */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Doctor Recommendations</h3>
          <div className="space-y-4">
            {doctorRecommendations.map((rec) => (
              <Card key={rec.id} className="border-0 shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{rec.doctorName}</CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(rec.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={rec.priority === "high" ? "default" : "secondary"}>
                      {rec.priority === "high" ? "High Priority" : "Medium Priority"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{rec.recommendation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;

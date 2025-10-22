import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
  { month: "Jan", requests: 120, cleared: 80 },
  { month: "Feb", requests: 160, cleared: 120 },
  { month: "Mar", requests: 200, cleared: 150 },
  { month: "Apr", requests: 180, cleared: 170 },
];

export function ClearanceProgressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clearance Progress (Monthly)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="requests"
              stroke="#8884d8"
              strokeWidth={2}
              name="Requests"
            />
            <Line
              type="monotone"
              dataKey="cleared"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Cleared"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

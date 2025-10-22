import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
  { name: "Library", value: 40 },
  { name: "Finance", value: 30 },
  { name: "Dormitory", value: 20 },
  { name: "Registrar", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function DepartmentClearanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Clearance Share</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name }) => name}
              outerRadius={100}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

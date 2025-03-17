"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const Charts = ({
    data: { salesData },
}: {
    data: { salesData: { month: string; totalSales: number }[] };
}) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                data={salesData}
                margin={{ left: 60 }} // ✅ Add left margin to prevent cutoff
            >
                <XAxis
                    dataKey="month"
                    stroke="#6B7280"
                    fontSize={15}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#6B7280"
                    fontSize={15}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₦${value.toLocaleString()}`}
                />
                <Bar
                    dataKey="totalSales"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Charts;



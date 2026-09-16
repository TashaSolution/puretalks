"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CategoryRevenue } from "@/types/dashboard";

interface DonutChartProps {
  data: CategoryRevenue[];
  height?: number;
}

export function DonutChart({ data, height = 250 }: DonutChartProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      <div className="w-full max-w-[180px] mx-auto sm:mx-0">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid rgba(28,32,36,0.07)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(28,32,36,0.08)",
                fontSize: "12px",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2.5">
        {data.map((item) => (
          <div key={item.category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-[#6B7280] truncate max-w-[120px]">
              {item.category}
            </span>
            <span className="text-xs font-semibold text-[#1C2024] ml-auto">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

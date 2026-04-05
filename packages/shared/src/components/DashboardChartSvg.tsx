import React from "react";
import { max } from "d3-array";
import { scaleLinear, scalePoint } from "d3-scale";
import { area, curveMonotoneX, line } from "d3-shape";
import type { ChartDataPoint } from "../data/dashboard";

const CHART_WIDTH = 720;
const CHART_HEIGHT = 260;
const CHART_PADDING = {
  top: 16,
  right: 20,
  bottom: 44,
  left: 52,
};

export interface DashboardChartSvgProps {
  data: ChartDataPoint[];
}

export function DashboardChartSvg({ data }: DashboardChartSvgProps) {
  const safeData = data.length > 0 ? data : [{ label: "Нет данных", value: 0 }];
  const maxValue = Math.max(max(safeData, (item) => item.value) ?? 0, 1);
  const labels = safeData.map((item) => item.label);

  const xScale = scalePoint<string>()
    .domain(labels)
    .range([CHART_PADDING.left, CHART_WIDTH - CHART_PADDING.right]);

  const yScale = scaleLinear()
    .domain([0, maxValue])
    .nice(4)
    .range([CHART_HEIGHT - CHART_PADDING.bottom, CHART_PADDING.top]);

  const linePath = line<ChartDataPoint>()
    .x((item) => xScale(item.label) ?? CHART_PADDING.left)
    .y((item) => yScale(item.value))
    .curve(curveMonotoneX)(safeData);

  const areaPath = area<ChartDataPoint>()
    .x((item) => xScale(item.label) ?? CHART_PADDING.left)
    .y0(yScale(0))
    .y1((item) => yScale(item.value))
    .curve(curveMonotoneX)(safeData);

  const yTicks = yScale.ticks(4);
  const lastPoint = safeData[safeData.length - 1];

  return (
    <div className="cwr-chart-bar">
      <div className="cwr-chart-header">
        <div>
          <h3 className="cwr-chart-title">Активность по дням</h3>
          <p className="cwr-chart-subtitle">
            Сглаженный SVG-график на d3 scale/shape
          </p>
        </div>
        <div className="cwr-chart-highlight">
          <span className="cwr-chart-highlight-label">Последняя точка</span>
          <strong className="cwr-chart-highlight-value">
            {lastPoint.value.toLocaleString("ru-RU")}
          </strong>
        </div>
      </div>

      <svg
        className="cwr-chart-svg"
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label="График активности по дням"
      >
        <defs>
          <linearGradient id="cwr-dashboard-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={CHART_PADDING.left}
              x2={CHART_WIDTH - CHART_PADDING.right}
              y1={yScale(tick)}
              y2={yScale(tick)}
              className="cwr-chart-grid-line"
            />
            <text
              x={CHART_PADDING.left - 12}
              y={yScale(tick)}
              textAnchor="end"
              dominantBaseline="middle"
              className="cwr-chart-axis-label"
            >
              {Math.round(tick).toLocaleString("ru-RU")}
            </text>
          </g>
        ))}

        <line
          x1={CHART_PADDING.left}
          x2={CHART_WIDTH - CHART_PADDING.right}
          y1={yScale(0)}
          y2={yScale(0)}
          className="cwr-chart-axis-line"
        />

        {areaPath && <path d={areaPath} className="cwr-chart-area" />}
        {linePath && <path d={linePath} className="cwr-chart-line" />}

        {safeData.map((item, index) => {
          const x = xScale(item.label) ?? CHART_PADDING.left;
          const y = yScale(item.value);

          return (
            <g key={`${item.label}-${index}`}>
              <circle cx={x} cy={y} r={4} className="cwr-chart-point" />
              <text
                x={x}
                y={CHART_HEIGHT - 16}
                textAnchor="middle"
                className="cwr-chart-axis-label"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

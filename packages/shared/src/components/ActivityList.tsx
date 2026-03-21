import React from "react";

export interface ActivityItem {
  id: string;
  action: string;
  time: string;
}

export interface ActivityListProps {
  items: ActivityItem[];
}

export function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="cwr-activity-list">
      <h3 className="cwr-activity-title">Последняя активность</h3>
      <ul className="cwr-activity-items">
        {items.map((item) => (
          <li key={item.id} className="cwr-activity-item">
            <span className="cwr-activity-action">{item.action}</span>
            <span className="cwr-activity-time">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

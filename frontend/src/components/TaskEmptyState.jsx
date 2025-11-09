import { Circle } from "lucide-react";
import { Card } from "./ui/card";

export default function TaskEmptyState({ filter }) {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md ">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "Tất cả nhiệm vụ đã hoàn thành!"
              : filter === "completed"
              ? "Chưa có nhiệm vụ hoàn thành."
              : "Chưa có nhiệm vụ nào!"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {filter === "active"
              ? "Bạn đã hoàn thành tất cả các nhiệm vụ!"
              : filter === "completed"
              ? "Chưa có nhiệm vụ nào được hoàn thành."
              : "Hãy thêm nhiệm vụ mới để bắt đầu quản lý công việc của bạn!"}
          </p>
        </div>
      </div>
    </Card>
  );
}

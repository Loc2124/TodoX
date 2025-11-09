import React from "react";

export default function Footer({
  completedTasksCount = 0,
  activeTasksCount = 0,
}) {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                Bạn đã hoàn thành {completedTasksCount} nhiệm vụ.
                {activeTasksCount > 0 && (
                  <> Còn lại {activeTasksCount} nhiệm vụ chưa hoàn thành.</>
                )}
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Bạn có {activeTasksCount} nhiệm vụ chưa hoàn thành.</>
            )}
          </p>
        </div>
      )}
    </>
  );
}

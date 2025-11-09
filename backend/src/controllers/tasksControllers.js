import Task from "../models/Task.js";

export const getAllTasks = async (request, response) => {
  const { filter = "today" } = request.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }

    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }

    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }

    case "all":

    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount =
      result[0].activeCount.length > 0 ? result[0].activeCount[0].count : 0;

    const completedCount =
      result[0].completedCount.length > 0
        ? result[0].completedCount[0].count
        : 0;

    response.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách công việc:", error);
    response.status(500).json({ message: "Lỗi khi lấy danh sách công việc." });
  }
};

export const createTask = async (request, response) => {
  try {
    const { title } = request.body;

    const task = new Task({ title });

    const newTask = await task.save();
    response.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi tạo công việc:", error);
    response.status(500).json({ message: "Lỗi khi tạo công việc." });
  }
};

export const updateTask = async (request, response) => {
  try {
    const { title, status, completedAt } = request.body;
    const updatedTask = await Task.findByIdAndUpdate(
      request.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true }
    );

    if (!updateTask) {
      return response.status(404).json({ message: "Công việc không tồn tại" });
    }

    response.status(200).json(updateTask);
  } catch (error) {
    console.error("Lỗi khi sửa công việc: ", error);
    response.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteTask = async (request, response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(request.params.id);

    if (!deletedTask) {
      return response.status(404).json({ message: "Công việc không tồn tại" });
    }
    response.status(200).json({ message: "Xóa công việc thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa công việc: ", error);
    response.status(500).json({ message: "Lỗi hệ thống" });
  }
};

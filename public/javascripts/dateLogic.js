export const checkDayDifference = (date, type) => {
  const dateObj = dayjs(date);
  const today = dayjs();
  if (date !== null) {
    if (type === "today") {
      const difference = dateObj.isSameOrBefore(today, "hour");
      return difference;
    } else if (type === "tomorrow") {
      const tomorrow = dayjs().add(1, "day");
      const difference = dateObj.isBetween(today, tomorrow, "hour");
      return difference;
    } else if (type === "overdue") {
      const difference = dateObj.isBefore(today, "day");
      return difference;
    }
  }
};

export const buildNewTasksAndFilter = (tasks, type) => {
  const taskArray = tasks.map((taskObj) => Object.entries(taskObj));
  const filteredTasks = taskArray.filter(
    ([
      completed,
      createdAt,
      detail,
      dog_id,
      due_date,
      id,
      owner_id,
      priority,
      updatedAt,
    ]) => checkDayDifference(due_date[1], type)
  );
  const sortedTasks = [];
  filteredTasks.forEach((array) => {
    const newObj = {};
    array.forEach((ele) => {
      newObj[ele[0]] = ele[1];
    });
    sortedTasks.push(newObj);
  });

  return sortedTasks;
};

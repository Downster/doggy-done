export const checkDayDifference = (date, type) => {
    const dateObj = dayjs(date);
    const today = dayjs()
    const tomorrow = dayjs().add(1, "day")
  if (date !== null) {
    if (type === "today") {
      const difference = dateObj.isSame(today ,'day');
      return difference;
    } else if (type === "tomorrow") {
        const endOfToday = today.endOf('day')
        const endOfTomorrow = tomorrow.endOf('day')
        const difference = dateObj.isBetween(endOfToday, endOfTomorrow, "hour");
      return difference;
    } else if (type === "overdue") {
      const difference = dateObj.isBefore(today.startOf('day'), "hour");
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


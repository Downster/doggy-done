export const checkDayDifference = (date) => {
  if (date !== null) {
    const dateObj = new Date(date);
    const today = new Date();
    const difference = dateObj - today;
    const difference_in_days = difference / (1000 * 3600 * 24);
    console.log(difference_in_days);
    return difference_in_days;
  }
};

export const buildNewTasksAndFilter = (tasks, dayDifference, dayBottom) => {
  const taskArray = tasks.map((taskObj) => Object.entries(taskObj));
  console.log(taskArray);
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
    ]) => {
      return (
        checkDayDifference(due_date[1]) < dayDifference &&
        checkDayDifference(due_date[1]) > dayBottom
      );
    }
  );
  console.log(filteredTasks);
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

export const buildOverdueTasksAndFilter = (tasks, dayDifference) => {
  const taskArray = tasks.map((taskObj) => Object.entries(taskObj));
  console.log(taskArray);
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
    ]) => {
      console.log(checkDayDifference(due_date[1]));
      return checkDayDifference(due_date[1]) < dayDifference;
    }
  );
  console.log(filteredTasks);
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

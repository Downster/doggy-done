export const checkDayDifference = (date) => {
  if (date !== null) {
    const dateObj = new Date(date);
    const today = new Date();
    const difference = today - dateObj;
    const difference_in_days = difference / (1000 * 3600 * 24);
    return difference_in_days;
  }
};

export const buildNewTasksAndFilter = (tasks, dayDifference) => {
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
        checkDayDifference(due_date[1] > 0)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c41de1e (Mostly solved)

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
<<<<<<< HEAD
=======
>>>>>>> a0962a4 (Dates mostly working)
=======
>>>>>>> c41de1e (Mostly solved)

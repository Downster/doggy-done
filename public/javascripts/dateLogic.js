export const checkDayDifference = (date) => {
  if (date !== null) {
    const dateObj = adjustDateTime(new Date(date));
    const today = adjustDateTime(new Date());
    const difference = dateObj - today;
    const difference_in_days = difference / (1000 * 3600 * 24);
    console.log(difference_in_days);
    return difference_in_days;
  }
};
export const adjustDateTime = (date) => {
  let getLocal = new Date();
  getLocal = getLocal.toString().slice(28, 31);
  let plusOrMinus;
  if (getLocal[0] === "-") plusOrMinus = "+";
  else plusOrMinus = "-";
  let change = Number(getLocal.slice(1, 3));
  if (plusOrMinus === "-") {
    let adjustedDateTime = new Date(date.getTime() - change * 60 * 60 * 1000);
    return adjustedDateTime;
  } else {
    let adjustedDateTime = new Date(date.getTime() + change * 60 * 60 * 1000);
    return adjustedDateTime;
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

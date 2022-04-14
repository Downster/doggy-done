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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f581fca (Mostly solved)
=======
>>>>>>> 6dac566 (Dates mostly working)
=======
=======
>>>>>>> c41de1e (Mostly solved)
>>>>>>> 5a3ed4a (Mostly solved)
=======
>>>>>>> 0f37de1 (Fixed some bugs testing to see if works before pushing)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 85b8179 (Dates mostly working)
=======
>>>>>>> f581fca (Mostly solved)
=======
=======
>>>>>>> a0962a4 (Dates mostly working)
>>>>>>> 6dac566 (Dates mostly working)
=======
=======
>>>>>>> a0962a4 (Dates mostly working)
=======
>>>>>>> c41de1e (Mostly solved)
>>>>>>> 5a3ed4a (Mostly solved)
=======
>>>>>>> 0f37de1 (Fixed some bugs testing to see if works before pushing)

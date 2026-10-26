// gradeUtils.js

// Named export: calculates the average of the three grades.
export const computeAverage = (prelim, midterm, final) => {
  return (prelim + midterm + final) / 3;
};

// Default export: checks whether the average meets the passing standard.
const isPassing = (average) => average >= 75;

export default isPassing;

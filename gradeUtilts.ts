export enum EnrollmentStatus {
  Passing = "PASSING",
  Probation = "PROBATION",
}

export const computeAverage = (
  prelim: number,
  midterm: number,
  final: number
): number => {
  return (prelim + midterm + final) / 3;
};

const getStatus = (average: number): EnrollmentStatus => {
  return average >= 75
    ? EnrollmentStatus.Passing
    : EnrollmentStatus.Probation;
};

export default getStatus;
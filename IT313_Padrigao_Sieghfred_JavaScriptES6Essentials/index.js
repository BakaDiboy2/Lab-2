// index.js
import isPassing, { computeAverage } from "./gradeUtils.js";

const enrollees = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

// Simulates receiving enrollee records from a registrar API.
const getEnrollees = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(enrollees);
      // To test the error handler for your demonstration, temporarily replace
      // resolve(enrollees) with:
      // reject(new Error("Registrar API connection failed."));
    }, 1000);
  });
};

// Rest parameter collects the supplied report lines into an array.
const printReport = (...lines) => console.log(lines.join("\\n"));

const generateReport = async () => {
  try {
    const students = await getEnrollees();

    // map() creates a new array with each student's average and status.
    const results = students.map(({ name, prelim, midterm, final }) => {
      const grades = [prelim, midterm, final];
      const average = computeAverage(...grades); // Spread operator
      const status = isPassing(average) ? "PASSING" : "PROBATION";

      return { name, average, status };
    });

    // filter() separates students who passed.
    const passing = results.filter(({ status }) => status === "PASSING");

    // reduce() adds all averages; divide by the number of students.
    const totalAverage = results.reduce(
      (sum, { average }) => sum + average,
      0
    );
    const classAverage = totalAverage / results.length;

    // let is used to build the report string.
    let report = "=== IT313 Enrollment Eligibility Report ===\n";

    results.forEach(({ name, average, status }) => {
      report += `${name.padEnd(18)} - Average: ${average.toFixed(2)} - ${status}\n`;
    });

    report += `Class Average: ${classAverage.toFixed(2)}\n`;
    report += `Passing: ${passing.length} / ${results.length}`;

    printReport(report);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

generateReport();

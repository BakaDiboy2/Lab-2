import getStatus, {
  computeAverage,
  EnrollmentStatus,
} from "./gradeUtilts.js";

interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

type EligibilityReport = {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
};

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

// Union type and type narrowing
const batchId: string | number = "IT313-2026";

const formatBatchId = (id: string | number): string => {
  if (typeof id === "number") {
    return `Batch ID: ${id.toFixed(0)}`;
  }

  return `Batch ID: ${id}`;
};

// Generic function
function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
    return groups;
  }, {});
}

// Simulated registrar API
function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enrollees);
    }, 1000);
  });
}

async function generateReport(): Promise<void> {
  try {
    const students = await getEnrollees();

    const results: EligibilityReport[] = students.map(
      ({ name, prelim, midterm, final }) => {
        const average = computeAverage(prelim, midterm, final);
        const status = getStatus(average);

        return {
          name,
          average,
          status,
          ...(status === EnrollmentStatus.Probation
            ? { remarks: "Needs consultation" }
            : {}),
        };
      }
    );

    const groupedResults = groupBy(
      results,
      (student) => student.status
    );

    const totalAverage = results.reduce(
      (sum, student) => sum + student.average,
      0
    );

    const classAverage =
      results.length > 0 ? totalAverage / results.length : 0;

    let report =
      "=== IT313 Enrollment Eligibility Report (TypeScript) ===\n";

    report += `${formatBatchId(batchId)}\n`;

    results.forEach(({ name, average, status, remarks }) => {
      const remarkText = remarks ? ` - ${remarks}` : "";

      report += `${name.padEnd(14)} - Average: ${average.toFixed(2)} - ${status}${remarkText}\n`;
    });

    const passingCount =
      groupedResults[EnrollmentStatus.Passing]?.length ?? 0;

    report += `Class Average: ${classAverage.toFixed(2)}\n`;
    report += `Passing: ${passingCount} / ${results.length}`;

    console.log(report);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log("An unknown registrar connection error occurred.");
    }
  }
}

generateReport();
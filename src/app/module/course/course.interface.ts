export type ICourse = {
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: "Open" | "Closed" | "In Progress";
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  complete: boolean;
  syllabus: {
    week: number;
    topic: string;
    content: string;
  };
};

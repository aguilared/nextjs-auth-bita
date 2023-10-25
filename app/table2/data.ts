export type BitaEvents = {
  id: number;
  bitacora_id: number;
  event_date: string;
  created_at: string;
  updated_at: string;
  bitacora: {
    author: {
      name: string;
    };
  };
  event: {
    description: string;
  };
  tipoEvent: {
    description: string;
  };
};
//no loo use mmas
export const datas: Student[] = [
  {
    studentId: 1111,
    name: "Bahar Constantia",
    dateOfBirth: "1984-01-04",
    major: "Computer Science",
  },
  {
    studentId: 2222,
    name: "Harold Nona",
    dateOfBirth: "1961-05-10",
    major: "Communications",
  },
  {
    studentId: 3333,
    name: "Raginolf Arnulf",
    dateOfBirth: "1991-10-12",
    major: "Business",
  },
  {
    studentId: 4444,
    name: "Marvyn Wendi",
    dateOfBirth: "1978-09-24",
    major: "Psychology",
  },
];

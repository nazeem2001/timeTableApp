export const formNames = ['Timetable', 'Faculty Work Load'];
export type resultType2 =
  | {
      time?: string;
      subject?: string;
      venue?: string;
      roomNo?: string;
      day?: string;
      course?: string;
      branch?: string;
    }
  | string;

export type FacultyResultType = resultType2[][];

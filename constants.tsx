export const formNames = ['Form1', 'Form2'];
export type resultType2 =
  | {
      time?: string;
      subject?: string;
      venue?: string;
      roomNo?: string;
      day?: string;
    }
  | string;

export type FacultyResultType = resultType2[][];

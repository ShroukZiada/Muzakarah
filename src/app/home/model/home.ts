export namespace Home {

 export interface user {
  id: string,
  name: string,
  stage: string
 }

 export interface subject {
  isOpen: boolean;
  nameen: string,
  id: number,
  name: string,
  description: string
  stage: string
  unites: string,
  lessons: string,
  time: string,
  Achievement: string,
  tests: string,
  result: string,
  Rating: string,
  Notes: string,
  translatedName: string; // Optional property for translated name
  translatedDescription: string;
 }
}

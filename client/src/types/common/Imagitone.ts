import { Suggestion } from "./Suggestion";
import { User } from "./User";

export interface Imagitone extends Suggestion {
  author: User;
  photoURL: string;
}

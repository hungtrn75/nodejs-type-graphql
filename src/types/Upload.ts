import { Stream } from "stream";

export interface Upload {
  filename: string;
  mintype: string;
  encoding: string;
  createReadStream: () => Stream;
}

import { Email } from "./email";

export class Sender {
    id: number;
    name: string;
    email: string;
    emails: Email[] = [];
}

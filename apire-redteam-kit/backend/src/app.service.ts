import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello from APIRE RedTeam Kit API!";
  }
}

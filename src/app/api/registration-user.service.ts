import { Injectable } from "@angular/core";
import { format } from "date-fns";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RegistrationUserService {
  url = "https://domiaguadas.digital/pruebas/data/registerUser.php";
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  // Create a new item
  registerUser(item) {
    item['birthdate'] = item['birthdate'] != '' ? format(new Date(item['birthdate']), "yyyy-MM-dd") : item['birthdate'] = null
    return this.http
      .post(this.url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(0), catchError(this.handleError));
  }
}

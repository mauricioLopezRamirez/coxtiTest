import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.compareTime();
    setInterval(this.compareTime, 60000);
  }

  get logged() {
    return localStorage.getItem("isLogged");
  }

  setUser(data) {
    this.setTimeSession();
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("dataUser", data);
  }

  get User() {
    return localStorage.getItem("dataUser");
  }

  endSession() {
    localStorage.isLogged = "false";
    localStorage.setItem("dataUser", "");
    this.router.navigate(["login"]);
  }

  compareTime() {
    let timeRegister = moment(new Date(localStorage.getItem("time"))); //now
    let timeNow = moment(new Date());
    if (
      localStorage.getItem("isLogged") == "true" &&
      timeNow.diff(timeRegister, "minutes") >= 5
    ) {
      localStorage.isLogged = "false";
      localStorage.setItem("dataUser", "");
      window.location.href = "/login";
    }
  }

  setTimeSession() {
    let time = moment(new Date());
    localStorage.setItem("time", time.toString());
  }
}

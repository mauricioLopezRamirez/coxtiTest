import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionService } from "../sessionControl/session.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit{
  constructor(private router: Router, public sessionControl: SessionService) {}

  ngOnInit() {
    if (this.sessionControl.logged == "false") {
      this.router.navigate(["login"]);
    } else {
    }  
  }


  finishSession() {
    this.sessionControl.endSession();
  }
  registerPage() {
    this.router.navigate(["registration"]);
  }
}

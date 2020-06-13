import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginService } from "../api/login.service";
import { SessionService } from "../sessionControl/session.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    public apiService: LoginService,
    public sessionControl: SessionService
  ) {}

  ngOnInit() {
    if (this.sessionControl.logged == "true") {
      this.router.navigate(["home"]);
    } else {
    }
  }

  registerPage() {
    this.router.navigate(["registration"]);
  }

  //login information
  loginInformation = new FormGroup({
    username: new FormControl("", Validators.compose([Validators.required])),
    password: new FormControl("", Validators.compose([Validators.required])),
  });

  get username() {
    return this.loginInformation.get("username");
  }
  get password() {
    return this.loginInformation.get("password");
  }

  public errorMessages = {
    username: [{ type: "required", message: "Nickname or Email is required" }],
    password: [{ type: "required", message: "Password card is required" }],
  };

  login() {
    if (this.loginInformation.status == "VALID") {
      this.apiService
        .login(this.loginInformation.value)
        .subscribe((response) => {
          if (response["status"] == undefined) {
            this.sessionControl.setUser(
              JSON.stringify(response).replace("]", "").replace("[", "")
            );
            this.router.navigate(["home"]);
          } else {
            alert("Autentication error");
          }
        });
    } else {
      alert("Complete the form");
    }
  }
}

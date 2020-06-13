import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { PasswordValidator } from "../validators/passwordValidator";
import { EmailValidatorEquals } from "../validators/emailValidatorEquals";
import { RegistrationUserService } from "../api/registration-user.service";
import { SessionService } from "../sessionControl/session.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.page.html",
  styleUrls: ["./registration.page.scss"],
})
export class RegistrationPage implements OnInit {
  private dataForms = [
    "Personal Information",
    "Contact Information",
    "Account credentials",
  ];

  private numForms = this.dataForms.length;
  private valuePorcent = 100 / this.numForms;
  private porcent = this.valuePorcent;
  private idForm = 0;
  private titleForm = this.dataForms[0];
  private nextTitleForm = this.dataForms[1];
  private showFormPersoInfor = true;
  private showFormContacInfo = false;
  private showFormCredentials = false;

  constructor(
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    public apiService: RegistrationUserService,
    public loadingController: LoadingController,
    public sessionControl: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.sessionControl.logged == "true") {
      let data = JSON.parse(localStorage.getItem("dataUser"));

      this.personalInformation.setValue({
        fullName: data["fullName"],
        idCard: data["idCard"],
        birthdate: data["birthdate"],
        ocupation: data["ocupation"],
        gender: data["gender"],
      });

      this.contactInformation.setValue({
        phoneNumber: data["phoneNumber"],
        alterPhoneNumber: data["alterPhoneNumber"],
        email: data["email"],
        confirmEmail: data["confirmEmail"],
      });

      this.credentialsInformation.setValue({
        nickname: data["nickname"],
        password: data["password"],
        confirmPassword: data["confirmPassword"],
      });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Alert",
      message: "Please complete the required fields",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
      duration: 400,
    });
    await loading.present();
  }
  async stopLoading() {
    await this.loadingController.dismiss();
  }

  //personal information
  personalInformation = new FormGroup({
    fullName: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("[a-zA-Z ]+"),
        Validators.maxLength(30),
        Validators.minLength(10),
      ])
    ),
    idCard: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("[a-zA-Z0-9]+"),
        Validators.maxLength(30),
        Validators.minLength(10),
      ])
    ),
    birthdate: new FormControl(""),
    ocupation: new FormControl(
      "",
      Validators.compose([
        Validators.pattern("[a-zA-Z ]+"),
        Validators.maxLength(30),
        Validators.minLength(10),
      ])
    ),
    gender: new FormControl(""),
  });

  //contac information
  contactInformation = new FormGroup({
    phoneNumber: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.maxLength(13),
        Validators.minLength(7),
      ])
    ),
    alterPhoneNumber: new FormControl(
      "",
      Validators.compose([
        Validators.pattern("[0-9]+"),
        Validators.maxLength(12),
        Validators.minLength(7),
      ])
    ),
    email: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        Validators.maxLength(60),
        Validators.minLength(5),
      ])
    ),
    confirmEmail: new FormControl(
      "",
      Validators.compose([EmailValidatorEquals.validEmail])
    ),
  });

  //Credentials Information
  credentialsInformation = new FormGroup({
    nickname: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("[a-z0-9]+"),
        Validators.maxLength(20),
        Validators.minLength(5),
      ])
    ),
    password: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.maxLength(60),
        Validators.minLength(5),
      ])
    ),
    confirmPassword: new FormControl(
      "",
      Validators.compose([PasswordValidator.validPassword, Validators.required])
    ),
  });

  private contentForms = [
    this.personalInformation,
    this.contactInformation,
    this.credentialsInformation,
  ];

  //personal information
  get fullName() {
    return this.personalInformation.get("fullName");
  }
  get idCard() {
    return this.personalInformation.get("idCard");
  }
  get birthdate() {
    return this.personalInformation.get("birthdate");
  }
  get ocupation() {
    return this.personalInformation.get("ocupation");
  }
  get gender() {
    return this.personalInformation.get("gender");
  }

  //contact information
  get phoneNumber() {
    return this.contactInformation.get("phoneNumber");
  }
  get alterPhoneNumber() {
    return this.contactInformation.get("alterPhoneNumber");
  }
  get email() {
    return this.contactInformation.get("email");
  }
  get confirmEmail() {
    return this.contactInformation.get("confirmEmail");
  }

  //credentials Information
  get nickname() {
    return this.credentialsInformation.get("nickname");
  }
  get password() {
    return this.credentialsInformation.get("password");
  }
  get confirmPassword() {
    return this.credentialsInformation.get("confirmPassword");
  }

  public errorMessages = {
    fullName: [
      { type: "required", message: "Full name is required" },
      { type: "minlength", message: "Enter your full name" },
      { type: "maxlength", message: "Number of letters exceeded" },
      { type: "pattern", message: "Only letters." },
    ],
    idCard: [
      { type: "required", message: "Identification card is required" },
      { type: "pattern", message: "Please enter a valid id card" },
    ],
    ocupation: [
      { type: "pattern", message: "Please enter a valid ocupation" },
      { type: "minlength", message: "Very few characters" },
      { type: "maxlength", message: "Number of characters exceeded" },
    ],
    phoneNumber: [
      { type: "required", message: "Phone Number is required" },
      { type: "minlength", message: "Enter a valid Number" },
      { type: "maxlength", message: "Enter a valid number" },
      { type: "pattern", message: "Only Numbers." },
    ],
    alterPhoneNumber: [
      { type: "minlength", message: "Enter a valid Number" },
      { type: "maxlength", message: "Enter a valid number" },
      { type: "pattern", message: "Only Numbers." },
    ],
    email: [
      { type: "required", message: "Email is required" },
      { type: "minlength", message: "Enter a valid Email" },
      { type: "maxlength", message: "Enter a valid Email" },
      { type: "pattern", message: "Only Email adrees." },
    ],
    confirmEmail: [
      { type: "minlength", message: "Enter a valid Email" },
      { type: "maxlength", message: "Enter a valid Email" },
      { type: "pattern", message: "Only Email adrees." },
      { type: "validEmail", message: "Email must be the same" },
    ],
    nickname: [
      { type: "required", message: "NickName is required" },
      { type: "minlength", message: "Must be greater than 5 characters" },
      { type: "maxlength", message: "Must be less than 20 characters" },
      { type: "pattern", message: "Only numbers and letters" },
    ],
    password: [
      { type: "required", message: "Password is required" },
      { type: "minlength", message: "Must be greater than 5 characters" },
      { type: "maxlength", message: "Must be less than 60 characters" },
    ],
    confirmPassword: [
      { type: "required", message: "Confirm Password is required" },
      { type: "validPassword", message: "Passwords must be the same" },
    ],
  };

  public submit() {
    console.log(this.personalInformation.value);
  }

  nextForm() {
    if (this.idForm < this.dataForms.length - 1) {
      if (this.contentForms[this.idForm].status == "VALID") {
        this.idForm++;
        this.porcent += this.valuePorcent;
        this.titleForm = this.dataForms[this.idForm];
        if (this.idForm == this.dataForms.length - 1) {
          this.nextTitleForm = "Ended Process";
        } else {
          this.nextTitleForm = this.dataForms[this.idForm + 1];
        }
        if (this.showFormPersoInfor) {
          this.showFormPersoInfor = false;
          this.showFormContacInfo = true;
        } else if (this.showFormContacInfo) {
          this.showFormCredentials = true;
          this.showFormContacInfo = false;
        }
      } else {
        this.presentAlert();
      }
    } else if (this.idForm == 2) {
      if (
        this.credentialsInformation.status == "VALID" &&
        this.personalInformation.status == "VALID" &&
        this.contactInformation.status == "VALID"
      ) {
        this.presentLoading();
        let data = Object.assign(
          this.personalInformation.value,
          this.contactInformation.value,
          this.credentialsInformation.value
        );
        this.apiService.registerUser(data).subscribe((response) => {
          console.log(response);
          if (response["status"] == "ok") {
            this.sessionControl.setUser(JSON.stringify(data));
            this.router.navigate(["home"]);
          } else {
            alert("There was an error");
          }
        });
      } else {
        this.presentAlert();
      }
    }
  }

  previousForm() {
    if (this.idForm > 0) {
      this.idForm--;
      this.porcent -= this.valuePorcent;
      this.titleForm = this.dataForms[this.idForm];
      this.nextTitleForm = this.dataForms[this.idForm + 1];
      if (this.showFormPersoInfor) {
        this.showFormPersoInfor = false;
        this.showFormContacInfo = true;
      } else if (this.showFormPersoInfor) {
      } else if (this.showFormContacInfo) {
        this.showFormPersoInfor = true;
        this.showFormContacInfo = false;
      } else if (this.showFormCredentials) {
        this.showFormCredentials = false;
        this.showFormContacInfo = true;
      }
    } else {
      if (this.sessionControl.logged == "true") {
        this.router.navigate(["home"]);
      } else {
        this.router.navigate(["login"]);
      }
    }
  }
}

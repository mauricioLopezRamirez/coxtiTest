import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RegistrationPageRoutingModule } from "./registration-routing.module";

import { RegistrationPage } from "./registration.page";

import { NgCircleProgressModule } from "ng-circle-progress";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 0.05 * screen.height,
      showUnits: false,
      percent: 33.333,
      showSubtitle: false,
      space: -7,
      outerStrokeWidth: 7,
      outerStrokeColor: "#7ae62e",
      innerStrokeColor: "#DDDDDE",
      innerStrokeWidth: 7,
      animateTitle: false,
      animationDuration: 1000,
      showBackground: false,
      clockwise: true,
      startFromZero: false,
    }),
  ],
  declarations: [RegistrationPage],
})
export class RegistrationPageModule {}

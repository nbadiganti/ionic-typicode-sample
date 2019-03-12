import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController, ToastController } from "ionic-angular";

@Injectable()
export class UtilsProvider {
  isDev: boolean = true;
  loading: any;

  constructor(
    public http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  log(message: any, error?: any) {
    if (this.isDev) {
      console.log(message, error);
    }
  }

  showLoader(message?: string, duration?: any) {
    let msg = message != null ? message : "Loading, please Wait...";
    this.loading = this.loadingCtrl.create({
      spinner: "hide",
      content: msg,
      duration: 5000
    });

    this.loading.onDidDismiss(() => {
      console.log("Dismissed loading");
    });

    this.loading.present();
  }

  hideLoader() {
    if (this.loading) {
      this.loading.dismiss();
    } else {
      console.log("failed to dismiss loader");
    }
  }

  showToast(message: string, error?: any) {
    console.log(message, error);
    this.toastCtrl
      .create({
        message: message
          ? message
          : "Failed to update details. Please try again",
        duration: 2000
      })
      .present();
  }

  showToastError(message: string, error?: any) {
    this.toastCtrl
      .create({
        message: message
          ? message
          : "Failed to update details. Please try again",
        showCloseButton: true,
        cssClass: "toast-danger",
        position: "bottom"
      })
      .present();
  }
}

import { BASE_URL, URLS } from "./../../app/config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { ToastController } from "ionic-angular";

@Injectable()
export class AuthProvider {
  constructor(public http: HttpClient, private toastCtrl: ToastController) {
    console.log("Hello AuthProvider Provider");
  }

  userLogin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + URLS.users + "?email=" + data, data).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getUserPosts(userId?: any): Promise<any> {
    console.log(userId);
    let userIdParam = "";
    if (userId) userIdParam = "?userId=" + userId;
    else {
      userIdParam = "";
    }
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + URLS.posts + userIdParam).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getAllPosts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(BASE_URL + URLS.posts).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  postUserBlogItem(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(BASE_URL + URLS.posts, body).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
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

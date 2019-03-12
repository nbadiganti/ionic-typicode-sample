import { LOCALSTORAGE } from "./../../app/config";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NewpostPage } from "../newpost/newpost";
import { Storage } from "@ionic/storage";
import { P } from "@angular/core/src/render3";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  userId: any = 1;
  userPosts: any = [];
  userLocalPosts: any = [];
  constructor(
    public navCtrl: NavController,
    private auth: AuthProvider,
    private storage: Storage
  ) {}

  ionViewDidEnter() {
    this.storage.get(LOCALSTORAGE.USERID).then(
      data => {
        console.log(data);
        if (data) this.loadUserPosts(data);
      },
      error => {
        this.auth.showToastError("Unable to load user posts");
      }
    );

    this.storage.get(LOCALSTORAGE.USERLOCALPOSTS).then(
      data => {
        if (data) this.loadLocalPosts(data);
      },
      error => {
        this.auth.showToastError("Unable to load user posts");
      }
    );
  }

  loadUserPosts(userId: any) {
    this.auth.getUserPosts(userId).then(
      data => {
        if (data && data.length > 0) {
          // this.userPosts = data.filter(c => c.userId == this.userId);
          this.userPosts = data;
        }
      },
      error => {
        this.auth.showToastError("Unable to load user posts");
      }
    );
  }

  newPost() {
    this.navCtrl.push(NewpostPage);
  }

  loadLocalPosts(data) {
    this.userLocalPosts = JSON.parse(data);
  }
}

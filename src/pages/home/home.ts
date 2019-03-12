import { BlogPost } from "./../../models/blogpost";
import { UtilsProvider } from "./../../providers/utils/utils";
import { LOCALSTORAGE } from "./../../app/config";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { NewpostPage } from "../newpost/newpost";
import { Storage } from "@ionic/storage";

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
    private storage: Storage,
    private utils: UtilsProvider
  ) {}

  ionViewDidEnter() {
    this.storage.get(LOCALSTORAGE.USERID).then(
      data => {
        console.log(data);
        if (data) this.loadUserPosts(data);
      },
      error => {
        this.utils.showToastError("Unable to load user posts");
      }
    );

    this.storage.get(LOCALSTORAGE.USERLOCALPOSTS).then(
      data => {
        if (data) this.loadLocalPosts(data);
      },
      error => {
        this.utils.showToastError("Unable to load user posts");
      }
    );
  }

  loadUserPosts(userId: any) {
    this.utils.showLoader();
    this.auth.getUserPosts(userId).subscribe(
      (data: BlogPost[]) => {
        this.utils.hideLoader();
        if (data && data.length > 0) {
          this.userPosts = data;
        }
      },
      error => {
        this.utils.hideLoader();
        this.utils.showToastError("Unable to load user posts");
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

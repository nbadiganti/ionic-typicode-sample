import { LOCALSTORAGE } from "./../../app/config";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ThrowStmt } from "@angular/compiler";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-newpost",
  templateUrl: "newpost.html"
})
export class NewpostPage {
  postTitle: string;
  postDescription: string;
  userId: any;
  USERPOSTSARRAY: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private storage: Storage
  ) {
    this.storage.get(LOCALSTORAGE.USERID).then(
      data => {
        if (data) this.userId = data;
      },
      error => {
        this.auth.showToastError("Unable to load user posts");
        console.log(error);
      }
    );

    this.storage.get(LOCALSTORAGE.USERLOCALPOSTS).then(
      data => {
        if (data) this.USERPOSTSARRAY = JSON.parse(data);
      },
      error => {
        this.auth.showToastError("Unable to load user posts");
        console.log(error);
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NewpostPage");
  }

  // Posting the data to API server endpoint
  doNewPost() {
    if (this.postTitle && this.postDescription && this.userId) {
      let body = {
        title: this.postTitle,
        body: this.postDescription,
        userId: this.userId
      };
      this.auth.postUserBlogItem(body).then(
        data => {
          console.log(data);
          this.auth.showToast("Posted successfully.");
          this.clearFields();
        },
        error => {
          console.log(error);
        }
      );

      // storing the post data locally
      this.USERPOSTSARRAY.push(body);
      this.storage.set(
        LOCALSTORAGE.USERLOCALPOSTS,
        JSON.stringify(this.USERPOSTSARRAY)
      );
      console.log(this.USERPOSTSARRAY);
    } else {
      alert("Please fill all the fields");
    }
  }

  clearFields() {
    this.postDescription = "";
    this.postTitle = "";
  }
}

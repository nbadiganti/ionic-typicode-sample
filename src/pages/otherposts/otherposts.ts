import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-otherposts",
  templateUrl: "otherposts.html"
})
export class OtherPostsPage {
  otherUserPosts: any;
  userId: any;

  constructor(public navCtrl: NavController, public auth: AuthProvider) {
    this.loadUserPosts();
  }

  loadUserPosts() {
    this.auth.getUserPosts().then(
      data => {
        console.log(data);
        if (data && data.length > 0) {
          this.otherUserPosts = data.filter(c => c.userId != this.userId);
          console.log(this.otherUserPosts);
        }
      },
      error => {
        console.log("error", error);
      }
    );
  }
}

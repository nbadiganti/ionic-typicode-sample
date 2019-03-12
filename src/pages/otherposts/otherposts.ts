import { BlogPost } from "./../../models/blogpost";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UtilsProvider } from "../../providers/utils/utils";

@Component({
  selector: "page-otherposts",
  templateUrl: "otherposts.html"
})
export class OtherPostsPage {
  otherUserPosts: any;
  userId: any;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider,
    private utils: UtilsProvider
  ) {
    this.loadUserPosts();
  }

  loadUserPosts() {
    this.auth.getUserPosts().subscribe(
      (data: BlogPost[]) => {
        console.log(data);
        if (data && data.length > 0) {
          this.otherUserPosts = data.filter(c => c.userId != this.userId);
          this.utils.log(this.otherUserPosts);
        }
      },
      error => {
        console.log("error", error);
      }
    );
  }
}

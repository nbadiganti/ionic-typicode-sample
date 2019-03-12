import { LOCALSTORAGE } from "./../../app/config";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ThrowStmt } from "@angular/compiler";
import { Storage } from "@ionic/storage";
import { UtilsProvider } from "../../providers/utils/utils";
import { NewBlogPost } from "../../models/newblogmodel";

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
    private utils: UtilsProvider,
    private storage: Storage
  ) {
    this.storage.get(LOCALSTORAGE.USERID).then(
      data => {
        if (data) this.userId = data;
      },
      error => {
        this.utils.showToastError("Unable to load user posts");
        this.utils.log(error);
      }
    );

    this.storage.get(LOCALSTORAGE.USERLOCALPOSTS).then(
      data => {
        if (data) this.USERPOSTSARRAY = JSON.parse(data);
      },
      error => {
        this.utils.showToastError("Unable to load user posts");
        this.utils.log(error);
      }
    );
  }

  ionViewDidLoad() {
    this.utils.log("ionViewDidLoad NewpostPage");
  }

  // Posting the data to API server endpoint
  doNewPost() {
    if (this.postTitle && this.postDescription && this.userId) {
      this.utils.showLoader();
      let newPostItem = new NewBlogPost(
        this.userId,
        this.postTitle,
        this.postDescription
      );

      this.auth.postUserBlogItem(newPostItem).subscribe(
        (data: any) => {
          this.utils.hideLoader();
          this.utils.log(data);
          this.utils.showToast("Posted successfully.");
          this.clearFields();
        },
        error => {
          this.utils.hideLoader();
          this.utils.log(error);
        }
      );
      // it stores the blog post locally and fetches in the next request for user posts page
      this.storeBlogPostLocally(newPostItem);
    } else {
      this.utils.showToast("Please fill all the fields");
    }
  }

  storeBlogPostLocally(postItem) {
    // storing the post data locally
    this.USERPOSTSARRAY.push(postItem);
    this.storage.set(
      LOCALSTORAGE.USERLOCALPOSTS,
      JSON.stringify(this.USERPOSTSARRAY)
    );
    this.utils.log(this.USERPOSTSARRAY);
  }

  clearFields() {
    this.postDescription = "";
    this.postTitle = "";
  }
}

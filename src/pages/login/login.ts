import { LOCALSTORAGE } from "./../../app/config";
import { TabsPage } from "./../tabs/tabs";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController, NavParams, UrlSerializer } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  private userEmail: any = "Sincere@april.biz";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  /*
   * It will check for the user in the API, if the user is authenticated, it will go to the home page.
   */
  doLogin() {
    if (this.userEmail) {
      this.auth.userLogin(this.userEmail).then(
        data => {
          console.log(data);
          if (data && data.length > 0 && data[0].id) {
            this.storage.set(LOCALSTORAGE.USERID, data[0].id);
            this.storage.set(LOCALSTORAGE.USEREMAIL, data[0].email);

            this.auth.showToast("User login successful.");
            this.navCtrl.setRoot(TabsPage);
          } else {
            this.auth.showToast("User not found. Please try again");
          }
        },
        error => {
          console.log(error);
          this.auth.showToast("User not found. Please try again");
        }
      );
    } else {
      this.auth.showToastError("Invalid email. Please try again");
    }
  }
}

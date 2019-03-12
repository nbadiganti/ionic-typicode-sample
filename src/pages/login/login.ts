import { UserModel } from "./../../models/usermodel";
import { LOCALSTORAGE } from "./../../app/config";
import { TabsPage } from "./../tabs/tabs";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { UtilsProvider } from "../../providers/utils/utils";

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
    private storage: Storage,
    private utils: UtilsProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  /*
   * It will check for the user in the API, if the user is authenticated, it will go to the home page.
   */
  doLogin() {
    if (this.userEmail) {
      this.validateUser(this.userEmail);
    } else {
      this.utils.showToastError("Invalid email. Please try again");
    }
  }

  validateUser(email: string) {
    this.utils.showLoader();
    this.auth.userLogin(email).subscribe(
      (data: UserModel[]) => {
        this.utils.hideLoader();
        this.utils.log(data);
        if (data && data.length > 0 && data[0].id) {
          this.storeUserInfo(data[0]); // it stores the user information for future requests
          this.utils.showToast("User login successful.");
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.utils.showToast("User not found. Please try again");
        }
      },
      error => {
        this.utils.hideLoader();
        this.utils.log(error);
        this.utils.showToast("User not found. Please try again");
      }
    );
  }

  storeUserInfo(userObj) {
    this.storage.set(LOCALSTORAGE.USERID, userObj.id);
    this.storage.set(LOCALSTORAGE.USEREMAIL, userObj.email);
  }
}

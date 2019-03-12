import { NewpostPage } from "./../pages/newpost/newpost";
import { LoginPage } from "./../pages/login/login";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthProvider } from "../providers/auth/auth";
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { OtherPostsPage } from "../pages/otherposts/otherposts";

@NgModule({
  declarations: [
    MyApp,
    OtherPostsPage,
    HomePage,
    TabsPage,
    LoginPage,
    NewpostPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OtherPostsPage,
    HomePage,
    TabsPage,
    LoginPage,
    NewpostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider
  ]
})
export class AppModule {}

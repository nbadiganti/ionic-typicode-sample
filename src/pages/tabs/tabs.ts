import { Component } from "@angular/core";

import { HomePage } from "../home/home";
import { OtherPostsPage } from "../otherposts/otherposts";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = OtherPostsPage;

  constructor() {}
}

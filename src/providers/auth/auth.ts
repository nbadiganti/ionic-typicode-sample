import { BlogPost } from "./../../models/blogpost";
import { BASE_URL, URLS } from "./../../app/config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { UserModel } from "../../models/usermodel";

import "rxjs/add/operator/map";
import { NewBlogPost } from "../../models/newblogmodel";

@Injectable()
export class AuthProvider {
  constructor(public http: HttpClient) {
    console.log("Hello AuthProvider Provider");
  }

  userLogin(data: any): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BASE_URL + URLS.users + "?email=" + data);
  }

  getUserPosts(userId?: any): Observable<BlogPost[]> {
    let userIdParam = "";
    if (userId) userIdParam = "?userId=" + userId;
    return this.http.get<BlogPost[]>(BASE_URL + URLS.posts + userIdParam);
  }

  // getAllPosts(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.http.get<BlogPost[]>(BASE_URL + URLS.posts).subscribe(
  //       res => {
  //         resolve(res);
  //       },
  //       err => {
  //         reject(err);
  //       }
  //     );
  //   });
  // }

  postUserBlogItem(body: NewBlogPost): Observable<any> {
    return this.http.post(BASE_URL + URLS.posts, body);
  }
}

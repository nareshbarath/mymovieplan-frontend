import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShowsServiceService {
  private baseURL: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  addShow(body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.post(`${this.baseURL}/shows/addshow`, body, { headers });
  }

  upComingShows(): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.get(`${this.baseURL}/shows/upcoming`, { headers });
  }

  getShowsbymovie(id: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.get(`${this.baseURL}/shows/bymovie/${id}`, { headers });
  }

  updateShowStatus(id: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.patch(
      `${this.baseURL}/shows/updatestatus/${id}`,
      {},
      {
        headers
      }
    );
  }
}

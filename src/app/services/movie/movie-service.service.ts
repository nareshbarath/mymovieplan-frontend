import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MovieServiceService {
  private baseURL: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  addMovie(body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.post(`${this.baseURL}/movie/addmovie`, body, { headers });
  }

  listMovie(): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.get(`${this.baseURL}/movie/listmovie`, { headers });
  }

  listActiveMovie(): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.get(`${this.baseURL}/movie/activemovies`, { headers });
  }

  updateMovie(id: any, body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.patch(`${this.baseURL}/movie/updatemovie/${id}`, body, {
      headers
    });
  }

  updateMovieStatus(id: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.patch(
      `${this.baseURL}/movie/updatestatus/${id}`,
      {},
      {
        headers
      }
    );
  }
}

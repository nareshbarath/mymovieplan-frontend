import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GenreServiceService {
  private baseURL: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  addGenre(body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.post(`${this.baseURL}/genre/addgenre`, body, { headers });
  }

  listGenre(): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.get(`${this.baseURL}/genre/listgenres`, { headers });
  }

  updateGenre(id: any, body: any): Observable<Object> {
    let headers = new HttpHeaders().set(
      "authorization",
      `Bearer ${localStorage.getItem("token")}` || ""
    );
    return this.http.patch(`${this.baseURL}/genre/updategenre/${id}`, body, {
      headers
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"]
})
export class BookingComponent implements OnInit {
  show: any;
  movie: any;
  count: any;
  payment: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.show = sessionStorage.getItem("show");
    this.show = JSON.parse(this.show);
    this.movie = sessionStorage.getItem("movie");
    this.movie = JSON.parse(this.movie);
    this.count = sessionStorage.getItem("count");
    this.count = Number(this.count);
  }

  Payment() {
    this.payment = true;
  }

  pay() {
    this.router.navigateByUrl("listmovies").then(() => {
      Swal.fire("Success", "Booking successful", "success");
    });
  }
}

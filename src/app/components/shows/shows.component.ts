import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MovieServiceService } from "src/app/services/movie/movie-service.service";
import { ShowsServiceService } from "src/app/services/shows/shows-service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-shows",
  templateUrl: "./shows.component.html",
  styleUrls: ["./shows.component.css"]
})
export class ShowsComponent implements OnInit {
  movies: any = [];
  movieDropdown: any = [];
  shows: any = [];
  today = new Date();
  times: any = ["9:00", "12:30", "16:00", "19:30", "23:00"];

  constructor(
    private movieService: MovieServiceService,
    private showsService: ShowsServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.movieService.listActiveMovie().subscribe(
      (res: any) => {
        this.movies = res.data;
        this.movieDropdown = res.data;
        const tempMovie: any = {};
        for (const movie of this.movies) {
          tempMovie[movie["id"]] = movie;
        }
        this.movies = tempMovie;
      },
      err => {}
    );

    this.showsService.upComingShows().subscribe(
      (res: any) => {
        this.shows = res.data;
        if (this.shows.length == 0) Swal.fire("", "No data found", "warning");
      },
      err => {
        Swal.fire("", "No data found", "warning");
      }
    );
  }

  add(mymodal: any) {
    this.modalService.open(mymodal, { ariaLabelledBy: "add-show" });
  }

  addShow(addShowForm: any) {
    this.showsService.addShow(addShowForm.value).subscribe(
      (res: any) => {
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      err => {
        Swal.fire("", err.error.message, "warning");
      }
    );
  }

  statusUpdate(id: any) {
    this.showsService.updateShowStatus(id).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      err => {
        Swal.fire("", err.error.message, "warning");
      }
    );
  }
}

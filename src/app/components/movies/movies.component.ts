import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GenreServiceService } from "src/app/services/genre/genre-service.service";
import { MovieServiceService } from "src/app/services/movie/movie-service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.css"]
})
export class MoviesComponent implements OnInit {
  editFormValues: any = {};
  movies: any = [];
  genres: any = [];

  constructor(
    private movieService: MovieServiceService,
    private genreService: GenreServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.editFormValues = {};
    this.movieService.listMovie().subscribe(
      (res: any) => {
        this.movies = res.data;
        if (this.movies.length == 0) Swal.fire("", "No data found", "warning");
      },
      err => {
        Swal.fire("", "No data found", "warning");
      }
    );
    this.genreService.listGenre().subscribe(
      (res: any) => {
        this.genres = res.data;
      },
      err => {}
    );
  }

  add(mymodal: any) {
    this.editFormValues = {};
    this.modalService.open(mymodal, { ariaLabelledBy: "add-movie" });
  }

  addMovie(addMovieForm: any, id?: number) {
    if (id) {
      this.movieService.updateMovie(id, addMovieForm.value).subscribe(
        (res: any) => {
          this.modalService.dismissAll();
          this.ngOnInit();
        },
        err => {
          console.log(err);
          Swal.fire("", err.error.message, "warning");
        }
      );
    } else {
      this.movieService.addMovie(addMovieForm.value).subscribe(
        (res: any) => {
          this.modalService.dismissAll();
          this.ngOnInit();
        },
        err => {
          console.log(err);
          Swal.fire("", err.error.message, "warning");
        }
      );
    }
  }

  edit(id: any, mymodal: any) {
    const findEditSeller = this.movies.filter(
      (movie: any) => movie.id == id
    )[0];
    this.editFormValues = {
      id: findEditSeller.id,
      movieName: findEditSeller.movieName,
      movieImage: findEditSeller.movieImage,
      movieDescription: findEditSeller.movieDescription,
      price: findEditSeller.price,
      movieGenre: findEditSeller.movieGenre
    };

    this.modalService.open(mymodal, { ariaLabelledBy: "add-movie" });
  }

  statusUpdate(id: any) {
    this.movieService.updateMovieStatus(id).subscribe(
      (res: any) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
        Swal.fire("", err.error.message, "warning");
      }
    );
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GenreServiceService } from "src/app/services/genre/genre-service.service";
import { MovieServiceService } from "src/app/services/movie/movie-service.service";
import { ShowsServiceService } from "src/app/services/shows/shows-service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-movies",
  templateUrl: "./list-movies.component.html",
  styleUrls: ["./list-movies.component.css"]
})
export class ListMoviesComponent implements OnInit {
  movies: any = [];
  genres: any = [];
  movieShows: any;
  ticketCountPage: boolean = false;
  searchText?: string;
  sort: any;
  generId: any;
  items: any;

  constructor(
    private router: Router,
    private movieService: MovieServiceService,
    private genreService: GenreServiceService,
    private modalService: NgbModal,
    private showsService: ShowsServiceService
  ) {}

  ngOnInit(): void {
    this.movieService.listActiveMovie().subscribe(
      (res: any) => {
        this.movies = res.data;
        this.items = res.data;
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

  bookTickets(mymodal: any, movie: any) {
    this.ticketCountPage = false;
    sessionStorage.clear();
    sessionStorage.setItem("movie", JSON.stringify(movie));
    this.showsService.getShowsbymovie(movie.id).subscribe(
      (res: any) => {
        this.movieShows = res.data;
        if (this.movieShows.length == 0)
          Swal.fire("", "No shows found for this movie", "warning");
        else this.modalService.open(mymodal, { ariaLabelledBy: "add-movie" });
      },
      err => {
        Swal.fire("", "No shows found for this movie", "warning");
      }
    );
  }

  ticketCountSelect(show: any) {
    this.ticketCountPage = true;
    sessionStorage.setItem("show", JSON.stringify(show));
  }

  ticketCount(count: number) {
    sessionStorage.setItem("count", count.toString());
    this.router.navigateByUrl("booking");
    this.modalService.dismissAll();
  }

  search() {
    let filter: any = this.items;

    if (this.searchText) {
      let temp_search = [];
      for (const movie of filter) {
        if (
          movie.movieName.toLowerCase().includes(this.searchText.toLowerCase())
        )
          temp_search.push(movie);
      }
      filter = temp_search;
    }

    if (this.generId) {
      let temp_seller = [];
      for (const movie of filter) {
        if (movie.movieGenre == this.generId) temp_seller.push(movie);
      }
      filter = temp_seller;
    }

    if (this.sort) {
      if (this.sort == 1)
        filter = filter.sort((e: any, f: any) => e.price - f.price);

      if (this.sort == 2)
        filter = filter.sort((e: any, f: any) => f.price - e.price);
    }

    this.movies = filter;
  }
}

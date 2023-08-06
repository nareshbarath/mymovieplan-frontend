import { Component, OnInit, TemplateRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GenreServiceService } from "src/app/services/genre/genre-service.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-genre",
  templateUrl: "./genre.component.html",
  styleUrls: ["./genre.component.css"]
})
export class GenreComponent implements OnInit {
  editFormValues: any = {};
  genres: any = [];

  constructor(
    private genreService: GenreServiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.editFormValues = {};
    this.genreService.listGenre().subscribe(
      (res: any) => {
        this.genres = res.data;
        if (this.genres.length == 0) Swal.fire("", "No data found", "warning");
      },
      err => {
        Swal.fire("", "No data found", "warning");
      }
    );
  }

  add(mymodal: any) {
    this.editFormValues = {};
    this.modalService.open(mymodal, { ariaLabelledBy: "add-genre" });
  }

  edit(id: number, mymodal: any) {
    const findEditGenres = this.genres.filter(
      (genre: any) => genre.id == id
    )[0];

    this.editFormValues = {
      id: findEditGenres.id,
      name: findEditGenres.genre,
      description: findEditGenres.description
    };
    this.modalService.open(mymodal, { ariaLabelledBy: "add-genre" });
  }

  addSeller(addSellerForm: any, id?: number) {
    if (id) {
      this.genreService
        .updateGenre(id, {
          genre: addSellerForm.value.genre,
          description: addSellerForm.value.description
        })
        .subscribe(
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
      this.genreService
        .addGenre({
          genre: addSellerForm.value.genre,
          description: addSellerForm.value.description
        })
        .subscribe(
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
}

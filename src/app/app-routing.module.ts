import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { GenreComponent } from "./components/genre/genre.component";
import { MoviesComponent } from "./components/movies/movies.component";
import { ShowsComponent } from "./components/shows/shows.component";
import { ListMoviesComponent } from "./components/list-movies/list-movies.component";
import { BookingComponent } from "./components/booking/booking.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "genre", component: GenreComponent },
  { path: "movies", component: MoviesComponent },
  { path: "shows", component: ShowsComponent },
  { path: "listmovies", component: ListMoviesComponent },
  { path: "booking", component: BookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

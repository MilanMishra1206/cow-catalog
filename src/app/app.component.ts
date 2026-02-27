import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  private router = inject(Router);

  navigateToHome() {
    this.router.navigate(["/"]);
  }
}

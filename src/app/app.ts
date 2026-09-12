import { Component, inject } from '@angular/core';
import { PostListComponent } from './components/post-list/post-list.component';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  imports: [PostListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private adminService = inject(AdminService);
  isAdminMode = this.adminService.getAdminMode();

  toggleAdminEvent() {
    this.adminService.toggleAdminMode();
  }

}

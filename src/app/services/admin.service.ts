import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private isAdminMode: WritableSignal<boolean> = signal(false);

  getAdminMode() {
    return this.isAdminMode.asReadonly();
  }

  toggleAdminMode(): void {
    this.isAdminMode.update(adminMode => {
      return !adminMode;
    })
  }
}

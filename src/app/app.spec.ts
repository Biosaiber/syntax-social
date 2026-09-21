import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app";

describe('AppComponent', () => {

  it('should create an app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  })

  it('should display the title', () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const html = fixture.nativeElement;
    const title = html.querySelector('h1');

    expect(title.textContent).toBe('SyntaxSocial');
  });

  it('should toggle admin mode', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.toggleAdminEvent();

    expect(app.isAdminMode()).toBe(true);
  });

  it('should display user mode button when admin mode is active', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    app.toggleAdminEvent();
    fixture.detectChanges();

    const html = fixture.nativeElement;
    const button = html.querySelector('footer button');

    expect(button.textContent).toBe('user mode');


  });


});

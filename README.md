## 1. 🔍 Business Analysis

**Syntax Social** is a small social media demo designed to demonstrate modern reactive state management in Angular using **Signals and RxJS Observables**.

The demo allows users to:

- view a list of posts
- like and unlike posts
- repost and unrepost posts
- follow and unfollow authors
- see engagement scores update reactively
- switch between user and admin mode
- edit post captions in admin mode

### Main Goal

The goal of Syntax Social is to demonstrate how different reactive tools in Angular can work together while each is used for the type of problem it handles best.

The project focuses primarily on demonstrating:

- writable and read-only signals
- computed signals
- signal-based inputs
- RxJS Observables
- Signals and RxJS interoperability
- centralized state management
- reactive UI updates

### Business Rules

- A post can be liked or unliked.
- A post can be reposted or unreposted.
- An author can be followed or unfollowed.
- Engagement score is derived from post interactions.
- Post captions can only be edited in admin mode.
- Caption changes should support reactive autosaving without updating the application state on every keystroke.
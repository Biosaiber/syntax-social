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


## 2. 🧭 User Flow


```text
START
   ↓
Syntax Social Feed
```

APP:
- načíta zoznam postov
- zobrazí každý post
- zobrazí autora, caption, likes, reposts a engagement score

USER:
- môže like / unlike post
- môže repost / unrepost post
- môže follow / unfollow autora
- môže zapnúť Admin Mode


### Like / Unlike Post

USER:
- klikne na Like / Unlike

APP:
- zmení like state konkrétneho postu
- upraví počet likes
- prepočíta engagement score
- UI sa aktualizuje reaktívne


### Repost / Unrepost Post

USER:
- klikne na Repost / Unrepost

APP:
- zmení repost state konkrétneho postu
- upraví počet reposts
- prepočíta engagement score
- UI sa aktualizuje reaktívne


### Follow / Unfollow Author

USER:
- klikne na Follow / Unfollow

APP:
- zmení follow state autora
- upraví počet followers
- UI sa aktualizuje reaktívne


### Admin Mode

USER:
- klikne na Enter Admin Mode

APP:
- zapne admin mode
- zobrazí editovateľné caption inputy namiesto statického textu

USER:
- upraví caption

APP:
- zachytáva zmeny captionu
- počká krátky čas bez ďalšieho písania
- uloží novú hodnotu captionu
- aktualizuje state
- UI zobrazí novú hodnotu

#### Service Flows

##### List of posts
```text
PostListComponent
      │
      └── getPostsFromStore()
               ↓
          DataService
               ↓
         postStore Signal
               ↓
          list of posts
```

##### Single post
```text
PostComponent
      │
      ├── receives postId
      │
      ├── getPost(postId)
      │        ↓
      │   DataService
      │        ↓
      │   postStore Signal
      │        ↓
      │   current Post
      │
      └── calculateEngagementScore(post)
               ↓
          engagementScore
```

##### Interactions
```text
PostComponent
      │
      ├── toggleLike(postId)
      ├── toggleRepost(postId)
      ├── toggleFollow(postId)
      └── updateCaption(postId, newCaption)
               ↓
          DataService
               ↓
         postStore.update(...)
               ↓
          reactive UI update
```

##### Admin
```text
AppComponent
      │
      └── toggleAdminMode()
               ↓
          AdminService
               ↓
        isAdminMode Signal
               ↓
     PostComponent template
```


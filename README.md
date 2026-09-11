## **1. 🔍 Business Analysis**

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


## **2. 🧭 User Flow**

```text
START
   ↓
Syntax Social Feed
```

APP:

- loads the list of posts
- displays each post
- displays the author, caption, likes, reposts, and engagement score

USER:

- can like or unlike a post
- can repost or unrepost a post
- can follow or unfollow an author
- can enable Admin Mode

### Like / Unlike Post

USER:

- clicks Like / Unlike

APP:

- changes the like state of the selected post
- updates the number of likes
- recalculates the engagement score
- updates the UI reactively

### Repost / Unrepost Post

USER:

- clicks Repost / Unrepost

APP:

- changes the repost state of the selected post
- updates the number of reposts
- recalculates the engagement score
- updates the UI reactively

### Follow / Unfollow Author

USER:

- clicks Follow / Unfollow

APP:

- changes the follow state of the selected author
- increments or decrements the author's follower count
- updates the user state immutably
- updates the UI reactively

### Admin Mode

USER:

- clicks Enter Admin Mode

APP:

- enables admin mode
- displays editable caption inputs instead of static caption text

USER:

- edits a caption

APP:

- listens for caption changes
- waits for a short period without additional typing
- saves the updated caption
- updates the application state
- displays the updated caption reactively

#### Service Flows

##### List of Posts

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

##### Single Post

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
      ├── getUser(authorId)
      │        ↓
      │   DataService
      │        ↓
      │   userStore Signal
      │        ↓
      │   current User
      │
      └── calculateEngagementScore(post)
               ↓
          engagementScore
```

##### Post Interactions

```text
PostComponent
      │
      ├── toggleLike(postId)
      ├── toggleRepost(postId)
      └── updateCaption(postId, newCaption)
               ↓
          DataService
               ↓
         postStore.update(...)
               ↓
          reactive UI update
```

##### Follow Interaction

```text
PostComponent
      │
      └── toggleFollow(userId)
               ↓
          DataService
               ↓
         userStore.update(...)
               ↓
          reactive UI update
```

##### Admin Mode

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


## **3. 📦 Data Models**

### Post

```typescript
export interface Post {
  id: number;
  authorId: number;
  image: string;
  caption: string;
  likes: number;
  reposts: number;
  isLiked: boolean;
  isReposted: boolean;
}
```

### User

```typescript
export interface User {
  id: number;
  username: string;
  followers: number;
  isFollowed: boolean;
}
```


## **4. ⚙️ Services & State Management**

### Services

#### data.service.ts

Responsibilities:

- manage post state
- manage user state
- expose read-only signals
- handle post interactions
- handle follow interactions
- update captions
- calculate derived engagement data

Methods:

- `getPostsFromStore()`
- `getUsersFromStore()`
- `getPost(id)`
- `getUser(id)`
- `updateCaption(postId, newCaption)`
- `calculateEngagementScore(post)`
- `toggleLike(postId)`
- `toggleRepost(postId)`
- `toggleFollow(userId)`

#### admin.service.ts

Responsibilities:

- manage admin mode state
- toggle between user and admin mode

Methods:

- `toggleAdminMode()`

### State Management

#### Signals

- `postStore` → writable post state owned by `DataService`
- `userStore` → writable user state owned by `DataService`
- components receive read-only access to both stores
- `isAdminMode` → writable admin mode state owned by `AdminService`

#### Derived State

Some values are intentionally not stored directly in the application state.

`engagementScore` is derived from the current post data:

```text
engagementScore = likes + (2 × reposts)
```

Because the score can always be calculated from `likes` and `reposts`, storing it separately would duplicate state and could lead to inconsistent data.

A user's `totalEngagementScore` can similarly be derived from the engagement scores of all posts authored by that user.

```text
User
  ↓
Posts where post.authorId === user.id
  ↓
Engagement score of each post
  ↓
Sum
  ↓
totalEngagementScore
```

This follows the principle:

> Store the source state and derive values that can be calculated from it.

#### RxJS Observable Flow

RxJS is used for caption editing because typing represents a stream of events over time.

```text
Caption input changes
        ↓
Observable
        ↓
debounceTime(...)
        ↓
distinctUntilChanged()
        ↓
updateCaption(...)
        ↓
postStore Signal
        ↓
reactive UI update
```

This allows RxJS to handle the asynchronous input stream while Signals continue to represent the current application state.


## **5. 🧩 Components**

### AppComponent

Responsibilities:

- display the main application layout
- provide the admin mode toggle
- display `PostListComponent`

### PostListComponent

Responsibilities:

- read the list of posts from `DataService`
- render one `PostComponent` for each post
- pass `postId` to each `PostComponent`

### PostComponent

Responsibilities:

- receive `postId` using signal-based input
- read the current post from `DataService`
- read the related author from `DataService`
- display post content and author information
- display likes and reposts
- create and display the computed engagement score
- trigger like / unlike actions
- trigger repost / unrepost actions
- trigger follow / unfollow actions
- react to admin mode
- show an editable caption in admin mode
- trigger the caption autosave flow

### Data Flow

```text
AppComponent
     │
     ▼
PostListComponent
     │
     │ postId
     ▼
PostComponent
     │
     ├── DataService
     │     ├── postStore
     │     └── userStore
     │
     └── AdminService
           └── isAdminMode
```


## **6. 🛣️ Routing**

Routing is not required for this project.

Syntax Social is designed as a single-view social media demo where all primary interactions happen within the same feed.

Users do not navigate between separate application pages. Instead, the UI reacts to state changes such as:

- like / unlike
- repost / unrepost
- follow / unfollow
- admin mode changes
- caption editing

For this reason, introducing Angular Router would add unnecessary complexity without providing a meaningful benefit to the current application flow.


## **7. 🏗️ Architecture Decisions**

### Separate Post and User State

Posts reference their authors using `authorId` instead of embedding a complete `User` object inside every post.

This avoids duplicating user data across multiple posts and keeps user-related state centralized inside `userStore`.

### Derived State Is Not Stored

Values such as `engagementScore` and `totalEngagementScore` are not stored directly when they can be calculated from existing state.

This reduces duplicated state and prevents synchronization problems.

### State Ownership

`postStore` and `userStore` are private writable signals owned by `DataService`.

Components cannot modify these stores directly. They receive read-only signals through the service and request state changes using methods such as:

- `toggleLike()`
- `toggleRepost()`
- `toggleFollow()`
- `updateCaption()`

This keeps state mutations centralized and predictable.

### No AuthorComponent

Author information is displayed directly inside `PostComponent`.

The author UI is small and tightly coupled to a post, so extracting it into a separate component would currently add unnecessary complexity.

### No Angular Router

Syntax Social is a single-view application whose interactions are driven by reactive state changes rather than page navigation.

Angular Router is therefore intentionally not used.

### Signals and RxJS Have Different Responsibilities

Signals represent the current application state and derived reactive values.

RxJS is used where the application needs to handle a stream of events over time, specifically the caption autosave flow.

This keeps each reactive tool focused on the problem it handles best:

```text
Signals → current state and derived state
RxJS    → event streams and time-based operations
```

## **8. 💻 Implementation**

```text
Generate project structure
        ↓
Create interfaces
        ↓
Create services
        ↓
Create components
        ↓
Implement TypeScript logic
        ↓
Implement HTML templates
        ↓
Add CSS styling
```


## **9. ✅ Validation**

To be completed after implementation.


## **10. 🧪 Testing**

To be completed after implementation.


## **11. 🔄 Data Flow & Responsibilities Check**

To be completed after implementation.

The final review should verify:

- Who owns each piece of state?
- Who is allowed to modify that state?
- Are any values unnecessarily duplicated?
- Is business logic kept inside services instead of UI components?
- Does each service have a clear and focused responsibility?
- Does data flow through the application in the intended direction?
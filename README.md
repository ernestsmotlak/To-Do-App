# To-Do-App

React, Node.js, Sqlite.

## Current
 - Footer idea: 
 ```
 <div class="card text-center">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-body-secondary">
    2 days ago
  </div>
</div>
 ```
- Create Footer
- Change the upper right button into a + (Add new Task button).

## CSS Next
- On mobile view on the User.js component the horizontal alignment is not correct.
    - The elements on the right of taskName are not as wide as the taskName div.
- For every task component add on hover functionality

## Next

- The first fetch of the uuid's in the App.js on start is unnecessary.
    - Instead after logging in, wait a 0.5 seconds and just make the /user/uuid of the user, nothing else is needed.

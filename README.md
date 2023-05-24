<p align="center">
  <img src="./omdb.png" width="100">
</p>
<h1 align="center">OMDb</h1>

Dead simple online movie database.

## User manual

### Explore

A page where you can see all movies, search, and filter them.

The explore page is available under the `/explore` route and can be reach by clicking the telescope icon in the floating navigation bar (at the bottom of the screen).

### Gallery

A special page where you can see all the movies you have directed, reviewed, and your top 5 rated movies. You can also create a new movie from here.

The gallery page is available for all logged in user under the `/gallery` route and can be reach by clicking the panorama icon in the floating navigation bar (at the bottom of the screen).

### Profile

A page where you can see your profile information and update your information.
Here you can also see a small dashboard for statistics about your movies. You can also edit your account from here or logout from it by clicking the Settings button.

The profile page is available for all logged in user under the `/profile` route and can be reach by clicking the user icon in the floating navigation bar (at the bottom of the screen).

If you are not logged in, you will be redirected to the login page instead, and the navigation bar will show a lock icon instead.

### Film detail

A page where you can see the details of a movie, including the reviews and ratings. You can also add a review and rating from here if you are logged in and the movie is not your own, or update / delete the movie if it is your own.

The film detail page is available under the `/film?id=:id` route and can be reach by clicking on a movie card in the explore or gallery page.


## Features

- Search movies by title or description
- Filter movies by genre(s), rating, or both
- View movie details with reviews and ratings included
- Similar movies recommendations
- Director's gallery view for your own movie collection


_Built with [React](https://reactjs.dev/) and [Tailwind CSS](https://tailwindcss.com/)_


# Cinemary

Cinemary is an online platform where users can read and make reviews about movies and series. The app interface allows user's interactions to list, create, edit and delete posts or comments, filter posts using the searchbar, like and unlike posts. It contains simple navigation options and a Infinite Scroll component to make it easy to use and improve User's experience.

---

![Desktop View](static/assets/img/mock_up.jpg)

---

## Features

### Landing Page - Posts List

The landing page displays all posts created by all users. Every user (logged in or logged out) can access this page and filter posts using the search bar.

- User Story: List Posts

![Home Page](static/assets/img/home-page.png)

### Navigation Bar

To navigate through the website, users can use the nav bar. When users are not logged in, the navbar can take users to sign in, sign up or reviews page. When logged in, the nav bar options are Reviews, Liked and a dropdown menu with the user's username, that allows user to change credentials or logout. The navigation bar options collapse into a burger menu, in small screen sizes.

- User Story: Navigation Bar

![Navigation Bar](static/assets/img/navigation-bar.png)

### Sign Up

To be able to use all website features, users must create an account. Allauth was used to create this feature, and handles all the authentication.

- User Story: Create Account

![Login](static/assets/img/login.png)

### Sign in and Logout

After an account has been created, users can login and logout from their accounts'

- User Story: Sign In and Logout

![Login](static/assets/img/login.png)

### Create Post

This page contains crispy form, that allows users to create their reviews. They have to provide a title, genre, content and a image. The creation date and author's username are set automatically.

- User Story: Create Post

![Make Order](static/assets/img/make_order.png)

### Edit or Delete Post

If the user is logged in and owns the post, the post on the landing page will display a dropdown menu. Within this menu, users are able to edit or delete their reviews.

- User Story: Edit Post and Delete Post.

![My Order](static/assets/img/my_orders.png)

### Movie Page

After an user clicks on a post, they are redirect to the review detailed view. On this page, they have access to the review content and are abble to read comments and create comments (if logged in).

- User Story: Post Page

![My Order](static/assets/img/my_orders.png)

### Liked Posts

This page is identical to the home page, the difference is that only displays reviews that were liked by the user. Logged Out users are redirected.

- User Story: Filter Post

![My Order](static/assets/img/my_orders.png)

### Search Posts

On the home page and on the liked page, there is a navbar that allows users to filter posts by title, genre or review author's name.

- User Story: Search Post and Filter Post

![My Order](static/assets/img/my_orders.png)

### Like and Unlike

All users can see how many likes a review has. But only logged users can click the button to either like or unlike posts.

- User Story: Like and Unlike Posts

![Edit Order](static/assets/img/edit_order.png)

### Create Comment

All users can see the comments. But only logged users can create new comments.

- User Story: Create Comment

![Delete Order](static/assets/img/delete.png)

### Edit or Delete Comment

If a user is logged in and owns a comment, a dropdowm will be displayed that allows the comment to be updated or deleted.

- User Story: Edit Comment and Delete Comment

![Delete Order](static/assets/img/delete.png)

![Delete Order](static/assets/img/delete.png)

### Infinite Scroll

The page is refreshed as the user scrolls down loading more posts.

- User Story: No Refresh

![Delete Order](static/assets/img/delete.png)

### Change Password

- Logged in users can access the change credentials page through the dropdown menu on the navbar. There, users are allowed to updated their password.

![Edit Order](static/assets/img/message.png)

### To check all features and future features, check the project on [GitHub](https://github.com/users/Vepp1/projects/4)

---

## Wireframe

- The main idea was to build an app that would be easily accessible to all users, with a infinite scroll and a cards display inspired by streaming interfaces.

## ![Edit Order](static/assets/img/message.png)

## Testing and Validation

### Manual Testing

### Access Liked or Create without being logged in, through address bar.

- On the address bar, type /liked or /create after the website's url.
- Result: Using LoginRequiredMixin, when users try to access this page, they are automatically redirected to the Login page.

![Delete Order](static/assets/img/test-2.png)

### Edit or delete an posts from another user.

- 2 accounts are needed. In on account, make a post and save its id. Logout and login into a new account. Then, go to the address bar and type after the site's URL: edit/"post_id" - to try to edit. delete/order id from the other account - to try to delete.
- Result: User is redirected to home page.

![Delete Order](static/assets/img/test-3.png)

### Update password from another account.

- After logging into an account try to access the URL: profiles/'profile_id' and change the profile id to a different number:
  edit_order/your approved order id/ - to try to edit. delete_order/your approved order id/ - to try to delete.
- Result: User is redirected to home page.

![Delete Order](static/assets/img/test-4.png)

### Validator Testing

- HTML
  - No relevant errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fvegancaju.herokuapp.com%2F), only info and warning on files created automatically.

![HTML Validator](static/assets/img/validator-1.png)

- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fvegancaju.herokuapp.com%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

![CSS Validator](static/assets/img/validator-2.png)

- JS
  - No errors were found when passing through the official [JSHint](https://jshint.com/) validator only warnings on the constants of maps API.

![JS Validator](static/assets/img/validator-3.png)

- PEP8
  - All .py files were corrected on [PythonChecker](https://www.pythonchecker.com/), and follow pep8 rules.

![PEP8 Validator](static/assets/img/validator-4.png)

- Color Contrast
  - The website's color contrast was validated through [a11y](https://color.a11y.com/Contrast/), and presented no issues.

![Color Contrast Validator](static/assets/img/validator-5.png)

- Accessibility
- The website's accessibility was validated has a 95 score and presents no critical issues. [AccessibilityChecker](https://www.accessibilitychecker.org/audit/?website=https%3A%2F%2F8000-vepp1-vegancaju-sjeqvu5d9zs.ws-eu77.gitpod.io%2F&flag=us)

![Acessibility Validator](static/assets/img/validator-6.png)

### Unfixed Bugs

There are no present bugs on this version.

---

## Deployment

- Both the front end and back end were deployed to Heroku.

The live link can be found here - https://vegancaju.herokuapp.com/

#### GitHub/GitPod

- Forking the GitHub Repository:

  - If you want to make changes to your repository without affecting it, you can make a copy of it by 'Forking' it. This ensures your original repository remains unchanged.
  - Find the relevant GitHub repository
  - In the top right corner of the page, click the Fork button (under your account)
  - Your repository has now been 'Forked' and you have a copy to work on
  - Cloning the GitHub Repository

- Cloning your repository will allow you to download a local version of the repository to be worked on.

  - Find the relevant GitHub repository.
  - Press the arrow on the Code button.
  - Copy the link that is shown in the drop-down.
  - Now open Gitpod & select the directory location where you would like the clone created.

  - In the terminal type 'git clone & then paste the link you copied in GitHub. - Press enter and your local clone will be created.

---

## Credits

### Content

- The initial template is a StartBootstrap template called One Page Wonder.
- The loader template was created by .
- The 404 page template was created by .
- The animated background effect was built by .
- The icons in the footer were taken from [Font Awesome](https://fontawesome.com/)

### Media

- The logo image was created by my great designer and wife Luiza Meirelles.
- Hero image is from [iStock].
- All images were taken from [Pexels].

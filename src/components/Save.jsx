import '../App.css';

let heading = '';
let blogBody = '';
let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];

export function saveBlog() {
  const post = { title: heading, paragraph: blogBody };
  storedPosts.push(post);
  localStorage.setItem('posts', JSON.stringify(storedPosts));

  
  const event = new CustomEvent('postsUpdated');
  window.dispatchEvent(event);
}

export function getHeading(fromTitle) {
  heading = fromTitle;
}

export function getBlogBody(fromCreateNew) {
  blogBody = fromCreateNew;
}

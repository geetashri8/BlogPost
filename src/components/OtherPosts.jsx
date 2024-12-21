import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { viewBlogBody, viewBlogHeading } from './ViewBlog';
import '../App.css';
 
let ind=0;
export function sendIndexToEditBlog(){
  return ind
}
function OtherPosts() {
  const [blogposts, setBlogposts] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  const loadPosts = () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    setBlogposts(posts);
  };

  const handleDelete = (index) => {
    const updatedPosts = blogposts.filter((_, i) => i !== index);
    setBlogposts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    const event = new CustomEvent('postsUpdated');
    window.dispatchEvent(event);
  };

  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  const handleView = (index) => {
    const post = blogposts[index];
    viewBlogHeading(post.title);
    viewBlogBody(post.paragraph);
    navigate('/view-blog');
  };

  const handleEdit = (index) => {
    ind=index;
    const post = blogposts[index];
    localStorage.setItem('editPost', JSON.stringify(post)); 
    navigate('/editBlog');
  };

  useEffect(() => {
    loadPosts();
    const handlePostsUpdated = () => {
      loadPosts();
    };
    window.addEventListener('postsUpdated', handlePostsUpdated);
    return () => {
      window.removeEventListener('postsUpdated', handlePostsUpdated);
    };
  }, []);

  return (
    <div className="posts-container">
      <div className="content">
      <table>
        <thead>
          <tr>
            <th>Other Posts!</th>
          </tr>
        </thead>
        <tbody>
          {blogposts.map((post, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => handleRowClick(index)}>
                <td>{post.title}</td>
              </tr>
              {selectedRow === index && (
                <tr>
                  <td>
                    <button
                      className="btn-other-post"
                      onClick={() => handleView(index)}
                    >
                      View
                    </button>
                    <button
                      className="btn-other-post"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn-other-post"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      </div>

    </div>
  );
}

export default OtherPosts;

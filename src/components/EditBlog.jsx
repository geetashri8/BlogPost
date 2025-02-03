import {useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

import '../App.css';
import '../style/EditBlog.css';

import {sendIndexToEditBlog } from './OtherPosts.jsx';


export default  function EditBlog(){

  const [textArea, setTextArea] = useState("");
  const navigate = useNavigate();




  const handleText = (e) => {
    setTextArea(e.target.value);
  };

  const handleEditSave = () => {
    const posts = JSON.parse(localStorage.getItem('posts'));
    let postArr = textArea.split("\n\n@----Don't edit this line----@\n\n");
    let postObj = {};
    postObj.title = postArr[0];
    postObj.paragraph = postArr[1];
    let ind = sendIndexToEditBlog();
    posts.splice(ind,1,postObj);
    localStorage.setItem('posts',JSON.stringify(posts));
    navigate('/');
  };
  useEffect(() => {
    const editPost = JSON.parse(localStorage.getItem('editPost'));
    if (editPost) {
      setTextArea(editPost.title+"\n\n@----Don't edit this line----@\n\n"+editPost.paragraph || ""); 
      localStorage.removeItem('editPost'); 
    }
  }, []);
    return (
        <div className="editBlog">
          <div>
            <h2 className="lefth3">Edit Blog</h2>

          </div>
          <div>
            <textarea
              type="text"
              value={textArea}
              onChange={handleText}
              id="editBlog"
              name="editBlog"></textarea>
          </div>

          <div>
            <button className="saveEdit" onClick={handleEditSave}>
                Save
              </button>
          </div>

        </div>
      );
    }

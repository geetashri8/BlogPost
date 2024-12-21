import { useState } from 'react';
import '../App.css';
import { getBlogBody } from './Save.jsx';
import { viewBlogBody } from './ViewBlog.jsx';

function CreateNew() {
  const [textArea, setTextArea] = useState("");

 

  const handleX = () => {
    setTextArea("");
  };

  const handleText = (e) => {
    setTextArea(e.target.value);
  };

  getBlogBody(textArea);
  viewBlogBody(textArea);

  return (
    <div className="create-new">
      <div className="div1">
        <span className="span-create">Create New</span>
        <button className="rightX" onClick={handleX}>
          X
        </button>
      </div>
      <textarea
        type="text"
        value={textArea}
        onChange={handleText}
        id="createnew"
        name="createnew"
      ></textarea>
    </div>
  );
}

export default CreateNew;

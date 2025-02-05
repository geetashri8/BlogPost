import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import CreateNew from "./components/CreateNew.jsx";
import OtherPosts from "./components/OtherPosts.jsx";
import TitleDropDown from "./components/TitleDropDown.jsx";
import { generateContent } from "./components/GeminiModel.jsx";
import ViewBlog from "./components/ViewBlog.jsx";
import { saveBlog } from "./components/Save.jsx";
import EditBlog from "./components/EditBlog.jsx";

function App() {
  const [titleArr, setTitleArr] = React.useState([]);

  const navigate = useNavigate();
  let textArea = "";

  async function GeminiContent(generatetitle, dropdown, createnew) {
    textArea = document.getElementById(createnew).value;
    let prompt =
      "generate 3 titles for the paragraph given without numbering it,just the titles in three different rows without adding extra newlines(\n)- " +
      textArea;
    console.log(prompt);

    let generatedTitleArr = await generateContent(prompt);
    console.log(titleArr);
    setTitleArr(generatedTitleArr);
    

    document.getElementById(generatetitle).style.display = "none";
    document.getElementById(dropdown).style.display = "block";
  }

  function handleViewBlog() {
    navigate("/view-blog"); // Call navigate here
  }
  function handleSave(generatetitle, dropdown) {
    saveBlog();
  
    document.getElementById(generatetitle).style.display = "block";
    document.getElementById(dropdown).style.display = "none";
  
  }

  return (
    <div className="App">
      <div>
        <OtherPosts />
      </div>
      <div>
        <CreateNew />
      </div>

      <div className="save-and-view">
         <button id="generatetitle" onClick={() =>GeminiContent("generatetitle", "dropdown", "createnew")}>Generate Title</button> 
         <TitleDropDown titleArr={titleArr} />
        

       
        <button id="save" onClick={()=>handleSave("generatetitle", "dropdown")}>
          Save
        </button>
        <button id="view" onClick={handleViewBlog}>
          View
        </button>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/view-blog" element={<ViewBlog />} />
        <Route path="/editBlog" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;

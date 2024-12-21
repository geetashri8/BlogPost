   
   import React from 'react';

   import { getHeading } from './Save.jsx';
   import { viewBlogHeading } from './ViewBlog.jsx';
   
   export default function TitleDropDown({titleArr}){
     const [selectedValue,setSelectedValue] = React.useState("");
    
        const handleOptions =  (event)=>{
              setSelectedValue(event.target.value);
           // console.log("event.target.value"+event.target.value);

        };
        getHeading(selectedValue);
        viewBlogHeading(selectedValue);
          //console.log(titleArr+"hkghgk");
        

        return (<div className="drop-down-style" id="dropdown">
                    <select value={selectedValue} onChange={handleOptions}>
                        <option value="">Titles</option>
                        <option value={titleArr[0]}>{titleArr[0]}</option>
                        <option value={titleArr[1]}>{titleArr[1]}</option>
                        <option value={titleArr[2]}>{titleArr[2]}</option>
                   </select>
        
               </div>

        );
    
    }
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Posttable() {
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    backgroundColor: "#f2f2f2",
    border: "1px solid black",
    padding: "8px",
    textAlign: "left",
  };

  const tdStyle = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "left"
  };

  const [post, setPost] = useState([]);
  const [reload, setReload] = useState(false)

  const deleteRow = (id) => {  
    const entryUrl = `http://localhost:3000/posts/${id}`;

    axios
      .delete(entryUrl)
      .then((response) => {
        console.log("Entry deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      }).then(response=>setReload(true)).catch(err=>console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => setPost(response.data))
      .catch((err) => console.log(err));
  }, [reload]);

  return (
    <>
      <h3 className="container">Post-table</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Id</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>PPU</th>
            <th style={thStyle}>Edit</th>
            <th style={thStyle}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {post.map((element, index) => {
            return (
              <tr key={index}>
                <td style={tdStyle}>
                  <Link to={`/details/${element.id}`}>{element.id}</Link>
                </td>
                <td style={tdStyle}>{element.type}</td>
                <td style={tdStyle}>{element.name}</td>
                <td style={tdStyle}>{element.ppu}</td>
                <td style={tdStyle}>
                  <Link to={`/edit/${element.id}`}>
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                </td>
                <td style={tdStyle} onClick={(e) => deleteRow(element.id)}>
                  <i className="bi bi-trash-fill"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

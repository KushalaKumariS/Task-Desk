import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getAll")
      .then((res) => setNotes(res.data));
  }, []);

  //   function addNote(newNote) {
  //     setNotes((prevNotes) => {
  //       return [...prevNotes, newNote];
  //     });
  //   }

  function deleteNote(id) {
    // setNotes((prevNotes) => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return index !== id;
    //   });
    // });

    axios
      .post("http://localhost:8000/api/delete", { id })
      .then((res) => setNotes(res.data));
  }

  return (
    <div>
      <Header />
      <CreateArea setNotes={setNotes} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={index}
            title={noteItem.title}
            content={noteItem.description}
            onDelete={() => deleteNote(noteItem._id)}
          />
        );
      })}
      <Footer />
      {console.log(notes)}
    </div>
  );
}

export default App;

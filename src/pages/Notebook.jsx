import React, { useState, useEffect } from 'react';

const Notebook = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [{ text: '', editable: true }];
  });
  const [activeNote, setActiveNote] = useState(0);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const updateNote = (index, text) => {
    setNotes(notes.map((note, idx) =>
      index === idx ? { ...note, text } : note
    ));
  };

  const addNote = () => {
    setNotes([...notes, { text: '', editable: true }]);
    setActiveNote(notes.length);
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, idx) => idx !== index);
    setNotes(newNotes);
    setActiveNote(Math.max(0, activeNote - 1));
  };

  const toggleEditMode = (index) => {
    setNotes(notes.map((note, idx) =>
      index === idx ? { ...note, editable: !note.editable } : note
    ));
  };

  return (
    <div className="notebook">
      <h1>Notebook</h1>
      <button onClick={addNote}>Add Note</button>
      <div className="note-section">
        <div className="note-list">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`note-title ${index === activeNote ? 'active' : ''}`}
              onClick={() => setActiveNote(index)}
            >
              {note.text.slice(0, 20) || 'New Note'}
              <button onClick={() => deleteNote(index)}>Delete</button>
              <button onClick={() => toggleEditMode(index)}>
                {note.editable ? 'Save' : 'Edit'}
              </button>
            </div>
          ))}
        </div>
        <textarea
          value={notes[activeNote] ? notes[activeNote].text : ""}
          onChange={(e) => updateNote(activeNote, e.target.value)}
          disabled={!notes[activeNote]?.editable}
          placeholder="Write your notes here..."
          rows="20"
          cols="50"
        />
      </div>
    </div>
  );
};

export default Notebook;

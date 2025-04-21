import React, { useState, useEffect } from "react";
import "./EventModal.css";
import { FaTimes } from "react-icons/fa";

const EventModal = ({ isOpen, initial, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDate(initial.date || "");
      setTime(initial.time || "");
      setNotes(initial.notes || "");
      setColor(initial.color || "#3a87ad");
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title: title.trim(), date, time, notes, color });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* <button className="modal-close" onClick={onCancel} aria-label="Close">
            <FaTimes />
          </button> */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-field">
            <input
              type="text"
              className="modal-input"
              placeholder="event name"
              value={title}
              maxLength={30}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="modal-field">
            <input
              type="date"
              className="modal-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="modal-field">
            <input
              type="time"
              className="modal-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <label>Color</label>
            <input
              type="color"
              className="modal-input modal-color-input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="modal-field">
            <input
              type="text"
              className="modal-input"
              placeholder="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;

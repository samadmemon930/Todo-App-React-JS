import React, { useEffect, useState } from "react";
import { db, ref, push, set, onValue, remove, update } from "./firebase";

function Todos() {
  const [initial, setInitial] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const todoRef = ref(db, "DATA");
     onValue(todoRef, (snapshot) => {
      const items = snapshot.val();
      const taskList = items
        ? Object.keys(items).map((key) => ({
            id: key,
            text: items[key].text,
          }))
        : [];
      setData(taskList);
    });

    return
  }, []);

  const getData = async () => {
    if (!initial.trim()) {
      alert("Please enter a task!");
      return;
    }

    if (editId) {
      update(ref(db, `DATA/${editId}`), { text: initial });
      setEditId(null);
    } else {
      const newTaskRef = push(ref(db, "DATA"));
      set(newTaskRef, { text: initial });
    }
    setInitial("");
  };

  const deleteTask = (id) => {
    remove(ref(db, `DATA/${id}`));
  };

  const editTask = (id, text) => {
    setEditId(id);
    setInitial(text);
  };

  return (
    <>
      <div className="container">
        <div className="inputTask">
          <input
            type="text"
            placeholder="Enter your Todo"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
          />
          <button onClick={getData}>{editId ? "Update" : "Add"}</button>
        </div>

        {data.map((task) => (
          <div className="taskData" key={task.id}>
            <h1>{task.text}</h1>
            <i
              id="editIcon"
              onClick={() => editTask(task.id, task.text)}
              className="fa-solid fa-pencil"
            ></i>
            <i
              id="deleteIcon"
              onClick={() => deleteTask(task.id)}
              className="fa-solid fa-trash-can"
            ></i>
          </div>
        ))}
      </div>
    </>
  );
}

export default Todos;
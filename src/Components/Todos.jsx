import  { useEffect, useState } from "react";
import { db, ref, push, set, onValue, remove, update } from "./firebase";

function Todos() {
  const [initial, setInitial] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    onValue(ref(db, "DATA"), snapshot => setData(Object.entries(snapshot.val() || {}).map(([id, { text }]) => ({ id, text }))));
  }, []);

  const handleTask = async () => {
    if (!initial.trim()) return alert("Please enter a task!");
    const action = editId ? update(ref(db, `DATA/${editId}`), { text: initial }) : set(push(ref(db, "DATA")), { text: initial });
    await action;
    setInitial(""); setEditId(null);
  };

  return (
    <div className="container">
      <div className="inputTask">
        <input value={initial} onChange={e => setInitial(e.target.value)} placeholder="Enter your Todo" />
        <button onClick={handleTask}>{editId ? "Update" : "Add"}</button>
      </div>
      {data.map(({ id, text }) => (
        <div key={id} className="taskData">
          <h1>{text}</h1>
          <i id="editIcon" onClick={() => { setEditId(id); setInitial(text); }} className="fa-solid fa-pencil"></i>
          <i id="deleteIcon" onClick={() => remove(ref(db, `DATA/${id}`))} className="fa-solid fa-trash-can"></i>
        </div>
      ))}
    </div>
  );
}

export default Todos;




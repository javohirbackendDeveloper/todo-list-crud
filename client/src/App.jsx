import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [author, setAuthor] = useState(username); 

  const addTodo = (e) => {
    e.preventDefault();
    const requestBody = { author, todo };
    
    if (editId) {
      fetch(`http://localhost:4001/updateTodo/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then(() => {
          setTodo("");
          setEditId(null);
          fetchData(); 
        });
    } else {
      fetch("http://localhost:4001/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then(() => {
          setTodo("");
          fetchData(); 
        });
    }
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:4001/deleteTodo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => fetchData()); 
  };

  const editTodo = (item) => {
    setEditId(item.id);
    setTodo(item.todo);
  };

  const registerUser = (e) => {
    e.preventDefault();
    setRegistered(true);
    setAuthor(username); 
    setUsername("");
    setPassword("");
  };

  const fetchData = () => {
    fetch("http://localhost:4001/get")
      .then((res) => res.json())
      .then((info) => setData(info));
  };

  useEffect(() => {
    if (registered) {
      fetchData();
    }
  }, [registered]);

  return (
    <div className="container">
      <h2>Ro'yxatdan o'tish</h2>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="username..."
          className="register_input input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password..."
          className="register_input input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="register_btn btn">Enter</button>
      </form>

      {registered && (
        <>
          <h2>Add todo</h2>
          <form onSubmit={addTodo}>
            <input
              type="text"
              className="input"
              placeholder="todo..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              required
            />
            <button type="submit" className="btn">
              {editId ? "Update todo" : "Add todo"}
            </button>
          </form>

          <h2 className="title">Todos</h2>
          <ul className="list">
            {data.map((item, index) => (
              <li className="item" key={index}>
                <p className="author">Number: <span>{index + 1}</span></p>
                <p className="author">Author: <span>{item.author}</span></p>
                <p className="text">Todo: <span>{item.todo}</span></p>
                <button className="edit_btn" onClick={() => editTodo(item)}>Edit ✍</button>
                <button className="delete_btn" onClick={() => deleteTodo(item.id)}>Delete 🗑</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;

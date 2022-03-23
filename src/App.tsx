import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Dispatch, RootState } from "./store";
import { Filter } from "./store/models/filter";
import { OrderBy } from "./store/models/order";

const id = () => Date.now().toString(32);

function FilterButtons() {
  const dispatch = useDispatch<Dispatch>();
  const filter = useSelector((state: RootState) => state.filter);

  const handleFilter = (filter: Filter) => {
    dispatch.filter.setFilter(filter);
  };

  return (
    <div>
      <button disabled={filter === "ALL"} onClick={() => handleFilter("ALL")}>
        All
      </button>
      <button
        disabled={filter === "COMPLETED"}
        onClick={() => handleFilter("COMPLETED")}
      >
        Completed
      </button>
      <button
        disabled={filter === "UNCOMPLETED"}
        onClick={() => handleFilter("UNCOMPLETED")}
      >
        Uncompleted
      </button>
    </div>
  );
}

function OrderByButtons() {
  const dispatch = useDispatch<Dispatch>();
  const filter = useSelector((state: RootState) => state.order);

  const handleOrder = (orderBy: OrderBy) => {
    dispatch.order.orderBy(orderBy);
  };

  return (
    <div>
      <button disabled={filter === "ASC"} onClick={() => handleOrder("ASC")}>
        asc
      </button>
      <button disabled={filter === "DESC"} onClick={() => handleOrder("DESC")}>
        desc
      </button>
    </div>
  );
}

function Form() {
  const dispatch = useDispatch<Dispatch>();
  const [text, setText] = useState("");

  const add = () => {
    if (text) {
      dispatch.todos.addTodo({ id: id(), text: text.trim() });
      setText("");
    }
  };

  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setText(ev.target.value);
  }, []);

  return (
    <div>
      <input type="text" onChange={handleChange} value={text} />
      <button onClick={add}>add</button>
    </div>
  );
}

function TodoList() {
  const filter = useSelector((state: RootState) => state.filter);
  const order = useSelector((state: RootState) => state.order);
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<Dispatch>();

  const handleRemove = (id: number) => {
    dispatch.todos.removeTodo(id);
  };

  const handleToggle = (id: number) => {
    dispatch.todos.toggle(id);
  };
  const ordered = useMemo(() => {
    if (order === "ASC") {
      return todos.data.sort((a, b) => a.text.localeCompare(b.text));
    }
    return todos.data.sort((a, b) => b.text.localeCompare(a.text));
  }, [todos, order]);

  const filtered = useMemo(() => {
    if (filter === "COMPLETED") {
      return ordered.filter((i) => i.checked);
    }
    if (filter === "UNCOMPLETED") {
      return ordered.filter((i) => !i.checked);
    }

    return ordered;
  }, [order, filter]);

  return (
    <ul>
      {filtered?.map((i) => (
        <li key={i.id} id={`todo_${i.id}`}>
          <input
            type="checkbox"
            checked={i.checked}
            onChange={() => handleToggle(i.id)}
          />
          {i.text}
          <button onClick={() => handleRemove(i.id)}>&times;</button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div className="App">
      <Form />
      <OrderByButtons />
      <FilterButtons />
      <TodoList />
    </div>
  );
}

export default App;

import React, { useState } from "react";

const ToDo = () => {
    const [inputText, setInputText] = useState("");
    const [task, setTask] = useState(["Terminar Tareas de 4Geeks"]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText !== "") {
            setTask([...task, inputText])
            setInputText("");
            console.log(task);
        }
        const toDoList = task.map((item)=>{
             return {
                "label": item,
                "done": false
            }
           
          })
          console.log(toDoList);
        fetch('https://assets.breatheco.de/apis/fake/todos/user/male', {
            method: "PUT",
            body: JSON.stringify(toDoList),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    };

    const handleDelete = (i) => {
        setTask(task.filter((_, index)=>{
            return index != i
          })
          )
    }
  
    return (
        <div className="container d-flex flex-column">
            
            <form onSubmit={handleSubmit}>
                <div className="text-center">
                    <h1>Reminder</h1> 
                </div>
                    <div id="contendor" className="text-center">
                    <input
                        onChange={(e) => { setInputText(e.target.value) }}
                        value={inputText}
                        type="text"
                        placeholder="Completar Mastering Java"
                    />
                    
                    <div className="list-group" id="tareas">
                        {task.map((item, index) => (
                            <div key={index} className="list-group-item d-flex " id="item">
                                <span>
                                    {item}
                                </span>
                                <button
                                    type="button"
                                    className="add-btn"
                                    onClick={()=>{handleDelete(index)}}
                                >
                                X</button>
                            </div>
                        ))}
                    </div>
                    </div>
            </form>
        </div>
    );
};

export default ToDo;

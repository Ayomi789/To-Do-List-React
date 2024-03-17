import React, { useState } from 'react';


function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue.trim() !== '') {
            if (editIndex !== -1) {
                const updatedTasks = [...tasks];
                updatedTasks[editIndex] = inputValue;
                setTasks(updatedTasks);
                setEditIndex(-1);
            } else {
                setTasks([...tasks, inputValue]);
            }
            setInputValue('');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setInputValue(tasks[index]);
    };

    const handleDelete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        if (editIndex === index) {
            setEditIndex(-1);
            setInputValue('');
        }
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <div className="task-input-container">
                <input
                    className="task-input"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter task"
                />
                <button className="submit-button" onClick={handleSubmit}>{editIndex !== -1 ? 'Save' : 'Submit'}</button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        {editIndex === index ? (
                            <div className="edit-controls">
                                <button className="edit-btn" onClick={() => handleDelete(index)}>Cancel</button>
                                <button className="edit-btn" onClick={() => handleSubmit(index)}>Save</button>
                            </div>
                        ) : (
                            <>
                                <span className="task-text">{task}</span>
                                <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;

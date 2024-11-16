import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { TaskFilters } from './TaskFilters';
import { TaskStats } from './TaskStats';

function DashboardPage() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState();
    const [filters, setFilters] = useState({
        status: 'all',
        priority: 'all',
        search: '',
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleCreateTask = (taskData) => {
        const newTask = {
            ...taskData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
        };
        setTasks([...tasks, newTask]);
    };

    const handleUpdateTask = (taskData) => {
        if (!editingTask) return;
        const updatedTasks = tasks.map((task) =>
            task.id === editingTask.id
                ? { ...task, ...taskData }
                : task
        );
        setTasks(updatedTasks);
        setEditingTask(undefined);
    };

    const handleStatusChange = (id, status) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, status } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter((task) => task.id !== id));
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesStatus = filters.status === 'all' || task.status === filters.status;
        const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
        const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            task.description.toLowerCase().includes(filters.search.toLowerCase());
        return matchesStatus && matchesPriority && matchesSearch;
    });


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        New Task
                    </button>
                </div>

                <TaskStats tasks={tasks} />
                <TaskFilters filters={filters} onFilterChange={setFilters} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onStatusChange={handleStatusChange}
                            onEdit={(task) => {
                                setEditingTask(task);
                                setShowForm(true);
                            }}
                            onDelete={handleDeleteTask}
                        />
                    ))}
                </div>

                {filteredTasks.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No tasks found. Create a new task to get started!</p>
                    </div>
                )}

                {(showForm || editingTask) && (
                    <TaskForm
                        task={editingTask}
                        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                        onClose={() => {
                            setShowForm(false);
                            setEditingTask(undefined);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
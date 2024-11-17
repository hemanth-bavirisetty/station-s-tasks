import { useState, useEffect, useContext } from 'react';
import { PlusCircle } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { TaskFilters } from './TaskFilters';
import { TaskStats } from './TaskStats';
import { AuthContext } from '../../utils/AuthContext';
import axios from 'axios';
import { Button } from '../ui';

function DashboardPage() {
    const { accessTk } = useContext(AuthContext);
    const { user } = useContext(AuthContext);

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
        async function fetchtasks() {
            const response = await axios.get(`http://127.0.0.1:8000/api/tasks/list/`, {
                headers: {
                    'Authorization': 'Bearer ' + accessTk,
                }
            });
            setTasks(response.data?.results);
            console.log(response);
        }
        fetchtasks();
    },[accessTk]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    console.log(tasks);

    const handleCreateTask = (taskData) => {
        const newTask = {
            ...taskData,
            createdby: user.username,
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
        <div className="min-h-screen bg-gray-50 ">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Task Management</h1>
                    <Button
                        onClick={() => setShowForm(true)}
                        className=""
                    >
                        <PlusCircle className="w-5 h-5 lg:mr-2" />
                        <span className="hidden sm:inline">New Task</span>
                    </Button>
                </div>

                <TaskStats tasks={tasks} />
                <TaskFilters filters={filters} onFilterChange={setFilters} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
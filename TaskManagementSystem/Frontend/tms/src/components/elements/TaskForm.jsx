import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import axios from 'axios';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea
} from "../ui"


export function TaskForm({ task, onSubmit, onClose }) {
    const { accessTk } = useContext(AuthContext);
    const [taskId, setTaskId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        status: 'yet-to-start',
        deadline: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                deadline: task.deadline,
            });
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            console.log(accessTk)
            if (!task) {
                const response = await axios.post('http://localhost:8000/api/tasks/', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + accessTk, // or 'Basic YOUR_CREDENTIALS'
                    }
                });
                setLoading(false);
                const taskid = response.data?.id
                setTaskId(taskid)
                console.log(response.data?.id)
                // Handle successful login
                console.log(response)
                const submitionData = { ...formData, taskid }
                onSubmit(submitionData);
            } else {
                const response = await axios.put(`http://localhost:8000/api/tasks/${task.taskid ?? task.id}/`, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + accessTk, // or 'Basic YOUR_CREDENTIALS'
                    }
                });
                setLoading(false);

                console.log(response)
                onSubmit(formData);
            }
            //navigate('/dashboard', { replace: true });
            // You can redirect the user to a protected route here
        } catch (error) {
            setLoading(false);
            console.log(error)
        };
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-semibold mb-4">{task ? 'Edit Task' : 'Create New Task'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <Textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="yet-to-start">Yet to start</option>
                                    <option value="in-progress">In progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="hold">Hold</option>

                                </select>
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deadline</label>
                            <input
                                type="date"
                                required
                                value={formData.deadline}
                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            {task ? 'Update Task' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
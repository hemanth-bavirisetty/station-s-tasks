import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
    Input,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

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
            console.log(accessTk);
            if (!task) {
                const response = await axios.post('http://localhost:8000/api/tasks/', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + accessTk,
                    }
                });
                setLoading(false);
                const taskid = response.data?.id;
                setTaskId(taskid);
                console.log(response.data?.id);
                const submitionData = { ...formData, taskid };
                onSubmit(submitionData);
            } else {
                const response = await axios.put(`http://localhost:8000/api/tasks/${task.taskid ?? task.id}/`, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + accessTk,
                    }
                });
                setLoading(false);
                console.log(response);
                onSubmit(formData);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
        onClose();
    };
    const isDateDisabled = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
        return date < today;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full lg:p-6 ">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold ">{task ? 'Edit Task' : 'Create New Task'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <Input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <Textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="mt-1"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                                    <Select
                                        value={formData.priority}
                                        onValueChange={(value) => setFormData({ ...formData, priority: value })}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select Priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="yet-to-start">Yet to start</SelectItem>
                                            <SelectItem value="in-progress">In progress</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="hold">Hold</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !formData.deadline && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.deadline ? (
                                                new Date(formData.deadline).toLocaleDateString()
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(formData.deadline)}
                                            onSelect={(date) => {
                                                if (date) {
                                                    console.log(date.toISOString())
                                                    let year = date.getFullYear();
                                                    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                                                    let day = String(date.getDate()).padStart(2, '0'); // Ensure two digits for the day

                                                    // Format the date as YYYY-MM-DD
                                                    let formattedDate = `${year}-${month}-${day}`;
                                                    setFormData({ ...formData, deadline: formattedDate });
                                                }
                                            }}
                                            disabled={isDateDisabled}
                                            initialFocus

                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <Button
                                type="button"
                                onClick={onClose}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={loading}
                                type="submit"
                            >
                                {task ? 'Update Task' : 'Create Task'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
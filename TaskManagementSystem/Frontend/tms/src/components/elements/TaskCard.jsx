import React, { useContext, useState } from 'react';
import { Clock, Flag, MoreVertical } from 'lucide-react';
import { AuthContext } from '../../utils/AuthContext';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusColors = {
  'todo': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  'completed': 'bg-green-100 text-green-800',
  'on-hold': 'bg-orange-100 text-orange-800',
};

export function TaskCard({ task, onStatusChange, onEdit, onDelete }) {
  const { accessTk } = useContext(AuthContext);
  const daysUntilDeadline = Math.ceil(
    (new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <CardHeader className="p-0 mb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="font-semibold text-gray-800 line-clamp-1">{task.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white rounded-md shadow-lg">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async function () {
                  try {
                    const response = await axios.delete(`http://localhost:8000/api/tasks/delete/${task.id ?? task.taskid}/`, {
                      headers: {
                        'Authorization': 'Bearer ' + accessTk,
                      }
                    });
                    onDelete(task.id);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-0 mb-4">
        <CardDescription className="text-gray-600 text-sm line-clamp-2">{task.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-0 mb-4 ">
        <div className="flex  gap-2 w-full">
          <span className={`p-2 w-full rounded-lg ${priorityColors[task.priority]}`}>
            <Flag className="w-3 h-3 inline-block mr-1" />
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <Select 
            value={task.status}
            onValueChange={(value) => onStatusChange(task.id, value)}
          >
            <SelectTrigger className={`${statusColors[task.status]}`}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yet-to-start">Yet to start</SelectItem>
              <SelectItem value="in-progress">In progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardFooter>
      <CardFooter className="p-0">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          <span className={daysUntilDeadline < 0 ? 'text-red-500' : daysUntilDeadline <= 3 ? 'text-yellow-500' : ''}>
            {daysUntilDeadline < 0
              ? `${Math.abs(daysUntilDeadline)} days overdue`
              : daysUntilDeadline === 0
                ? 'Due today'
                : `${daysUntilDeadline} days left`}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

export function TaskStats({ tasks }) {
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    highPriority: tasks.filter((t) => t.priority === 'high').length,
  };
  //
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4 mb-6">
      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-sm font-medium text-gray-600">Total Tasks</CardDescription>
              <CardTitle className="text-2xl font-semibold text-gray-900">{stats.total}</CardTitle>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-sm font-medium text-gray-600">Completed</CardDescription>
              <CardTitle className="text-2xl font-semibold text-gray-900">{stats.completed}</CardTitle>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-sm font-medium text-gray-600">In Progress</CardDescription>
              <CardTitle className="text-2xl font-semibold text-gray-900">{stats.inProgress}</CardTitle>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="w-10 h-10 text-purple-600" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <CardDescription className="text-sm font-medium text-gray-600">High Priority</CardDescription>
              <CardTitle className="text-2xl font-semibold text-gray-900">{stats.highPriority}</CardTitle>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
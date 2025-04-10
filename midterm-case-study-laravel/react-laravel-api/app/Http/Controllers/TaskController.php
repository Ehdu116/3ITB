<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    // Create a new task
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
            'status' => 'required|in:To Do,In Progress,Done',
            'priority' => 'required|in:High,Medium,Low',
        ]);

        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    // Get all tasks
    public function index()
    {
        $tasks = Task::with('project', 'assignedUser')->get();

        if ($tasks->isEmpty()) {
            return response()->json(["message" => "No tasks found"], 200);
        } else {
            return response()->json($tasks, 200);
        }
    }

    // Get a single task by ID
    public function show($id)
    {
        $task = Task::with('project', 'assignedUser')->findOrFail($id);
        return response()->json($task);
    }

    // Update a task
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:To Do,In Progress,Done',
            'priority' => 'required|in:High,Medium,Low',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    // Delete a task
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }
}

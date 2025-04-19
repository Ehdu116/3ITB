<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    // Store a new task
    public function store(Request $request)
    {
        // Debugging output
        \Log::debug('Request data:', $request->all());
    
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'status' => 'required|in:Not Started,In Progress,Completed',
            'priority' => 'required|in:Low,Medium,High',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }
    
        $task = Task::create([
            'project_id' => $request->input('project_id'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'status' => $request->input('status'),
            'priority' => $request->input('priority'),
            'assigned_to' => $request->input('assigned_to'),
        ]);
    
        return response()->json([
            'message' => 'Task created successfully!',
            'task' => $task
        ], 201);
    }
    
    public function getTasksForProject($projectId)
    {
        // This loads the tasks and the user assigned to each task in one go (to avoid extra database queries)
        $tasks = Task::where('project_id', $projectId)->with('assignedUser')->get();
        return response()->json($tasks);
    }
    

    
}

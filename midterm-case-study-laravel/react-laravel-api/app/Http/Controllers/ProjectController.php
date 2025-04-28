<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    // Store a new project
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required|string|max:255',  // 'title' from request, 'name' in the DB
            'description' => 'required|string',
            'estimated_budget' => 'required|numeric',
            'actual_expenditure' => 'required|numeric',
        ]);

        // Create the new project in the database
        $project = Project::create([
            'name' => $request->name,  // Store 'title' as 'name' in DB
            'description' => $request->description,
            'estimated_budget' =>  $request->estimated_budget,
            'actual_expenditure' =>  $request->actual_expenditure,
        ]);
    
        // Return the created project as JSON
        return response()->json($project, 201);
    }

    // Get all projects (Read)
    public function index()
    {
        return response()->json(Project::all());  // Return all projects
    }

    // Get a specific project by ID (Read one)
    public function show($id)
    {
        // Find the project or return a 404 if not found
        $project = Project::findOrFail($id);
        return response()->json($project);  // Return the project data
    }

    // Update an existing project
    public function update(Request $request, $id)
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'estimated_budget' => 'required|numeric',
            'actual_expenditure' => 'required|numeric',
        ]);

        // Find the project by ID
        $project = Project::findOrFail($id);
        
        // Update the project
        $project->update([
            'name' => $request->name,  // Update the 'name' field with 'title'
            'description' => $request->description,
            'estimated_budget' =>  $request->estimated_budget,
            'actual_expenditure' =>  $request->actual_expenditure,
        ]);

        // Return the updated project as JSON
        return response()->json($project);
    }

    // Delete a project
    public function destroy($id)
    {
        // Find the project by ID and delete it
        $project = Project::findOrFail($id);
        $project->delete();

        // Return a success message
        return response()->json(['message' => 'Project deleted successfully']);
    }

    public function updateBudget(Request $request, $id)
{
    $project = Project::findOrFail($id);

    $validated = $request->validate([
        'estimated_budget' => 'nullable|numeric',
        'actual_expenditure' => 'nullable|numeric',
    ]);

    $project->update($validated);

    return response()->json($project);
}

}

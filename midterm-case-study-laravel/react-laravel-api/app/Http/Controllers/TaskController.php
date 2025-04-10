namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    // Store a new task
    public function store(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'status' => 'required|in:To Do,In Progress,Done',
            'priority' => 'required|in:High,Medium,Low',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        // Create the new task
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
}

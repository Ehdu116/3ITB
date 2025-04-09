<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\User;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'status',
        'priority',
        'assigned_to', // user_id
    ];

    // Each task belongs to one project
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // Each task can be assigned to one user
    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
}

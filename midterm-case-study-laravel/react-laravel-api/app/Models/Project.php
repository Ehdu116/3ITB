<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'estimated_budget',
        'actual_expenditure',
    ];

    // One project has many tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}

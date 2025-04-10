<?php

namespaceApp\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    // One project has many tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}

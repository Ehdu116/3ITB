<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up()
    {
    Schema::create('tasks', function (Blueprint $table) {
        $table->id();
        $table->foreignId('project_id')->constrained()->onDelete('cascade');
        $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
        $table->string('title');
        $table->text('description')->nullable();
        $table->enum('status', ['To Do', 'In Progress', 'Done'])->default('To Do');
        $table->enum('priority', ['High', 'Medium', 'Low'])->default('Medium');
        $table->timestamps();
    });
}

    public function down() {
        Schema::dropIfExists('tasks');
    }
};
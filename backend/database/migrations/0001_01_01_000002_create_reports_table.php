<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->enum('severity', ['Ringan', 'Sedang', 'Parah'])->nullable();
            $table->string('perpetrator_name')->nullable();
            $table->date('incident_date')->nullable();
            $table->string('incident_location')->nullable();
            $table->text('description');
            $table->string('photo_path')->nullable();
            $table->string('tracking_code', 6)->unique();
            $table->enum('status', ['Pending', 'Investigating', 'Ditanggapi'])->default('Pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};

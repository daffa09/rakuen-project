<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('projects', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('banner');
            $table->longText('content');
            $table->foreignId('category_id')->constrained('categories')->restrictOnDelete()->cascadeOnUpdate();
            $table->boolean('publish')->default(false);
            $table->string('created_by');
            $table->string('updated_by')->nullable();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

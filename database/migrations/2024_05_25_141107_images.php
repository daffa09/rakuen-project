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

        Schema::create('images', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('id_project');
            $table->string('image_url');
            $table->string('created_by');
            $table->timestamps();

            $table->foreign('id_project')->references('id')->on('projects');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};

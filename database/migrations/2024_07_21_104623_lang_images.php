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

        Schema::create('lang_images', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('projects_id')->constrained('projects')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('name');
            $table->string('url');
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lang_images');
    }
};

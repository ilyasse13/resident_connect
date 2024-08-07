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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->dateTime('start_at');
            $table->dateTime('end_at');
            $table->unsignedBigInteger('residence_id');
            $table->timestamps();
            $table->foreign('residence_id')->references('id_residence')->on('residences');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};

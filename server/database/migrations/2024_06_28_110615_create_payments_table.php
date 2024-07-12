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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user');
            $table->string('state');
            $table->string('mounth');
            $table->unsignedBigInteger('residence_id');
            $table->timestamps();
            $table->foreign('user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('residence_id')->references('id_residence')->on('residences')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};

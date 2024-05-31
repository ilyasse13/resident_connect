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
        Schema::create('technicians', function (Blueprint $table) {
            $table->id();
            $table->string('Nom');
            $table->string('Prenom');
            $table->string('Telephone');
            $table->unsignedBigInteger('residence_id');
            $table->unsignedBigInteger('id_metier');
            $table->timestamps();

            $table->foreign('id_metier')->references('id')->on('metiers');
            $table->foreign('residence_id')->references('id_residence')->on('residences');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technicians');
    }
};

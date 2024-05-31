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
        Schema::create('users', function (Blueprint $table) {
            $table->string('user_id')->primary();
            $table->string('Nom');
            $table->string('Prenom');
            $table->string('Username');
            $table->string('Password');
            $table->string('Type');
            $table->integer('num_app');
            $table->integer('num_imm');
            $table->string('image')->nullable();
            $table->rememberToken();
            $table->timestamps();
            //to add later foreign key of residence
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

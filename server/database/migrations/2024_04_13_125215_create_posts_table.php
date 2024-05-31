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
        Schema::create('posts', function (Blueprint $table) {
            $table->id('post_id');
            $table->string('titre');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('poster_id');
            $table->unsignedBigInteger('residence_id');
            $table->timestamps();
            $table->foreign('poster_id')->references('user_id')->on('users');
            $table->foreign('residence_id')->references('id_residence')->on( 'residences' );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};

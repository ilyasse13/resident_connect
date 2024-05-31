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
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->string('liker_id');
            $table->unsignedBigInteger('id_post');
            $table->timestamps();
            // Relation with user model
            $table->foreign( 'liker_id' )->references('user_id')->on('users');
            // Relation with posts model
            $table->foreign('id_post')->references( 'post_id' )->on('posts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};

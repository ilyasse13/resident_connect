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
        Schema::create('comments', function (Blueprint $table) {
            $table->id('comment_id');
            $table->string('content');
            $table->string('commenter_id');
            $table->unsignedBigInteger('id_post');
            $table->timestamps();
            $table->foreign( 'commenter_id' )->references( 'user_id' )->on( 'users' );
            $table->foreign( 'id_post')->references('post_id')->on( 'posts' )->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};

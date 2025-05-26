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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('FirstName');
            $table->string('LastName');
            $table->string('Gender');
            $table->text('Address');
            $table->string('PhoneNumber');
            $table->string('Branch');
            $table->string('Position');
            $table->string('Division');
            $table->string('Status');
            $table->string('NIK');
            $table->string('LastEducation');
            $table->string('PlaceOfBirth');
            $table->string('BirthDate');
            $table->string('ContractType');
            $table->string('Bank');
            $table->string('BankAccountNumber');
            $table->string('BankAccountHolderName');
            $table->string('photo');
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->string('email');
            $table->string('password');
            $table->enum('role', ['admin', 'employee']);
            $table->timestamps();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
            $table->timestamps();
        });

        Schema::create('letter_formats', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('content');
            $table->enum('type', ['published','archived', 'draft'])->default('arsip');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('letters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('letter_format_id')->constrained('letter_formats')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->text('file_path');
            $table->foreignId('receiver_user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->enum('type', ['arsip', 'kirim'])->default('arsip');
            $table->enum('target_role', ['admin', 'employee'])->nullable();
            $table->boolean('is_sent')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // penerima notifikasi
            $table->foreignId('letter_id')->constrained('letters')->onDelete('cascade');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });

        Schema::create('check_clock_setting', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('type');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('check_clock_setting_times', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ck_setting_id')->constrained('check_clock_setting')->onDelete('cascade');
            $table->date('day');
            $table->time('clock_in');
            $table->time('clock_out');
            $table->time('break_start');
            $table->time('break_end');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('check_clocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('check_clock_type');
            $table->time('check_clock_time');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('type');
            $table->float('rate');
            $table->date('efective_date');
            $table->timestamps();
            $table->softDeletes();
            $table->string('status');
        });

        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->morphs('tokenable');
            $table->string('name');
            $table->string('token', 64)->unique();
            $table->text('abilities')->nullable();
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
        Schema::dropIfExists('users');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('letter_formats_table');
        Schema::dropIfExists('letters_table');
        Schema::dropIfExists('check_clock_setting_table');
        Schema::dropIfExists('check_clock_setting_times_table');
        Schema::dropIfExists('check_clocks_table');
        Schema::dropIfExists('salaries');
        Schema::dropIfExists('personal_access_tokens');
        Schema::dropIfExists('notifications');
    }
};

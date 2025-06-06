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

        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('head_office_phone');
            $table->string('head_office_phone_backup')->nullable();
            $table->string('head_office_address');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('name')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('role', ['admin', 'employee']);
            $table->timestamps();
        });

        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('branch_address');
            $table->string('branch_phone');
            $table->string('branch_phone_backup')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('divisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('branch_id')->constrained('branches')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('division_id')->constrained('divisions')->onDelete('cascade');
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('company_id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('Branch_id')->constrained('branches')->onDelete('cascade');
            $table->foreignId('Division_id')->constrained('divisions')->onDelete('cascade');
            $table->foreignId('Position_id')->constrained('positions')->onDelete('cascade');
            $table->string('EmployeeID')->unique();
            $table->string('FirstName');
            $table->string('LastName');
            $table->string('Gender');
            $table->text('Address');
            $table->string('PhoneNumber');
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
            $table->text('Notes')->nullable();
            $table->timestamps();
        });

        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->string('file_path')->nullable();
            $table->string('original_filename')->nullable()->after('file_path');
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
            $table->enum('type', ['published', 'archived', 'draft']);
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('letters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('letter_format_id')->constrained('letter_formats')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('resignation_date')->nullable();
            $table->text('reason_resign')->nullable();
            $table->text('additional_notes')->nullable();
            $table->string('current_division')->nullable();
            $table->string('requested_division')->nullable();
            $table->text('reason_transfer')->nullable();
            $table->integer('current_salary')->nullable();
            $table->integer('requested_salary')->nullable(); // perbaiki huruf kecil semua
            $table->text('reason_salary')->nullable();
            $table->date('leave_start')->nullable();
            $table->date('return_to_work')->nullable();
            $table->text('reason_for_leave')->nullable();
            $table->boolean('is_sent')->default(false);
            $table->boolean('is_approval')->default(false);
            $table->timestamps();
            $table->softDeletes();
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

        // Tabel Package Plans
        Schema::create('package_plans', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->json('features');
            $table->unsignedBigInteger('price');
            $table->timestamps();
        });

        // Tabel Checkout
        Schema::create('checkouts', function (Blueprint $table) {
            $table->id();
            $table->string('plan');
            $table->unsignedBigInteger('company_id');
            $table->integer('branches')->default(0);
            $table->integer('addon_employees')->default(0);
            $table->bigInteger('subtotal');
            $table->bigInteger('tax');
            $table->bigInteger('total');
            $table->string('status')->default('pending'); // pending, paid, failed, etc
            $table->timestamps();

            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
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
        Schema::dropIfExists('employee_achievements');
        Schema::dropIfExists('company');
        Schema::dropIfExists('branch');
        Schema::dropIfExists('division');
        Schema::dropIfExists('position');
        Schema::dropIfExists('package_plans');
        Schema::dropIfExists('checkouts');
    }
};

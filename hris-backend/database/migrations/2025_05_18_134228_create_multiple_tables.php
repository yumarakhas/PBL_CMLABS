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
            $table->foreignId('Company_id')->constrained('companies')->onDelete('cascade');
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


        Schema::create('check_clock_settings', function (Blueprint $table) {
            $table->id();
            // $table->string('name');
            // $table->enum('type', ['WFO', 'WFA']);
            $table->decimal('latitude', 10, 8)->nullable(); // lokasi titik check-in
            $table->decimal('longitude', 11, 8)->nullable();
            $table->integer('radius')->nullable(); // dalam meter
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('check_clock_setting_times', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ck_settings_id')->constrained('check_clock_settings')->onDelete('cascade');
            $table->enum('day', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
            
            // Pengaturan waktu clock in
            $table->time('clock_in_start'); // jam 07:00 - waktu paling awal bisa clock in
            $table->time('clock_in_end'); // jam 09:00 - waktu paling akhir bisa clock in
            $table->time('clock_in_on_time_limit'); // jam 08:00 - setelah ini dianggap Late
            
            // Pengaturan waktu clock out
            $table->time('clock_out_start'); // jam 17:00 - waktu paling awal bisa clock out
            $table->time('clock_out_end'); // jam 19:00 - waktu paling akhir bisa clock out
            
            $table->boolean('work_day')->default(true); // apakah hari kerja?
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('check_clocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->foreignId('ck_settings_id')->nullable()->constrained('check_clock_settings')->onDelete('set null');
            $table->enum('check_clock_type', ['check-in', 'check-out', 'annual-leave', 'sick-leave', 'absent']);
            $table->date('check_clock_date'); // tanggal presensi
            $table->time('check_clock_time'); // waktu presensi
            $table->time('check_out_time');
            $table->date('start_date')->nullable(); // Add start date for leave periods
            $table->date('end_date')->nullable();
            $table->enum('status', ['On Time', 'Late', 'Absent', 'Annual Leave', 'Sick Leave', 'Waiting Approval', '-'])->nullable();
            $table->boolean('approved')->nullable(); // untuk absensi manual yang perlu persetujuan
            $table->string('location')->nullable(); // nama lokasi (jika WFO)
            $table->string('address')->nullable(); // alamat lengkap (jika tersedia)
            $table->decimal('latitude', 10, 8)->nullable(); // lokasi aktual
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('photo')->nullable(); // foto bukti presensi (jika pakai)
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->integer('type');
            $table->float('rate');
            $table->date('effective_date');
            $table->string('status');
            $table->timestamps();
            $table->softDeletes();
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
        Schema::dropIfExists('checkouts');
        Schema::dropIfExists('package_plans');
        Schema::dropIfExists('personal_access_tokens');
        Schema::dropIfExists('salaries');
        Schema::dropIfExists('check_clocks');
        Schema::dropIfExists('check_clock_setting_times');
        Schema::dropIfExists('check_clock_settings');
        Schema::dropIfExists('letters');
        Schema::dropIfExists('letter_formats');
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('employees');
        Schema::dropIfExists('positions');
        Schema::dropIfExists('divisions');
        Schema::dropIfExists('branches'); 
        Schema::dropIfExists('users');
        Schema::dropIfExists('companies');
    }
};

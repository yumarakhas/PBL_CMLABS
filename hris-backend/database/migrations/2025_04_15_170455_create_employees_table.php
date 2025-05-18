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
            $table->foreignId('ck_setting_id')->constrained('check_clock_setting')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('FirstName');
            $table->string('LastName');
            $table->char('Gender');
            $table->text('Address');
            $table->string('PhoneNumber');
            $table->string('Branch');
            $table->string('Position');
            $table->string('Division');
            $table->boolean('Status');
            $table->string('NIK');
            $table->string('LastEducation');
            $table->string('PlaceOfBirth');
            $table->string('BirthDate');
            $table->string('ContractType');
            $table->string('Bank');
            $table->string('BankAccountNumber');
            $table->string('BankAccountHolderName');
            $table->string('photo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};

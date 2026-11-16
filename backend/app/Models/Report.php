<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Report extends Model
{
    protected $fillable = [
        'category_id', 'severity', 'perpetrator_name',
        'incident_date', 'incident_location', 'description',
        'photo_path', 'tracking_code', 'status',
    ];

    protected $casts = [
        'incident_date' => 'date',
    ];

    protected static function booted(): void
    {
        static::creating(function (Report $report) {
            if (empty($report->tracking_code)) {
                $report->tracking_code = self::generateTrackingCode();
            }
        });
    }

    public static function generateTrackingCode(): string
    {
        do {
            $code = strtoupper(Str::random(6));
        } while (self::where('tracking_code', $code)->exists());

        return $code;
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function responses(): HasMany
    {
        return $this->hasMany(ReportResponse::class);
    }
}

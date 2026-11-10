<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category_id'       => 'required|exists:categories,id',
            'severity'          => 'nullable|in:Ringan,Sedang,Parah',
            'perpetrator_name'  => 'nullable|string|max:255',
            'incident_date'     => 'nullable|date|before_or_equal:today',
            'incident_location' => 'nullable|string|max:255',
            'description'       => 'required|string|min:30|max:2000',
            'photo'             => 'nullable|image|mimes:png,jpg,jpeg,webp|max:5120',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo_path'] = $request->file('photo')->store('reports', 'public');
        }

        unset($validated['photo']);

        $report = Report::create($validated);

        return response()->json([
            'message'       => 'Laporan berhasil dikirim.',
            'tracking_code' => $report->tracking_code,
        ], 201);
    }

    public function track(string $code): JsonResponse
    {
        $report = Report::with(['category', 'responses.user:id,name'])
            ->where('tracking_code', strtoupper($code))
            ->first();

        if (!$report) {
            return response()->json([
                'message' => 'Kode pelacakan tidak ditemukan.',
            ], 404);
        }

        return response()->json([
            'report' => [
                'tracking_code'     => $report->tracking_code,
                'category'          => $report->category->name,
                'severity'          => $report->severity,
                'description'       => $report->description,
                'status'            => $report->status,
                'incident_date'     => $report->incident_date?->format('Y-m-d'),
                'incident_location' => $report->incident_location,
                'created_at'        => $report->created_at->format('d M Y, H:i'),
                'responses'         => $report->responses->map(fn ($r) => [
                    'staff'      => $r->user->name,
                    'message'    => $r->message,
                    'created_at' => $r->created_at->format('d M Y, H:i'),
                ]),
            ],
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $reports = Report::with('category')
            ->orderByDesc('created_at')
            ->paginate(15);

        return response()->json($reports);
    }

    public function updateStatus(Request $request, Report $report): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:Pending,Investigating,Ditanggapi',
        ]);

        $report->update($validated);

        return response()->json(['message' => 'Status diperbarui.']);
    }

    public function respond(Request $request, Report $report): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:2000',
        ]);

        $report->responses()->create([
            'user_id' => $request->user()->id,
            'message' => $validated['message'],
        ]);

        if ($report->status === 'Pending') {
            $report->update(['status' => 'Investigating']);
        }

        return response()->json(['message' => 'Tanggapan berhasil dikirim.']);
    }
}

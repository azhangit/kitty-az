<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Gallery/Index', [
            'types' => GalleryImage::TYPES,
            'images' => GalleryImage::query()
                ->orderBy('type')
                ->orderBy('sort_order')
                ->latest('id')
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type' => ['required', 'string', 'in:' . implode(',', GalleryImage::TYPES)],
            'photos' => ['required', 'array', 'min:1'],
            'photos.*' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:6144'],
        ]);

        $destination = public_path('images/gallery');
        if (! is_dir($destination)) {
            mkdir($destination, 0755, true);
        }

        $nextSortOrder = (int) (GalleryImage::where('type', $validated['type'])->max('sort_order') ?? -1) + 1;

        foreach ($request->file('photos', []) as $index => $photoFile) {
            $extension = strtolower($photoFile->getClientOriginalExtension());
            $filename = Str::uuid()->toString() . '.' . $extension;
            $absolutePath = $destination . DIRECTORY_SEPARATOR . $filename;

            $this->resizeAndSaveImage($photoFile->getPathname(), $absolutePath, $extension);

            GalleryImage::create([
                'type' => $validated['type'],
                'path' => '/images/gallery/' . $filename,
                'sort_order' => $nextSortOrder + $index,
            ]);
        }

        return back()->with('success', 'Gallery images uploaded successfully.');
    }

    private function resizeAndSaveImage(string $sourcePath, string $targetPath, string $extension): void
    {
        $rawImage = @file_get_contents($sourcePath);
        $sourceImage = $rawImage ? @imagecreatefromstring($rawImage) : false;

        if (! $sourceImage) {
            throw new \RuntimeException('Invalid image file.');
        }

        $sourceWidth = imagesx($sourceImage);
        $sourceHeight = imagesy($sourceImage);

        $maxDimension = 1400;
        $scale = min($maxDimension / $sourceWidth, $maxDimension / $sourceHeight, 1);

        $targetWidth = (int) round($sourceWidth * $scale);
        $targetHeight = (int) round($sourceHeight * $scale);

        $canvas = imagecreatetruecolor($targetWidth, $targetHeight);

        if (in_array($extension, ['png', 'webp'], true)) {
            imagealphablending($canvas, false);
            imagesavealpha($canvas, true);
            $transparent = imagecolorallocatealpha($canvas, 0, 0, 0, 127);
            imagefilledrectangle($canvas, 0, 0, $targetWidth, $targetHeight, $transparent);
        }

        imagecopyresampled(
            $canvas,
            $sourceImage,
            0,
            0,
            0,
            0,
            $targetWidth,
            $targetHeight,
            $sourceWidth,
            $sourceHeight,
        );

        switch ($extension) {
            case 'png':
                imagepng($canvas, $targetPath, 8);
                break;
            case 'webp':
                imagewebp($canvas, $targetPath, 85);
                break;
            case 'jpg':
            case 'jpeg':
            default:
                imagejpeg($canvas, $targetPath, 85);
                break;
        }

        imagedestroy($sourceImage);
        imagedestroy($canvas);
    }
}

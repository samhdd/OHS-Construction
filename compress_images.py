import os
from PIL import Image

def compress_images(directory, max_width=1920, quality=80):
    total_original_size = 0
    total_compressed_size = 0
    count = 0

    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                filepath = os.path.join(root, file)
                original_size = os.path.getsize(filepath)
                total_original_size += original_size
                
                try:
                    with Image.open(filepath) as img:
                        # Convert to RGB if necessary (e.g. for RGBA PNGs to JPEG)
                        if img.mode in ("RGBA", "P"):
                            img = img.convert("RGB")
                        
                        # Resize if larger than max_width
                        if img.width > max_width:
                            ratio = max_width / float(img.width)
                            new_height = int(float(img.height) * float(ratio))
                            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        
                        # Save back to the same path
                        img.save(filepath, "JPEG", quality=quality, optimize=True)
                        
                        compressed_size = os.path.getsize(filepath)
                        total_compressed_size += compressed_size
                        count += 1
                        print(f"Compressed {filepath}: {original_size/1024:.1f}KB -> {compressed_size/1024:.1f}KB")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

    print("\n--- Summary ---")
    print(f"Processed {count} images.")
    print(f"Original size: {total_original_size / (1024*1024):.2f} MB")
    print(f"Compressed size: {total_compressed_size / (1024*1024):.2f} MB")
    print(f"Reduction: {(1 - total_compressed_size/total_original_size)*100:.1f}%")

if __name__ == "__main__":
    compress_images("assets/images")

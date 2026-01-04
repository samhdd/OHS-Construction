import os

# Configuration
SEARCH_DIR = "."
TARGET_STRING = "assets/images/"
# We use the raw git content or jsdelivr. jsdelivr is better for caching.
# Format: https://cdn.jsdelivr.net/gh/USER/REPO@BRANCH/PATH
REPLACEMENT_STRING = "https://cdn.jsdelivr.net/gh/samhdd/OHS-Construction@main/assets/images/"
FILE_EXTENSIONS = [".html", ".css", ".js"]

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if TARGET_STRING in content:
            new_content = content.replace(TARGET_STRING, REPLACEMENT_STRING)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {filepath}")
        else:
            print(f"Skipped (no match): {filepath}")
            
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def main():
    print(f"Replacing '{TARGET_STRING}' with '{REPLACEMENT_STRING}'...")
    for root, dirs, files in os.walk(SEARCH_DIR):
        # Exclude .git and node_modules
        if ".git" in dirs:
            dirs.remove(".git")
        if "node_modules" in dirs:
            dirs.remove("node_modules")
            
        for file in files:
            if any(file.endswith(ext) for ext in FILE_EXTENSIONS):
                filepath = os.path.join(root, file)
                replace_in_file(filepath)
    print("Done.")

if __name__ == "__main__":
    main()

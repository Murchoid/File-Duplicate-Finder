# File Duplicate Finder

A CLI tool to help you find and manage duplicate files in a directory. This tool also provides functionality to list all files in a directory and its subdirectories.

## How to Use

### Step 0: Create the Docker Image
Build the Docker image for the project:
```bash
docker build -t file-duplicate-finder .
```

### Step 1: Run the Docker Container
Run the Docker container, mounting the directory you want to analyze:
```bash
docker run -it -v "path/to/your/directory:/app/directory" file-duplicate-finder
```

Replace `path/to/your/directory` with the absolute path to the directory on your host machine.


### Step 2: Use the CLI Tool
You can now use the `dup-finder` CLI tool to manage files in the mounted directory.

---

## CLI Commands

### Find and Delete Duplicates
To find and delete duplicate files in a directory:
```bash
dup-finder --find "directory"
```
You can also use the shorthand `-f`:
```bash
dup-finder -f "directory"
```

### List All Files
To list all files in a directory and its subdirectories:
```bash
dup-finder --ls "directory"
```
You can also use the shorthand `-l`:
```bash
dup-finder -l "directory"
```

---

## Example Usage
1. Find duplicates in `/app/directory`:
   ```bash
   dup-finder --find /app/directory
   ```

2. List all files in `/app/directory`:
   ```bash
   dup-finder --ls /app/directory
   ```

---

## Notes
- Ensure the directory you want to analyze is mounted to the container using the `-v` flag.
- Changes made by the tool (e.g., deleting duplicates) will reflect on the host machine.

Happy file managing!

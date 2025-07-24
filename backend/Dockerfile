FROM python:3.10-slim

# Set environment variables
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["python", "app.py"]
# Use a lightweight web server for production
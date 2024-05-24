# Use a slimmer base image to start
FROM python:3.11-slim-buster

# Set environment variables to prevent Python from writing .pyc files and to ensure output is not buffered
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /code

# Update the package list, install necessary system packages, upgrade pip, install Poetry, and clean up
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3-dev gcc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir poetry && \
    poetry config virtualenvs.create false

# Copy the pyproject.toml and poetry.lock file and install the project dependencies
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-root --no-interaction --no-ansi

RUN pip install torch==2.0.0+cpu -f https://download.pytorch.org/whl/torch_stable.html

# Install additional dependencies for sentence-transformers
RUN pip install --no-cache-dir transformers tqdm numpy scikit-learn scipy nltk sentencepiece Pillow

# Install sentence-transformers without dependencies
RUN pip install --no-cache-dir sentence-transformers --no-deps

# Expose port 8000 for the FastAPI application
EXPOSE 8000

# Copy the rest of the application code
COPY . .

# Copy the food_descriptions.json file into the /code directory
COPY ./data/food_descriptions.json /code/food_descriptions.json

# Command to run the FastAPI application using uvicorn
CMD ["uvicorn", "categories-suggestion.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

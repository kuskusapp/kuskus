# Use the official Python 3.11 image based on Debian Buster as the base image
FROM python:3.11-buster

# Set environment variable to prevent Python from writing .pyc files to disk
ENV PYTHONDONTWRITEBYTECODE 1

# Set environment variable to ensure that Python output is not buffered, allowing for real-time logging
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container to /code
WORKDIR /code

# Update the package list and install the necessary system packages for Python development
RUN apt-get update && \
    apt install -y python3-dev

# Upgrade pip to the latest version
RUN pip install --upgrade pip

# Install Poetry, a dependency management and packaging tool for Python
RUN pip install poetry

# Add the pyproject.toml file to the container. This file is used by Poetry to manage project dependencies.
ADD pyproject.toml .

# Configure Poetry to not create virtual environments (since we are running inside a Docker container)
RUN poetry config virtualenvs.create false

# Install the project dependencies as specified in pyproject.toml without installing the project itself (--no-root)
# The --no-interaction flag prevents Poetry from prompting for input, and --no-ansi prevents colored output
RUN poetry install --no-root --no-interaction --no-ansi

# Expose port 8000 to allow communication to and from the container on this port
EXPOSE 8000

# Copy all files from the current directory on the host machine to the /code directory in the container
COPY . .

# Command to run the FastAPI application using uvicorn
CMD ["uvicorn", "topic-suggestion.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

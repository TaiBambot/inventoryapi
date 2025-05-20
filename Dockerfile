# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the built jar file into the container
COPY target/inventoryapi-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]

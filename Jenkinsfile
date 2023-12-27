pipeline {
    agent {
        docker {
            image 'maven:3.8.4' // Use an image with Maven installed
        }
    }
    environment {
        DOCKER_IMAGE_NAME = "springboot-deploy"
        DOCKER_IMAGE_TAG = "${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"
    }
    stages {
        stage('Clone Repo') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    def dockerImage = docker.build(env.DOCKER_IMAGE_TAG)

                    // Push the Docker image to a registry if needed
                    // docker.withRegistry('https://registry.example.com', 'credentials-id') {
                    //     dockerImage.push()
                    // }
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    echo "Docker Image Tag Name: ${DOCKER_IMAGE_TAG}"

                    // Stop and remove the existing container (if any)
                    sh "docker stop ${DOCKER_IMAGE_NAME} || true"
                    sh "docker rm ${DOCKER_IMAGE_NAME} || true"

                    // Run the Docker container
                    sh "docker run --name ${DOCKER_IMAGE_NAME} -d -p 8081:8081 ${DOCKER_IMAGE_TAG}"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Additional success steps can be added here.'
        }
        failure {
            echo 'Pipeline failed! Additional failure steps can be added here.'
        }
    }
}

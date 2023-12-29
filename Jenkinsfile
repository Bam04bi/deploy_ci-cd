this is my full pipeline :
pipeline {
    environment {
        registry = "layouneghita1485/ghm"
        registryCredential = 'DOCKER_REGISTRY_CREDENTIALS'
        dockerImage = ''
    }

    agent any

    stages {
        stage('Cloning our Git') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/Bam04bi/deploy_ci-cd.git'
                }
            }
        }

        stage('Building Docker Image') {
            steps {
                script {
                    dockerImage = docker.build "${registry}:${BUILD_NUMBER}"
                }
            }
        }

        stage('Deploying Docker Image to Dockerhub') {
            steps {
                script {
                    if (isUnix()) {
                        sh "echo 'Logging into Docker Hub'"
                        // Use input redirection to pass the password to Docker login
                        sh "echo 'Nouhaila 1995' | docker login -u layouneghita1485 --password-stdin https://index.docker.io/v1/"
                        withDockerRegistry([credentialsId: registryCredential, url: 'https://index.docker.io/v1/']) {
                            dockerImage.push()
                        }
                    } else {
                        bat 'echo Logging into Docker Hub'
                        // Use input redirection to pass the password to Docker login
                        bat 'echo Nouhaila 1995 | docker login -u layouneghita1485 --password-stdin https://index.docker.io/v1/'
                        withDockerRegistry([credentialsId: registryCredential, url: 'https://index.docker.io/v1/']) {
                            dockerImage.push()
                        }
                    }
                }
            }
        }

        stage('Cleaning Up') {
            steps {
                script {
                    // Remove the local Docker image
                    sh "docker rmi --force ${registry}:${BUILD_NUMBER}"
                }
            }
        }
    }

}

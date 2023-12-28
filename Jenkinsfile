pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building..'
                    sh 'npm install'
                }
            }
        }

        stage('Tests') {
            steps {
                script {
                    echo 'Testing..'
                    sh 'npm test'
                }
            }
        }

        stage('Build and push Docker image') {
            steps {
                script {
                    def dockerImage = docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                    docker.withRegistry(DOCKER_REGISTRY_URL, DOCKER_REGISTRY_CREDENTIALS) {
                        dockerImage.push("${DOCKER_IMAGE_TAG}")
                    }
                }
            }
        }

        stage('Deploy to remote Docker host') {
            steps {
                script {
                    // Use "nohup" only on Unix-like systems
                    def nohupCommand = isUnix() ? 'nohup' : ''
                    
                    sh "${nohupCommand} docker pull ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                    sh 'docker stop node-demo || true'
                    sh 'docker rm node-demo || true'
                    sh 'docker rmi ${DOCKER_IMAGE_NAME}:current || true'
                    sh "docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ${DOCKER_IMAGE_NAME}:current"
                    sh "${nohupCommand} docker run -d --name node-demo -p 80:3000 ${DOCKER_IMAGE_NAME}:current"
                }
            }
        }
    }
}

pipeline {
    agent {
        docker {
            image 'node:20.10.0-alpine3.19'
            args '-p 3000:3000'
        }
    }
    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('DOCKER_REGISTRY_CREDENTIALS')
    }
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
                    def dockerImage = docker.build("ghm/node-demo:${BUILD_NUMBER}")
                    docker.withRegistry('https://your-registry-url', 'DOCKER_REGISTRY_CREDENTIALS') {
                        dockerImage.push("${BUILD_NUMBER}")
                    }
                }
            }
        }
        stage('Deploy to remote Docker host') {
            steps {
                script {
                    sh 'docker pull ghm/node-demo:${BUILD_NUMBER}'
                    sh 'docker stop node-demo || true'
                    sh 'docker rm node-demo || true'
                    sh 'docker rmi ghm/node-demo:current || true'
                    sh 'docker tag ghm/node-demo:${BUILD_NUMBER} ghm/node-demo:current'
                    sh 'docker run -d --name node-demo -p 80:3000 ghm/node-demo:current'
                }
            }
        }
    }
}

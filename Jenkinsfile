node {
    def WORKSPACE = env.WORKSPACE
    def dockerImageName = "springboot-deploy"
    def dockerImageTag = "${dockerImageName}:${env.BUILD_NUMBER}"

    try {
        stage('Clone Repo') {
            git url: 'https://github.com/Bam04bi/deploy_ci-cd.git',
                branch: 'main'
        }

        stage('Build docker') {
            dockerImage = docker.build(dockerImageTag)
        }

        stage('Deploy docker') {
            echo "Docker Image Tag Name: ${dockerImageTag}"
            sh "docker stop ${dockerImageName} || true && docker rm ${dockerImageName} || true"
            sh "docker run --name ${dockerImageName} -d -p 8081:8081 ${dockerImageTag}"
        }
    } catch (Exception e) {
        // Handle exceptions, log details for debugging
        echo "Failed to execute the pipeline: ${e.message}"
        throw e
    } finally {
        // Cleanup or additional steps
    }
}

pipeline {
    agent any
    environment {
        DOCKER_REGISTRY_URL = 'http://192.168.1.161:5000'
        DOCKER_REGISTRY_CREDENTIALS = 'e911e14d-468d-4a52-8864-249632a96b18'
        FRONT_IMAGE_NAME = '192.168.1.161:5000/msaidc/beem-blue-forest'
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', credentialsId: 'github-access', url: 'https://github.com/Youssefmehrimehri/testForetBleu.git/'
                }
            }
        }
        stage('Build and Push Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    def image = docker.build("${FRONT_IMAGE_NAME}:${BUILD_NUMBER}", ".")
                    echo "Docker image built successfully: ${FRONT_IMAGE_NAME}:${BUILD_NUMBER}"
                    image.tag('latest')
                    docker.withRegistry("${DOCKER_REGISTRY_URL}", DOCKER_REGISTRY_CREDENTIALS) {
                        echo "Pushing Docker image to registry..."
                        image.push()
                        image.push('latest')
                        echo "Docker image pushed successfully."
                    }
                }
            }
        }
        stage('Clean Up Old Docker Images') {
            steps {
                script {
                    echo "Cleaning up old Docker images..."
                    sh """
                    docker images --format '{{.Repository}}:{{.Tag}} {{.CreatedAt}}' | grep ${DOCKER_REGISTRY_URL}/msaidc/beem-front | sort -k2 -r | tail -n +3 | awk '{print \$1}' | xargs -r docker rmi
                    """
                    echo "Old Docker images cleaned up."
                }
            }
        }
        stage('Deploy with Ansible') {
            steps {
                script {
                    echo "Deploying with Ansible..."
                    sh """
                    #!/bin/bash
                    echo "Running Ansible Playbook for Deployment..."
                    ansible-playbook -i inventory.ini playbook.yml --extra-vars "front_image_name=${FRONT_IMAGE_NAME} front_image_tag=${BUILD_NUMBER}"
                    """
                    echo "Deployment with Ansible completed."
                }
            }
        }
    }
}

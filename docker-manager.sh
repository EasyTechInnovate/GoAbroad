#!/bin/bash

PROJECT_NAME=${1:-"myproject"}
IMAGE_PREFIX="$PROJECT_NAME"
MONGO_VOLUME="${PROJECT_NAME}_mongo-data"
NETWORK_NAME="${PROJECT_NAME}-net"

check_env_files() {
    local env=$1
    if [ "$env" == "development" ]; then
        if [ ! -f .env.development ]; then
            echo "Error: .env.development file not found! Please create this file."
            exit 1
        fi
        if [ ! -f docker-compose.dev.yml ]; then
            echo "Error: docker-compose.dev.yml file not found! Please create this file."
            exit 1
        fi
    elif [ "$env" == "production" ]; then
        if [ ! -f .env.production ]; then
            echo "Error: .env.production file not found! Please create this file."
            exit 1
        fi
        if [ ! -f docker-compose.prod.yml ]; then
            echo "Error: docker-compose.prod.yml file not found! Please create this file."
            exit 1
        fi
    fi
}

# Function to clean up containers, images, volumes, and network
cleanup() {
    local env=$1
    echo "Starting cleanup process for $PROJECT_NAME ($env environment)..."

    # Stop and remove containers (without redirecting output)
    echo "Stopping and removing containers..."
    docker stop mongo_container client server 2>/dev/null
    docker rm mongo_container client server 2>/dev/null

    # Remove images - Show error messages and force removal
    echo "Removing images..."
    project_images=$(docker images -q --filter "reference=${IMAGE_PREFIX}*" 2>/dev/null)
    if [ ! -z "$project_images" ]; then
        docker rmi -f $project_images
    else
        echo "No images found matching ${IMAGE_PREFIX}*"
    fi

    # Alternative image cleanup - List and remove all project-related images
    echo "Performing more thorough image cleanup..."
    docker images | grep "$PROJECT_NAME" | awk '{print $3}' | xargs -r docker rmi -f

    # Remove volume and network
    echo "Removing volumes and networks..."
    docker volume rm $MONGO_VOLUME 2>/dev/null
    docker network rm $NETWORK_NAME 2>/dev/null

    echo "Cleanup complete."
}

# Function for complete teardown - stops all containers and removes all resources
complete_teardown() {
    echo "Performing complete teardown for $PROJECT_NAME..."
    
    # Down all containers with removal of volumes
    if [ -f docker-compose.dev.yml ]; then
        echo "Stopping development containers..."
        docker compose --project-name $PROJECT_NAME -f docker-compose.dev.yml down -v
    fi
    
    if [ -f docker-compose.prod.yml ]; then
        echo "Stopping production containers..."
        docker compose --project-name $PROJECT_NAME -f docker-compose.prod.yml down -v
    fi
    
    # Remove any remaining project containers
    echo "Removing any remaining containers..."
    remaining_containers=$(docker ps -a -q --filter name=${PROJECT_NAME})
    if [ ! -z "$remaining_containers" ]; then
        docker rm -f $remaining_containers
        echo "Removed containers."
    else
        echo "No remaining containers found."
    fi
    
    # Remove all project images - multiple approaches for thoroughness
    echo "Looking for project images to remove..."
    
    # Approach 1: By reference filter
    project_images_1=$(docker images -q --filter "reference=${IMAGE_PREFIX}*" 2>/dev/null)
    if [ ! -z "$project_images_1" ]; then
        echo "Removing images by reference filter..."
        docker rmi -f $project_images_1
    fi
    
    # Approach 2: By grep (more inclusive)
    echo "Performing deep image cleanup..."
    project_images_2=$(docker images | grep "$PROJECT_NAME" | awk '{print $3}')
    if [ ! -z "$project_images_2" ]; then
        echo "Removing images by project name..."
        docker rmi -f $project_images_2
    fi
    
    # Approach 3: Find dangling images that might be related
    echo "Cleaning up any dangling images..."
    docker image prune -f
    
    # Remove all volumes associated with the project
    echo "Removing project volumes..."
    project_volumes=$(docker volume ls -q --filter name=${PROJECT_NAME})
    if [ ! -z "$project_volumes" ]; then
        docker volume rm $project_volumes
    else
        echo "No project volumes found."
    fi
    
    # Remove project network
    echo "Removing project network..."
    docker network rm $NETWORK_NAME 2>/dev/null
    
    echo "Complete teardown finished. All containers, images, volumes, and networks for $PROJECT_NAME have been removed."
    
    # Final verification
    remaining_images=$(docker images | grep "$PROJECT_NAME" | wc -l)
    if [ "$remaining_images" -gt 0 ]; then
        echo "WARNING: $remaining_images images might still remain. Attempting forced cleanup..."
        docker images | grep "$PROJECT_NAME" | awk '{print $3}' | xargs -r docker rmi -f
    else
        echo "Verification complete: No project images remain."
    fi
}

# Function to start services
start_services() {
    local env=$1
    local services=$2

    if [ "$env" == "development" ]; then
        docker compose --project-name $PROJECT_NAME --env-file .env.development -f docker-compose.dev.yml up $services
    else
        docker compose --project-name $PROJECT_NAME --env-file .env.production -f docker-compose.prod.yml up -d $services
    fi
}

# Interactive menu function
show_menu() {
    echo "Environment:"
    echo "1) Development"
    echo "2) Production" 
    echo "3) Complete Teardown (all environments)"
    echo "4) Exit"
    read -p "Choice [1-4]: " env_choice

    case $env_choice in
    1) ENV="development" ;;
    2) ENV="production" ;;
    3) 
        complete_teardown
        exit 0
        ;;
    4) exit 0 ;;
    *)
        echo "Invalid choice"
        return 1
        ;;
    esac

    check_env_files $ENV

    echo "Select service:"
    echo "1) All (Clean start)"
    echo "2) Server"
    echo "3) Client"
    echo "4) Server & Client"
    echo "5) Back"
    echo "6) Exit"
    read -p "Choice [1-6]: " service_choice

    return 0
}

# Main script logic
if [ $# -eq 0 ]; then
    echo "Usage: ./setup.sh <project_name>"
    echo "No project name provided, using default: $PROJECT_NAME"
fi

while true; do
    show_menu
    [ $? -eq 1 ] && continue

    case $service_choice in
    1)
        cleanup $ENV
        start_services $ENV "--build --force-recreate"
        ;;
    2) start_services $ENV "server" ;;
    3) start_services $ENV "client" ;;
    4) start_services $ENV "server client" ;;
    5) continue ;;
    6) exit 0 ;;
    *) echo "Invalid choice" ;;
    esac
    break
done
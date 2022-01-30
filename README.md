# RS School REST service


### Install Docker 
https://docs.docker.com/get-docker/

### Downloading

```
git clone git@github.com:svetlana-tyshkevich/nodejs2021Q4-service.git
```


### Switch to docker task's branch
```
git checkout task-7-docker
```

### Build service and start container
```
docker-compose up --build
```

### Show all top level images, their repository and tags, and their size.
```
docker images
```

### Show all containers
```
docker ps
```

### Stop and remove containers, networks, images, and volumes
```
docker-compose down
```

### Remove unused data
```
docker system prune -a 
```
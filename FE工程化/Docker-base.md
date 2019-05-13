# docker

# 基本命令

1. docker image ls
2. docker image rm ID/name:tag...


# 拓展

## docker-compose

例子
```yaml
version: "1.0" # 版本

services: # 服务
  msjw_admin_build:
    build: ../
    container_name: "ant-design-pro_build"
    volumes:
      - dist:/usr/src/app/dist

  # ant-design-pro_web:
  #   image: nginx
  #   ports:
  #     - 80:80
  #   container_name: "ant-design-pro_web"
  #   restart: unless-stopped
  #   volumes:
  #     - dist:/usr/share/nginx/html:ro
  #     - ./nginx.conf:/etc/nginx/conf.d/default.conf

volumes:
  dist:
```

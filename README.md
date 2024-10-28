测试数据

npx prisma migrate dev # 该命令用于使用Prisma工具执行数据库迁移。


test + 1

test
nix-env -iA nixpkgs.mysql80
mysql -u root -p -h 30.0.6.219 -P 33151

nix-env -iA nixpkgs.postgrey
psql -h 30.0.7.151 -p 32802 -U postgres -d verceldb

nix-env -iA nixpkgs.redis
redis-cli -h ${REDIS_HOST} -p ${REDIS_PORT}

nix-env -iA nixpkgs.mongosh
mongosh mongodb://30.0.2.137:33046

README.md 文件存在的意义在于提供项目的相关信息、设置指导、使用说明以及开发文档，帮助用户和开发者更好地理解和使用项目。
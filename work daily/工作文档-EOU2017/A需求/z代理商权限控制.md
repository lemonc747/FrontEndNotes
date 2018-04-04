

### 目前权限控制
自定义查询
- FrameBaseDao.parseQuerySql为查询列表添加权限条件。
- 查询count，目前权限控制有bug，
 
通用FrameBaseService/Dao
- 查询：jdbcDao.queryPage函数中，queryPageList查询列表，queryCount查询总数，都是通过SqlAssembleUtils工具类中通用sql语句构建函数来控制idxOwnerID权限的
- 新增编辑：jdbcDao.update & insert，同样通过SqlAssembleUtils工具类控制。
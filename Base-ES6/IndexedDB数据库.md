
user
hxId> user

department
orgId> department

userUnderDepartment
orgId> [hxId, hxId,...]

场景
1. 用户详情：hxId查找用户
2. 部门详情：orgId查找部门
3. 部门架构：加载所有部门，然后遍历
4. 部门下子用户

初始化
1. 加载所有departments
2. 
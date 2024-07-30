# `Mybatis`

# Mybatis

### 配置文件

-   mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
<!--    别名配置：开启后不用在mapperxml里面写全包名-->
    <typeAliases>
        <package name="com.boyhack.entity"/>
    </typeAliases>    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://127.0.0.1:53306/store"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>        </environment>    </environments>    <mappers><!--        <mapper resource="com/boyhack/mapper/UserMapper.xml"/>-->
        <package name="com.boyhack.mapper"/>
    </mappers></configuration>
```

1. 配置`xml`配置文件
2. 创建`mapper`映射文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.boyhack.mapper.UserMapper">

    <resultMap id="user" type="UserEntity">
        <id column="uid" property="id"></id>
        <result column="user_name" property="userName"></result>
        <result column="created_Time" property="createTime"></result>
        <result column="created_user" property="createUser"></result>
        <result column="modified_user" property="modifiedUser"></result>
        <result column="modified_time" property="modifiedTime"></result>
    </resultMap>
    <select id="selectAll" resultType="UserEntity">
        select * from t_user;
    </select>
    <select id="selectById" resultType="UserEntity">
        select * from t_user where uid = #{uid};
    </select>

    <select id="selectCondition">
        select * from t_user
        <where>
            <if test="phone != null and phone != ''">
                and phone=#{phone}
            </if>
            <if test="username != null and username != ''">
                and
                username like #{username};
            </if>
        </where>

    </select></mapper>
```

-   获取连接

```java
//main
public class MybatisDemo {
    public static void main(String[] args) throws IOException {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        final SqlSession sqlSession = sqlSessionFactory.openSession();
//        final List<UserEntity> users = sqlSession.selectList("test.selectAll");
        final UserMapper mapper = sqlSession.getMapper(UserMapper.class);
//        final List<UserEntity> users = mapper.selectAll();
//        System.out.println(users);

        final UserEntity user = mapper.selectById(1L);
        System.out.println(user);
        sqlSession.close();

    }
}
```

```java
// mapper/usermapper.java

public interface UserMapper {
    List<UserEntity> selectAll();

    UserEntity selectById(Long uid);

    List<UserEntity> selectCondition(@Param("phone") String phone, @Param("username") String username);

    void add(UserEntity);
```

-   动态`sql`
-   `insert`

    `mybatis`默认开启事务，插入数据后需要手动提交事务`commit`; 如果不想手动提交事务/关闭事务`final SqlSession sqlSession = sqlSessionFactory.openSession();`

    如果想更新后想获取新增的数据主键，需要在`xml`文件里添加主键映射。

```xml
<insert id="add" useGeneratedKeys="true" keyProperty="id">
</insert>
```

-   `update`

    同插入一样，需要提交事务
    `<set></set>`

-   `delete`

```xml
<delete id="deleteByIds">
	<!-- 批量删除
	mybatis会将数组参数封装为一个Map集合
	* 默认key： array = 数组
	* 可以使用@Param注解改变map集合的默认key名称
	 -->
	delete from table where id in (
		<foreach collection="array" item="id" separator=","></foreach>
	);
</delete>
```

-   `MyBatis`参数传递

    `MyBatis` 单个参数封装： 1. `POJO`类型：直接使用，属性名 和 参数占位符名称一致 2. `Map`集合：直接使用，键名 和 参数占位符名称一致 3. `Collection`：封装为`Map`集合
    `map.put("arg0", collection集合)`
    `map.pust("collection",collection集合)` 4. List: 封装为`Map`集合
    `map.put("arg0", list集合)`
    `map.pust("collection",list集合)`
    `map.put("list",list集合)` 5. `Array`：封装为`Map`集合
    `map.put("arg0",数组)`
    `map.put("array",数组)`
    多个参数,封装为`Map`集合：
    `map.put("arg0", 参数值1)`
    `map.put("arg1", 参数值2)`
    `map.put("param1",参数值1)`
    `map.put("param2",参数值2)`

```java
//多个参数 可以使用@Param注解，替换Map集合中默认的arg键名
User select(@Param("username") String username, @Param("password") String password);
```

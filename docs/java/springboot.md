# `SpringBoot`

## 三层架构

-   `controller` - 接收请求，响应数据
-   `service` - 业务逻辑处理
-   `dao` `Data Access Object` - 数据访问操作

### 控制反转 `IOC` `Inversion Of Conrol`

     对象的创建控制权有程序本身转移到外部容器，这种思想称为控制反转

### 依赖注入 `DI` `Dependency Injection`

    容器为应用提供运行时所依赖的资源，称之为依赖注入

### `Bean`对象

     在 spring 中，IOC容器中创建、管理的对象，叫做 bean

-   `@Component`
-   `@Controller`
-   `@Service`
-   `@Repository`

解决多个同类型`bean`存在

-   `@Primary` - 设置`bean`的优先级，如果存在多个同类型的`bean`，此注解设置默认值
-   `@Atuowired` + `@Qualifier('类名首字母小写 bean名称')`
-   `@Resource([name="类名称",type=xxx.class])`

-   `mybatis` + `mysql` `pom.xml`

```xml
<!-- mybatis -->
<!--
	 <dependency>
	<groupId>org.mybatis.spring.boot</groupId>
	<artifactId>mybatis</artifactId>
	<version>3.5.16</version>
</dependency>
-->
<dependency>
	<groupId>org.mybatis.spring.boot</groupId>
	<artifactId>mybatis-spring-boot-starter</artifactId>
	<version>3.0.3</version>
</dependency>
<!-- mysql驱动 -->
<dependency>
	<groupId>com.mysql</groupId>
	<artifactId>mysql-connector-j</artifactId>
</dependency>
```

```yml
# mysql
spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://127.0.0.1:53306/store
        username: root
        password: 123456
```

新建 `mapper`包

```java
// xxxx.xxx.mapper
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper{}
```

-   `@Mapper`注解 - 在运行时，会自动生成该接口的实现类对象（代理对象），并且将该对象交给 `IOC` 容器管理

-   `Druid` `Hicari` 数据库连接池

```xml
<!-- Druid 德鲁伊连接池 -->
<!-- https://mvnrepository.com/artifact/com.alibaba/druid-spring-boot-starter -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.19</version>
</dependency>

```

-   `XML`映射文件
    `xml`映射文件的名称与`mapper` 接口名称一致，并且将`xml`映射文件和`mapper`接口放置在相同包下（同包同名）
    `xml`映射文件的`namespace`属性为`mapper`接口全限定名一致
    `xml`映射文件中`sql`语句的`id`与`mapper`接口中的方法名一致，并保持返回类型一致
    ![[截屏2024-05-30 17.35.56.png]]

```sql
// UserMapper.java

@Mapper
public interface UserMapper {

    @Delete("delete from t_user where uid = #{uid}")
    public void deleteById(Integer uid);

//    @Results({
//            @Result(column = "created_time",property = "createdTime")
//    })
    @Select("select * from t_user")
    public List<User> findAll();

    @Insert("insert into t_user(username,password) values (#{username}, #{password})")
    public void addUser(User user);
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.boyhack.mapper.UserMapper">

    <resultMap id="user" type="User">
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

    </select>

</mapper>
```

-   `pageHelper` - `MyBatis` 分页插件

```xml
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper-spring-boot-starter -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>2.1.0</version>
</dependency>
```

```java
PageHelper.startPage(pageNum, pageSize);

List<User> users = empDao.listEmp();
Page<User> p = (Page<User>) users;
PageBean pageBean = new PageBean(p.getTotal(),p.getResult());
```

-   `lombok`

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.32</version>
    <scope>provided</scope>
</dependency>
```

-   `@Value("${xxx.xxx}")` - `application.yml`中配置的属性

-   `@ConfigurationProperties` - 自动配置属性

```yml
aliyun:
    oss:
        endpoint: https://oss-cn-hangzhou.aliyuncs.com
        accesKeyId: xlkdsdksd
        accessKeySecret: ymldjksdksdlk
        bucketName: web-framework
```

```java
@Data
@Component
@ConfigurationProperties(prefix="aliyun.oss")
publick class AliOSSProperties{
	private String endpoint;
	private String accessKeyId;
	private String accessKeySecret;
	private String bucketName;
}
```

配合`@ConfigurationProperties`注解自动提示配置文件中的属性

```xml
<dependecy>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-configuration-processor</artifactId>
</dependecy>
```

-   `Filter` 过滤器 `@WebFilter`
    定义`Filter`: 定义一个类，实现`Filter`接口，并重写所有方法
    配置`Filter`: `Filter`类上加`@WebFilter`注解，配置拦截资源的路径。引导类上加`@ServletComponentScan`开启`Servlet`组件支持

```java
public class DemoFilter implements Filter {

}
```

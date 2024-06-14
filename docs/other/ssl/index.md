# Let's Encrypt

为了在您的网站上启用 HTTPS，您需要从证书颁发机构（CA）获取证书（一种文件）。 Let’s Encrypt 是一个证书颁发机构（CA）。 要从 Let’s Encrypt 获取您网站域名的证书，您必须证明您对域名的实际控制权。 您可以在您的 Web 主机上运行使用  [ACME 协议](https://tools.ietf.org/html/rfc8555)的软件来获取 Let’s Encrypt 证书。官网建议大多数具有命令行访问权限的人使用  [Certbot](https://certbot.eff.org/ "Certbot") ACME 客户端。

## 安装  **`acme.sh`**

```sh
# curl 安装
curl https://get.acme.sh | sh -s email=my@example.com

curl https://raw.githubusercontent.com/acmesh-official/acme.sh/master/acme.sh | sh -s -- --install-online -m  my@example.com

# or wget
wget -O -  https://get.acme.sh | sh -s email=my@example.com

wget -O -  https://raw.githubusercontent.com/acmesh-official/acme.sh/master/acme.sh | sh -s -- --install-online -m  my@example.com

```

在国内的网络环境下的话，大多数情况正常上网应该都不能下载（我一直都没有下载成功过...），所以我们也可以直接`clone`代码下来再执行脚本。

```sh
git clone https://github.com/acmesh-official/acme.sh.git

cd acme.sh

./acme.sh --install -m my@example.com
```

普通用户和 root 用户都可以安装使用. 安装过程进行了以下几步:

1.  把 acme.sh 安装到你的  **home**  目录下:

```sh
# 移动到当前用户目录下 上面 clone 的仓库

mkdir .acme.sh && mv acme.sh ~/.acme.sh/

```

并创建 一个 shell 的 alias, 例如 .bashrc，方便你的使用: `alias acme.sh=~/.acme.sh/acme.sh`

```sh
# .zshrc 我自己使用的是zsh

echo >> alias acme.sh=~/.acme.sh/acme.sh

```

2.  自动为你创建 cronjob, 每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书.

更高级的安装选项请参考: <https://github.com/Neilpang/acme.sh/wiki/How-to-install>

## 自动生成证书

**acme.sh**  实现了  **acme**  协议支持的所有验证协议. 一般有两种方式验证: http 和 dns 验证.

- http 方式需要在你的网站根目录下放置一个文件, 来验证你的域名所有权,完成验证. 然后就可以生成证书了.

```sh
acme.sh --issue -d mydomain.com -d www.mydomain.com --webroot /home/wwwroot/mydomain.com/
```

只需要指定域名, 并指定域名所在的网站根目录. **acme.sh**  会全自动的生成验证文件, 并放到网站的根目录, 然后自动完成验证. 最后会聪明的删除验证文件. 整个过程没有任何副作用.

如果你用的  **apache**服务器, **acme.sh**  还可以智能的从  **apache**的配置中自动完成验证, 你不需要指定网站根目录:

```sh
acme.sh --issue -d mydomain.com --apache
```

如果你用的  **nginx**服务器, 或者反代, **acme.sh**  还可以智能的从  **nginx**的配置中自动完成验证, 你不需要指定网站根目录:

```sh
acme.sh --issue -d mydomain.com --standalone
```

**注意, 无论是 apache 还是 nginx 模式, acme.sh 在完成验证之后, 会恢复到之前的状态, 都不会私自更改你本身的配置. 好处是你不用担心配置被搞坏, 也有一个缺点, 你需要自己配置 ssl 的配置, 否则只能成功生成证书, 你的网站还是无法访问 https. 但是为了安全, 你还是自己手动改配置吧.**

如果你还没有运行任何 web 服务, **80**  端口是空闲的, 那么  **acme.sh**  还能假装自己是一个 webserver, 临时监听在**80**  端口, 完成验证:

```sh
acme.sh --issue -d mydomain.com --standalone
```

更高级的用法请参考: <https://github.com/Neilpang/acme.sh/wiki/How-to-issue-a-cert>

## 手动 dns 方式, 手动在域名上添加一条 txt 解析记录, 验证域名所有权.

这种方式的好处是, 你不需要任何服务器, 不需要任何公网 ip, 只需要 dns 的解析记录即可完成验证. 坏处是，如果不同时配置 Automatic DNS API，使用这种方式 acme.sh 将无法自动更新证书，每次都需要手动再次重新解析验证域名所有权。

```sh
acme.sh --issue --dns -d mydomain.com  --yes-I-know-dns-manual-mode-enough-go-ahead-please

```

注意第二次这里用的是  `--renew`

dns 方式的真正强大之处在于可以使用域名解析商提供的 api 自动添加 txt 记录完成验证.

**acme.sh**  目前支持 cloudflare, dnspod, cloudxns, godaddy 以及 ovh 等数十种解析商的自动集成.

以 dnspod 为例, 你需要先登录到 dnspod 账号, 生成你的 api id 和 api key, 都是免费的. 然后:

```sh
export DP_Id="1234"

export DP_Key="sADDsdasdgdsf"

acme.sh --issue --dns dns_dp -d aa.com -d www.aa.com

```

> 我个人使用的是腾讯的 dnspod, 登录进去之后可以查看自己的 DP_ID 和 DP_Key

更多的 [`dns`方式参考](https://github.com/acmesh-official/acme.sh/wiki/dnsapi)

证书就会自动生成了. 这里给出的 api id 和 api key 会被自动记录下来, 将来你在使用 dnspod api 的时候, 就不需要再次指定了. 直接生成就好了:

```sh
acme.sh --issue -d mydomain2.com --dns  dns_dp
```

更详细的 api 用法: <https://github.com/Neilpang/acme.sh/blob/master/dnsapi/README.md>

## copy/安装 证书

前面证书生成以后, 接下来需要把证书 copy 到真正需要用它的地方.

注意, 默认生成的证书都放在安装目录下: `~/.acme.sh/`, 请不要直接使用此目录下的文件, 例如: 不要直接让 nginx/apache 的配置文件使用这下面的文件. 这里面的文件都是内部使用, 而且目录结构可能会变化.

正确的使用方法是使用  `--install-cert`  命令,并指定目标位置, 然后证书文件会被 copy 到相应的位置, 例如:

- Apache example:

```sh
acme.sh --install-cert -d example.com \
--cert-file      /path/to/certfile/in/apache/cert.pem  \
--key-file       /path/to/keyfile/in/apache/key.pem  \
--fullchain-file /path/to/fullchain/certfile/apache/fullchain.pem \
--reloadcmd     "service apache2 force-reload"
```

- Nginx example:

```sh
acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"
```

(一个小提醒, 这里用的是  `service nginx force-reload`, 不是  `service nginx reload`, 据测试, `reload`  并不会重新加载证书, 所以用的  `force-reload`)

Nginx 的配置  `ssl_certificate`  使用  `/etc/nginx/ssl/fullchain.cer` ，而非  `/etc/nginx/ssl/<domain>.cer` ，否则  [SSL Labs](https://www.ssllabs.com/ssltest/)  的测试会报  `Chain issues Incomplete`  错误。

`--install-cert`命令可以携带很多参数, 来指定目标文件. 并且可以指定 reloadcmd, 当证书更新以后, reloadcmd 会被自动调用,让服务器生效.

详细参数请参考: <https://github.com/Neilpang/acme.sh#3-install-the-issued-cert-to-apachenginx-etc>

值得注意的是, 这里指定的所有参数都会被自动记录下来, 并在将来证书自动更新以后, 被再次自动调用.

## 查看已安装证书信息

```sh
acme.sh --info -d example.com
# 会输出如下内容：
DOMAIN_CONF=/root/.acme.sh/example.com/example.com.conf
Le_Domain=example.com
Le_Alt=no
Le_Webroot=dns_ali
Le_PreHook=
Le_PostHook=
Le_RenewHook=
Le_API=https://acme-v02.api.letsencrypt.org/directory
Le_Keylength=
Le_OrderFinalize=https://acme-v02.api.letsencrypt.org/acme/finalize/23xxxx150/781xxxx4310
Le_LinkOrder=https://acme-v02.api.letsencrypt.org/acme/order/233xxx150/781xxxx4310
Le_LinkCert=https://acme-v02.api.letsencrypt.org/acme/cert/04cbd28xxxxxx349ecaea8d07
Le_CertCreateTime=1649358725
Le_CertCreateTimeStr=Thu Apr  7 19:12:05 UTC 2022
Le_NextRenewTimeStr=Mon Jun  6 19:12:05 UTC 2022
Le_NextRenewTime=1654456325
Le_RealCertPath=
Le_RealCACertPath=
Le_RealKeyPath=/etc/acme/example.com/privkey.pem
Le_ReloadCmd=service nginx force-reload
Le_RealFullChainPath=/etc/acme/example.com/chain.pem
```

## 更新证书

目前证书在 60 天以后会自动更新, 你无需任何操作. 今后有可能会缩短这个时间, 不过都是自动的, 你不用关心.

请确保 cronjob 正确安装, 看起来是类似这样的:

```sh
crontab  -l

56 * * * * "/root/.acme.sh"/acme.sh --cron --home "/root/.acme.sh" > /dev/null

```

## 关于修改 ReloadCmd

目前修改`ReloadCmd`没有专门的命令，可以通过重新安装证书来实现修改`reloadCmd`的目的。 此外，安装证书后，相关信息是保存在`~/.acme.sh/example.com/example.conf`文件下的，内容就是`acme.sh --info -d example.com`输出的信息，不过`ReloadCmd`在文件中使用了 Base64 编码。理论上可以通过直接修改该文件来修改`ReloadCmd`，且修改时，无需 Base64 编码，直接写命令原文`acme.sh`也可以识别。 不过，`example.conf`文件的位置和内容格式以后可能会改变！`example.conf`一直都是内部使用, 后面有可能会改为用 sqlite 或者 mysql 格式存储. 所以一般不建议自己修改。

## 更新 acme.sh

目前由于 acme 协议和 letsencrypt CA 都在频繁的更新, 因此 acme.sh 也经常更新以保持同步.

升级 acme.sh 到最新版 :

```sh
acme.sh --upgrade

# 国内网络可能会更新失败，所以还是建议下载源码
```

如果你不想手动升级, 可以开启自动升级:

```sh
acme.sh --upgrade --auto-upgrade
```

之后, acme.sh 就会自动保持更新了.

你也可以随时关闭自动更新:

```sh
acme.sh --upgrade --auto-upgrade  0
```

## debug

如果出错, 请添加 debug log：

```sh
acme.sh --issue  .....  --debug
```

或者：

```sh
acme.sh --issue  .....  --debug  2
```

请参考： <https://github.com/Neilpang/acme.sh/wiki/How-to-debug-acme.sh>

最后, 本文并非完全的使用说明, 还有很多高级的功能, 更高级的用法请参看其他 wiki 页面.

<https://github.com/Neilpang/acme.sh/wiki>

以上内容基本都是 copy 原文的 readme,然后有一些参考资料后根据自己的情况作了一些调整。
Readme 地址: <https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E>

##### 参考

- [github.com/acmesh-offi…](https://github.com/acmesh-official/acme.sh/wiki/dnsapi "https://github.com/acmesh-official/acme.sh/wiki/dnsapi")
- [github.com/acmesh-offi…](https://github.com/acmesh-official/acme.sh "https://github.com/acmesh-official/acme.sh")
- [eff-certbot.readthedocs.io/en/stable/i…](https://eff-certbot.readthedocs.io/en/stable/intro.html "https://eff-certbot.readthedocs.io/en/stable/intro.html")

# QEMU

> A generic and open source machine emulator and virtualizer
>
> 以下内容摘抄自[wiki QEMU](https://zh.wikipedia.org/zh-cn/QEMU)

QEMU 是一款免费和开源的软件，可以让用户在电脑上运行虚拟机。该软件可以使用 MSYS2 或 APT 包管理器在 Windows 10、Ubuntu 20.04 等操作系统上安装。使用 QEMU，你可以创建新的虚拟机，为测试目的配置一个虚拟环境，并在不重启电脑的情况下运行不同的操作系统。

QEMU（Quick Emulator）是一款免费开源模拟器，由法布里斯·贝拉（Fabrice Bellard）等人编写。其与 Bochs，PearPC 类似，但拥有高速（配合 KVM）、跨平台的特性。

QEMU 是一个托管的虚拟机，它使用动态二进制转换技术来模拟处理器，并且提供多种硬件和外设模型，这使它能够运行多种未修改的客户机操作系统，能与 KVM 配合以接近本地速度运行虚拟机（接近真实电脑的速度）。

QEMU 可以执行用户级的进程仿真，从而可以使为某一架构编译的程序在另一架构上运行（通过 VMM 的形式实现）。

## 系统模块

---

### QEMU 有多种模式

- User mode：又称作“用户模式”，在这种模式下，QEMU 运行针对不同指令编译的单个 Linux 或 Darwin/macOS 程序。系统调用与 32/64 位接口适应。在这种模式下，我们可以实现交叉编译（cross-compilation）与交叉侦错（cross- debugging）。

- System mode：“系统模式”，在这种模式下，QEMU 模拟一个完整的计算机系统，包括外围设备。它可以用于在一台计算机上提供多台虚拟计算机的虚拟主机。 QEMU 可以实现许多客户机 OS 的引导，比如 x86，MIPS，32-bit ARMv7，PowerPC 等等。

- KVM Hosting：QEMU 在这时处理 KVM 镜像的设置与迁移，并参加硬件的仿真，但是客户端的执行则由 KVM 完成。

- Xen Hosting：在这种托管下，客户端的执行几乎完全在 Xen 中完成，并且对 QEMU 屏蔽。QEMU 只提供硬件仿真的支持。

## 架构

---

QEMU 的架构由纯软件实现，并在 Guest 与 Host 中间，来处理 Guest 的硬件请求，并由其转译给真正的硬件。

然而因为 QEMU 是纯软件实现的，所有的指令都要经过 QEMU，使得性能很差，而配合 KVM 则可以解决这一问题。

QEMU 虚拟化的思路是：提取 Guest 代码，翻译为 TCG 中间代码，而后翻译为 Host 代码。相当于实现了一个“中间人”的角色。

## 特性

---

QEMU 可以在运行所有程序的情况下保存和恢复虚拟机的状态。客户操作系统（Guest Operating System）不需要修补就可以在 QEMU 中运行。

QEMU 支持仿真各种体系结构，包括：

- IA-32（x86）个人电脑

- x86-64 个人电脑

- MIPS64 Release 6 和更早的版本

- Sun 的 SPARC sun4m

- Sun 的 SPARC sun4u

- ARM 开发板（Integrator / CP 和 Versatile / PB）

- SH4 SHIX 板

- PowerPC（PReP 和 Power Macintosh）

- ETRAX CRIS

- MicroBlaze

- RISC-V

- LoongArch

虚拟机可以连接多种类型的实体主机硬件，包括硬盘，CD-ROM，网卡，声卡和 USB 设备。USB 设备可以是完全模拟的，也可以使用主机的 USB 设备（但这需要管理员权限，而且并非所有设备皆适用）。

虚拟磁盘映像可以以特殊格式（qcow 或 qcow2）存储，只占用虚拟机操作系统实际使用的磁盘空间。此时模拟的 120 GB 硬盘可能仅占用主机硬盘几百 MB 的空间。QCOW2 格式还允许创建覆盖映像，以记录与另一个（未修改的）基本映像文件的区别。如此便可能将模拟磁盘的内容恢复到较早状态。例如，基本映像文件可以保存已知可顺利运作的全新安装系统，但操作时使用覆盖映像。万一访客系统故障（如因病毒攻击，意外的系统破坏等），用户可以删除覆盖映像，使用较早的模拟磁盘映像版本就行了。

QEMU 可以通过网络地址转换模拟共享主机系统连接的网卡（不同型号），从而有效地允许 guest 虚拟机使用与主机相同的网络。虚拟网卡还可以连接到其他 QEMU 实例的网卡或本地 TAP 接口。通过使用主机 OS 的桥接功能，将 QEMU 使用的 TUN / TAP 接口与主机 OS 上的非虚拟以太网接口桥接，也可以实现网络连接。

QEMU 集成了多种服务以允许主机和访客系统进行通信;例如，集成的 SMB 服务器和网络端口重定向（以允许传入连接到虚拟机）。它也可以在没有引导程序的情况下引导 Linux 内核。

QEMU 不依赖主机系统上的图形输出方法。相反，它可以允许通过集成的 VNC 服务器访问客户操作系统的屏幕。它还可以使用模拟的串行线，而不使用任何屏幕和适用的操作系统。

模拟多个 CPU 进行对称多处理（Symmetrical Multi-Processing）也是可能的。

QEMU 不需要管理员权限运行，但在使用了某些提高速度的内核模块（如 KQEMU），或者使用某些网络连接模块时，则需要管理员权限。

### 微型代码生成器

微型代码生成器（TCG）旨在消除依赖特定版本的 GCC 或编译器的缺点，并将编译合并到 QEMU 的运行时任务中。因此，整个翻译阶段由两部分组成：目标代码块（TB）以 TCG 指令（一种机器无关的中间符号）重写 ，随后 TCG 为宿主机架构执行编译。可选的优化在这两步之间传递。

TCG 需要专用的代码来支持每个体系结构。它还要求重写目标指令集翻译过程以利用 TCG 指令，而不是以前使用的 dyngen 指令。

### 加速器

KQEMU 是一个 Linux 内核模块，由 Fabrice Bellard 撰写，它明显加快了在具有相同 CPU 架构的平台上模拟 x86 或 x86-64 程序的速度。这可以通过直接在主机 CPU 上运行用户模式代码（以及可选的某些内核代码）以及仅对内核模式和实模式代码使用处理器与外设模拟来实现。即使宿主机 CPU 不支持硬件辅助虚拟化，KQEMU 也可以从多个客户操作系统执行代码。QEMU 支持大容量内存，这使得它们与 KQEMU 不兼容。较新的 QEMU 版本已完全取消对 KQEMU 的支持。

由于缺乏对 KQEMU 和 QVM86 的支持，基于内核的虚拟机（KVM）已经基本成为基于 Linux 的硬件辅助虚拟化解决方案，与 QEMU 一起使用。

英特尔的硬件加速执行管理器（HAXM）是 KVM 在 Windows 和 MacOS 上基于 x86 的硬件辅助虚拟化的开源替代品。2013 年，英特尔使用 QEMU 来进行 Android 开发。

## 硬件辅助仿真

MIPS 兼容的龙芯 3 处理器增加了 200 条新指令来帮助 QEMU 翻译 x86 指令，这些新指令降低了在 MIPS 流水线中执行 x86 / CISC 风格指令的开销。由于中国科学院对 QEMU 进行了进一步改进，龙芯 3 在 9 个基准测试中，运行 x86 二进制文件的同时，执行本机二进制文件的平均性能达到 70％

## 并行仿真

使用 QEMU 的虚拟化解决方案能够并行执行多个虚拟 CPU。 对于用户模式仿真，QEMU 将仿真线程映射到宿主线程。 对于全系统仿真，QEMU 能够为每个虚拟 CPU 运行一个主机线程。 前提是客户端已经更新到可以支持并行系统仿真，目前可以支持的 CPU 是 ARM 和 Alpha。否则 QEMU 将使用单个线程以循环方式模拟执行每个虚拟 CPU。

## 与其他虚拟机的集成

---

### VitrualBox

VirtualBox，发布于 2007 年 1 月，使用了一些 QEMU 的虚拟硬件设备，并且有内置的基于 QEMUdede 动态再编译器。与 KQEMU 一样，VirtualBox 通过 VMM（虚拟机管理器）在宿主机上本地运行几乎所有客户代码，并将再编译仅仅用作回退机制——例如，当客户代码以实地址模式执行时。 [5]另外，VirtualBox 使用内置的反汇编程序进行了大量的代码分析和修补，以尽量减少再编译。除某些功能外，VirtualBox 是免费且开源的（在 GPL 许可下）。

### Xen-HVM

Xen 是虚拟机监视器，可以使用 Intel VT-x 或 AMD-V 硬件 x86 虚拟化扩展以及 ARM Cortex-A7 和 Cortex-A15 虚拟化扩展在 HVM（硬件虚拟机）模式下运行。 这意味着，面对 domU 以使用真实的设备驱动程序进行交谈的是一组真实的虚拟硬件，而不是半虚拟化设备。

QEMU 包含几个组件：CPU 仿真器，仿真设备，通用设备，机器描述符，用户界面和调试器。 QEMU 中的仿真器件和通用器件组成了虚拟 I/O 的器件模型。它们包括 PIIX3 IDE，Cirrus Logic 或纯 VGA 模拟视频，RTL8139 或 E1000 网络仿真以及 ACPI 支持。Xen 提供 APIC 支持。

Xen-HVM 具有基于 QEMU 项目的设备仿真功能，可为虚拟机提供虚拟 I/O。硬件通过运行在 dom0 后端的“QEMU 设备模型”守护进程来模拟。与其他 QEMU 运行模式（动态转换或 KVM）不同，虚拟 CPU 完全由管理程序管理，管理程序负责在 QEMU 模拟内存映射 I/O 访问时停止虚拟 CPU。

### KVM

KVM（基于内核的虚拟机）是 FreeBSD 和 Linux 的内核模块，它允许用户空间程序访问各种处理器的虚拟化硬件特性，这个特点使得 QEMU 可以为 x86，PowerPC 和 S/390 客户提供虚拟化。当目标体系结构与主机相同时，QEMU 可以使用 KVM 特有的功能，比如加速功能。

### Win4Lin Pro Desktop

在 2005 年初，Win4Lin 推出了 Win4Lin Pro Desktop，它基于 QEMU 和 KQEMU 的已调谐版本，并且托管了 Windows 的 NT 版本。 在 2006 年 6 月， Win4Lin 发布了基于相同代码库的 Win4Lin 虚拟桌面服务器。 Win4Lin 虚拟桌面服务器为来自 Linux 服务器的精简客户机提供 Microsoft Windows 会话服务。

2006 年 9 月，Win4Lin 宣布将公司名称更改为 Virtual Bridges，并发布了 Win4BSD Pro Desktop，该产品的一个端口用于 FreeBSD 和 PC-BSD。在 2007 年 5 月发布了 Win4Solaris Pro Desktop 和 Win4Solaris 虚拟桌面服务器后，提供了 Solaris 支持。

### SerialICE

SerialICE 是一款基于 QEMU 的固件调试工具，可在 QEMU 内部运行系统固件，同时通过与主机系统的串行连接访问真实硬件。这可以用作硬件 ICE 的廉价替代品。

### WinUAE

WinUAE Amiga 仿真器在 3.0.0 版本中引入了对使用 QEMU PPC 内核的 CyberStorm PPC 和 Blizzard 603e 开发板的支持

## 硬件平台模拟

---

QEMU 可模拟多种硬件设备

键盘 SCSI 控制器（AMD PCscsi 和 Tekram DC-390 控制器中的 LSI MegaRAID SAS 1078，LSI53C895A，NCR53C9x） 串行接口 声卡（Sound Blaster 16，ES1370 PCI，Gravis Ultrasound，AC97 和 Intel HD Audio） 看门狗定时器（Intel 6300 ESB PCI 或 iB700 ISA） USB 1.x / 2.x / 3.x 控制器（UHCI，EHCI，xHCI） USB 设备：音频，蓝牙适配器，HID（键盘/鼠标/平板电脑），MTP，串行接口，CAC 智能卡读卡器，存储（仅批量传输和 USB 连接 SCSI），Wacom 数位板

arm

QEMU 使用 NEON 扩展模拟 ARMv7 指令集。它模拟集成系统/ CP 板，多功能底板，RealView 仿真底板，基于 XScale 的 PDA，Palm Tungsten | E PDA，诺基亚 N800 和诺基亚 N810 互联网平板电脑等完整系统.QEMU 还为 Android SDK 提供支持，该模拟器属于 Android SDK 。三星选择了 QEMU 来帮助开发仿真'Wave'设备。

基于 Xilinx Cortex A9 的 Zynq SoC 采用以下元素进行建模仿真：

Zynq-7000 ARM Cortex-A9 CPU Zynq-7000 ARM Cortex-A9 MPCore 三重计时器 DDR 内存控制器 DMA 控制器（PL330） 静态存储器控制器（NAND / NOR 闪存） SD / SDIO 外设控制器（SDHCI） Zynq 千兆以太网控制器 USB 控制器（仅限 EHCI - 主机支持） Zynq UART 控制器 SPI 和 QSPI 控制器 I2C 控制器

## 派生版本

---

UTM 虚拟机（UTM Virtual Machine）是一款基于 QEMU 的虚拟机，支持 iOS、iPadOS、macOS 操作系统。基于 QEMU 的 UTM 虚拟机，可支持模拟 30 多个架构，例如 x86_64，ARM64，以及 RISC-V 等。

目前 UTM 支持在系统版本 iPadOS 13 以上、iOS 11 以上、macOS Big Sur 以上的设备上运行。

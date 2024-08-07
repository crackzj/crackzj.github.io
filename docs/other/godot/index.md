# `Godot`

## `CharacterBody2D` 角色节点

- `CharacterBody2D`： 角色节点，需要添加 `Sprite2D`子节点 和 `CollisionShape2D`子节点
- `Sprite2D`：显示图像（精灵图）

  - `Texture`：添加图片

    > 图片放大后，图片会比较模糊，可以点击:

    `Project`->`Project Settings`->`General`->`Rendering`->`Textures`->`Default Texture Filter`: `Nearest`

  - `Region`: `Enabled`: on 编辑动画帧
  - `Animation`: 设置水平和垂直帧数

- `CollisionShape2D`: 定义碰撞形状

  - `Shape`: 新建碰撞区域，调整适合的位置

    ![player](./images/player.jpg)

- `AnimationPlayer` 新建动画

  1. 选择`AnimationPlayer`,点击`Animation`->`New`新建动画，设置时间和是否循环
  2. 选择 `Sprite2D`,右侧属性 `Region`: Rect 添加关键帧，`Hframes`添加关键帧，`frames`添加关键帧

     ![animation](./images/animation.jpg)

## `Camera2D` 相机

用于二维场景的摄影机节点

- `Drag`: 启用 `Horizontal Enabled` `Vertical Enabled` 使得角色在一定范围内可以自由活动，而不是一直相机跟随
- `Position Smoothing`: 启用跟随平滑过渡， `Speed`可以调整跟随速度
- `Limit`: 设置相机可视范围，超出范围隐藏（为了不展示场景之外的空白） `Smoothed`启用平滑

![camera](./images/camera.jpg)

```gdscript
# 代码控制 camera

extends Node2D
@onready var tile_map: TileMap = $TileMap
@onready var camera_2d: Camera2D = $Player/Camera2D

func _ready():
  # 获取tileMap的边界，矩形边框，返回结果的宽高是以图块为单位，需要转换为像素
  var used := tile_map.get_used_rect()
  # 要转换像素，需要先获取每一个图块的大小
  var tile_size := tile_map.tile_set.tile_size

  # 上面 used 返回 Rect2i类型， 其中 position表示矩形左上角的坐标，end表示矩形右下角的坐标
	camera_2d.limit_top = used.position.y * tile_size.y
	camera_2d.limit_left = used.position.x * tile_size.x
	camera_2d.limit_right = used.end.x * tile_size.x
	camera_2d.limit_bottom = used.end.y * tile_size.y
```

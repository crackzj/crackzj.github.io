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

extends Node2D

# class member variables go here, for example:
# var a = 2
# var b = "textvar"

var vel=100

func _ready():
	set_process(true)
	# Called when the node is added to the scene for the first time.
	# Initialization here
	pass

func _process(delta):
	var d = 0
	var e = 0
	var c = 0
	var b = 0
	
	
	if Input.is_action_pressed("direita"):
		d=1
	
		
	if Input.is_action_pressed("esquerda"):
		e=-1
		
	if Input.is_action_pressed("cima"):
		c=1
		
	if Input.is_action_pressed("baixo"):
		b=-1
		
		
	if(get_position().x > 600-35):
		d=0
	
	if(get_position().x < 35):
		e=0
		
	if(get_position().y > 500-35):
		c=0
	
	if(get_position().y <  35):
		b=0
		
		
#	# Called every frame. Delta is time since last frame.
#	# Update game logic here.

	set_position(get_position()  + Vector2(vel,0) * delta * (d+e))
	set_position(get_position()  + Vector2(0,vel) * delta * (c+b))
	print(get_position())
	pass

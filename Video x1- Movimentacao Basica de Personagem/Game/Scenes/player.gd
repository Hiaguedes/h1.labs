extends KinematicBody2D

var txt0 = "Pressione as setas direcionais para andar  ⭠⭠⭠⭠"
var txt1 = "Pressione X para sair"
var vel=200
var movedir = Vector2(0,0)
var sprite  = "Parado"
var a=0

func _physics_process(delta):
	controle()
	movimento()
	sprite()


func controle():
	var right	   = Input.is_action_pressed("direita")
	var left 	   = Input.is_action_pressed("esquerda")
	var up	       = Input.is_action_pressed("baixo")
	var down	   = Input.is_action_pressed("cima")
	

	movedir.x = int(right) - int(left)
	movedir.y = int(down) - int(up)
		
		
func movimento():
	var motion = movedir.normalized() * vel
	move_and_slide(motion, Vector2(0,0))

func sprite():
	match movedir:
		Vector2(-1,0):
			sprite="Esquerda"
			$AnimatedSprite.flip_h	=	false
		Vector2(1,0):
			sprite="Direita"
			$AnimatedSprite.flip_h	=	true
		Vector2(0,-1):
			sprite="Cima"
		Vector2(0,1):
			sprite="Baixo"
		Vector2(1,1):
			sprite="diag_inf_dir"
			$AnimatedSprite.flip_h	=	true
		Vector2(1,-1):
			sprite="diag_sup_dir"
			$AnimatedSprite.flip_h	=	true
		Vector2(-1,1):
			sprite="diag_inf_esq"
			$AnimatedSprite.flip_h	=	false
		Vector2(-1,-1):
			sprite="diag_sup_esq"
			$AnimatedSprite.flip_h	=	false
		Vector2(0,0):
			$AnimatedSprite.stop()
			$AnimatedSprite.set_frame(0)
			
			
	$AnimatedSprite.play(sprite)
	



func _on_Area2D_area_entered(area):
	player.get_node(area)
	pass # replace with function body

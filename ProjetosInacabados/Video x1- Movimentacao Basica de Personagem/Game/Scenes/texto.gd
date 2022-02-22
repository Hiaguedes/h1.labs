extends RichTextLabel 

var txt0 = "Pressione as setas direcionais para andar  ⭠⭠⭠⭠"
var txt1 = "Pressione X para sair"


func _ready():
	set_bbcode(txt0)
	set_visible_characters(0)
	
func _process(delta):
	acao()

func _on_Timer_timeout():
	set_visible_characters(get_visible_characters() +1)

func acao():
	var acao	   = Input.is_action_pressed("action")
	if(acao == true):
		set_bbcode(" ")
		set_visible_characters(0)
	

	
clear
Write-Host 'Criando planilhas do mês do ano de: '
cd 'C:\Users\Hiago\Documents\Responde Ai\Demanda Vigente'
<#ls#>
$A=Get-Date
$A.year
if(!(Test-Path -path $A.year)){mkdir $A.year
ni $A.year$("-mes ")$A.Month".xlsx"}

cd $A.year
echo('')

$B="$($A.year)$("-mes ")$($A.Month)"
$B
$C="C:\Users\Hiago\Documents\Responde Ai\Demanda Vigente"+"\"+$A.year+"\$B"+".xlsx"
$C


if(!(Get-ItemPropertyValue -Path $C -Name Exists)){$B ="$($A.year)$("-mes ")$($A.Month-1)"}
$B 
$C="C:\Users\Hiago\Documents\Responde Ai\Demanda Vigente"+"\"+$A.year+"\$B"+".xlsx"

$datadecriacao=Get-ItemPropertyValue -Path $C -Name CreationTime,Exists

$D=$A.DayOfYear-$datadecriacao.DayOfYear


if($D -lt 28){
echo('yay')
start $B$(".xlsx")

}else{
echo('nop')
$B ="$($A.year)$("-mes ")$($A.Month)"
ni $B$(".xlsx")
start $B$(".xlsx")
}


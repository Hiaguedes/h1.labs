<#
Autor: Hiago
Ano:2020
                              Título


#>

param($saida)


cd $env:pasta_projetos\redes-e-segurança
cls
# Hash Table para os nomes dos arquivos
$nameExp=@{
    Label="Nome";
    Expression={$_.Name}
}

# Hash Table para o tamanho dos arquivos
$lengthExp=@{
    Label="Tamanho ";
    Expression={"{0:N2}KB" -f ($_.Length/1KB)}
}

# transforma essas duas tabelas em um vetor
$params = @($nameExp,$lengthExp);

$resultado=
ls -Recurse -File |
 ? Name -like "*vlan*"| 
Select $params



if($saida -eq "html" -or "HTML"){

$estilos= Get-Content $env:pasta_projetos\sistemas-operacionais-e-terminais\dicas-cmd-PS-windows\styles.css
$estiloTag= "<style> $estilos </style>"
$tituloBody="<h1> Relatório </h1>"

#$resultado
#$estilos

$resultado | ConvertTo-Csv -NoTypeInformation |Out-File $env:pasta_projetos\dicas-cmd-PS-windows\relatorio.csv
$resultado | ConvertTo-Json |Out-File $env:pasta_projetos\dicas-cmd-PS-windows\relatorio.json
$resultado | ConvertTo-Html -Title Relatório -Head $estiloTag -Body $tituloBody| Out-File $env:pasta_projetos\sistemas-operacionais-e-terminais\dicas-cmd-PS-windows\relatorio.html

#Invoke-Item $env:pasta_projetos\sistemas-operacionais-e-terminais\dicas-cmd-PS-windows\relatorio.html
}elseif($saida -eq "json" -or "JSON"){

$resultado | ConvertTo-Json |Out-File $env:pasta_projetos\sistemas-operacionais-e-terminais\dicas-cmd-PS-windows\relatorio.json


}elseif($saida -eq "csv" -or "CSV"){

$resultado | ConvertTo-Csv -NoTypeInformation |Out-File $env:pasta_projetos\sistemas-operacionais-e-terminais\dicas-cmd-PS-windows\relatorio.csv


}
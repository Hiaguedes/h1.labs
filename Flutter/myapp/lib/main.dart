import 'package:flutter/material.dart';

void main() => runApp(MainApp());

class MainApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: FormularioTransferenciaScreen(),
    );
  }
}

class ListagemTransferencia extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Transferências'),
          backgroundColor: Colors.green[400],
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: () {
            Navigator.push(context, MaterialPageRoute(builder: (context) {
              return FormularioTransferenciaScreen();
            }));
          },
          backgroundColor: Colors.green[400],
        ),
        body: ListaTransferencia(),
      ),
    );
  }
}

class FormularioTransferenciaScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Criação de Transferências'),
          backgroundColor: Colors.green[400],
        ),
        body: FormularioTransferencia(),
      ),
    );
  }
}

class FormularioTransferencia extends StatelessWidget {
  final TextEditingController _controladorCampoNumConta =
      new TextEditingController();
  final TextEditingController _controladorCampoValor =
      new TextEditingController();

  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      InputForm(
          controller: _controladorCampoNumConta,
          label: 'Número da conta',
          placeholder: '0000'),
      InputForm(
          controller: _controladorCampoValor,
          label: 'Valor',
          placeholder: '100.00',
          icon: Icons.monetization_on),
      ElevatedButton(
        child: Text('Confirmar'),
        onPressed: () {
          final String numeroConta = _controladorCampoNumConta.text;
          final String valor = _controladorCampoValor.text;

          Scaffold.of(context).showSnackBar(SnackBar(
              content: Text('valor: ${valor} numeroConta: ${numeroConta}')));
          Navigator.push(context, MaterialPageRoute(builder: (context) {
            return ListagemTransferencia();
          }));
        },
      )
    ]);
  }
}

class InputForm extends StatelessWidget {
  final TextEditingController controller;
  final String label;
  final String placeholder;
  final IconData? icon;

  InputForm({
    required this.controller,
    required this.label,
    required this.placeholder,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12),
      child: TextField(
        controller: controller,
        style: TextStyle(
          fontSize: 20,
        ),
        decoration: InputDecoration(
          icon: icon != null ? Icon(icon) : null,
          labelText: label,
          hintText: placeholder,
        ),
      ),
    );
  }
}

class ListaTransferencia extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ItemListaTransferencia('Hiago', '150.00'),
      ],
    );
  }
}

class ItemListaTransferencia extends StatelessWidget {
  final String nomeConta;
  final String valor;

  ItemListaTransferencia(this.nomeConta, this.valor);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 1,
      borderOnForeground: true,
      child: ListTile(
        leading: Icon(Icons.monetization_on),
        title: Text('R\$' + valor),
        subtitle: Text(nomeConta),
      ),
    );
  }
}

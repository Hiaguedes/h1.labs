import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Transferências'),
          backgroundColor: Colors.green[400],
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: () => {},
          backgroundColor: Colors.green[400],
        ),
        body: ListaTransferencia(),
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

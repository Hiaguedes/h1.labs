import 'package:flutter/material.dart';

void main() => runApp(MainApp());

class MainApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ListagemTransferencia(),
    );
  }
}

class Transferencias {
  String numeroConta;
  String value;

  Transferencias(this.numeroConta, this.value);
}

class FormularioTransferenciaScreen extends StatelessWidget {
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Criação de Transferências'),
        backgroundColor: Colors.green[400],
      ),
      body: FormularioTransferencia(),
    );
  }
}

class ListagemTransferencia extends StatefulWidget {
  final List<Transferencias> _transferencias = [];
  @override
  State<StatefulWidget> createState() {
    return ListaTransferenciasState();
  }
}

class ListaTransferenciasState extends State<ListagemTransferencia> {
  // final List<Transferencias> _transferencias = [];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Transferências'),
        backgroundColor: Colors.green[400],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.green[400],
        child: Icon(Icons.add),
        onPressed: () async {
          final future = await Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => FormularioTransferenciaScreen()));

          setState(() {
            widget._transferencias
                .add(Transferencias(future.numeroConta, future.value));
            print('FUTURE  ' + future.value + ' ' + future.numeroConta);
          });
        },
      ),
      body: new ListView.builder(
        itemCount: widget._transferencias.length,
        itemBuilder: (context, index) {
          print(
              'AAAAAAAAAAAAAAA ${widget._transferencias[index].numeroConta}  ${widget._transferencias[index].value}');
          final Transferencias transferencia = widget._transferencias[index];
          return ItemListaTransferencia(
              Transferencias(transferencia.numeroConta, transferencia.value));
        },
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
    return SingleChildScrollView(
        child: Column(children: <Widget>[
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

          final transferenciaCriada = Transferencias(numeroConta, valor);
          Navigator.of(context).pop(transferenciaCriada);
        },
      )
    ]));
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

class ItemListaTransferencia extends StatelessWidget {
  final Transferencias transf;

  ItemListaTransferencia(
    this.transf,
  );

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 1,
      borderOnForeground: true,
      child: ListTile(
        leading: Icon(Icons.monetization_on),
        title: Text('R\$' + '${transf.value}'),
        subtitle: Text('${transf.numeroConta}'),
      ),
    );
  }
}

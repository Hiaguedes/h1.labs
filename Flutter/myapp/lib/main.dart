import 'package:flutter/material.dart';
import 'form.dart';

void main() => runApp(MainApp());

class MainApp extends StatelessWidget {
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ListagemTransferencia(),
      theme: ThemeData.dark(),
    );
  }
}

class Transferencias {
  String numeroConta;
  String value;

  Transferencias(this.numeroConta, this.value);
}

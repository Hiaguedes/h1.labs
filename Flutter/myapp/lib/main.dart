import 'package:flutter/material.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          'Olá',
          textDirection: TextDirection.ltr,
        ),
        Text(
          'Mundo',
          textDirection: TextDirection.ltr,
        )
      ],
    );
  }
}

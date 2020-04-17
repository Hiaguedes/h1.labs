const { app, Menu, shell, ipcMain,
 BrowserWindow , globalShortcut, remote,dialog} = require('electron');

 const fs = require('fs');

 function saveFile() {
  console.log('Saving the file');
  const window = BrowserWindow.getFocusedWindow();
  window.webContents.send('editor-event', 'save');
}

function loadFile() {
  const window = BrowserWindow.getFocusedWindow();
console.log('Loading File...');
}

const template = [
    
    {
        label: 'File',
        submenu: [
          {
            label: 'Open',
            accelerator: 'CommandOrControl+L',
            click() {
              loadFile();
            }
          },
          {
            label: 'Save',
            accelerator: 'CommandOrControl+S',
            click() {
              saveFile();
            }
          }
        ]
      },{
    role: 'help',
    
    submenu: [
    {
    label: 'Sobre o Editor',
    click() {
    shell.openExternal('https://simplemde.com/');
    }
    },{
        label: 'Koe',
        click(){
            shell.openExternal('https://www.youtube.com/watch?v=wGKKhAhjBlE');
        }
    }

    ]
    },
    {
        label: 'Formato',
        submenu: [
        {
        label: 'Toggle Bold',
        click() {
        const window = BrowserWindow.getFocusedWindow();
        window.webContents.send(
        'editor-event',
        'toggle-bold'
        );
        }
        }
        ]
        }
       
    ];

    if (process.platform === 'win32') {
        template.unshift({
        label: app.getName(),
        submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'quit' }
        ]
        })
        };
    
    if (process.env.DEBUG) {
        template.push({
        label: 'Debugar',
        submenu: [
        {
        label: 'Ferramentas de Desenvolvedor',
        role: 'toggleDevTools'
        },
        { type: 'separator' },
        {
        role: 'reload',
        accelerator: 'Alt+R'
        }
        ]
        });
        };

//=====================================================




  app.on('ready', () => {
    globalShortcut.register('CommandOrControl+S', () => {
      saveFile();
    });
  
    globalShortcut.register('CommandOrControl+L', () => {
      loadFile();
    });
  });


ipcMain.on('save', (event, arg) => {
  console.log(`Salvando o conteudo do aquivo: `);
  console.log(arg);

  const window = BrowserWindow.getFocusedWindow();
  const options = {
    title: 'Salvar arquivo md',
    defautPath: '~/file.md',
    buttonLabel:'Salvar Arquivo do App',
    filters: [
      {
        name: '.md, File',
        extensions: ['md'],
        defautPath: '/Desktop/my-file.md'
      }
    ]
  };

  dialog.showSaveDialog( window,options, (filename) => {
    console.log(filename);
    if(filename){
      console.log(`Saving content to the file: ${filename}`);
    fs.writeFileSync(filename, arg,(err)=>{
      if(err){
        alert('Ocorreu um erro ao salvar o arquivo'+err.message)
      }
      alert('Arquivo criado com sucesso :)');
    });
  }
  });
});

ipcMain.on('editor-reply', (event, arg) => {
  console.log(`Received reply from web page: ${arg}`);
});
           

    const menu = Menu.buildFromTemplate(template);

    module.exports = menu;
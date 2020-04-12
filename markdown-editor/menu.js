const { app, Menu, shell, ipcMain, BrowserWindow , globalShortcut,dialog} = require('electron');
const window = BrowserWindow.getFocusedWindow();
const template = [
    
    {
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
        }
    
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
        }


        app.on('ready', () => {
            globalShortcut.register('CommandOrControl+S', () => {
            console.log('Saving the file');


            ipcMain.on('save', (event, arg) => {
            console.log(`Saving content of the file`);
            console.log(arg);
            });

            ipcMain.on('editor-reply', (event, arg) => {
            console.log(`Received reply from web page: ${arg}`);
            });
           
            const window = BrowserWindow.getFocusedWindow();
            window.webContents.send('editor-event', 'save');
            const options = {
            title: 'Save markdown file',
            filters: [
            {
            name: 'MyFile',
            extensions: ['md']
            }
            ]
            };
            dialog.showSaveDialog(window, options, filename=>{
                console.log(filename);
            });
           });
        }); 

    const menu = Menu.buildFromTemplate(template);

    module.exports = menu;
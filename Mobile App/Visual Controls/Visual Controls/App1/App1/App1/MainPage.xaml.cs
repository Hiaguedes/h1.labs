using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using SkiaSharp;
using SkiaSharp.Views.Forms;
using Xamarin.Essentials;

namespace App1
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : ContentPage

    

    {
        public MainPage()
        {
            InitializeComponent();
                    }

        private void canvas_surface(object sender, SKPaintSurfaceEventArgs e)
        {

            SKSurface surface = e.Surface;
            SKCanvas canvas = surface.Canvas;
            var paint = new SKPaint
            {
                TextSize = 64.0f,
                IsAntialias = true,
                Color = new SKColor(237, 237, 232),
                Style = SKPaintStyle.Fill
            };
            var paint1 = new SKPaint
            {
                TextSize = 110.0f,
                IsAntialias = true,
                Color = new SKColor(219, 227, 0),
                Style = SKPaintStyle.Fill
            };



            canvas.DrawText("h1.labs", 375, 120, paint1);

            for (int i = 1; i < 20; i++)    
            {
                canvas.DrawLine(100*i, 0, 100*i, 2000, paint);
            }

            for (int i = 1; i < 50; i++)
            {
                canvas.DrawLine(5,100*i,1500,100*i, paint);
            }

        }
        
    }
}

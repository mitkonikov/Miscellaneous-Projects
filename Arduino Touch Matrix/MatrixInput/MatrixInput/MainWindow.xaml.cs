using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace MatrixInput
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        SerialPort port;
        int sec = 0;
        bool port_HasBeenDeclared = false;
        Canvas[,] canvases = new Canvas[3, 3];

        System.Windows.Threading.DispatcherTimer dispatcherTimer = new System.Windows.Threading.DispatcherTimer();
        
        private void dispatcherTimer_Tick(object sender, EventArgs e)
        {
            sec++;
            timeLabel.Content = sec.ToString() + " s";
        }

        public MainWindow()
        {
            InitializeComponent();
            canvases[0, 0] = canvas00;
            canvases[0, 1] = canvas01;
            canvases[0, 2] = canvas02;
            canvases[1, 0] = canvas10;
            canvases[1, 1] = canvas11;
            canvases[1, 2] = canvas12;
            canvases[2, 0] = canvas20;
            canvases[2, 1] = canvas21;
            canvases[2, 2] = canvas22;
            dispatcherTimer.Tick += dispatcherTimer_Tick;
            dispatcherTimer.Interval = new TimeSpan(0, 0, 1);
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            port = new SerialPort(tbPort.Text, Convert.ToInt16(tbBaud.Text));
            port_HasBeenDeclared = true;
            port.DataReceived += MyDataReceived;
            try
            {
                port.Open();
                tbOut.Text += "Connected!" + Environment.NewLine;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Can't open the port! Error:" + ex);
            }
        }

        void MyDataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            port = sender as SerialPort;
            this.Dispatcher.Invoke((Action)(() =>
            {
                string reading = port.ReadLine();
                string[] readingArray = reading.Split(' ');
                if (readingArray.Length != 1)
                {
                    for (int x = 0; x < 3; x++)
                    {
                        for (int y = 0; y < 3; y++)
                        {
                            canvases[x, y].Background = new SolidColorBrush(System.Windows.Media.Color.FromRgb(201, 201, 201));
                        }
                    }

                    canvases[Convert.ToInt16(readingArray[0]), 2 - Convert.ToInt16(readingArray[1])].Background = new SolidColorBrush(System.Windows.Media.Color.FromRgb(45, 155, 83));
                    if (Convert.ToInt16(readingArray[0]) == 0 && 2 - Convert.ToInt16(readingArray[1]) == 0)
                        StartFunc();
                    if (Convert.ToInt16(readingArray[0]) == 1 && 2 - Convert.ToInt16(readingArray[1]) == 0)
                        StopFunc();
                    if (Convert.ToInt16(readingArray[0]) == 2 && 2 - Convert.ToInt16(readingArray[1]) == 0)
                        ResetFunc();
                }
                else { tbOut.Text += reading; }
            }));
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            try
            {
                port.Close();
                tbOut.Text += "Disconnected!" + Environment.NewLine;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Can't close the port! Error:" + ex);
            }
        }

        private void Button_Click_3(object sender, RoutedEventArgs e)
        {
            tbBaud.Text = "9600";
        }

        private void Window_Closing_1(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (port_HasBeenDeclared)
            {
                if (port.IsOpen)
                {
                    port.Close();
                }
            }
        }

        private void Button_Click_4(object sender, RoutedEventArgs e)
        {
            StartFunc();
        }

        private void Button_Click_5(object sender, RoutedEventArgs e)
        {
            StopFunc();
        }

        private void Button_Click_6(object sender, RoutedEventArgs e)
        {
            ResetFunc();
        }

        private void StartFunc()
        {
            // Start
            dispatcherTimer.Start();
            tbOut.Text += "Timer Started!" + Environment.NewLine;
        }

        private void StopFunc()
        {
            // Stop
            dispatcherTimer.Stop();
            tbOut.Text += "Timer Stopped!" + Environment.NewLine;
        }

        private void ResetFunc()
        {
            // Reset
            dispatcherTimer.Stop();
            sec = 0;
            timeLabel.Content = sec.ToString() + " s";
            tbOut.Text += "Seconds Reseted!" + Environment.NewLine;
        }
    }

    public class ScrollingTextBox : TextBox
    {

        protected override void OnInitialized(EventArgs e)
        {
            base.OnInitialized(e);
            VerticalScrollBarVisibility = ScrollBarVisibility.Auto;
            HorizontalScrollBarVisibility = ScrollBarVisibility.Auto;
        }

        protected override void OnTextChanged(TextChangedEventArgs e)
        {
            base.OnTextChanged(e);
            CaretIndex = Text.Length;
            ScrollToEnd();
        }

    }
}

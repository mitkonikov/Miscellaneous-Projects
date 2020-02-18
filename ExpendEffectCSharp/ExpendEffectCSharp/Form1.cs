using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ExpendEffectCSharp
{
    public partial class Form1 : Form
    {
        // IF YOU DONE ANY CHANGES TO THIS CODE
        // PLEASE CREDIT MITKO NIKOV WHEN YOU PUBLISH IT
        int FinalWShould = 0;
        int FinalHShould = 0;

        int CurrentW = 0;
        int CurrentH = 0;

        int CurrentFormX = 0;
        int CurrentFormY = 0;
        int FirstFormX = 0;
        int FirstFormY = 0;

        bool W = false;
        bool H = false;

        // int plusWperTimerInterval and int plusHperTimerInterval, both must be at least 2 & be even number
        int TimerInterval = 30;
        int plusWperTimerInterval = 2;
        int plusHperTimerInterval = 2;

        //Information on the steps:
        // 1. Gets size
        // 2. Shrink to ratio of the size
        // 3. Expand

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Shrink();
        }

        private void Shrink()
        {
            // This part is about shrinking automaticlly the form
            // Get the size of the window before Shrinking and again Expanding
            FinalWShould = this.Size.Width;
            FinalHShould = this.Size.Height;
            FirstFormX = this.Location.X;
            FirstFormY = this.Location.Y;
            // Setup the boolens (this is for if you want to use it again)
            W = false;
            H = false;
            // Shrink and setup the location of the form
            this.Size = new Size(ShrinkW(), ShrinkH());
            this.Location = new Point(FirstFormX + ((FinalWShould - ShrinkW()) / 2), FirstFormY + ((FinalHShould - ShrinkH()) / 2));
            // Setup the Timer Interval from the int TimerInterval and then start the Timer
            ExpendTimer.Interval = TimerInterval;
            ExpendTimer.Start();
        }

        private void ExpendTimer_Tick(object sender, EventArgs e)
        {
            // Getting the current size and location
            CurrentW = this.Size.Width;
            CurrentH = this.Size.Height;
            CurrentFormX = this.Location.X;
            CurrentFormY = this.Location.Y;
            // Setting the location of the tabControl for the first time
            tabControl1.Location = new Point(-((FinalWShould - CurrentW) / 2 + 6), -((FinalHShould - CurrentH) / 2 + 25));
            // Resizing and setting the location of the form per one Timer Interval
            this.Size = new Size(plusW(), plusH());
            this.Location = new Point(LocationX(), LocationY());
            tabControl1.Location = new Point(-((FinalWShould - CurrentW) / 2 + 6), -((FinalHShould - CurrentH) / 2 + 25));
            if ((W == true) & (H == true))
            {
                ExpendTimer.Stop();
            }
        }

        private int ShrinkW()
        {
            if (FinalWShould > FinalHShould)
            {
                return FinalWShould - (FinalHShould - ShrinkH());
            }
            else
            {
                return (150 * FinalWShould) / FinalHShould;
            }
        }

        private int ShrinkH()
        {
            if (FinalHShould > FinalWShould)
            {
                return FinalHShould - (FinalWShould - ShrinkW());
            }
            else
            {
                return (150 * FinalHShould) / FinalWShould;
            }
        }

        private int LocationX()
        {
            if (CurrentFormX == FirstFormX)
            {
                return CurrentFormX;
            }
            else
            {
                return CurrentFormX - (plusWperTimerInterval / 2);
            }
        }

        private int LocationY()
        {
            if (CurrentFormY == FirstFormY)
            {
                return CurrentFormY;
            }
            else
            {
                return CurrentFormY - (plusHperTimerInterval / 2);
            }
        }

        private int plusW()
        {
            if (CurrentW < FinalWShould)
            {
                return CurrentW + plusWperTimerInterval;
            }
            else
            {
                W = true;
                return CurrentW;
            }
        }

        private int plusH()
        {
            if (CurrentH < FinalHShould)
            {
                return CurrentH + plusHperTimerInterval;
            }
            else
            {
                H = true;
                return CurrentH;
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Shrink();
        }
    }
}

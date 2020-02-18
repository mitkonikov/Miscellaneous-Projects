using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace PerpendicularLineToRadius
{
    public partial class Form1 : Form
    {
        Bitmap bmp = new Bitmap(400, 400);
        Graphics g;
        int r = 400 / 2 - 70;
        int l = 10 * 5;
        int angle = 0;
        int center = 400 / 2;
        int R;
        int accuracy = 1;

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            g = Graphics.FromImage(bmp); // Binds the graphics to the Bitmap
            pictureBox1.Image = bmp;
            R = (int)Math.Sqrt((Math.Pow(l / 2, 2) + Math.Pow(r, 2))); // Calculate the bigger radius
            Render();
        }

        private void numericUpDown1_ValueChanged(object sender, EventArgs e)
        {
            l = (int)numericUpDown1.Value * 5; // As soon as the Value Changed store it in the l int
            Render(); // Execute render function
        }

        private void numericUpDown2_ValueChanged(object sender, EventArgs e)
        {
            r = 400 / 4 + ((int)numericUpDown2.Value * 5);
            Render();
        }

        private void trackBar1_ValueChanged(object sender, EventArgs e)
        {
            angle = trackBar1.Value; // As soon as the Value Changed store it in the angle int
            Render(); // Execute render function
        }


        // I have a video on this algorithm : https://www.youtube.com/watch?v=Bte4MZpvdXA
        private int[] LineCoord(int angleIn, int radius, int center) // Get any point on the circle by the angle
        {
            int[] coord = new int[2]; // Setting up the int array for return
            angleIn %= (360 * accuracy);
            angleIn *= 1;

            if (angleIn >= 0 && angleIn <= (180 * accuracy))
            {
                coord[0] = center + (int)(radius * Math.Sin(Math.PI * angleIn / (180 * accuracy)));
                coord[1] = center - (int)(radius * Math.Cos(Math.PI * angleIn / (180 * accuracy)));
            }
            else
            {
                coord[0] = center - (int)(radius * -Math.Sin(Math.PI * angleIn / (180 * accuracy)));
                coord[1] = center - (int)(radius * Math.Cos(Math.PI * angleIn / (180 * accuracy)));
            }
            return coord;
        }


        // These functions converts the Degrees of an angle to Radians and v.v
        double DegreeToRadian(double angle)
        { 
            return Math.PI * angle / 180.0;
        }

        double RadianToDegree(double angle)
        { 
            return angle * (180.0 / Math.PI);
        }



        private void Render()
        {
            g = Graphics.FromImage(bmp); // Binds the graphics to the Bitmap
            pictureBox1.Image = bmp;
            g.Clear(Color.White); // Clears the screen

            R = (int)Math.Sqrt((Math.Pow((l / 2), 2) + Math.Pow(r, 2))); // Calculate the bigger radius
            int theta = (int)RadianToDegree(Math.Atan((double)(l / 2) / r)); // Calculate the angle theta

            // This calculates the bigger radius' lines' coordinates
            int x0 = LineCoord(angle + theta, R, center)[0];
            int y0 = LineCoord(angle + theta, R, center)[1];
            int x1 = LineCoord(angle + 360 - theta, R, center)[0];
            int y1 = LineCoord(angle + 360 - theta, R, center)[1];

            if (checkBox1.Checked == true) // This checkBox is for the smaller circle outline
            {
                g.DrawEllipse(new Pen(Color.FromArgb(0, 0, 150), 1f), center - r, center - r, r * 2, r * 2); // Draw the ellipse (circle) with the smaller radius
            }

            if (checkBox2.Checked == true) // This checkBox is for the bigger circle outline
            {
                g.DrawEllipse(new Pen(Color.FromArgb(0, 150, 0), 2f), center - R, center - R, R * 2, R * 2); // Draw the ellipse (circle) with the bigger radius
            }

            if (checkBox3.Checked == true) // This checkBox is for the radius for the smaller circle
            {
                g.DrawLine(new Pen(Color.FromArgb(150, 0, 0), 3f), new Point(center, center), new Point(LineCoord(angle, r, center)[0], LineCoord(angle, r, center)[1])); // Draw the Handle
            }

            g.DrawLine(new Pen(Color.FromArgb(0, 0, 230), 4f), new Point(x0, y0), new Point(x1, y1)); // Draw the Perpendicular Line

            if (checkBox4.Checked == true) // This checkBox is for the radius for the bigger circle
            {
                g.DrawLine(new Pen(Color.FromArgb(100, 100, 0), 1f), new Point(center, center), new Point(x0, y0)); // From centar to points on the Perpendicular Line
                g.DrawLine(new Pen(Color.FromArgb(100, 100, 0), 1f), new Point(center, center), new Point(x1, y1)); // From centar to points on the Perpendicular Line
            }

            g.Dispose();
        }


        // When the checkBoxes' values are changed (from checked to unchecked or v.v) the render function executes to render the new image
        private void checkBox1_CheckedChanged(object sender, EventArgs e)
        {
            Render();
        }

        private void checkBox2_CheckedChanged(object sender, EventArgs e)
        {
            Render();
        }

        private void checkBox3_CheckedChanged(object sender, EventArgs e)
        {
            Render();
        }

        private void checkBox4_CheckedChanged(object sender, EventArgs e)
        {
            Render();
        }
    }
}

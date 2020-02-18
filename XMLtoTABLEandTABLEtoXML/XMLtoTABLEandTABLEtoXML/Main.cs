using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml;

namespace XMLtoTABLEandTABLEtoXML
{
    public partial class Main : Form
    {
        DataSet ds = new DataSet();

        public Main()
        {
            InitializeComponent();
        }

        private void OpenBtn_Click(object sender, EventArgs e)
        {
            OpenFileDialog ofd = new OpenFileDialog();
            ofd.Filter = "XML|*.xml";
            if (ofd.ShowDialog() == DialogResult.OK)
            {
                try
                {
                    XmlReader xmlFile = XmlReader.Create(ofd.FileName, new XmlReaderSettings());
                    ds.ReadXml(xmlFile);
                    dataGridView1.DataSource = ds.Tables[0].DefaultView;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }
        }

        private void SaveBtn_Click(object sender, EventArgs e)
        {
            SaveFileDialog sfd = new SaveFileDialog();
            sfd.Filter = "XML|*.xml";
            if (sfd.ShowDialog() == DialogResult.OK)
            {
                try
                {
                    ds.Tables[0].WriteXml(sfd.FileName);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
            }
        }

        private void AddBtn_Click(object sender, EventArgs e)
        {
            ds.Tables[0].Rows.Add();
        }

        private void DeleteBtn_Click(object sender, EventArgs e)
        {
            try
            {
                ds.Tables[0].Rows.RemoveAt(Convert.ToInt32(textBox1.Text) - 1);
            }
            catch
            {
                MessageBox.Show("Insert a valid number!", "Error");
            }
        }
    }
}

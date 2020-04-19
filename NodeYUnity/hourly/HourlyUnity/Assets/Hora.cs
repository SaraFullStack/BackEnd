namespace Assets
{
    public class Hora
    {  
        public string status;
        public string time;

        public override string ToString()
        {
            return string.Format("status = {0} | time = {1}", status, time);
        }
    }
}

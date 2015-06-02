using System;


namespace ToDoListApp.Models
{
    public class ListItem
    {
        #region Properties

        public Guid Id { get; set; }
        public String Created { get; set; }
        public DateTime? CompletedAt { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }
        #endregion

        public ListItem()
        {
            Id = Guid.NewGuid();
            Created = String.Format("{0:MMM/dd/yyyy HH:mm:ss}", DateTime.Now);
            Completed = false;
        }

        #region Methods
        public static ListItem Create(string description)
        {
            return new ListItem { Description = description };
        }

        public void Update(string newDescription)
        {
            this.Description = newDescription;
        }


        public void MarkAsCompleted()
        {
            this.CompletedAt = DateTime.Now;
            this.Completed = true;
        }

        public void MarkAsToDo()
        {
            this.CompletedAt = null;
            this.Completed = false;
        }
        #endregion

        


    }
}
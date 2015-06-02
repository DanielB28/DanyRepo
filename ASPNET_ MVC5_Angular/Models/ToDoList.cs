using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoListApp.Models
{
    public class ToDoList
    {
        #region Properties
        public List<ListItem> Items { get; set; }

        #endregion

        public ToDoList()
        {
            Items = new List<ListItem>();
            SeedList();
            Items = Items.OrderBy(x => x.Description).ToList();//sort list alphabetically
        }

        #region Methods 
        public void AddListItem(string description)
        {
            Items.Add(ListItem.Create(description));
        }

        public string UpdateListItem(Guid id, string description)
        {
            var item = Items.Find(x => x.Id == id);

            if (item == null) return "Item not found";

            item.Update(description);
            return String.Format("item description has been updated", item.Description);
        }

        public string EditItemStatus(Guid id, bool completed)
        {
            var item = Items.Find(x => x.Id == id);

            if (item == null) return "Item not found";

            if (completed)
            {
                item.MarkAsCompleted(); 
                return String.Format("{0} is now marked as complete", item.Description);
            } else
            {
                item.MarkAsToDo();
                return String.Format("{0} is now marked as to do", item.Description);
            }
        }

        public string Delete(Guid id)
        {
            var item = Items.FirstOrDefault(x => x.Id == id);

            if (item == null) return "Item not found";

            Items.Remove(item);
            return String.Format("{0} is now deleted", item.Description);
        }

        public void OrderByAlphabet()
        {
            Items = Items.OrderBy(x => x.Description).ToList();
        }

        public void SortByStatus()
        {
            Items = Items.OrderBy(x => x.Completed).ToList();
        }

        private void SeedList()
        {
            if (this.Items.Any()) return;
            this.AddListItem("Boodschappen doen");
            this.AddListItem("Melk kopen");
            this.AddListItem("Biefstuk kopen");
        }
        #endregion





    }
}
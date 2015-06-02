using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using ToDoListApp.Models;

namespace ToDoListApp.Controllers
{
    public class ToDoListController : ApiController
    {
        private static ToDoList _toDoList = new ToDoList();

        // GET: api/ToDoList
        public ToDoList Get()
        {
            return _toDoList;
        }

        // GET: api/ToDoList/5
        public ListItem Get(Guid id)
        {
            var item = _toDoList.Items.FirstOrDefault();

            if (item == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            return _toDoList.Items.FirstOrDefault(x => x.Id == id);
        }

        // POST: api/ToDoList
        public ActionResult Post(ListItemAddModel item)
        {
            _toDoList.AddListItem(item.Description);

            return new HttpStatusCodeResult(HttpStatusCode.Created);
        }

        // PUT api/ToDoList
        [System.Web.Http.AcceptVerbs("PUT")]
        [System.Web.Http.Route("api/todolist/{id}")]
        public ActionResult Put(Guid id, ListItemAddModel item)
        {
            _toDoList.UpdateListItem(id, item.Description);

            return new HttpStatusCodeResult(HttpStatusCode.Accepted);
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.Route("api/todolist/{id}/markascompleted")]
        // POST: api/ToDoList
        public ActionResult MarkAsCompleted(Guid id)
        {
            return new HttpStatusCodeResult(HttpStatusCode.OK, _toDoList.EditItemStatus(id, true));
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.Route("api/todolist/{id}/markastodo")]
        public ActionResult MarkAsToDo(Guid id)
        {
            return new HttpStatusCodeResult(HttpStatusCode.OK, _toDoList.EditItemStatus(id, false));
        }

        // GET: api/ToDoList
        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.Route("api/todolist/orderbystatus")]
        public ToDoList SortListByStatus()
        {
            _toDoList.SortByStatus();
            return _toDoList;
        }


        // POST: api/ToDoList/deleteitem
        [System.Web.Http.AcceptVerbs("GET", "POST")]//Method DELETE werkt niet zonder work-around
        [System.Web.Http.Route("api/todolist/deleteitem")]
        public ActionResult Delete(ListItemAddModel item)
        {
            _toDoList.Delete(item.Id);
            return new HttpStatusCodeResult(HttpStatusCode.Accepted, "Item removed");
        }
    }
}

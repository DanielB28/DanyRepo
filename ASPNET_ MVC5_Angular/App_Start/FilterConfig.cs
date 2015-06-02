using System.Web;
using System.Web.Mvc;

namespace ASPNET__MVC5_Angular
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
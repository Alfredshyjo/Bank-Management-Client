using System.Diagnostics;
using BankApp.Client.Models;
using Microsoft.AspNetCore.Mvc;

namespace BankApp.Client.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                var roles = User.Claims.Where(c => c.Type == System.Security.Claims.ClaimTypes.Role).Select(c => c.Value).ToList();

                if (roles.Contains("Admin"))
                    return RedirectToAction("Dashboard", "Admin");
                else if (roles.Contains("Manager"))
                    return RedirectToAction("Dashboard", "Manager");
                else if (roles.Contains("Customer"))
                    return RedirectToAction("Dashboard", "Customer");
            }

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
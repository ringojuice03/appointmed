/*----------page js----------*/

/*user menu*/
const notificationMenu = document.getElementById("notification-menu");
const userMenu = document.getElementById("user-menu");

function showNotificationMenu()
{
  if (notificationMenu.classList.contains('hideMenu'))
  {
    notificationMenu.classList.remove('hideMenu');
    userMenu.classList.add('hideMenu');
  }
  else
    notificationMenu.classList.add('hideMenu');
}

function showUserMenu()
{
  if (userMenu.classList.contains('hideMenu'))
  {
    userMenu.classList.remove('hideMenu');
    notificationMenu.classList.add('hideMenu');
  }
  else
    userMenu.classList.add('hideMenu');
}

/*appointments filter*/
const pendingFilter = document.getElementById("pending-filter");
const rejectedFilter = document.getElementById("rejected-filter");

function pendingSelected()
{
  pendingFilter.classList.remove('appointmentsFilterUnselected');
  rejectedFilter.classList.add('appointmentsFilterUnselected');
}

function rejectedSelected()
{
  rejectedFilter.classList.remove('appointmentsFilterUnselected');
  pendingFilter.classList.add('appointmentsFilterUnselected');
}

/*----------calendar js----------*/

/*calendar format*/
document.getElementById("buttonLabel").onmouseover = showFormatMenu;
document.getElementById("buttonsMenu").onmouseover = showFormatMenu;
document.getElementById("buttonLabel").onmouseout = hideFormatMenu;
document.getElementById("buttonsMenu").onmouseout = hideFormatMenu;

function showFormatMenu()
{
  document.getElementById("buttonsMenu").style.visibility = "visible";
  document.getElementById("buttonsMenu").style.zIndex = "1";
  document.getElementById("dpDay").style.zIndex = "-1";
  document.getElementById("dpWeek").style.zIndex = "-1";
  document.getElementById("dpMonth").style.zIndex = "-1";
}

function hideFormatMenu()
{
  document.getElementById("buttonsMenu").style.visibility = "hidden";
  document.getElementById("buttonsMenu").style.zIndex = "-1";
  document.getElementById("dpDay").style.zIndex = "1";
  document.getElementById("dpWeek").style.zIndex = "1";
  document.getElementById("dpMonth").style.zIndex = "1";
}
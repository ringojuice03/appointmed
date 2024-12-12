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
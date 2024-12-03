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

/*doctor card expansion*/
var previousDoctor = -1;

function cardExpansion(doctorId)
{
    const doctor = document.getElementsByName(doctorId)[0];

    if (doctor.children[0].classList.contains("hidden"))
    {
        doctor.classList.remove("expanded");
        doctor.children[1].classList.add("hidden");
        doctor.children[0].classList.remove("hidden");
        removeCalendar(doctorId);
    }
    else
    {
        /*unexpand previously expanded card when expanding another*/
        if (previousDoctor >= 0)
        {
          const previousCard = document.getElementsByName(previousDoctor)[0];
          previousCard.classList.remove("expanded");
          previousCard.children[1].classList.add("hidden");
          previousCard.children[0].classList.remove("hidden");
          removeCalendar(doctorId);
        }

        doctor.classList.add("expanded");
        doctor.children[0].classList.add("hidden");
        doctor.children[1].classList.remove("hidden");
        previousDoctor = doctorId;
        initializeCalendar(doctorId);
    }
}

/*----------calendar js----------*/
function initializeCalendar(id)
{
  /*convert id to string*/
  let strId = String(id);
  var dpMonth = new DayPilot.Month(strId);
  dpMonth.width = "100%";
  dpMonth.cellHeight = 50;
  dpMonth.headerHeight = 25;
  dpMonth.init();
}

/*di ko sure kung tama to*/
function removeCalendar(id)
{
  /*convert id to string*/
  let strId = String(id);
  var dpMonth = new DayPilot.Month(strId);
  dpMonth.init();
  dpMonth.dispose();
}

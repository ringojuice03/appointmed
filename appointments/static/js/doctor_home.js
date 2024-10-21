/*calendar js*/

    /*daily view*/
    const day = new DayPilot.Calendar("dpDay", {
      viewType: "Day"
    });
    configureCalendar(day);
    day.init();
    
    /*weekly view*/
    const week = new DayPilot.Calendar("dpWeek", {
      viewType: "Week"
    });
    configureCalendar(week);
    week.init(); 
    
    /*monthly view*/
    const month = new DayPilot.Month("dpMonth", {
      eventHeight: 32,
    });
    configureCalendar(month);
    month.init();
    
    /*ewan ko lmaoo*/
    function configureCalendar(calendar) {
        calendar.visible = false;
    
        calendar.contextMenu = new DayPilot.Menu({
          items: [
            {
              text: "Delete",
              onClick: async args => {
                var params = {
                  id: args.source.id(),
                };
                await DayPilot.Http.post("calendar_delete.php", params);
                calendar.events.remove(params.id);
                console.log("Deleted");
              }
            },
        
            {
              text: "-"
            },
        
            {
              text: "Blue",
              icon: "icon icon-blue",
              color: "#3d85c6",
              onClick: args => { updateColor(args.source, args.item.color); }
            },
        
            {
              text: "Green",
              icon: "icon icon-green",
              color: "#6aa84f",
              onClick: args => { updateColor(args.source, args.item.color); }
            },
        
            {
              text: "Orange",
              icon: "icon icon-orange",
              color: "#e69138",
              onClick: args => { updateColor(args.source, args.item.color); }
            },
        
            {
              text: "Red",
              icon: "icon icon-red",
              color: "#cc4125",
              onClick: args => { updateColor(args.source, args.item.color); }
            }
          ]
        });
    
        calendar.onBeforeEventRender = args => {
          if (!args.data.backColor) {
            args.data.backColor = "#6aa84f";
          }
      
          args.data.backColor += "c0";
          args.data.borderColor = "darker";
          args.data.fontColor = "#fff";
          args.data.barHidden = true;
          args.data.areas = [
            {
              right: 4,
              top: 4,
              width: 24,
              height: 24,
              padding: 2,
              action: "ContextMenu",
              symbol: "/icons/daypilot.svg#hamburger-menu",
              backColor: args.data.backColor,
              fontColor: "#ffffff",
              style: "border-radius: 50%; border: 1px solid #ffffff"
            }
          ];
        };
    
        calendar.onEventMoved = async args => {
          const params = {
            id: args.e.id(),
            newStart: args.newStart,
            newEnd: args.newEnd
          };
      
          await DayPilot.Http.post("calendar_move.php", params);
          console.log("Moved.");
        };
    
        calendar.onEventResized = async args => {
          const params = {
            id: args.e.id(),
            newStart: args.newStart,
            newEnd: args.newEnd
          };
      
          await DayPilot.Http.post("calendar_move.php", params);
          console.log("Resized.");
        };
    
        calendar.onTimeRangeSelected = async args => {
          const form = [
            {name: "Name", id: "text"},
            {name: "Start", id: "start", dateFormat: "MMMM d, yyyy h:mm tt", disabled: true},
            {name: "End", id: "end", dateFormat: "MMMM d, yyyy h:mm tt", disabled: true},
          ];
          const data = {
            start: args.start,
            end: args.end,
            text: "Event"
          };
          const active = switcher.active.control;
          const modal = await DayPilot.Modal.form(form, data);
          
          active.clearSelection();
      
          if (modal.canceled) {
            return;
          }
      
          const {data: result} = await DayPilot.Http.post("calendar_create.php", modal.result);
          
          active.events.add({
            start: data.start,
            end: data.end,
            id: result.id,
            text: data.text
          });
        };
    
        calendar.onEventClick = args => {
          DayPilot.Modal.alert(args.e.data.text);
        };
    }
    
    const switcher = new DayPilot.Switcher({
      triggers: [
        {id: "buttonDay", view: day },
        {id: "buttonWeek", view: week},
        {id: "buttonMonth", view: month}
      ],
  
      navigator: nav,
  
      selectedClass: "selected",
  
      onChanged: args => {
        switcher.events.load("calendar_events.php");
      },
    });
    
    switcher.select("buttonWeek");
    
    async function updateColor(e, color) {
      const params = {
        id: e.data.id,
        color: color
      };
  
      await DayPilot.Http.post("calendar_color.php", params);
  
      const calendar = switcher.active.control;
  
      e.data.backColor = color;
  
      calendar.events.update(e);
      
      console.log("Color updated");
    }
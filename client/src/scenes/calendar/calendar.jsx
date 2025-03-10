import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
        location: selected.location // Ensure location is passed correctly
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}' at '${selected.event.location}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <>
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <Typography>
                        Location: {event.extendedProps.location}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "AI & ML Workshop",
                date: "2025-02-13",
                location: "Indoor Auditorium",
                details: "Hands-on workshop on building machine learning models and exploring AI advancements.",
              },
              {
                id: "5123",
                title: "Hackathon 2025",
                date: "2025-02-06",
                location: "Main Seminar Hall",
                details: "24-hour coding challenge for innovative solutions in software and hardware projects.",
              },
              {
                id: "54321",
                title: "Career Guidance Seminar",
                date: "2025-02-01",
                location: "Purple Hall",
                details: "Industry experts share insights on career paths, skill development, and interview tips.",
              },
              {
                id: "6789",
                title: "Pre-Placement Training",
                date: "2025-02-10",
                location: "Idea Factory",
                details: "Mock interviews, group discussions, and resume-building sessions for final-year students.",
              },
              {
                id: "98765",
                title: "Tech Talk Series: Emerging Trends",
                date: "2025-02-11",
                location: "TIFAC Block",
                details: "Guest lectures by industry leaders on blockchain, cybersecurity, and IoT innovations.",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;

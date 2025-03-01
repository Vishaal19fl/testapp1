import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Chip, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import './ChartPage.scss';
import MemberList from '../../components/memberList/MemberList';

// Mock employee data (unchanged)
const employeeData = [
  { id: 1, name: "Mark Hill", designation: "CEO", team: "Executive", managerId: null, image: "/img/vishaal2.jpg" },
  { id: 2, name: "Joe Linux", designation: "CTO", team: "Executive", managerId: 1, image: "/img/vishaal2.jpg" },
  { id: 3, name: "Linda May", designation: "CFO", team: "Finance", managerId: 1, image: "/img/vishaal2.jpg" },
  { id: 4, name: "John Green", designation: "VP of Engineering", team: "Engineering", managerId: 2, image: "/img/vishaal2.jpg" },
  { id: 5, name: "Ron Blomquist", designation: "VP of IT", team: "IT", managerId: 2, image: "/img/vishaal2.jpg" },
  { id: 6, name: "Michael Rubin", designation: "VP of Finance", team: "Finance", managerId: 3, image: "/img/vishaal2.jpg" },
  { id: 7, name: "Alice Johnson", designation: "Engineering Manager", team: "Engineering", managerId: 4, image: "/img/vishaal2.jpg" },
  { id: 8, name: "Bob Williams", designation: "IT Manager", team: "IT", managerId: 5, image: "/img/vishaal2.jpg" },
  { id: 9, name: "Carol Smith", designation: "Financial Analyst", team: "Finance", managerId: 6, image: "/img/vishaal2.jpg" },
  { id: 10, name: "Dave Brown", designation: "Software Engineer", team: "Engineering", managerId: 7, image: "/img/vishaal2.jpg" },
  { id: 11, name: "Eve Davis", designation: "System Administrator", team: "IT", managerId: 8, image: "/img/vishaal2.jpg" },
  { id: 12, name: "Frank Wilson", designation: "Accountant", team: "Finance", managerId: 9, image: "/img/vishaal2.jpg" },
];

const TeamChip = styled(Chip)(({ theme, team }) => {
  const getColors = () => {
    switch (team) {
      case 'Executive':
        return { bg: '#4caf50', color: '#fff' };
      case 'Engineering':
        return { bg: '#2196f3', color: '#fff' };
      case 'IT':
        return { bg: '#9c27b0', color: '#fff' };
      case 'Finance':
        return { bg: '#ff9800', color: '#fff' };
      default:
        return { bg: '#e0e0e0', color: '#333' };
    }
  };

  const colors = getColors();
  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 'bold',
    fontSize: '0.7rem',
  };
});

// EmployeeNode component for the org chart (with reduced size)
const EmployeeNode = ({ employee, employees, handleDrop, onDragStart, zoomLevel }) => {
  // Find direct reports of this employee
  const directReports = employees.filter(emp => emp.managerId === employee.id);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    const draggedEmployeeId = parseInt(e.dataTransfer.getData('employeeId'));
    handleDrop(draggedEmployeeId, employee.id);
  };

  // Calculate size scaling based on zoomLevel
  const avatarSize = 40 + (zoomLevel * 10); // Base size 40px, adjust by 10px per zoom level
  const nodeWidth = 140 + (zoomLevel * 20); // Base width 140px, adjust by 20px per zoom level
  
  return (
    <div className="org-node-container">
      <div 
        className="org-node"
        draggable
        onDragStart={(e) => onDragStart(e, employee.id)}
        onDragOver={onDragOver}
        onDrop={onDrop}
        data-team={employee.team}
        style={{ width: `${nodeWidth}px` }}
      >
        <div className="employee-avatar">
          <Avatar 
            src={employee.image} 
            alt={employee.name}
            className="avatar-image"
            sx={{ width: avatarSize, height: avatarSize }}
          />
        </div>
        <div className="employee-info">
          <div className="employee-name">{employee.name}</div>
          <div className="employee-designation">{employee.designation}</div>
          <TeamChip 
            label={employee.team}
            team={employee.team}
            size="small"
            className="team-chip"
          />
        </div>
      </div>

      {directReports.length > 0 && (
        <div className="org-children">
          {directReports.map(report => (
            <EmployeeNode 
              key={report.id} 
              employee={report} 
              employees={employees} 
              handleDrop={handleDrop}
              onDragStart={onDragStart}
              zoomLevel={zoomLevel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// OrgChart component with zoom controls
const OrgChart = ({ employees, handleDrop, zoomLevel, setZoomLevel }) => {
  // Find the root employee (CEO)
  const rootEmployee = employees.find(emp => emp.managerId === null);

  const onDragStart = (e, employeeId) => {
    e.dataTransfer.setData('employeeId', employeeId);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 3) setZoomLevel(zoomLevel + 1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > -2) setZoomLevel(zoomLevel - 1);
  };

  return (
    <div className="org-chart-container">
      <div className="zoom-controls">
        <Tooltip title="Zoom Out">
          <IconButton onClick={handleZoomOut} disabled={zoomLevel <= -2}>
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom In">
          <IconButton onClick={handleZoomIn} disabled={zoomLevel >= 3}>
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="org-chart" style={{ padding: `${30 + (zoomLevel * 5)}px` }}>
        <div className="org-chart-background"></div>
        {rootEmployee && (
          <EmployeeNode 
            employee={rootEmployee} 
            employees={employees} 
            handleDrop={handleDrop}
            onDragStart={onDragStart}
            zoomLevel={zoomLevel}
          />
        )}
      </div>
    </div>
  );
};

// Main OrgChart page component
const ChartPage = () => {
  const [employees, setEmployees] = useState(employeeData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(0); // 0 is default, range from -2 to 3

  // Extract unique teams for the filter dropdown
  useEffect(() => {
    const uniqueTeams = [...new Set(employees.map(emp => emp.team))];
    setTeams(uniqueTeams);
  }, [employees]);

  // Function to handle employee drag and drop to change manager
  const handleDrop = (employeeId, newManagerId) => {
    // Prevent setting own manager or creating circular references
    if (employeeId === newManagerId || wouldCreateCircularReference(employeeId, newManagerId)) {
      return;
    }

    setEmployees(prevEmployees => 
      prevEmployees.map(emp => 
        emp.id === employeeId ? { ...emp, managerId: newManagerId } : emp
      )
    );

    // In a real application, you would make an API call here
    console.log(`Changed employee ${employeeId}'s manager to ${newManagerId}`);
  };

  // Check if setting a new manager would create a circular reference
  const wouldCreateCircularReference = (employeeId, newManagerId) => {
    let currentManagerId = newManagerId;
    while (currentManagerId !== null) {
      if (currentManagerId === employeeId) {
        return true;
      }
      const manager = employees.find(emp => emp.id === currentManagerId);
      currentManagerId = manager ? manager.managerId : null;
    }
    return false;
  };

  // Filter employees for the org chart based on selected team
  const filteredChartEmployees = selectedTeam
    ? employees.filter(emp => {
        // Include employees from selected team and their managers
        if (emp.team === selectedTeam) return true;
        
        // Check if this employee is a manager of any employee in the selected team
        const isManager = employees
          .filter(e => e.team === selectedTeam)
          .some(e => {
            let currentManagerId = e.managerId;
            while (currentManagerId !== null) {
              if (currentManagerId === emp.id) return true;
              const manager = employees.find(m => m.id === currentManagerId);
              currentManagerId = manager ? manager.managerId : null;
            }
            return false;
          });
          
        return isManager;
      })
    : employees;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box className="org-chart-page" sx={{ padding: '2.9rem 0 0 0', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      
      <Box className="org-chart-layout" sx={{ display: 'flex', flex: 1, overflow: 'hidden'}}>
        
        <MemberList
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          employees={employees}
          searchTerm={searchTerm}
          selectedTeam={selectedTeam}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onTeamChange={(e) => setSelectedTeam(e.target.value)}
          teams={teams}
        />
        
        <Box className="main-content" sx={{ 
          flex: 1, 
          overflow: 'auto', 
          backgroundColor: 'white', 
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)', 
          position: 'relative', 
          borderLeft: '1px solid #e0e0e0' 
        }}>
          <Typography 
            variant="h6" 
            className="panel-title"
            sx={{
              padding: '12px',
              margin: 0,
              background: 'linear-gradient(135deg, #c56c00, #ffa500)',
              color: 'white',
              fontWeight: 600,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Organization Hierarchy
          </Typography>
          <OrgChart 
            employees={filteredChartEmployees} 
            handleDrop={handleDrop}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChartPage;
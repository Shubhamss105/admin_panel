import React, { useEffect, useState, useRef } from "react";
import "../dashboard/dashboard.css";
import { useStyles } from "../dashboard/dashboardStyles";
import {CircularProgress} from "@mui/material";
import { useNavigate } from 'react-router-dom'
import Chart from "react-apexcharts";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper, 
  Typography
} from "@mui/material";
import { connect } from "react-redux";
import * as DashboardActions from "../../redux/Actions/dashboardActions";
import Loader from "../../Components/loading/Loader";

const DashboardCard = ({ title, value, background, route }) => {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={3}
      sx={{
        background,
        padding: '16px',
        borderRadius: '8px',
        color: '#fff',
        height: '200px', // Increase the height here
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.8,
        },
      }}
      onClick={() => navigate(route)} 
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h2" component="h1" fontWeight="bold">
           {value}
        </Typography>
      </Box>
    </Paper>
  );
};

const Dashboard = ({ dashboardData, dispatch }) => {

  var classes = useStyles();

  useEffect(() => {
    dispatch(DashboardActions.getDashboard());
  }, []);


  const [chartData, setChartData] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  });

  const [data, setData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 20001, 2002, 2003, 2004, 2005],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 44, 76, 95, 31, 88],
      },
    ],
  });

  // Sort the series data in descending order
  // const sortedSeriesData = chartData.series.sort((a, b) => b - a);

  // Take the top 10 items
  // const top10Series = sortedSeriesData.slice(0, 10);

  const astrologers = ['Astro Sunita', 'Astro Sri', 'Astro Anita', 'Astro Santosh', 'Astro Sanjay', 'Astro Sunil', 'Astro Rajesh', 'Astro Gita', 'Astro Sanjay', 'Astro Sunil']

  const [selectedOption, setSelectedOption] = useState('all-astrologers');

  const handleChangeAstrologersList = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredAstrologers = astrologers.filter((astrologer) => {
    if (selectedOption === 'all-astrologers') {
      return true; // Return all astrologers if "All Astrologers" is selected
    } else {
      // Otherwise, filter based on the selected option
      // You may need to adjust this logic based on the structure of your astrologer data
      // For example, if each astrologer object has a property indicating their category
      // Replace 'category' with the actual property name in your data
      return astrologer.category === selectedOption;
    }
  });



  const [formWidth, setFormWidth] = useState("auto");
  const formRef = useRef(null);

  const [topAstrologers, setTopAstrologers] = useState(false);

  const handleShowAstrologer = () => {
    selectedOption(!setSelectedOption)
  }

  useEffect(() => {
    if (formRef.current) {
      const width = formRef.current.offsetWidth;
      setFormWidth(width);
    }
  }, []);

  const cardsData = [
    {
      title: 'Total Recharge',
      value: `₹ ${dashboardData?.totalRechargeAmount?.toFixed(2)}`,
      background: 'linear-gradient(to right, #9333ea, #7c3aed)',
      route: '/displayRechargePlan',
    },
    {
      title: 'Total Users',
      value: dashboardData?.customerCount,
      background: 'linear-gradient(to right, #f50057, #ff4081)',
      route: '/displayCustomer'
    },
    {
      title: 'Total Astrologers',
      value: dashboardData?.astrologerCount,
      background: 'linear-gradient(to right, #2e7d32, #4caf50)',
      route: '/astrologers/displayAstrologer'
    },
    {
      title: 'Total Courses',
      value: dashboardData?.totalCourseCount,
      background: 'linear-gradient(to right, #1e88e5, #42a5f5)',
      route: '/displayCourses'
    },
    {
      title: 'Live Course Registrations',
      value: dashboardData?.totalRegisteredLiveCourse,
      background: 'linear-gradient(to right, #9333ea, #7c3aed)',
      route: '/displayLiveClass'
    },
    {
      title: 'Demo Course Registrations',
      value: dashboardData?.totalRegisteredDemoCourse,
      background: 'linear-gradient(to right, #ff9800, #ffc107)',
      route: '/displayDemoClass'
    },
  ];

  if (!dashboardData) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={classes.dashboard_container}>
      <div className={classes.dashboard_inner_container}>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3} >
        {cardsData?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} >
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>


        <h2 style={{ color: "black", marginBottom: "1rem" }}>Astrologer</h2>
        <Grid container spacing={2}>
          <Grid item lg={8} sm={12} md={12} xs={12}>
            <FormControl ref={formRef} sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Select an Option
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                label="Select an Option"
                MenuProps={{ PaperProps: { style: { width: formWidth } } }}
                value={selectedOption}
                onChange={handleChangeAstrologersList}
              >
                <MenuItem value={'all-astrologers'}>All Astrologers</MenuItem>
                <MenuItem value={'top-customers'}>Top Customers</MenuItem>
                <MenuItem value={'live-darshan'}>Live Darshan</MenuItem>
                <MenuItem value={'mandir-darshan'}>Mandir Darshan</MenuItem>
                <MenuItem value={'pandit-at-home'}>Pandit at Home</MenuItem>
                <MenuItem value={'donation'}>Donation</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                gap: '4px',
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "#F27806",
                p: 1,
                textAlign: "center",
                fontWeight: "1rem",
                cursor: 'pointer'
              }}
            >
              <RemoveRedEyeIcon sx={{ fontSize: '2rem' }} />
              <span style={{ fontSize: '2rem', fontWeight: "700" }}>{dashboardData?.astrologerCount}</span>
            </Box>

          </Grid>
        </Grid>

        <Box sx={{ width: '100%', p: 2, mt: 4, mb: 4, border: "5px solid #F27806", textAlign: "center", cursor: 'pointer', borderRadius: "10px" }}
          onClick={handleShowAstrologer}>
          <span style={{ fontSize: '2rem', fontWeight: "700", color: '#F27806' }}>Top 10 Astrologers</span>
        </Box>

        {selectedOption &&
          <Grid container spancing={2}>
            <Grid item lg={6} sm={12} md={12} xs={12}>
              <List>
                {filteredAstrologers.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText style={{ color: 'black', }} primary={item} primaryTypographyProps={{
                      style: {
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        lineHeight: '1rem',
                        fontWeight: '600'
                      }
                    }} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item lg={6} sm={12} md={12} xs={12}>
              <div className={classes.graph_card}>
                <div className="app">
                  <div className="row">
                    <div className="mixed-chart">
                      <Chart
                        options={data.options}
                        series={data.series}
                        type="bar"
                        width="450"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

          </Grid>
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboardData: state.dashboard.dashboardData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

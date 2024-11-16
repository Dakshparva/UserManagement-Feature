import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";

const Dashboard = () => {
  const users = useSelector((state) => state.users || []);
  const ageGroups = { junior: 0, adult: 0, senior: 0 };
  const genderCount = { male: 0, female: 0 };

  if (users.length === 0) {
    return (
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        variant="h4"
      >
        No User Data Available
      </Typography>
    );
  }

  users.forEach((user) => {
    const age = parseInt(user.age, 10);
    if (age <= 18) ageGroups.junior++;
    else if (age < 60) ageGroups.adult++;
    else ageGroups.senior++;

    if (user.gender.toLowerCase() === "male") genderCount.male++;
    else genderCount.female++;
  });

  const renderCircularProgress = (label, value, color) => (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="textSecondary" sx={{ marginTop: 5 }}>
          {label}
        </Typography>
      </Box>

      <Box
        textAlign="center"
        position="relative"
        display="inline-flex"
        sx={{ padding: 2 }}
      >
        <CircularProgress
          variant="determinate"
          value={value}
          size={140}
          thickness={6}
          sx={{ color }}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ fontWeight: 600 }}
          >
            {`${Math.round(value)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/featured/?technology,abstract')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box padding={4}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          Dashboard
        </Typography>

        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: "20px",
            mb: 5,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Age Groups
          </Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            flexWrap="wrap"
            gap={4}
          >
            {renderCircularProgress(
              `Juniors: ${ageGroups.junior}`,
              (ageGroups.junior / users.length) * 100,
              "#4caf50"
            )}
            {renderCircularProgress(
              `Adults: ${ageGroups.adult}`,
              (ageGroups.adult / users.length) * 100,
              "#3f51b5"
            )}
            {renderCircularProgress(
              `Seniors: ${ageGroups.senior}`,
              (ageGroups.senior / users.length) * 100,
              "#f44336"
            )}
          </Box>
        </Paper>

        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Gender Distribution
          </Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            gap={4}
            flexWrap="wrap"
          >
            {renderCircularProgress(
              `Male: ${genderCount.male}`,
              (genderCount.male / users.length) * 100,
              "#2196f3"
            )}
            {renderCircularProgress(
              `Female: ${genderCount.female}`,
              (genderCount.female / users.length) * 100,
              "#e91e63"
            )}
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Dashboard;

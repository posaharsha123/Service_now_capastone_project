import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import LoginCard from "./LoginCard";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const { isLogged, login } = useContext(AuthContext);
  const theme = useTheme();

  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    impact: "",
    urgency: "",
    short_description: "",
  });

  const [editing, setEditing] = useState(null);

  // Load incidents
  useEffect(() => {
    if (!isLogged) return;

    async function fetchIncidents() {
      try {
        const res = await axios.get("http://localhost:3001/api/incidents", {
          withCredentials: true,
        });
        setIncidents(res.data.result || []);
      } catch (err) {
        console.error("Incident fetch failed:", err);
      }
    }

    fetchIncidents();
  }, [isLogged]);

  // Delete Incident
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/incidents/${id}`, {
        withCredentials: true,
      });
      setIncidents((prev) => prev.filter((x) => x.sys_id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Edit Incident
  const handleEdit = (inc) => {
    setFormData({
      impact: inc.impact,
      urgency: inc.urgency,
      short_description: inc.short_description,
    });
    setEditing(inc.sys_id);
  };

  // Insert/Update Incident
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await axios.put(
          `http://localhost:3001/api/incidents/${editing}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(`http://localhost:3001/api/incidents`, formData, {
          withCredentials: true,
        });
      }

      const updated = await axios.get(
        "http://localhost:3001/api/incidents",
        { withCredentials: true }
      );
      setIncidents(updated.data.result || []);

      setFormData({ impact: "", urgency: "", short_description: "" });
      setEditing(null);
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  return (
    <>
      {/* LOGIN PAGE */}
      {!isLogged && <LoginCard handleLogin={login} />}

      {/* MAIN PAGE */}
      {isLogged && (
        <Stack spacing={3} sx={{ color: theme.palette.text.primary }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              Incident Management
            </Typography>

            {/* SEARCH BAR */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "50px",
                paddingX: 2,
                paddingY: 0.8,
                boxShadow: "0px 2px 12px rgba(0,0,0,0.15)",
                width: 320,
              }}
            >
              <svg
                width="20"
                height="20"
                fill={theme.palette.text.primary}
                style={{ marginRight: 10 }}
                viewBox="0 0 24 24"
              >
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>

              <TextField
                placeholder="Search incidents…"
                variant="standard"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "15px", color: theme.palette.text.primary },
                }}
                sx={{ flex: 1 }}
              />
            </Stack>
          </Stack>

          {/* FILTERS + INSERT BUTTON */}
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            flexWrap="wrap"
          >
            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel>Impact</InputLabel>
              <Select
                label="Impact"
                name="impact"
                value={formData.impact}
                onChange={(e) =>
                  setFormData({ ...formData, impact: e.target.value })
                }
              >
                <MenuItem value="1">1 - High</MenuItem>
                <MenuItem value="2">2 - Medium</MenuItem>
                <MenuItem value="3">3 - Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel>Urgency</InputLabel>
              <Select
                label="Urgency"
                name="urgency"
                value={formData.urgency}
                onChange={(e) =>
                  setFormData({ ...formData, urgency: e.target.value })
                }
              >
                <MenuItem value="1">1 - High</MenuItem>
                <MenuItem value="2">2 - Medium</MenuItem>
                <MenuItem value="3">3 - Low</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Short Description"
              name="short_description"
              value={formData.short_description}
              onChange={(e) =>
                setFormData({ ...formData, short_description: e.target.value })
              }
              size="small"
              sx={{ width: 240 }}
            />

            <Button variant="contained" onClick={handleSubmit}>
              {editing ? "Update Incident" : "Insert Incident"}
            </Button>
          </Stack>

          {/* INCIDENT CARDS */}
          <Grid container spacing={3}>
            {incidents
              .filter(
                (inc) =>
                  inc.short_description
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  inc.number?.toLowerCase().includes(search.toLowerCase())
              )
              .map((inc) => (
                <Grid key={inc.sys_id} item>
                  <Card
                    sx={{
                      width: 260,
                      height: 250,
                      borderRadius: 3,
                      boxShadow: 4,
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      backgroundColor: theme.palette.background.paper,
                      color: theme.palette.text.primary, // ← FIXED
                    }}
                  >
                    <CardContent sx={{ pb: 1 }}>
                      <Typography fontWeight="bold">
                        ID: {inc.number}
                      </Typography>

                      <Typography>
                        <strong>Status:</strong> {inc.state}
                      </Typography>

                      <Typography>
                        <strong>Priority:</strong> {inc.priority}
                      </Typography>

                      <Typography>
                        <strong>Description:</strong>{" "}
                        {inc.short_description}
                      </Typography>
                    </CardContent>

                    <Stack direction="row" spacing={1} sx={{ pb: 1, px: 1 }}>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={() => handleDelete(inc.sys_id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleEdit(inc)}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Stack>
      )}
    </>
  );
}

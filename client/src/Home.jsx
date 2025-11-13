import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LoginCard from "./LoginCard";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({
    impact: "",
    urgency: "",
    short_description: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        try {
          const incidentList = await axios.get(
            "http://localhost:3001/api/incidents",
            { withCredentials: true }
          );
          setIncidents(incidentList.data.result || []);
        } catch (err) {
          console.error("Failed to fetch incidents:", err);
        }
      }
    }
    fetchData();
  }, [isLogged]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(
          `http://localhost:3001/api/incidents/${editing}`,
          formData,
          { withCredentials: true }
        );
        alert("Incident updated successfully!");
      } else {
        await axios.post("http://localhost:3001/api/incidents", formData, {
          withCredentials: true,
        });
        alert("Incident inserted successfully!");
      }

      const res = await axios.get("http://localhost:3001/api/incidents", {
        withCredentials: true,
      });
      setIncidents(res.data.result || []);

      setFormData({ impact: "", urgency: "", short_description: "" });
      setEditing(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save incident.");
    }
  };

  const handleDelete = async (sys_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/incidents/${sys_id}`, {
        withCredentials: true,
      });
      setIncidents((prev) => prev.filter((inc) => inc.sys_id !== sys_id));
      alert("Incident deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete incident.");
    }
  };

  const handleEdit = (inc) => {
    setFormData({
      impact: inc.impact || "",
      urgency: inc.urgency || "",
      short_description: inc.short_description || "",
    });
    setEditing(inc.sys_id);
  };

  return (
    <>
      {isLogged && (
        <Stack spacing={3} sx={{ color: "#1A237E" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#E91E63",
              mb: 1,
            }}
          >
            Incident Management
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <FormControl size="small" sx={{ width: 200 }}>
                <InputLabel>Impact</InputLabel>
                <Select
                  label="Impact"
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
                size="small"
                sx={{ width: 300 }}
              />

              <Button type="submit" variant="contained" color="primary">
                {editing ? "Update Incident" : "Insert Incident"}
              </Button>
            </Stack>
          </form>

          <Grid container spacing={3}>
            {incidents.map((inc) => (
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
                    color: "#5e6061ff",
                  }}
                >
                  <CardContent sx={{ pb: 1 }}>
                    <Typography fontWeight="bold" sx={{ mb: 1 }}>
                      ID: {inc.number}
                    </Typography>

                    <Typography sx={{ mb: 0.5 }}>
                      <strong>Status:</strong> {inc.state}
                    </Typography>

                    <Typography sx={{ mb: 0.5 }}>
                      <strong>Priority:</strong> {inc.priority}
                    </Typography>

                    <Typography sx={{ mb: 0.5 }}>
                      <strong>Description:</strong> {inc.short_description}
                    </Typography>
                  </CardContent>

                  <Stack direction="row" spacing={1} sx={{ pb: 1, px: 1 }}>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      sx={{ textTransform: "none" }}
                      onClick={() => handleDelete(inc.sys_id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ textTransform: "none" }}
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
      {!isLogged && <LoginCard />}
    </>
  );
}

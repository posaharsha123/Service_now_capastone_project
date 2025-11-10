// import {
//   Stack,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
//   Grid,
// } from "@mui/material";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthProvider";
// import axios from "axios";

// export default function Home() {
//   const { isLogged } = useContext(AuthContext);
//   const [incidents, setIncidents] = useState([]);
//   const [editingId, setEditingId] = useState(false);
// const [form, setForm] = useState({
//   incId: "",
//   priority: "",
//   severity: "",
//   status: "",
// });
//   const handleDelete = async (sys_id) => {
//   try {
//     await axios.delete(`http://localhost:3001/api/incidents/${sys_id}`, {
//       withCredentials: true,
//     });

    
//     setIncidents((prev) => prev.filter((item) => item.sys_id !== sys_id));
//     console.log(sys_id);
//   } catch (error) {
//     console.error("Delete failed:", error);
//   }
// };

// const handlesubmit = async(form, e) => {
//   e.preventDefault();

//   // if(editingId){
//   //   // Update existing record
//   //   updateIncident(editingId, form); // <- call your update API here
//   // } else {
//     console.log(form)
//      try {
//         const res = await axios.post(
//           "http://localhost:3001/api/New_incidents",
//           form,
//           { withCredentials: true }
//     );

//     console.log("Incident Created:", res.data);

//     // optional: clear form / refresh list
//     // setForm({ incId: "", priority: "", severity: "", status: "" });

//   } catch (err) {
//     console.error("Error creating incident:", err);
//   }
    
//   // }

//   // setEditingId(false);
//   // setForm({ incId: "", priority: "", severity: "", status: "" });
// };
// const handleEditClick = (inc) => {
//   setEditingId(true);
//   setForm({
//     incId: inc.number,
//     priority: inc.priority,
//     severity: inc.severity,
//     status: inc.state,
//   });
// };
// const handlechange = (e) => {
//   setForm({
//     ...form,
//     [e.target.name]: e.target.value
//   });
// };
//   useEffect(() => {
//     async function fetchData() {
//       if (isLogged) {
//         const incidentList = await axios.get(
//           "http://localhost:3001/api/incidents",
//           { withCredentials: true }
//         );
//         setIncidents(incidentList.data.result);
//       }
//     }

//     fetchData();
//   }, [isLogged]);

//   return (
//     <>
//       {isLogged && incidents ? (
//         <> 
       
//           <Stack spacing={2}>
//             <Typography variant="h5">Incident Records:</Typography>
                
            
//             <Grid container spacing={4} justifyContent={"space-around"}>
//             <div>
//                 <form id="form" onSubmit={(e) => handlesubmit(form, e)}>
//                   <label><strong>INC_ID:</strong></label>
//                   <input
//                     type="text"
//                     name="incId"
//                     placeholder="INC-1111"
//                     value={form.incId}
//                     onChange={handlechange}
//                   />

//                   <label><strong>Priority:</strong></label>
//                   <select name="priority" value={form.priority} onChange={handlechange}>
//                     <option value="">Select</option>
//                     <option value="low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="high">High</option>
//                     <option value="Critical">Critical</option>
//                   </select>

//                   <label><strong>Severity:</strong></label>
//                   <select name="severity" value={form.severity} onChange={handlechange}>
//                     <option value="">Select</option>
//                     <option value="3 - Low">3 - Low</option>
//                     <option value="2 - Medium">2 - Medium</option>
//                     <option value="1 - Critical">1 - Critical</option>
//                   </select>

//                   <label><strong>Status:</strong></label>
//                   <select name="status" value={form.status} onChange={handlechange}>
//                     <option value="Resolved">Resolved</option>
//                     <option value="Closed">Closed</option>
//                     <option value="Open">Open</option>
//                   </select>

//                   <button type="submit">{editingId ? "Update" : "Save"}</button>
//                 </form>
//             </div>

//               {incidents.map((inc) => {
//                 return (
//                   <Grid key={inc.sys_id}>
                  
                     
//                     <Card sx={{ width: 300, height: 220, display: 'flex', flexDirection: 'column' }}>
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Stack spacing={1}>
//                         <Typography variant="h6">
//                           Incident : {inc.number}
//                         </Typography>
//                         <Typography variant="body2">
//                           Description: {inc.short_description}
//                         </Typography>
//                         <Typography variant="body2">
//                           State: {inc.state}
//                         </Typography>
//                         <Typography variant="body2">
//                           Priority: {inc.priority}
//                         </Typography>
//                       </Stack>
//                     </CardContent>

//                     <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
//                       <Button
//                         size="small"
//                         variant="contained"
//                         color="primary"
//                       >
//                         Edit
//                       </Button>
//                       <Button onClick={()=>{handleDelete(inc.sys_id)}}
//                         size="small"
//                         variant="contained"
//                         color="error"
//                       >
//                         Delete
//                       </Button>
//                     </CardActions>
//                     </Card>   
                    
//                   </Grid>
//                 );
//               })}
//             </Grid>
//           </Stack>
//         </>
//       ) : (
//         <Typography>Please log in</Typography>
//       )}
//     </>
//   );
// }


  
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

 
export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({
    impact: "",
    urgency: "",
    short_description: "",
    status:"",
  });
  const [editing, setEditing] = useState(null); // sys_id of record being edited
 
  // Fetch incidents
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
 
  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  // Insert or update incident
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Update existing record
        await axios.put(
          `http://localhost:3001/api/incidents/${editing}`,
          formData,
          { withCredentials: true }
        );
        alert("Incident updated successfully!");
      } else {
        // Insert new record
        await axios.post("http://localhost:3001/api/incidents", formData, {
          withCredentials: true,
        });
        alert("Incident inserted successfully!");
      }
 
      // Refresh data
      const res = await axios.get("http://localhost:3001/api/incidents", {
        withCredentials: true,
      });
      setIncidents(res.data.result || []);
 
      // Reset form
      setFormData({ impact: "", urgency: "", short_description: "", status: "" });
      setEditing(null);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save incident.");
    }
  };
 
  // Delete record
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
 
  // Edit record (populate form)
  const handleEdit = (inc) => {
    setFormData({
      impact: inc.impact || "",
      urgency: inc.urgency || "",
      short_description: inc.short_description || "",
      status: inc.state || "",
    });
    setEditing(inc.sys_id);
  };
 
  return (
    <>
      {isLogged && (
        // <Stack spacing={3} justifyContent="space-evenly">
        //   <Typography variant="h5">Incident Management</Typography>
        <Stack spacing={3}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              color: "primary.main",
              mb: 1
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
                <FormControl size="small" sx={{ width: 200 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="1">1 - New</MenuItem>
                    <MenuItem value="2">2 - In Progress</MenuItem>
                    <MenuItem value="3">3 - On Hold</MenuItem>
                    <MenuItem value="4">4 - Resolved</MenuItem>
                    <MenuItem value="5">5 - Closed</MenuItem>
                    <MenuItem value="6">6 - Canceled</MenuItem>
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

 
         

          <Grid container spacing={3}  sx={{ width: "100%" }}>
            {incidents.map((inc) => (
              <Grid key={inc.sys_id} item>
                <Card
                  sx={{
                    width: 260,
                    height:250,
                    borderRadius: 3,
                    boxShadow: 4,
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
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
                      startIcon={<EditIcon/>}
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
      {!isLogged && <Typography>Please log in</Typography>}
    </>
  );
}
import { useState, useContext } from "react";
import { Box, Typography, IconButton, ToggleButton, CircularProgress, LinearProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTask from "./EditTask";
import TasksContext from "./store/TasksStore";
import { formatCustomDate, formatAgoDate } from "../utils/formateDate";

const Task = ({ title, deadline, date, completed, id, recurrence }) => {
    const [isComplete, setIsComplete] = useState(completed);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDelLoading, setIsDelLoading] = useState(false);
    const { tasks, setTasks } = useContext(TasksContext);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCompleted = async () => {
        try {
            setIsLoading(true);
            const resp = await fetch("https://apla-server-6265f48d2339.herokuapp.com/api/update", {
                method: "PUT",
                body: JSON.stringify({
                    _id: id,
                    title,
                    deadline,
                    completed: !isComplete,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!resp.ok) {
                setIsLoading(false);
                throw new Error(`Status: ${resp.status}`);
            }

            const data = await resp.json();
            console.log(data);
            setIsComplete(!isComplete);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDelLoading(true);
            const resp = await fetch("https://apla-server-6265f48d2339.herokuapp.com/api/delete", {
                method: "DELETE",
                body: JSON.stringify({
                    _id: id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!resp.ok) {
                setIsDelLoading(false);
                throw new Error(`Status: ${resp.status}`);
            }

            const taskIndex = tasks.findIndex((task) => task._id === id);

            const updatedTasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

            setTasks(updatedTasks);
            setIsDelLoading(false);
            console.log(updatedTasks);
        } catch (err) {
            console.log(err);
            setIsDelLoading(false);
        }
    };

    return (
        <Box
            sx={{
                p: "0.5rem 1rem",
                bgcolor: "lightgray",
                display: "flex",
                flexDirection: "column",
                borderRadius: "0.5rem",
            }}
        >
            <EditTask
                title={title}
                deadline={deadline}
                open={open}
                handleClose={handleClose}
                completed={completed}
                id={id}
                recurrence={recurrence}
            />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "0.5rem" }}>
                <Box>
                    <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <Typography variant="h6">{title}</Typography>
                        <ToggleButton
                            size="small"
                            sx={{ height: "1.5rem", borderRadius: "1rem", textTransform: "none", p: "2px 8px" }}
                            value="check"
                            selected={isComplete}
                            color="success"
                            onChange={handleCompleted}
                        >
                            <Typography fontSize={10}>
                                {isComplete ? "Done" : "In Progress"} {isLoading && <CircularProgress size={10} />}
                            </Typography>
                        </ToggleButton>
                    </Box>

                    <Typography variant="body2" color="darkgoldenrod">
                        <span style={{ color: "black" }}>Due by:</span> {formatCustomDate(deadline)}
                    </Typography>

                    <Typography variant="body2" color="darkgoldenrod">
                        <span style={{ color: "black" }}>Recurrence:</span>
                        {recurrence && recurrence.frequency.includes("do not repeat")
                            ? " Do not Repeat"
                            : recurrence && recurrence.frequency
                            ? ` ${recurrence.frequency} on interval of ${recurrence.interval}`
                            : null}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "2px" }}>
                    <IconButton size="medium" onClick={handleOpen}>
                        <EditIcon color="primary" fontSize="small" />
                    </IconButton>
                    <IconButton size="medium" onClick={handleDelete}>
                        <DeleteIcon color="error" fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            <Typography variant="caption" fontSize={10} color="GrayText">
                Last Updated: {formatAgoDate(date)}
            </Typography>
            {isDelLoading && <LinearProgress />}
        </Box>
    );
};

export default Task;

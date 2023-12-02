import { useState, useContext } from "react";
import {
    Modal,
    Box,
    Typography,
    FormControl,
    TextField,
    Button,
    CircularProgress,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import DateTimePicker from "./common/DateTimePicker";
import TasksContext from "./store/TasksStore";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

const EditTask = ({ open, handleClose, id, title, deadline, completed, recurrence }) => {
    const [titleVal, setTitleVal] = useState(title);
    const [deadlineVal, setDeadlineVal] = useState(deadline);
    const [frequencyVal, setFrequencyVal] = useState(
        recurrence && recurrence.frequency ? recurrence.frequency : "do not repeat"
    );
    const [intervalVal, setIntervalVal] = useState(recurrence && recurrence.interval ? recurrence.interval : 1);
    const [isLoading, setIsLoading] = useState(false);
    const { tasks, setTasks } = useContext(TasksContext);

    const handleTitleChange = (e) => setTitleVal(e.target.value);

    const handleDeadlineChange = (newValue) => {
        setDeadlineVal(newValue);
    };

    const handleRecurChange = (e) => setFrequencyVal(e.target.value);

    const handleIntervalChange = (e) => setIntervalVal(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const resp = await fetch("https://apla-server-6265f48d2339.herokuapp.com/api/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: titleVal,
                    deadline: deadlineVal,
                    _id: id,
                    completed,
                    recurrence: {
                        frequency: frequencyVal,
                        interval: intervalVal,
                    },
                }),
            });

            const updatedTask = await resp.json();

            const taskIndex = tasks.findIndex((task) => task._id === id);

            const updatedTasks = [...tasks];
            updatedTasks[taskIndex] = updatedTask;

            setTasks(updatedTasks);
            setIsLoading(false);
            console.log(updatedTask);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }

        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant="h6"> {id ? "Edit Task" : "Add New Task"}</Typography>
                </Box>
                <FormControl sx={{ width: "100%" }}>
                    <TextField label="Title" required name="title" value={titleVal} onChange={handleTitleChange} />
                </FormControl>
                <FormControl>
                    <DateTimePicker
                        value={deadlineVal}
                        defaultValue={deadlineVal}
                        onChange={(newValue) => handleDeadlineChange(newValue)}
                    />
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                    <FormControl fullWidth>
                        <InputLabel id="recurrence">Recurrence</InputLabel>
                        <Select label="recurrence" value={frequencyVal} onChange={handleRecurChange}>
                            <MenuItem value="do not repeat">Do not repeat</MenuItem>
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">monthly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="Interval"
                            name="interval"
                            disabled={frequencyVal === "do not repeat" ? true : false}
                            value={intervalVal}
                            onChange={handleIntervalChange}
                        />
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "flex-end",
                    }}
                >
                    <Button size="small" onClick={handleClose}>
                        Cancel
                    </Button>
                    <FormControl>
                        <Button
                            loading={isLoading}
                            type="submit"
                            variant="contained"
                            size="small"
                            onClick={handleSubmit}
                        >
                            Update {isLoading && <CircularProgress size={12} sx={{ color: "white", ml: "0.5px" }} />}
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditTask;

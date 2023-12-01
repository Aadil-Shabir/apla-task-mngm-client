import { useState, useContext } from "react";
import { Modal, Box, Typography, FormControl, TextField, Button, CircularProgress } from "@mui/material";
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

const AddNewTask = ({ open, handleClose }) => {
    const { setTasks, tasks } = useContext(TasksContext);
    const [formData, setFormData] = useState({
        title: "",
        deadline: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleTitleChange = (e) => {
        setFormData({
            ...formData,
            title: e.target.value,
        });
    };

    const handleDeadlineChange = (newValue) => {
        setFormData({
            ...formData,
            deadline: newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const resp = await fetch("https://apla-server-6265f48d2339.herokuapp.com/api/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: formData.title,
                    deadline: formData.deadline,
                }),
            });

            const data = await resp.json();
            setTasks([
                {
                    date: data.date,
                    title: data.title,
                    deadline: data.deadline,
                    _id: data._id,
                    completed: data.completed,
                },
                ...tasks,
            ]);
            setFormData({ title: "", deadline: "" });
            setIsLoading(false);
            console.log(data);
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
                    <Typography variant="h6">Add New Task</Typography>
                </Box>
                <FormControl sx={{ width: "100%" }}>
                    <TextField
                        label="Title"
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                    />
                </FormControl>
                <FormControl>
                    <DateTimePicker value={formData.deadline} onChange={(newValue) => handleDeadlineChange(newValue)} />
                </FormControl>
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
                        <Button type="submit" variant="contained" size="small" onClick={handleSubmit}>
                            Add {isLoading && <CircularProgress size={12} sx={{ color: "white", ml: "0.5px" }} />}
                        </Button>
                    </FormControl>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddNewTask;

import { useState, useContext } from "react";
import { Box, Button, Stack, Typography, Skeleton } from "@mui/material";
import Task from "./Task";
import TasksContext from "./store/TasksStore";
import AddNewTask from "./AddNewTask";

const Tasks = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { tasks, isLoading } = useContext(TasksContext);

    console.log({ tasks });

    return (
        <Box
            sx={{
                minWidth: { xs: "100%", sm: "500px", md: "600px" },
                minHeight: "100px",
                border: "1px gray solid",
                borderRadius: "0.5rem",
                p: "1rem",
                my: "1rem",
            }}
        >
            <AddNewTask open={open} handleClose={handleClose} />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", m: "0.5rem 0rem" }}>
                <Typography>List of your tasks</Typography>
                <Button variant="contained" size="small" onClick={handleOpen}>
                    Add New
                </Button>
            </Box>
            <Stack spacing={2}>
                {isLoading && (
                    <>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </>
                )}
                {!isLoading && tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Task
                            key={task._id}
                            title={task.title}
                            deadline={task.deadline}
                            date={task.date}
                            completed={task.completed}
                            id={task._id}
                        />
                    ))
                ) : (
                    <Box
                        sx={{
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            gap: "0.5rem",
                        }}
                    >
                        <Typography>No tasks</Typography>
                        <Button variant="outlined" size="small" onClick={handleOpen}>
                            Add New
                        </Button>
                    </Box>
                )}
            </Stack>
        </Box>
    );
};

export default Tasks;

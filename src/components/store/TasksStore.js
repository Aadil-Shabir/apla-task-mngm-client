import { createContext, useState, useEffect } from "react";

const TasksContext = createContext({});

export const TasksContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://apla-server-6265f48d2339.herokuapp.com/api");

                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }

                const data = await response.json();
                setTasks(data.reverse());
                setIsLoading(false);
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    return <TasksContext.Provider value={{ tasks, setTasks, isLoading }}>{children}</TasksContext.Provider>;
};

export default TasksContext;

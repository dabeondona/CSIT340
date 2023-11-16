import React, {useState, useEffect} from "react";
import {Button, Grid, Stack, LinearProgress, Box} from "@mui/material";
import "./index.css";

export default function TaskQueue() {

    const [task, setTask] = useState([]);

    const [highqueue, setHighQueue] = useState([]);
    const [normalqueue, setNormalQueue] = useState([]);
    const [normalqueuesecond, setNormalQueueSecond] = useState([]);
    const [normalqueuethird, setNormalQueueThird] = useState([]);

    const [progress, setProgress] = useState(0);
    const [progresstwo, setProgressTwo] = useState(0);
    const [progressthree, setProgressThree] = useState(0);
    const [progressfour, setProgressFour] = useState(0);

    function AddTask() {
        const x = Math.random(); 
        const priority = x <= 0.25 ? "High" : "Normal";
        const newValue = Math.floor(Math.random() * 200) + 1;
        setTask([...task, {value: newValue, prio: priority}]);
    }

    function AdmitTask() {
        setTask((currentTasks) => {
            if (currentTasks.length === 0) {
                return [];
            }

            const newTask = currentTasks[0];
            const remainingTasks = currentTasks.slice(1);
    
        if (newTask.prio === "High") {
            setHighQueue(highqueue => [...highqueue, newTask.value]);
        } else {
            const queues = [normalqueue, normalqueuesecond, normalqueuethird];
            const queueLengths = queues.map(queue => queue.length);
            const shortestQueueIndex = queueLengths.indexOf(Math.min(...queueLengths));
    
            if (shortestQueueIndex === 0) {
                setNormalQueue(normalqueue => [...normalqueue, newTask.value]);
            } else if (shortestQueueIndex === 1) {
                setNormalQueueSecond(normalqueuesecond => [...normalqueuesecond, newTask.value]);
            } else {
                setNormalQueueThird(normalqueuethird => [...normalqueuethird, newTask.value]);
            }
        }
            return remainingTasks;
        });
    }

    useEffect(() => {
        let timer;
        if (highqueue.length > 0 && progress < 100) {
            timer = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + 1;
                    if (newProgress < 100) {
                        return newProgress;
                    }
                    setHighQueue((prevQueue) => prevQueue.slice(1));
                    return 0; 
                });
            }, 15);
        } else {
            setProgress(0); 
        }
    
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [highqueue, progress]);
    
    useEffect(() => {
        let timer;
        if (normalqueue.length > 0 && progresstwo < 100) {
            timer = setInterval(() => {
                setProgressTwo((prevProgress) => {
                    const newProgress = prevProgress + 1;
                    if (newProgress < 100) {
                        return newProgress;
                    }
                    setNormalQueue((prevQueue) => prevQueue.slice(1));
                    return 0; 
                });
            }, 15);
        } else {
            setProgressTwo(0); 
        }
    
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [normalqueue, progresstwo]);

    useEffect(() => {
        let timer;
        if (normalqueuesecond.length > 0 && progressthree < 100) {
            timer = setInterval(() => {
                setProgressThree((prevProgress) => {
                    const newProgress = prevProgress + 1;
                    if (newProgress < 100) {
                        return newProgress;
                    }
                    setNormalQueueSecond((prevQueue) => prevQueue.slice(1));
                    return 0; 
                });
            }, 15);
        } else {
            setProgressThree(0); 
        }
    
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [normalqueuesecond, progressthree]);

    useEffect(() => {
        let timer;
        if (normalqueuethird.length > 0 && progressfour < 100) {
            timer = setInterval(() => {
                setProgressFour((prevProgress) => {
                    const newProgress = prevProgress + 1;
                    if (newProgress < 100) {
                        return newProgress;
                    }
                    setNormalQueueThird((prevQueue) => prevQueue.slice(1));
                    return 0; 
                });
            }, 15);
        } else {
            setProgressFour(0); 
        }
    
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [normalqueuethird, progressfour]);

    return (
        <Grid container spacing={2} sx={{ maxWidth: 1000, maxHeight: 1000, margin: '0 auto'}}>           
            <Grid item xs={7}>
                <Stack spacing={0}>
                    <div className="left-cell">
                        <Button variant="contained" onClick={AddTask}>ADD NEW TASK</Button>
                        <h3>Task Queue:</h3>
                        <Grid container spacing={0} sx={{maxWidth: 500, margin: '0 auto'}}>
                        {task.map(tasks => tasks.prio === "High" ? <div key={Math.random()} className="highValue">{tasks.value}</div> : <div key={Math.random()} className="regularValue">{tasks.value}</div>
                        )} 
                        </Grid>
                        <div className="divider"></div>
                        <Button variant="contained" className="admitButton" onClick={AdmitTask}>ADMIT TASK</Button>
                    </div>
                </Stack>
            </Grid>

            <Grid item xs={0}>
                <Stack>
                    <div className="high-cell">
                        <h4>High Priority Queue 1</h4>
                        <h5>Queue List:</h5>
                        <Grid container spacing={0} sx={{maxWidth: 1000, margin: '0 auto'}}>
                        {highqueue.map((number) => (
                            <Grid xs={0}><div className="highValue">{number}</div></Grid>
                        ))}
                        </Grid>
                        <h5>Duration: </h5>
                        <Box sx={{ width: '80%' }}>
                        <LinearProgress variant="determinate" value={progress} />
                        </Box>
                    </div>
                </Stack>
                <Stack>
                    <div className="cell">
                        <h4>Regular Queue 2</h4>
                        <h5>Queue List:</h5>
                        <Grid container spacing={0} sx={{maxWidth: 1000, margin: '0 auto'}}>
                        {normalqueue.map((number) => (
                            <Grid xs={0}><div className="regularValue">{number}</div></Grid>
                        ))}
                        </Grid>
                        <h5>Duration: </h5>
                        <Box sx={{ width: '80%' }}>
                        <LinearProgress variant="determinate" value={progresstwo} />
                        </Box>
                    </div>
                </Stack>
                <Stack>
                    <div className="cell">
                        <h4>Regular Queue 3</h4>
                        <h5>Queue List:</h5>
                        <Grid container spacing={0} sx={{maxWidth: 1000, margin: '0 auto'}}>
                        {normalqueuesecond.map((number) => (
                            <Grid xs={0}><div className="regularValue">{number}</div></Grid>
                        ))}
                        </Grid>
                        <h5>Duration: </h5>
                        <Box sx={{ width: '80%' }}>
                        <LinearProgress variant="determinate" value={progressthree} />
                        </Box>
                    </div>
                </Stack>
                <Stack>
                    <div className="cell">
                        <h4>Regular Queue 4</h4>
                        <h5>Queue List:</h5>
                        <Grid container spacing={0} sx={{maxWidth: 1000, margin: '0 auto'}}>
                        {normalqueuethird.map((number) => (
                            <Grid xs={0}><div className="regularValue">{number}</div></Grid>
                        ))}
                        </Grid>
                        <h5>Duration: </h5>
                        <Box sx={{ width: '80%' }}>
                        <LinearProgress variant="determinate" value={progressfour} />
                        </Box>
                    </div>
                </Stack>
            </Grid>
        </Grid>
    );
}
import { useState, useCallback } from 'react'
const useHttp = (method, url, onAddTask, setTasks) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const TaskHandler = useCallback(async (taskText) => {
        const loadedTasks = [];
        setIsLoading(true);
        setError(null);
        try {
            let response;
            if (method === 'POST') {
                response = await fetch(
                    url,
                    {
                        method: 'POST',
                        body: JSON.stringify({ text: taskText }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
            }
            else {
                response = await fetch(url);
            }

            if (!response.ok) {
                throw new Error('Request failed!');
            }
            const data = await response.json();
            // POST logic
            if (method === 'POST') {
                const generatedId = data.name; // firebase-specific => "name" contains generated id
                const createdTask = { id: generatedId, text: taskText };

                onAddTask(createdTask);
            }
            // GET logic
            else {

                for (const taskKey in data) {
                    loadedTasks.push({ id: taskKey, text: data[taskKey].text });
                }
                setTasks(loadedTasks);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [method, onAddTask, setTasks, url]);
    return [isLoading, error, TaskHandler];
}
export default useHttp;
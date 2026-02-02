function formatDuration(seconds: number) {
    // Round down to the nearest integer
    const secs = Math.floor(seconds);
    
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const remainingSeconds = secs % 60;

    // Use padStart to add leading zeros if necessary
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    if (hours > 0) {
        const formattedHours = hours.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}

export default formatDuration;
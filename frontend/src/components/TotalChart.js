import React from 'react';

const CircularProgressBar = ({ grievances, type }) => {
    // Calculate total grievances
    const total = grievances.length;
    
    // Calculate counts and percentages based on the type (resolved or unresolved)
    let specificCount;
    let percentage;
    let circleColor;
    let backgroundColor;
    let textColor;

    if (type === 'resolved') {
        specificCount = grievances.filter(grievance => grievance.status === 'resolved').length;
        percentage = (specificCount / total) * 100;
        circleColor = '#facc15'; // Yellow for resolved
        backgroundColor = 'bg-gradient-to-br from-yellow-50 to-yellow-200'; // Yellow gradient background
        textColor = '#facc15'; // Yellow text
    } else if (type === 'unresolved') {
        const resolvedCount = grievances.filter(grievance => grievance.status === 'resolved').length;
        specificCount = total - resolvedCount; // Total minus resolved grievances
        percentage = (specificCount / total) * 100;
        circleColor = '#f87171'; // Red for unresolved
        backgroundColor = 'bg-gradient-to-br from-red-50 to-red-200'; // Red gradient background
        textColor = '#f87171'; // Red text
    } else {
        // Handle unexpected type
        specificCount = 0;
        percentage = 0;
        circleColor = '#d1d5db'; // Default color for unexpected type
        backgroundColor = 'bg-gradient-to-br from-gray-50 to-gray-200'; // Default gradient background
        textColor = '#d1d5db'; // Default text color
    }

    // Set up the radius and circumference for the SVG circle
    const radius = 50; // Radius of the circle
    const strokeWidth = 10; // Stroke width of the circle
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className={`p-6 rounded-lg shadow-xl mt-5 ${backgroundColor}`} style={{ width: '100%', maxWidth: '300px', textAlign: 'center' }}>
            <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{type.charAt(0).toUpperCase() + type.slice(1)} Grievances</h2>
            <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                className="mx-auto"
            >
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke="#f3f4f6" // Light grey background circle
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke={circleColor} // Use color based on type
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)" // Rotate to start from the top
                />
                <text
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                    fill={textColor} // Use color based on type
                    fontSize="24"
                    fontWeight="bold"
                >
                    {Math.round(percentage)}%
                </text>
            </svg>
            <div className="mt-4">
                <p className={`text-sm ${textColor}`}>{type.charAt(0).toUpperCase() + type.slice(1)}: {specificCount}</p>
                <p className={`text-sm ${textColor}`}>Total: {total}</p>
            </div>
        </div>
    );
};

export default CircularProgressBar;

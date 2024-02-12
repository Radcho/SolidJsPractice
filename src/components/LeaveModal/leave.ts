type LeaveType = {
    type: string;
    color: string;
};

export const Leave: Array<LeaveType> = [
    { type: 'Annual Leave', color: '#56CBF9' },
    { type: 'Sick Leave', color: '#944654' },
    {
        type: 'Emergency Leave & other Short Absence Leave',
        color: '#BA1200',
    },
    {
        type: 'Short Term and Long-Term Care Leave',
        color: '#C297B8',
    },
    { type: 'Adoption Leave', color: '#85FF9E' },
    { type: 'Maternity Leave', color: '#FF729F' },
    { type: 'Paternity Leave', color: '#A6F4DC' },
    { type: 'Sabbatical Leave', color: '#19647E' },
    { type: 'Compassionate Leave', color: '#541388' },
    { type: 'Jury Service Leave', color: '#65532F' },
    { type: 'Public Service Leave', color: '#FFD400' },
];

export const LeaveOptions = Leave.map((leave) => ({
    label: leave.type,
    value: leave.type,
}));

export const getLeaveColor = (type: string) => {
    return Leave.find((leave) => leave.type === type)?.color ?? '#FFFFFF';
};

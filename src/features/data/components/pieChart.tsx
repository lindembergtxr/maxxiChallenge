import { useTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const STATUS_COLORS: Record<string, string> = {
    pending: '#FFA726',
    in_progress: '#29B6F6',
    completed: '#66BB6A',
    cancelled: '#EF5350',
}

const PRIORITY_COLORS: Record<string, string> = {
    low: '#AED581',
    medium: '#FFB74D',
    high: '#E57373',
}

const PRIORITY_LABEL: Record<string, string> = {
    low: 'taskPriorityLow',
    medium: 'taskPriorityMedium',
    high: 'taskPriorityHigh',
}

const STATUS_LABEL: Record<string, string> = {
    pending: 'taskStatusPending',
    in_progress: 'taskStatusInProgress',
    completed: 'taskStatusCompleted',
    cancelled: 'taskStatusCancelled',
}

const COLORS = {
    priority: PRIORITY_COLORS,
    status: STATUS_COLORS,
}

type FieldKey = 'status' | 'priority'

type TaskPieChartProps = {
    tasks: {
        name: string
        value: number
    }[]
    field: FieldKey
}
export const TaskPieChart = ({ tasks, field }: TaskPieChartProps) => {
    const { t } = useTranslation()

    const data = tasks.map((task) => ({
        name: t((field === 'priority' ? PRIORITY_LABEL : STATUS_LABEL)[task.name]),
        value: task.value,
    }))
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    label
                >
                    {tasks.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[field][entry.name] || '#ccc'} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}

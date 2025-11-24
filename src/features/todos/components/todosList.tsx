import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Container } from '@mui/material'

import type { Task } from '@/types'
import { i18nToDateFnsLocaleMap } from '@/config'

import { useTodoList } from '../hooks/useTodoList'
import Typography from '@mui/material/Typography'
import { TodosListStatus } from './todosListStatus'
import { TodosListPriority } from './todosListPriority'
import { TodosListItemActions } from './todosListItemActions'

const tableColumns: { id: keyof Task; labelKey: string; sortable: boolean }[] = [
    { id: 'title', labelKey: 'todoListTableTitleColumn', sortable: true },
    { id: 'description', labelKey: 'todoListTableDescriptionColumn', sortable: true },
    { id: 'priority', labelKey: 'todoListTablePriorityColumn', sortable: true },
    { id: 'status', labelKey: 'todoListTableStatusColumn', sortable: true },
    { id: 'dueDate', labelKey: 'todoListTableDueDateColumn', sortable: true },
    { id: 'location', labelKey: 'todoListTableLocationColumn', sortable: false },
]

export const TodosList = () => {
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [sortBy, setSortBy] = useState<keyof Task>('title')

    const { t, i18n } = useTranslation()

    const { todoList, totalPages } = useTodoList({
        page: page + 1,
        limit: pageSize,
        sortBy,
        sortDirection,
    })

    const handleSort = (property: keyof Task) => {
        const isAsc = sortBy === property && sortDirection === 'asc'
        setSortDirection(isAsc ? 'desc' : 'asc')
        setSortBy(property)
    }

    const parseDate = (date?: string | null) => {
        if (!date) return '-'
        const locale = i18nToDateFnsLocaleMap[i18n.language]
        const form = i18n.resolvedLanguage === 'en' ? 'MM/dd/yyyy p' : 'dd/MM/yyyy HH:mm'

        return format(new Date(date), form, { locale })
    }

    return (
        <Container disableGutters>
            <TableContainer>
                <Table stickyHeader size="small" aria-label="todos table">
                    <TableHead>
                        <TableRow>
                            {tableColumns.map((column) => (
                                <TableCell key={column.id} sx={{ whiteSpace: 'nowrap' }}>
                                    {column.sortable ? (
                                        <TableSortLabel
                                            active={sortBy === column.id}
                                            direction={sortBy === column.id ? sortDirection : 'asc'}
                                            onClick={() => handleSort(column.id)}
                                            sx={{ width: '100%' }}
                                        >
                                            {t(column.labelKey)}
                                        </TableSortLabel>
                                    ) : (
                                        t(column.labelKey)
                                    )}
                                </TableCell>
                            ))}

                            <TableCell>{t('todoListTableActionColumn')}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {todoList.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={tableColumns.length + 1} align="center">
                                    <Typography variant="body2" color="text.secondary">
                                        {t('todoListTableEmpty')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        {todoList.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <Typography variant="body2">{task.title}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{task.description}</Typography>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                    <TodosListPriority priority={task.priority} />
                                </TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                    <TodosListStatus status={task.status} />
                                </TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                    <Typography variant="body2">
                                        {parseDate(task.dueDate)}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                    <Typography variant="body2">
                                        {task.location.latitude}, {task.location.longitude}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <TodosListItemActions task={task} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={totalPages}
                page={page}
                labelRowsPerPage={t('todoListTableRowsPerPage')}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} ${t('todoListTableCountSeparation')} ${count}`
                }
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={(event) => {
                    setPageSize(parseInt(event.target.value, 10))
                    setPage(0)
                }}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Container>
    )
}

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
import { useTodoList } from '../hooks/useGetTasks'
import Typography from '@mui/material/Typography'
import { TodosListStatus } from './todosListStatus'
import { TodosListPriority } from './todosListPriority'
import { i18nToDateFnsLocaleMap } from '@/config'

const tableColumns: { id: keyof Task; labelKey: string }[] = [
    { id: 'title', labelKey: 'todoListTableTitleColumn' },
    { id: 'priority', labelKey: 'todoListTablePriorityColumn' },
    { id: 'status', labelKey: 'todoListTableStatusColumn' },
    { id: 'dueDate', labelKey: 'todoListTableDueDateColumn' },
    { id: 'location', labelKey: 'todoListTableLocationColumn' },
]

export const TodosList = () => {
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const [order, setOrder] = useState<'asc' | 'desc'>('asc')
    const [orderBy, setOrderBy] = useState<keyof Task>('title')

    const { t, i18n } = useTranslation()

    const { todoList, totalPages } = useTodoList({ page: page + 1, limit: pageSize })

    const handleSort = (property: keyof Task) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    return (
        <div>
            <Container>
                <TableContainer>
                    <Table stickyHeader size="small" aria-label="todos table">
                        <TableHead>
                            <TableRow>
                                {tableColumns.map((column) => (
                                    <TableCell key={column.id} sx={{ whiteSpace: 'nowrap' }}>
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={() => handleSort(column.id)}
                                            sx={{ width: '100%' }}
                                        >
                                            {t(column.labelKey)}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}

                                <TableCell>{t('todoListTableActionColumn')}</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {todoList.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>
                                        <Typography variant="body2">{task.title}</Typography>
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                        <TodosListPriority priority={task.priority} />
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                        <TodosListStatus status={task.status} />
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                        <Typography variant="body2">
                                            {task.dueDate
                                                ? format(
                                                      new Date(task.dueDate),
                                                      i18n.resolvedLanguage === 'en'
                                                          ? 'MM/dd/yyyy p'
                                                          : 'dd/MM/yyyy HH:mm',
                                                      {
                                                          locale: i18nToDateFnsLocaleMap[
                                                              i18n.language
                                                          ],
                                                      }
                                                  )
                                                : '-'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                        <Typography variant="body2">
                                            ({task.location.latitude}, {task.location.longitude})
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{/* Add action dropdown here */}</TableCell>
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
        </div>
    )
}

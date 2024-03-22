// src/TableHeadComponent.jsx
import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

const UserListHead = ({ columns }) => {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default UserListHead

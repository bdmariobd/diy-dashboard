import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { prisma } from "../../../prisma/prismaSingleton";

const fetchDashboards = async () => {
  const dashboards = await prisma.dashboard.findMany({
    include: {
      user: true,
    },
    where: {
      userId: {
        not: 2,
      },
    },
  });
  return dashboards;
};

export default async function Comunity() {
  const dashboards = await fetchDashboards();
  return (
    <>
      <h1> Comunity </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dashboard</TableCell>
              <TableCell align="right">Creator</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Updated at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboards.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.user.name}</TableCell>
                <TableCell align="right">
                  {row.createdAt.toUTCString()}
                </TableCell>
                <TableCell align="right">
                  {row.updatedAt.toUTCString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

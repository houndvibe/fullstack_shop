import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { DeviceProps } from "../../store/deviceStore";
import { observer } from "mobx-react-lite";
import { COLOR_BACKGROUND } from "../../colors";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

type SubFilterProps = {
  filter: string;
  priceFilter: { from: number; to: number };
};

interface Data {
  id: number;
  title: string;
  brand: string;
  price: number;
}

function createData(
  id: number,
  title: string,
  brand: string,
  price: number
): Data {
  return {
    id,
    title,
    brand,
    price,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof never>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "id",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "brand",
    numeric: false,
    disablePadding: false,
    label: "Brand",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ bgcolor: COLOR_BACKGROUND }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ bgcolor: COLOR_BACKGROUND }}
            key={headCell.id}
            align={"right"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDelete: () => void;
  setFilterType: (type: string) => void;
  setSubFilterType: (type: SubFilterProps) => void;
  filterType: string;
  subFilterType: SubFilterProps;
  tableData: DeviceProps[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const {
    numSelected,
    handleDelete,
    setFilterType,
    filterType,
    subFilterType,
    setSubFilterType,
    tableData,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Devices
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <React.Fragment>
          <Tooltip title="Filter list">
            <FormControl fullWidth sx={{ margin: 2, maxWidth: 300 }}>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterType}
                label="Age"
                onChange={(e) => setFilterType(e.target.value)}
              >
                {headCells.map(({ id }) => {
                  return (
                    <MenuItem value={id} key={id}>
                      {id}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Tooltip>
          {headCells.map((item) => {
            if (filterType === item.id) {
              return filterType === "brand" ? (
                <Tooltip title="Brand" key={item.id}>
                  <FormControl fullWidth sx={{ margin: 2, maxWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label">
                      {item.id}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={subFilterType.filter}
                      label="Age"
                      onChange={(e) =>
                        setSubFilterType({
                          ...subFilterType,
                          filter: e.target.value,
                        })
                      }
                    >
                      {tableData.map((item) => {
                        return (
                          <MenuItem
                            value={item[filterType]}
                            key={item[filterType]}
                          >
                            {item[filterType]}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Tooltip>
              ) : filterType === "price" ? (
                <Box display="flex" key={filterType}>
                  <Tooltip title="Price">
                    <FormControl fullWidth sx={{ margin: 2, maxWidth: 300 }}>
                      <InputLabel id="1">from</InputLabel>
                      <Input
                        id="1"
                        onChange={(e) =>
                          setSubFilterType({
                            ...subFilterType,
                            priceFilter: {
                              ...subFilterType.priceFilter,
                              from: +e.target.value,
                            },
                          })
                        }
                      />
                    </FormControl>
                  </Tooltip>
                  <Tooltip title="Price">
                    <FormControl fullWidth sx={{ margin: 2, maxWidth: 300 }}>
                      <InputLabel id="1">to</InputLabel>
                      <Input
                        id="1"
                        onChange={(e) =>
                          setSubFilterType({
                            ...subFilterType,
                            priceFilter: {
                              ...subFilterType.priceFilter,
                              to: +e.target.value,
                            },
                          })
                        }
                      />
                    </FormControl>
                  </Tooltip>
                </Box>
              ) : (
                <Tooltip title={filterType} key={item.id}>
                  <FormControl fullWidth sx={{ margin: 2, maxWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label">
                      {item.id}
                    </InputLabel>
                    <Input
                      onChange={(e) =>
                        setSubFilterType({
                          ...subFilterType,
                          filter: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </Tooltip>
              );
            }
            return null;
          })}
        </React.Fragment>
      )}
    </Toolbar>
  );
};

interface TableProps {
  data: DeviceProps[];
  deleteFunc: (id: number) => void;
}

const CustomMUITable = observer((props: TableProps) => {
  const rows = props.data.map(({ id, title, price, brand }) => {
    return createData(id, title, brand, price);
  });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("price");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [filterType, setFilterType] = React.useState("");
  const [subFilterType, setSubFilterType] = React.useState<SubFilterProps>({
    filter: "",
    priceFilter: {
      from: 0,
      to: 0,
    },
  });

  const handleDelete = () => {
    selected.forEach((item) => props.deleteFunc(item));
  };

  const handleSetFilterType = (type: string): void => {
    setFilterType(type);
  };
  const handleSetSubFilterType = (type: SubFilterProps): void => {
    setSubFilterType(type);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .filter((item) => {
          return filterType === "title"
            ? item.title
                .toLowerCase()
                .includes(subFilterType.filter.toLowerCase())
            : filterType === "brand"
            ? item.brand.toLowerCase() === subFilterType.filter.toLowerCase()
            : filterType === "id"
            ? String(item.id).includes(subFilterType.filter)
            : filterType === "price"
            ? item.price > subFilterType.priceFilter.from &&
              item.price < subFilterType.priceFilter.to
            : item;
        }),
    [order, orderBy, page, rowsPerPage, rows, filterType, subFilterType]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
          setFilterType={handleSetFilterType}
          filterType={filterType}
          setSubFilterType={handleSetSubFilterType}
          subFilterType={subFilterType}
          tableData={props.data}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="right"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.brand}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
});
export default CustomMUITable;

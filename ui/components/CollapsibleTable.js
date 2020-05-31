import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.user_name}
        </TableCell>
        <TableCell align="right">{row.user_id}</TableCell>
        <TableCell align="right">{row.ProcessName}</TableCell>
        <TableCell align="right">{row.campaignName}</TableCell>
        <TableCell align="center">{100}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
              {row.user_name} Details
              </Typography>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>User Name</TableCell>
                    <TableCell align="right">UserId</TableCell>
                    <TableCell align="right">Process Name</TableCell>
                    <TableCell align="right">Campaign Name</TableCell>
                    <TableCell align="right">CallId</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Customer Id</TableCell>
                    <TableCell align="right">Play</TableCell>
                    <TableCell align="right">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.user_name}
                      </TableCell>
                      <TableCell align="right">{historyRow.user_id}</TableCell>
                      <TableCell align="right">{'ProcessName'}</TableCell>
                      <TableCell align="right">{'CampaignName'}</TableCell>
                      <TableCell align="right">{historyRow.call_id}</TableCell>
                      <TableCell align="right">{historyRow.phone}</TableCell>
                      <TableCell align="right">{historyRow.id}</TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="expand row" size="small" >
                          <PlayCircleFilledIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                       100
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    user_name: PropTypes.string.isRequired,
    user_id: PropTypes.string.isRequired,
    campaignName: PropTypes.string.isRequired,
    ProcessName: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        user_name: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired,
        call_id: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const CollapsibleTable = ({tableData}) => {
  console.log('gggg', tableData)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>User Name</TableCell>
            <TableCell align="right">UserId</TableCell>
            <TableCell align="right">Process Name</TableCell>
            <TableCell align="right">Campaign Name</TableCell>
            <TableCell align="center">Avg Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length>0 && tableData.map((row) => (
            <Row key={row.user_name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default CollapsibleTable

import React from 'react'
import { connect } from 'react-redux'
import TestJSON from '../../TestJSON.json'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { JwModal } from '../jwmodal';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
// import { Card, Button } from 'react-bootstrap';
import {
    Redirect,
} from 'react-router-dom'

const columns = [
    { id: 'real_name', label: 'Name', Width: 100 },
    { id: 'id', label: 'Id', Width: 100 },
    { id: 'tz', label: 'Location', Width: 100 },

];

const useStyles = makeStyles({
    root: {
        width: '70%',
        marginLeft: "14%"
    },
    container: {
        maxHeight: 440,
    },
});

let mlist = {
    "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
    "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
};

function DashBoard(props) {
    const classes = useStyles();
    const rows = TestJSON.members;
    const [page, setPage] = React.useState(0);
    const [selectedDate, setSelectedDate] = React.useState("");
    const [activityPerDate, setActivityPerDate] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    let finalObject = {}
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const openModal = (event, value) => {
        setActivityPerDate(false)
        setSelectedDate("")
        let activePeriod = value.activity_periods
        for (var x of activePeriod) {
            let date = x.start_time
            date = date.split(" ")
            let month = mlist[date[0]]
            let day = ""
            if (date[1] < 10)
                day = '0' + date[1]
            else
                day = date[1]
            let year = date[2]
            let finalDate = year + '-' + month + "-" + day
            finalObject[finalDate] = x
        }
        props.dispatch({ type: "UserActiveDetails", target: finalObject })
        JwModal.open('save')(event)
    }
    const handleDateChange = (e) => {
        setActivityPerDate(true)
        setSelectedDate(e.target.value)
        let obj = {}
        if (e.target.value in props.userActiveDetails)
            obj[e.target.value] = props.userActiveDetails[e.target.value]
        else
            obj[e.target.value] = { "start_time": "No Major Actions", "end_time": "" }
        props.dispatch({ type: "SelectedDateDetails", target: obj })

    }
    const showAllActivity = (e) => {
        setActivityPerDate(false)
        setSelectedDate("")
    }

    if (!props.isLoginSuccess) {
        return <Redirect to='/' push />;
    }
    return (
        <div className="segment-table">
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ fontSize: "17px" }}
                                    >
                                        <b>{column.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {

                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}
                                    // onClick={(e) => setPrefillData(row.segmentPrefill, row.id, row.name,row.templateFields)}
                                    >
                                        {columns.map(column => {
                                            const value = row[column.id];

                                            return (
                                                <TableCell key={column.id} align={column.align}>

                                                    <span onClick={(e) => openModal(e, row)} style={{ width: "70%", height: "100%" }}>{column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </span>
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[6, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            <JwModal id="save" className="dialog">
                <h4 className="heading" style={{ textAlign: "center" }}>User Activity Details</h4>

                <span className="date-container">
                    <label style={{ marginRight: "2%" }}>Select Date</label>
                    <input type="date" onChange={handleDateChange} value={selectedDate} />
                </span>
                <div >
                    {selectedDate != "" && <button type="text" className="btn-activity" onClick={showAllActivity}>All Activity</button>}
                </div>
                <Timeline lineColor={'#ddd'}>
                    {Object.keys(!activityPerDate ? props.userActiveDetails : props.selectedDateDetails).map((instance, index) => {
                        return <TimelineItem
                            key={index}
                            dateText={instance}
                            style={{ color: '#fb8c00' }}
                        >
                            <h6>Actions</h6>
                            <p>{!activityPerDate ? props.userActiveDetails[instance].start_time : props.selectedDateDetails[instance].start_time}</p>
                            <p>{!activityPerDate ? props.userActiveDetails[instance].end_time : props.selectedDateDetails[instance].end_time}</p>
                        </TimelineItem>
                    })}

                </Timeline>
                <br></br>
            </JwModal>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isLoginSuccess: state.isLoginSuccess,
        userActiveDetails: state.userActiveDetails,
        selectedDateDetails: state.selectedDateDetails


    }
}

export default connect(mapStateToProps)(DashBoard);
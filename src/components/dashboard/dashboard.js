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
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
// import { Card, Button } from 'react-bootstrap';
import {
    Redirect,
} from 'react-router-dom'

const columns = [
    { id: 'name', label: 'Name', Width: 100 },
    { id: 'id', label: 'Id', Width: 100 },
    { id: 'applyingFor', label: "Applying For", Width: 100 },

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



function DashBoard(props) {
    const classes = useStyles();
    const rows = TestJSON.members;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [comment,setComment]=React.useState("")
    const commentData=JSON.parse(localStorage.getItem("apiJson"))

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const saveComment=(e)=>{
        setComment(e.target.value)
        console.log(e.target.value)
    }
    const saveToFile=()=>{
        let key=props.userId
        let arr=[]
        let obj={}
        if(Object.keys(commentData).length>0&&commentData[key])
        {
            console.log("hiiiii")
           arr=commentData[key]
        }
        arr.unshift(comment)
        obj[key]=arr
        localStorage.setItem('apiJson',JSON.stringify(obj))
        setComment("")

    }

    const openModal = (event, value) => {
       
        props.dispatch({ type: "UserVideoLink", target: value.ApplicationLink })
        props.dispatch({ type: "UserRelevantQuestions", target: value.question })
        props.dispatch({type:"UserId",target:value.id})
        JwModal.open('save')(event)
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
                                                <TableCell onClick={(e) => openModal(e, row)} style={{cursor:"pointer"}} key={column.id} align={column.align} >

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

                {props.userVideoLink ? <iframe style={{width:"100%",height:"400px"}}src={props.userVideoLink}
                    frameBorder='0'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    title='video'
                /> : <p>No application response from the user</p>}
                {props.userRelevantQuestions ? <p>{props.userRelevantQuestions}</p> : null}
               {props.userVideoLink&&<div><Input placeholder="Add public comment" value={comment} onChange={(e)=>saveComment(e)} fullWidth inputProps={{ 'aria-label': 'description','width':"100%" }} />     
                <br></br>
                <br></br>
                <Button variant="contained"  onClick={()=>saveToFile()} fullWidth color="primary">
                    
        Save
      </Button></div>  }   
      <br></br>
                    {
                        
                        Object.keys(commentData).length>0&&commentData[props.userId]&&commentData[props.userId].map((comment)=>{
                            return <div><p>{comment}</p><br></br></div>
                        })
                    }     
                  <br></br>
            </JwModal>
        </div>
    )
}

function mapStateToProps(state) {


    return {
        isLoginSuccess: state.isLoginSuccess,
        userVideoLink: state.userVideoLink,
        userRelevantQuestions: state.userRelevantQuestions,
        userId:state.userId


    }
}

export default connect(mapStateToProps)(DashBoard);
import React, { useEffect, useState } from "react";
import { useStyles, propStyles } from "../../assets/styles.js";
import { Grid, TextField, InputLabel, Select,FormControl, MenuItem, Avatar } from "@mui/material";
import MaterialTable from "material-table";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as Actions from "../../redux/Actions/mcqActions.js";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import { secondsToHMS } from "../../utils/services.js";
import moment from "moment";

const MCQAnswerList = ({ dispatch, mcqAnswerListData }) => {
  const classes = useStyles();


  useEffect(function () {
    dispatch(Actions.getMCQAnswerList());
  }, []);

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        {mcqAnswerListData && displayTable()}
        {/* {editModal()} */}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Live Course History"
            data={mcqAnswerListData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(mcqAnswerListData) ? mcqAnswerListData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Customer Name", field: "customerId.firstName" },
              { title: "Class Name", field: "liveClassId.className" },
              { title: "Correct Answer", field: "correctCount" },
              { title: "InCorrect Answer", field: "incorrectCount" },
              { title: "Marks Obtained", field: "marksObtained" },
              { title: "Max. Marks", field: "maxMarks" },
              { title: "Attempted Questions", field: "attemptedQuestions" },
              { title: "Qualify Status", field: "isPassed",
                render: rowData => rowData.isPassed ? "Qualified" : "Fail"
               },

            ]}
            options={{ ...propStyles.tableStyles, filtering: false }}

          />
        </Grid>
      </Grid>
    );
  }

};

const mapStateToProps = (state) => ({
  mcqAnswerListData: state.mcq.mcqAnswerListData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(MCQAnswerList);

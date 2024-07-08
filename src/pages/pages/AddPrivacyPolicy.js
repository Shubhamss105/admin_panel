import React, { useState, useCallback } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  CircularProgress,
  Avatar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as Actions from "../../redux/Actions/privacyPolicyActions.js";
import TextEditor from "./TextEditor.js";

export const AddPrivacyPolicy = ({ isLoading }) => {
  var classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setpage] = useState("");
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: "", bytes: null });
  const [file, setFile] = useState(null);

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
      setFile(e.target.files[0]);
    }
  };

  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const validation = () => {
    var isValid = true;
    if (!name) {
      handleError("name", "Please input name");
      isValid = false;
    }

    if (!description) {
      handleError("description", "Please input Description");
      isValid = false;
    }
    if (!status) {
      handleError("status", "Please Select Status");
      isValid = false;
    }
    if (!page) {
      handleError("page", "Please Input page");
      isValid = false;
    }
    if (!icon.file) {
      handleError("icon", "Please Upload Image");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("status", status);
      formData.append("title", name);
      formData.append("description", description);
      formData.append("image", file);
      formData.append("page", page);

      dispatch(Actions.addPrivacyPolicy(formData));
      handleReset();
    }
  };

  const handleReset = useCallback(() => {
    setname("");
    setpage("");
    setStatus("");
    setDescription("");
    setIcon({ file: "", bytes: null });
    setFile(null);
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Privacy Policy</div>
              <div
                onClick={() => navigate("/displayPrivacyPolicy")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Title"
              error={error.name ? true : false}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(event) => setname(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Status</InputLabel>
              <Select
                labelId="select-label"
                value={status}
                onChange={handleOptionChange}
                variant="outlined"
                error={!!error.status}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.status}</div>
            </FormControl>
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Page</InputLabel>
              <Select
                labelId="select-label"
                value={page}
                onChange={(e) => setpage(e.target.value)}
                variant="outlined"
                error={!!error.page}
              >
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="astrologer">Astrologer</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.status}</div>
            </FormControl>
          </Grid>

          <Grid
            item
            lg={4}
            sm={6}
            md={6}
            xs={6}
            className={classes.uploadContainer}
          >
            <label className={classes.uploadImageButton}>
              Upload Picture
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </label>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={2} sm={6} md={2} xs={6}>
            <Avatar src={icon.file} style={{ width: 56, height: 56 }} />
          </Grid>


          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextEditor
              description={description}
              onDescriptionChange={setDescription}
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleReset} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isLoading: state.privacyPolicy.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddPrivacyPolicy);